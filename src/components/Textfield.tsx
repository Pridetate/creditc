import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

type inputType = "cvc" | "expiry" | "name" | "number";
interface BasicTextFieldProps {
  label: inputType;
  onChange: (id: string, inputType: inputType) => void;
  value: string;
  helperText?: string;
  error?: boolean;
}

const BasicTextField: React.FC<BasicTextFieldProps> = ({
  label,
  value,
  onChange,
  helperText,
  error,
}: BasicTextFieldProps) => {
  return (
    <Box>
      <TextField
        id="outlined-basic"
        label={label}
        variant="outlined"
        value={value}
        error={error}
        helperText={helperText}
        onChange={(e) => onChange(e.target.value as string, label)}
      />
    </Box>
  );
};

export default BasicTextField;
