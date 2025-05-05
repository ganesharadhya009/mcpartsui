import CircularProgress, {
  CircularProgressProps,
} from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import StyleConstant from "../../global/constants/styleConstants";
import {
  SpinnerPosition,
  SpinnerTheme,
  SpinnerVariant,
} from "../../global/types/globalTypes";

/**
 * Loading spinner component for rendering while loading.
 * @param props returns circular progress props which are basic loading spinner properties.
 * @returns loading spinner component
 */

interface SpinnerProps {
  innerSpinnerColor?: string;
  size?: number | string;
  thickness?: number;
  innerSpinnerValue?: number;
  outerSpinnerColor?: string;
  isDualSpinner?: boolean;
  animateDuration?: string;
  props?: CircularProgressProps;
}

const LoadingSpinner = ({
  props,
  size = StyleConstant.SPINNER_SIZE,
  thickness = StyleConstant.SPINNER_THICKNESS,
  isDualSpinner = StyleConstant.DUAL_SPINNER,
  animateDuration = StyleConstant.SPINNNER_ANIMATION_TIME,
}: SpinnerProps) => {
  return (
    <Box
      sx={{
        position: StyleConstant.SPINNER_RELATIVE as SpinnerPosition,
        display: StyleConstant.LOADER_SPINNER_DISPLAY,
        alignItems: StyleConstant.LOADER_SPINNER_POSITION,
        justifyContent: StyleConstant.LOADER_SPINNER_POSITION,
      }}
    >
      {isDualSpinner && (
        <CircularProgress
          variant={StyleConstant.SPINNER_DETERMINATE as SpinnerVariant}
          sx={(theme) => ({
            color: StyleConstant.INNER_SPINNER_COLOR,
            ...theme.applyStyles(
              StyleConstant.SPINNER_DARK as SpinnerTheme,
              {}
            ),
          })}
          size={size}
          thickness={thickness}
          {...props}
          value={StyleConstant.SPINNER_VALUE}
        />
      )}
      <CircularProgress
        variant={StyleConstant.SPINNER_INDETERMINATE as SpinnerVariant}
        disableShrink
        sx={(theme) => ({
          color: StyleConstant.OUTER_SPINNER_COLOR,
          animationDuration: animateDuration,
          position: StyleConstant.SPINNER_ABSOLUTE as SpinnerPosition,
          left: StyleConstant.SPINNER_LEFT,
          ...theme.applyStyles(StyleConstant.SPINNER_DARK as SpinnerTheme, {}),
        })}
        size={size}
        thickness={thickness}
        {...props}
      />
    </Box>
  );
};

export default LoadingSpinner;
