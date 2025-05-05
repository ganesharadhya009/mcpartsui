const typeConstants = {
  buttonVariants: ["text", "outlined", "contained"] as const,
  buttonColors: [
    "info",
    "primary",
    "error",
    "inherit",
    "secondary",
    "success",
    "warning",
  ] as const,
  alignItems: ["center"] as const,
  errorConsoles: ["error"] as const,
  spinnerThemes: ["dark", "light"] as const,
  spinnerVariants: ["determinate", "indeterminate"] as const,
  spinnerPositions: ["relative", "absolute"] as const,
  toastPositions: ["bottom-right"] as const,
  iconButtonEdgeTypes: [false, "start", "end", undefined] as const,
  inputAdornmentPositions: ["start", "end"] as const,
};

export default typeConstants;
