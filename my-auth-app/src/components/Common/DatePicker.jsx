import React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { FormGroup, InputLabel } from "@mui/material";

const Datepicker = ({
  name,
  id,
  onChange,
  value,
  error,
  helperText,
  label,
  required,
  className,
  minDate,
  maxDate,
  disabled,
  onBlur,
}) => {
  return (
    <FormGroup className="input-each">
      <InputLabel required={required} className="input-label">
        {label}
      </InputLabel>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DesktopDatePicker
          disabled={disabled}
          minDate={minDate}
          maxDate={maxDate}
          onChange={onChange}
          value={value}
          className={`${className} input-field`}
          format="MM/DD/YYYY"
          textField={{
            helperText,
            error,
            fullWidth: true,
            name,
            id,
            onBlur,
          }}
        />
      </LocalizationProvider>
    </FormGroup>
  );
};

export default Datepicker;
