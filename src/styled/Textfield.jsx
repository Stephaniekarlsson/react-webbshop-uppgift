import { TextField, styled } from "@mui/material";

export const StyledTextField = styled(TextField)(({ theme }) => ({
  backgroundColor: "#cec1e0",
  borderRadius: "10px",
  color:"#333333",

  ".MuiInputBase-root": {
    fontSize: "1rem",
    "& fieldset": {
      borderRadius: "10px",
      color: "#333333",
      border: `2px solid #cec1e0`,
      boxShadow: "0px 1px 4px #00000030",
      Margin: "0.5em",
    },
    "&:hover fieldset": {
      borderRadius: "10px",
      border: `2px solid #cec1e0`,
      boxShadow: "0px 1px 2px #00000030 inset",
      Margin: "0.5em",
    },
    "&.Mui-focused fieldset": {
      borderRadius: "10px",
      border: `2px solid #cec1e0`,
      Margin: "0.5em",
    },
  },
}));
