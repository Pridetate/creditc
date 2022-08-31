import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

interface BasicSelectProps {
  label: string;
  onSelect: (id: string) => void;
  list: string[];
  selectedValue: string;
  error?: boolean;
  helperText?: string;
}
const BasicSelect: React.FC<BasicSelectProps> = ({
  label,
  onSelect,
  list,
  selectedValue = "",
  error,
  helperText,
}: BasicSelectProps) => {
  const handleChange = (event: SelectChangeEvent) => {
    onSelect(event.target.value as string);
  };

  return (
    <Box sx={{ width: 300, justifyContent: "center" }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedValue}
          label={label}
          onChange={handleChange}
          error={error}
        >
          {!!list.length &&
            list.map((item, index) => {
              return (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              );
            })}
        </Select>
      </FormControl>
    </Box>
  );
};

export default BasicSelect;
