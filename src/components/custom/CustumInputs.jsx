import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { memo, useState } from "react";

export const CustomInput = ({ ...props }) => {
  return <TextField id="outlined-basic" variant="outlined" {...props} />;
};

export const CustomInputPsw = ({ ...props }) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <TextField
      type={showPassword ? "text" : "password"}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              edge="end"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
      {...props}
    />
  );
};
