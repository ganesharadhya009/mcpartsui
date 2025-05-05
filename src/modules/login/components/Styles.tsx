import { List, ListItem, ListItemIcon, styled } from "@mui/material";

export const StyledList = styled(List)({
  display: "flex",
  flexWrap: "wrap",
  gap: "0px",
});

export const StyledListItem = styled(ListItem)({
  display: "flex",
  gap:"10px",
  width: "50%",
  fontSize: "14px",
  lineHeight: "21px",
  height: "2%",
});

export const StyledListItemtwo = styled(ListItem)({
  display: "list-item",
  width: "50%",
  fontWeight: 400,
  marginLeft: "20px",
  fontSize: "14px",
  lineHeight: "21px",
});

export const StyledListIcon = styled(ListItemIcon)({
  minWidth: "0px",
  display: "flex",
  alignItems: "center",
  color:"#00AB82"
});

