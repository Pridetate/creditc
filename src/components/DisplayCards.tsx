import {
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";
import { Card } from "./CeditCard";

interface DisplayCardsProps {
  cardsList: Card[];
}
const DisplayCards: React.FC<DisplayCardsProps> = ({
  cardsList,
}: DisplayCardsProps) => {
  return (
    <Grid>
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
                  <span style={{ color: "#3f51b5" }}>card&nbsp;number</span>
                </TableCell>
                <TableCell>
                  <span style={{ color: "#3f51b5" }}>card&nbsp;name</span>
                </TableCell>
                <TableCell>
                  <span style={{ color: "#3f51b5" }}>expiry</span>
                </TableCell>
                <TableCell>
                  <span style={{ color: "#3f51b5" }}>CVC</span>
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {!!cardsList ? (
                cardsList.map((item, index) => {
                  return (
                    <TableRow>
                      <TableCell>
                        <span style={{ color: "#3f51b5" }}>{item.number}</span>
                      </TableCell>
                      <TableCell>
                        <span style={{ color: "#3f51b5" }}>{item.name}</span>
                      </TableCell>

                      <TableCell>
                        <span style={{ color: "#3f51b5" }}>
                          {item.expiry.substring(0, 2)}/{" "}
                          {item.expiry.substring(2, 4)}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span style={{ color: "#3f51b5" }}>{item.cvc}</span>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell>
                    <Typography color="#1976d2" align="center">
                      No cards added yet
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </Grid>
  );
};

export default DisplayCards;
