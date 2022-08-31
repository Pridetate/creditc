import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
interface BannedCountriesProps {
  blacklistedCountries: string[];
}
const BannedCountries: React.FC<BannedCountriesProps> = ({
  blacklistedCountries,
}: BannedCountriesProps) => {
  return (
    <Box sx={{ width: 300, justifyContent: "center" }}>
      <div
        style={{
          boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
          marginTop: 15,
          borderRadius: 15,
          overflow: "hidden",
          width: "100%",
        }}
      >
        <TableContainer component={Paper} style={{ maxHeight: 300 }}>
          <Table size="small" stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>
                  <span style={{ color: "#3f51b5" }}>
                    banned&nbsp;countries
                  </span>
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {!!blacklistedCountries ? (
                blacklistedCountries.map((country) => {
                  return (
                    <TableRow>
                      {" "}
                      <TableCell>{country}</TableCell>{" "}
                    </TableRow>
                  );
                })
              ) : (
                <Typography color="#1976d2">
                  No blacklisted country exist
                </Typography>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </Box>
  );
};

export default BannedCountries;
