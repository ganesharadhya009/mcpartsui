import globalConstant from "../../../global/constants/globalConstants";
import { IconButton, InputAdornment } from "@mui/material";
import styleConstant from "../../../global/constants/styleConstants";
import {
  IconButtonEdgeType,
  InputAdnormentPositionType,
} from "../../../global/types/globalTypes";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
interface ShowHidePasswordPropsType {
  type: string | undefined;
  handleClickShowPassword: () => void;
  showPassword: boolean;
}

const ShowHidePassword = ({
  type,
  handleClickShowPassword,
  showPassword,
}: ShowHidePasswordPropsType) => {
  return type === globalConstant.PASSWORD_TYPE ? (
    <InputAdornment
      position={
        styleConstant.ADORNMENT_POSITION_END as InputAdnormentPositionType
      }
    >
      <IconButton
        aria-label={globalConstant.TOGGLE_EVENT_PASSWORD_VISIBILITY_TEXT}
        onClick={handleClickShowPassword}
        onMouseDown={(event) => {
          event.preventDefault();
        }}
        onMouseUp={(event) => {
          event.preventDefault();
        }}
        edge={styleConstant.ADORNMENT_POSITION_END as IconButtonEdgeType}
      >
        {showPassword ? (
          <VisibilityOutlinedIcon />
        ) : (
          <VisibilityOffOutlinedIcon />
        )}
      </IconButton>
    </InputAdornment>
  ) : null;
};

export default ShowHidePassword;
