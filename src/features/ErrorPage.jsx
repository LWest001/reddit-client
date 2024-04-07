import { Link, useRouteError } from "react-router-dom";
import { Button, Card, CardContent, Stack, Typography } from "@mui/material";
import errorLogo from "/errorLogo.svg";
import theme from "../assets/theme";

const ErrorPage = () => {
  let error = useRouteError();
  console.log(error);
  return (
    <Card
      className="ErrorPage"
      sx={{ background: theme.palette.headerGradient.default }}
    >
      <CardContent
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Stack direction="row" sx={{ alignItems: "center", gap: 2, m: 2 }}>
          <img src={errorLogo} width="100px" />
          <Typography className="errorText" fontSize="1.5rem" textAlign="start">
            Oops! We have encountered an error.
          </Typography>
        </Stack>
        <Button
          variant="contained"
          component={Link}
          to="/"
          sx={{ width: "fit-content" }}
        >
          Return home
        </Button>
      </CardContent>
    </Card>
  );
};
export default ErrorPage;
