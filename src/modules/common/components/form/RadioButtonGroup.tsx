import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { StyledFormLabel } from "../../styles/styles";
import * as React from "react";

type RadioItems = {
  label: string;
  value: string | number;
};

type RadioButtonGroupType = {
  label: string;
  id: string;
  name: string;
  items: RadioItems[];
};

const RadioButtonGroup = React.forwardRef<
  HTMLInputElement,
  RadioButtonGroupType
>(({ label, id, items, ...registerProps }, ref) => {
  return (
    <>
      <FormControl id={id} {...registerProps}>
        <StyledFormLabel id={id}>{label}</StyledFormLabel>
        <RadioGroup
          defaultValue={items[0].value}
          id={id}
          {...registerProps}
          row
          aria-labelledby={id}
        >
          {items?.map((val) => (
            <FormControlLabel
              ref={ref}
              key={val.value}
              value={val.value}
              control={<Radio />}
              label={val.label}
              {...registerProps}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </>
  );
});

export default RadioButtonGroup;
