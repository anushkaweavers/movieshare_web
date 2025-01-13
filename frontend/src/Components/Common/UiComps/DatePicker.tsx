import React from "react";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { FormGroup, InputLabel } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";

interface DateInputFieldType {
  label?: string;
  name: string;
  id: string;
  onChange: (_date: dayjs.Dayjs | null) => void;
  value: dayjs.Dayjs;
  error?: boolean;
  helperText?: string;
  required?: boolean;
  className?: string;
  minDate?: Dayjs;
  maxDate?: Dayjs;
  disabled?: boolean;
  onBlur?: (
    _event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

const Datepicker = (props: DateInputFieldType) => {
  const {
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
  } = props;
  return (
    <FormGroup className='input-each'>
      <InputLabel required={required} className='input-label'>
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
          format='MM / DD / YYYY'
          slotProps={{
            textField: {
              // @ts-ignore
              readOnly: true,
              helperText,
              error,
              fullWidth: true,
              name,
              id,
              onBlur,
            },
          }}
        />
      </LocalizationProvider>
    </FormGroup>
  );
};

export default Datepicker;
