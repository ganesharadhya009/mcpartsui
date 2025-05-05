import {
  Checkbox,
  FormControl,
  InputLabel,
  InputLabelProps,
  ListItemText,
  MenuItem,
  Select,
  SelectProps,
} from "@mui/material";
import { forwardRef } from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

export interface SelectItems {
  label: string;
  value: string;
}

export interface SelectComponentType {
  label: string;
  id: string;
  name: string;
  items: SelectItems[] | [];
  value: string[] | number[] | string | number;
  error?: FieldError;
  multiple?: boolean;
  size?: InputLabelProps["size"] | SelectProps["size"];
}

export type SelectComponentPropType = SelectComponentType &
  UseFormRegisterReturn;

const SelectInput = forwardRef<HTMLInputElement, SelectComponentPropType>(
  (
    {
      size,
      label,
      id,
      items,
      value,
      error,
      multiple = false,
      ...registerProps
    },
    ref
  ) => {
    return (
      <>
        <FormControl variant="outlined" fullWidth>
          <InputLabel
            size={
              size
                ? (size as InputLabelProps["size"])
                : ("medium" as InputLabelProps["size"])
            }
            htmlFor={id}
            id={id}
          >
            {label}
          </InputLabel>
          <Select
            size={
              size
                ? (size as SelectProps["size"])
                : ("medium" as SelectProps["size"])
            }
            labelId={id}
            label={label}
            ref={ref}
            id={id}
            variant="outlined"
            value={value}
            {...registerProps}
            fullWidth
            multiple={multiple}
            error={error ? true : false}
            renderValue={(val) => {
              if (Array.isArray(val) && multiple) {
                return val
                  .map((item) => {
                    const selectedItem = items?.find(
                      (value) => item === value.value
                    );
                    return selectedItem?.label;
                  })
                  .filter(Boolean)
                  .join(", ");
              }
              if (!multiple)
                return items?.find((value) => value.value === val)?.label;
            }}
          >
            {items?.length > 0 &&
              items?.map((val) => (
                <MenuItem key={val.value} value={val.value}>
                  {multiple && (
                    <Checkbox
                      checked={
                        (value as string[] | number[])?.find(
                          (o) => o === val.value
                        )
                          ? true
                          : false
                      }
                    />
                  )}
                  <ListItemText>{val.label}</ListItemText>
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </>
    );
  }
);

export default SelectInput;
