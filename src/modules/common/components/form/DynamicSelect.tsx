import { forwardRef, useState } from "react";
import {
  Select,
  MenuItem,
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  SelectChangeEvent,
  FormControl,
  InputLabel,
} from "@mui/material";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

export interface DynamicSelectPropType {
  label: string;
  id: string;
  options: string[];
  value: string;
  error: FieldError;
}

type PropsType = DynamicSelectPropType & UseFormRegisterReturn;

const DynamicSelect = forwardRef<HTMLInputElement, PropsType>(
  ({ label, id, options: items, error, ...registerProps }, ref) => {
    const [options, setOptions] = useState<string[]>(items);
    const [selectedOption, setSelectedOption] = useState<string>("");
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const [newOption, setNewOption] = useState<string>("");

    const handleSelectChange = (event: SelectChangeEvent<string>) => {
      const value = event.target.value;
      if (value === "add-new") {
        setIsDialogOpen(true);
      } else {
        setSelectedOption(value);
        registerProps.onChange(event);
      }
    };

    const handleAddNewOption = () => {
      if (newOption.trim()) {
        setOptions((prevOptions) => [...prevOptions, newOption.trim()]);
        setSelectedOption(newOption.trim());
        registerProps.onChange({
          target: { name: registerProps.name, value: newOption.trim() },
        });
        setNewOption("");
        setIsDialogOpen(false);
      }
    };

    return (
      <>
        <FormControl variant="outlined" fullWidth>
          <InputLabel id={id}>{label}</InputLabel>
          <Select
            ref={ref}
            id={id}
            name={registerProps.name}
            value={selectedOption}
            onChange={handleSelectChange}
            onBlur={registerProps.onBlur}
            fullWidth
            label={label}
            labelId={id}
            variant="outlined"
            error={error ? true : false}
          >
            {options.length > 0 && options?.map((option, index) => (
              <MenuItem key={index} value={option}>
                {option}
              </MenuItem>
            ))}
            <MenuItem
              value="add-new"
              style={{ fontWeight: "bold", color: "blue" }}
            >
              + Add New Option
            </MenuItem>
          </Select>
        </FormControl>

        {/* Dialog to add new option */}
        <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
          <DialogTitle>Add New {label}</DialogTitle>
          <DialogContent>
            <TextField
              margin="dense"
              label={`New ${label}`}
              fullWidth
              value={newOption}
              onChange={(e) => setNewOption(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleAddNewOption} variant="contained">
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
);

export default DynamicSelect;
