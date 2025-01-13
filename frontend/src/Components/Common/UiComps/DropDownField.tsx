import {
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import React from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

interface IDropDownType {
  options: { value: string | number; title: string }[];
  title?: string;
  mainCls?: string;
  id: string;
  name: string;
  onChange: (_event: SelectChangeEvent<string>) => void;
  error?: boolean;
  onBlur?: (
    _event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  value?: string | number;
  clsDrop?: string;
  placeholder: string;
}
const DropDownField = (props: IDropDownType) => {
  const {
    options,
    title,
    mainCls,
    id,
    name,
    onChange,
    error,
    onBlur,
    value,
    clsDrop,
    placeholder,
  } = props;
  return (
    <FormGroup className='input-each'>
      {title && (
        <InputLabel
          id='demo-simple-select-label'
          className={`${mainCls} input-label`}
        >
          {title}
        </InputLabel>
      )}
      <Select
        className={`${clsDrop}`}
        id={id}
        name={name}
        onChange={onChange}
        error={error}
        onBlur={onBlur}
        value={`${value}`}
        IconComponent={KeyboardArrowDownIcon}
        displayEmpty
      >
        <MenuItem value='' className='select-placeholder'>
          {placeholder}
        </MenuItem>
        {options?.map((item) => {
          return <MenuItem value={item.value}>{item.title}</MenuItem>;
        })}
      </Select>
    </FormGroup>
  );
};

export default DropDownField;
