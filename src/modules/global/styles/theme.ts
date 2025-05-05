import {
  createTheme,
  outlinedInputClasses,
  selectClasses,
} from "@mui/material";

declare module "@mui/material/styles" {
  interface Palette {
    green1: {
      main: string;
    };
    iconColor?: {
      main: string;
    };
  }
  interface PaletteOptions {
    green1?: {
      main: string;
    };
    iconColor?: {
      main: string;
    };
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    "outlined-green": true;
  }
  interface ButtonPropsVariantOverrides {
    "contained-green": true;
  }

  interface ButtonPropsColorOverrides {
    green1: true;
    iconColor: true;
  }
}

declare module "@mui/material/IconButton" {
  interface IconButtonPropsColorOverrides {
    green1: true;
    iconColor: true;
  }
}

declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    mobile: true;
  }
  interface TypographyVariants {
    body3: React.CSSProperties;
    body4: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    body3?: React.CSSProperties;
    body4?: React.CSSProperties;
  }
}

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    body3: true;
    body4: true;
  }
}

const { palette } = createTheme();
const { augmentColor } = palette;
const createColor = (mainColor: string) =>
  augmentColor({ color: { main: mainColor } });

// Create a theme instance.
export const theme = createTheme({
  palette: {
    primary: {
      main: "#397F7B",
    },
    secondary: {
      main: "#344054",
    },
    background: {
      default: "#FFFFFF",
    },
    text: {
      primary: "#344054",
      secondary: "#667085",
      disabled: "#667085",
    },
    green1: createColor("#397F7B"),
    error: {
      main: "#d33c52",
    },
    info: {
      main: "#6D7476",
    },
    iconColor: {
      main: "#98A2B3",
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1080,
      xl: 1536,
      mobile: 900,
    },
  },
  typography: {
    fontFamily: ["Inter"].join(","),
    h1: {
      fontSize: "24px",
      "@media (max-width:1080px)": {
        fontSize: "22px",
      },
      "@media (max-height:600px)": {
        fontSize: "22px",
      },
      fontWeight: 600,
      lineHeight: "36px",
    },
    h2: {
      fontSize: "20px",
      fontWeight: 600,
      lineHeight: "27px",
    },
    h3: {
      fontSize: "18px",
      fontWeight: "500",
      lineHeight: "27px",
    },
    body1: {
      fontSize: "16px",
      "@media (max-width:1080px)": {
        fontSize: "14px",
      },
      "@media (max-height:600px)": {
        fontSize: "14px",
      },
      fontWeight: 400,
      lineHeight: "24px",
    },
    body2: {
      fontSize: "14px",
      "@media (max-width:1080px)": {
        fontSize: "12px",
      },
      "@media (max-height:600px)": {
        fontSize: "12px",
      },
      fontWeight: 400,
      lineHeight: "21px",
      type: {
        semibold: {
          fontSize: "14px",
          fontWeight: 500,
          lineHeight: "21px",
        },
      },
    },
    body3: {
      fontFamily: "Inter",
      fontSize: "14px",
      fontWeight: 700,
      lineHeight: "21px",
    },
    body4: {
      fontFamily: "Inter",
      fontSize: "12px",
      fontWeight: 400,
      lineHeight: "18px",
    },
    button: {
      textTransform: "unset",
      fontSize: "18px",
      fontWeight: 600,
      lineHeight: "27px",
      fontFamily: ["Inter"].join(","),
    },
    h5: {
      fontFamily: "Inter",
      fontSize: "18px",
      fontWeight: "600",
      lineWeight: "22px",
      textAlign: "left",
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "--TextField-brandBorderFocusedColor": "#91959D",
          "& label.Mui-focused": {
            color: "var(--TextField-brandBorderFocusedColor)",
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
            borderColor: "var(--TextField-brandBorderHoverColor)",
          },
          [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
            borderColor: "var(--TextField-brandBorderFocusedColor)",
          },
          [`&.Mui-error .${outlinedInputClasses.notchedOutline}`]: {
            borderColor: "#d33c52",
          },
        },
      },
    },

    MuiSelect: {
      styleOverrides: {
        root: {
          "--TextField-brandBorderFocusedColor": "#91959D",
          "& label.Mui-focused": {
            color: "var(--TextField-brandBorderFocusedColor)",
          },
          [`&:hover .${selectClasses.multiple}`]: {
            borderColor: "var(--TextField-brandBorderHoverColor)",
          },
          [`&.Mui-focused .${selectClasses.multiple}`]: {
            borderColor: "var(--TextField-brandBorderFocusedColor)",
          },
          [`&.Mui-error .${selectClasses.multiple}`]: {
            borderColor: "#d33c52",
          },
          [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
            borderColor: "var(--TextField-brandBorderFocusedColor)",
          },
          [`&.Mui-error .${outlinedInputClasses.notchedOutline}`]: {
            borderColor: "#d33c52",
          },
        },
      },
    },

    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: "#667085",
          zIndex: 1201,
        },
      },
    },
    MuiList: {
      styleOverrides: {
        root: {
          gap: "4px",
          zIndex: 1201,
          opacity: 1,
          paddingTop: "0px",
          paddingBottom: "0px",
        },
      },
    },

    MuiButton: {
      variants: [
        {
          props: { variant: "outlined-green" },
          style: {
            minWidth: "96px",
            minHeight: "40px",
            padding: "0px 16px 0px 16px",
            gap: "8px",
            borderRadius: "8px",
            border: "2px solid #397F7B",
            fontFamily: " Inter",
            fontSize: "14px",
            fontWeight: 600,
            lineHeight: "21px",
            textAlign: "left",
            color: "#167A5F",
          },
        },
        {
          props: { variant: "contained-green" },
          style: {
            minWidth: "96px",
            minHeight: "40px",
            padding: "0px 16px 0px 16px",
            gap: "8px",
            borderRadius: "8px",
            background: "#397F7B",
            fontFamily: " Inter",
            fontSize: "14px",
            fontWeight: 600,
            lineHeight: "21px",
            textAlign: "left",
            color: "#FFFFFF",
          },
        },
      ],
    },
  },
});
