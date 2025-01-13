import React from "react";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { FormGroup } from "@mui/material";
import dayjs from "dayjs";

interface DateInputFieldType {
  name: string;
  id: string;
  onChange: (_date: dayjs.Dayjs | null) => void;
  value: dayjs.Dayjs;
  error?: boolean;
  helperText?: string;
  className?: string;
  disabled?: boolean;
  onBlur?: (
    _event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

const YearPicker = (props: DateInputFieldType) => {
  const {
    name,
    id,
    onChange,
    value,
    error,
    helperText,
    className,
    disabled,
    onBlur,
  } = props;

  const minDate = dayjs("1700-01-01");
  const maxDate = dayjs().endOf("year");

  return (
    <FormGroup className='input-each'>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DesktopDatePicker
          views={["year"]}
          disabled={disabled}
          minDate={minDate}
          maxDate={maxDate}
          onChange={onChange}
          value={value}
          className={`${className} input-field`}
          format='YYYY' // Display only the year
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
              placeholder: "Year", // Add placeholder
            },
          }}
        />
      </LocalizationProvider>
    </FormGroup>
  );
};

export default YearPicker;
