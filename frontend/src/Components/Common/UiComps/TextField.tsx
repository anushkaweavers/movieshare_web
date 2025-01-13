import {
  FormGroup,
  IconButton,
  InputAdornment,
  InputLabel,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

interface ITextField {
  mainClassname?: string;
  labelClass?: string;
  lable: string;
  id?: string;
  placeholder: string;
  name: string;
  onChange?: (_event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (
    _event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onClick?: () => void;
  error?: boolean;
  helperText?: string;
  required?: boolean;
  multiline?: boolean;
  rows?: number;
  variant?: "filled" | "outlined" | "standard";
  disabled?: boolean;
  autoFocus?: boolean;
  autoComplete?: string;
  type?: string;
}

const TextFieldInput = (props: ITextField) => {
  const {
    mainClassname,
    labelClass,
    lable,
    id,
    placeholder,
    onChange,
    onBlur,
    onClick,
    error,
    helperText,
    required,
    multiline,
    rows,
    variant,
    disabled,
    autoFocus,
    autoComplete,
    name,
    type,
  } = props;

  const [showPassword, setShowPassword] = useState(false);

  return (
    <FormGroup className={`${mainClassname} input-each`}>
      <InputLabel required className={`${labelClass} input-label`}>
        {lable}
      </InputLabel>
      <TextField
        type={type === "password" ? (showPassword ? "text" : "password") : type}
        className='input-field'
        id={id}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        onClick={onClick}
        error={error}
        helperText={helperText}
        required={required}
        multiline={multiline}
        rows={rows}
        variant={variant || "outlined"}
        disabled={disabled}
        autoFocus={autoFocus}
        autoComplete={autoComplete}
        name={name}
        slotProps={{
          input: {
            endAdornment:
              type === "password" ? (
                <InputAdornment position='end'>
                  <IconButton
                    aria-label='toggle password visibility'
                    onClick={() => {
                      setShowPassword(!showPassword);
                    }}
                    // onMouseDown={handleMouseDownPassword}
                    edge='end'
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ) : null,
          },
        }}
      />
    </FormGroup>
  );
};

export default TextFieldInput;
