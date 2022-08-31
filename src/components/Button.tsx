import { makeStyles } from "@mui/styles";
import { Button } from "@mui/material";
import React from "react";

const useStyles = makeStyles({
  menu_button: {
    width: 300,
    borderWidth: 1,
    borderColor: "rgba(21, 50, 95, 0.59)",
    borderStyle: "solid",
    marginBottom: 20,
    borderRadius: 5,
    textTransform: "lowercase",
    color: "#1976d2",
    "&:hover": {
      backgroundColor: "#eeeeee",
      borderColor: "#f6f6f6",
      boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.3)",
    },
  },
});
interface CustomButtonProps {
  label: string;
  handleClick: () => void;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  label,
  handleClick,
}: CustomButtonProps) => {
  const classes = useStyles();
  return (
    <div>
      <Button
        sx={{ textTransform: "none" }}
        className={classes.menu_button}
        onClick={handleClick}
      >
        {label.toLowerCase()}
      </Button>
    </div>
  );
};

export default CustomButton;
