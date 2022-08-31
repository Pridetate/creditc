import Cards, { Focused } from "react-credit-cards";

import React, { useEffect, useState } from "react";
import BasicTextField from "./Textfield";
import Box from "@mui/material/Box";
import "react-credit-cards/es/styles-compiled.css";
import CustomButton from "./Button";
import {
  CVCValidator,
  ExpiryValidator,
  NameValidator,
  NumberValidator,
} from "../Utilities/Ulitilies";
import BasicSelect from "./SelectInput";
import { Alert } from "@mui/material";

export interface Card {
  name: string;
  cvc: string;
  expiry: string;
  number: string;
  country: string;
}
interface CreditCardProps {
  saveCard: (newCard: Card) => void;
  countries: string[];
  blacklistedCountries: string[];
  existingCardList: Card[];
}

const CreditCard: React.FC<CreditCardProps> = ({
  saveCard,
  countries,
  blacklistedCountries,
  existingCardList,
}: CreditCardProps) => {
  const [cvc, setCvc] = useState("");
  const [expiry, setExpiry] = useState("");
  const [focus, setFocus] = useState("");
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [cvcError, setCvcError] = useState(false);
  const [cvcErrorText, setCvcErrorText] = useState("");
  const [expiryError, setExpiryError] = useState(false);
  const [expiryErrorText, setExpiryErrorText] = useState("");
  const [nameError, setNameError] = useState(false);
  const [nameErrorText, setNameErrorText] = useState("");
  const [numberError, setNumberError] = useState(false);
  const [numberErrorText, setNumberErrorText] = useState("");
  const [countryError, setCountryError] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [toast, setToast] = useState("");
  const [showToast, setShowToast] = useState(false);

  const onSelect = (name: string) => {
    if (blacklistedCountries.includes(name)) {
      setCountryError(true);
      setToast("country is blacklisted");
      setShowToast(true);
      setSelectedCountry("");
    } else {
      setSelectedCountry(name);
      setToast("");
      setShowToast(false);
      setCountryError(false);
    }
  };
  const handleSaveCard = () => {
    if (name !== "" && expiry !== "" && cvc !== "" && selectedCountry !== "") {
      if (
        !nameError &&
        !expiryError &&
        !cvcError &&
        !numberError &&
        !countryError
      ) {
        if (existingCardList.find((item) => item.number === number)) {
          setToast("card already exist");
          setShowToast(true);
        } else {
          let newCard: Card = {
            name,
            cvc,
            expiry,
            number,
            country: selectedCountry,
          };
          saveCard(newCard);
          setNumber("");
          setCvc("");
          setExpiry("");
          setSelectedCountry("");
        }
      } else {
        setToast("one of the fields is invalid");
        setShowToast(true);
      }
    } else {
      setToast("one of the fields is empty");
      setShowToast(true);
    }
  };

  type inputType = "cvc" | "expiry" | "name" | "number" | "country";

  const handleInputChange = (e: any, input: inputType) => {
    let value = e as string;
    console.log(value);
    console.log(input);
    setFocus(input);
    if (input === "cvc") {
      let cvc_validation = CVCValidator(value);
      setCvcError(cvc_validation.error_present);
      setCvcErrorText(cvc_validation.error_text);
      if (cvc_validation.update) {
        setCvc(value);
      }
    } else if (input === "expiry") {
      let expiry_validation = ExpiryValidator(value);
      setExpiryError(expiry_validation.error_present);
      setExpiryErrorText(expiry_validation.error_text);
      if (expiry_validation.update) {
        setExpiry(value);
      }
    } else if (input === "name") {
      let name_validation = NameValidator(value);
      setNameError(name_validation.error_present);
      setNameErrorText(name_validation.error_text);
      if (name_validation.update) {
        setName(value);
      }
    } else if (input === "number") {
      let number_validation = NumberValidator(value);
      setNumberError(number_validation.error_present);
      setNumberErrorText(number_validation.error_text);
      if (number_validation.update) {
        setNumber(value);
      }
    } else if (input === "country") {
      if (value === "") {
        setCountryError(true);
      } else {
        setCountryError(false);
      }
      setSelectedCountry(value);
    }
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
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Box mt={2}>
          <Cards
            cvc={cvc}
            expiry={expiry}
            focused={focus as Focused}
            name={name}
            number={number}
          />
        </Box>
        <Box mt={2} justifyContent="center">
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Box mr={1}>
              <BasicTextField
                label="number"
                value={number}
                helperText={numberErrorText}
                error={numberError}
                onChange={(e) => handleInputChange(e, "number")}
              />
            </Box>
            <Box ml={1}>
              <BasicTextField
                label="name"
                value={name}
                error={nameError}
                helperText={nameErrorText}
                onChange={(e) => handleInputChange(e, "name")}
              />
            </Box>
          </Box>
        </Box>

        <Box mt={2} justifyContent="center">
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Box mr={1}>
              <BasicTextField
                label="expiry"
                value={expiry}
                helperText={expiryErrorText}
                error={expiryError}
                onChange={(e) => handleInputChange(e, "expiry")}
              />
            </Box>
            <Box ml={1}>
              <BasicTextField
                label="cvc"
                value={cvc}
                helperText={cvcErrorText}
                error={cvcError}
                onChange={(e) => handleInputChange(e, "cvc")}
              />
            </Box>
          </Box>
          <Box mt={2} justifyContent="center">
            <BasicSelect
              label="country"
              list={countries}
              onSelect={onSelect}
              selectedValue={selectedCountry}
              error={countryError}
            />
          </Box>
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

        <Box
          mt={2}
          sx={{
            width: 300,
            height: 30,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <CustomButton label="save card" handleClick={handleSaveCard} />
        </Box>
      </Box>
    </>
  );
};

export default CreditCard;
