import React, { useEffect, useState } from "react";

import "./App.css";
import countries from "countries-list";
import Box from "@mui/material/Box";
import BasicSelect from "./components/SelectInput";
import CeditCard, { Card } from "./components/CeditCard";
import { Alert } from "@mui/material";
import BannedCountries from "./components/BannedCountries";

import DisplayCards from "./components/DisplayCards";

import { AppBar, Tab, Tabs, Typography } from "@mui/material";

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function App() {
  const [blacklistedCountries, SetBlacklistedCountries] = useState<string[]>(
    []
  );
  const [selectedBlacklisted, setSelectedBlacklisted] = useState("");
  const [cardsList, setCardsList] = useState<Card[]>([]);
  const [value, setValue] = useState(0);
  const [toast, setToast] = useState("");
  const [showToast, setShowToast] = useState(false);

  const tabPanelItems = [
    {
      name: "Add credit card",
    },
    {
      name: "banned countries",
    },
    {
      name: "Display credit cards",
    },
  ];

  const handleSaveCard = (newCard: Card) => {
    setCardsList((items) => [...items, newCard]);
  };
  const onSelect = (name: string) => {
    SetBlacklistedCountries((val) => [...val, name]);
    setSelectedBlacklisted(name);
  };

  const countryNames = Object.values(countries.countries)
    .map((item) => item.name)
    .sort();

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (showToast) {
      const timeId = setTimeout(() => {
        setShowToast(false);
        setToast("");
      }, 3000);

      return () => {
        clearTimeout(timeId);
      };
    }
    // when the component is mounted, the alert is displayed for 3 seconds
  }, [showToast]);

  return (
    <>
      <AppBar position="sticky" className="navcolor">
        <Tabs
          indicatorColor="secondary"
          textColor="inherit"
          value={value}
          onChange={handleChange}
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
          centered
        >
          {tabPanelItems.map((item, index) => {
            return (
              <Tab
                label={item.name}
                {...a11yProps(index)}
                style={{
                  fontFamily: "Open Sans",
                  fontStyle: "normal",
                  fontWeight: "bold",
                  fontSize: 12,
                  textTransform: "capitalize",
                }}
              />
            );
          })}
        </Tabs>
      </AppBar>
      {tabPanelItems.map((item, tabIndex) => {
        return (
          <TabPanel value={value} index={tabIndex}>
            {tabIndex === 0 && (
              <>
                <Box sx={{ display: "flex", justifyContent: "center" }} mt={2}>
                  <CeditCard
                    saveCard={handleSaveCard}
                    countries={countryNames}
                    blacklistedCountries={blacklistedCountries}
                    existingCardList={cardsList}
                  />
                </Box>
                <Box mt={2} mb={2}>
                  <DisplayCards cardsList={cardsList} />
                </Box>
              </>
            )}
            {tabIndex === 1 && (
              <>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                  mt={2}
                >
                  <Box mt={2} mb={2}>
                    <Typography align="center" color="#1976d2">
                      select country to blacklist below
                    </Typography>
                  </Box>
                  <BasicSelect
                    list={countryNames}
                    onSelect={onSelect}
                    selectedValue={selectedBlacklisted}
                    label="blacklisted countries"
                  />
                </Box>
                {showToast && (
                  <Box mt={1}>
                    <Alert
                      variant="outlined"
                      severity="error"
                      onClose={() => {
                        setShowToast(false);
                        setToast("");
                      }}
                    >
                      {toast}
                    </Alert>
                  </Box>
                )}
                <Box sx={{ display: "flex", justifyContent: "center" }} mt={4}>
                  <BannedCountries
                    blacklistedCountries={blacklistedCountries}
                  />
                </Box>
              </>
            )}
            {tabIndex === 2 && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Box mt={2} mb={2}>
                  <Typography align="center" color="#1976d2">
                    Credit Cards
                  </Typography>
                </Box>
                <Box>
                  <DisplayCards cardsList={cardsList} />
                </Box>
              </Box>
            )}
          </TabPanel>
        );
      })}
    </>
  );
}

export default App;
