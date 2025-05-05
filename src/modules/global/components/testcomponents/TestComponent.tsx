import { useSelector } from "react-redux";
import { login, logout } from "../../redux/login/loginSlice";
import { RootState, useAppDispatch } from "../../redux/store";
import GlobalConstant from "../../constants/globalConstants";
import { ButtonColor, ButtonVariant } from "../../types/globalTypes";
import Button from "@mui/material/Button";
import { Stack, Typography } from "@mui/material";

/**
 * test component for persist
 * @returns tenantId and token of the user
 */

const TestComponent = () => {
  const { token } = useSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();


  const user = {
    token: GlobalConstant.TOKEN,
  };
  return (
    <Stack
      display="-webkit-flex"
      alignItems={GlobalConstant.CENTER}
      spacing={GlobalConstant.GAP}
    >
      <Button
        variant={GlobalConstant.CONTAINED as ButtonVariant}
        color={GlobalConstant.PRIMARY_COLOR as ButtonColor}
        onClick={() => {
          if (!token) {
            dispatch(login(user));
          } else {
            dispatch(logout());
          }
        }}
      >
        {token ? GlobalConstant.LOGOUT : "auth"}
      </Button>
      {!token ? (
        <Typography>{GlobalConstant.ENTER_LOGIN}</Typography>
      ) : (
        <Typography>
          {GlobalConstant.WELCOME} {GlobalConstant.PASSWORD} {token}
        </Typography>
      )}
    </Stack>
  );
};

export default TestComponent;
