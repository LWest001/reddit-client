import { Link, useRouteError } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setStatus } from "./ThreadList/threadListSlice";
import {
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";
import errorLogo from "/errorLogo.svg";
import theme from "../assets/theme";

const ErrorPage = () => {
  let error = useRouteError();
  console.log(error);
  const dispatch = useDispatch();
  return (
    <Card
      className="ErrorPage"
      sx={{ background: theme.palette.headerGradient.default }}
    >
      <CardContent>
        <Stack direction="row" sx={{ alignItems: "center", gap: 1, m: 2 }}>
          <img src={errorLogo} width="100px" />
          <Typography className="errorText" fontSize="2rem" textAlign="start">
            Oops! We have encountered an error.
          </Typography>
        </Stack>
      </CardContent>
      <Button
      variant="contained"
        component={Link}
        to="/"
        onClick={() => dispatch(setStatus("idle"))}
      >Return home</Button>
    </Card>
  );
};
export default ErrorPage;
