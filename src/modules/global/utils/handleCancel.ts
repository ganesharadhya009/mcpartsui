import { NavigateFunction, To } from "react-router-dom";

export const handleNavigate = (
  navigate: NavigateFunction,
  path: string | number
) => {
  navigate(path as To);
};
