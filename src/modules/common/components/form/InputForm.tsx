import { InputAdornment, TextField, TextFieldVariants } from "@mui/material";
import * as React from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import globalConstant from "../../../global/constants/globalConstants";
import ShowHidePassword from "./ShowHidePassword";
import styleConstant from "../../../global/constants/styleConstants";
import { InputAdnormentPositionType } from "../../../global/types/globalTypes";
import useShowHidePassword from "../../hooks/useShowHidePassword";

/**
 * InputForm Component
 *
 * A reusable input field component that integrates with Material-UI and React Hook Form.
 * Supports various input types, including text and password fields, with optional features
 * like prefix text, error handling, and visibility toggle for passwords.
 *
 * @component
 *
 * @param {Object} props - The props for the InputForm component.
 * @param {string} props.label - The label displayed above the input field.
 * @param {string} props.id - The unique identifier for the input field.
 * @param {string} [props.type] - The type of input (e.g., "text", "password"). Defaults to "text".
 * @param {FieldError} [props.error] - Error object for displaying validation errors.
 * @param {string} [props.placeholder] - Placeholder text for the input field. Defaults to a global constant.
 * @param {string|number} [props.defaultValue] - The default value for the input field.
 * @param {string|number} [props.value] - The controlled value of the input field.
 * @param {boolean} [props.disabled] - Disables the input field if true.
 * @param {boolean} [props.prefix] - Indicates if a prefix text should be shown.
 * @param {string} [props.prefixText] - The text to display as a prefix to the input field.
 * @param {boolean} [props.required] - Indicates if the field is required.
 * @param {boolean} [props.applyNumberValidation] - Optional prop for applying number validation.
 * @param {boolean} [props.password] - Indicates if the input type is password. Toggles visibility.
 * @param {UseFormRegisterReturn} registerProps - Props returned from useForm for registration with React Hook Form.
 *
 * @returns {JSX.Element} The rendered InputForm component.
 *
 * @example
 * <InputForm
 *   label="Username"
 *   id="username"
 *   placeholder="Enter your username"
 *   required={true}
 *   {...register("username")}
 * />
 *
 * @example
 * <InputForm
 *   label="Password"
 *   id="password"
 *   type="password"
 *   password={true}
 *   error={errors.password}
 *   {...register("password")}
 * />
 */

interface InputProps {
  label: string;
  id: string;
  type?: string;
  error?: FieldError;
  placeholder?: string;
  defaultValue?: string | number | undefined;
  value?: string | number | undefined;
  disabled?: boolean;
  prefix?: boolean;
  prefixText?: string | React.ReactNode;
  required?: boolean;
  applyNumberValidation?: boolean;
  password?: boolean;
  onInput?: React.FormEventHandler<HTMLDivElement>;
  customOnchange?: React.ChangeEventHandler;
  onkeydown?: React.KeyboardEventHandler;
}

type InputFormProps = InputProps & UseFormRegisterReturn;

export const InputForm = React.forwardRef<HTMLInputElement, InputFormProps>(
  (props, ref) => {
    const {
      prefix,
      prefixText,
      label,
      id,
      error,
      defaultValue,
      type,
      disabled,
      placeholder = globalConstant.PLACEHOLDER_DEFAULT,
      required,
      password = false,
      onInput,
      customOnchange,
      onkeydown,
      ...registerProps
    } = props;

    const { handleClickShowPassword, passwordVisible, showPassword } =
      useShowHidePassword();

    return (
      <TextField
        ref={ref}
        fullWidth
        variant={globalConstant.TEXT_FIELD_VARIANT as TextFieldVariants}
        className={globalConstant.CLASS_NAME}
        autoComplete={globalConstant.AUTO_COMPLETE_OFF}
        label={label}
        id={id}
        type={password ? passwordVisible : type}
        defaultValue={defaultValue}
        disabled={disabled}
        placeholder={placeholder}
        error={!!error}
        helperText={error?.message}
        required={required}
        slotProps={{
          input: {
            inputProps: { min: 0 },
            startAdornment:
              prefix || prefixText ? (
                <InputAdornment
                  position={
                    styleConstant.ADORNMENT_POSITION_START as InputAdnormentPositionType
                  }
                >
                  {prefixText}
                </InputAdornment>
              ) : undefined,
            endAdornment: (
              <ShowHidePassword
                type={type}
                handleClickShowPassword={handleClickShowPassword}
                showPassword={showPassword}
              />
            ),
          },
        }}
        {...registerProps}
        onInput={onInput ? onInput : undefined}
        onChange={customOnchange ? customOnchange : registerProps.onChange}
        onKeyDown={onkeydown}
      />
    );
  }
);
