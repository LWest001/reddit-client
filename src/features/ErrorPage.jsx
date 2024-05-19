import { Link, useRouteError } from "react-router-dom";
import {
  Button,
  ButtonGroup,
  Card,
  CardContent,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import errorLogo from "/errorLogo.svg";

const ErrorPage = (error) => {
  const theme = useTheme();
  let routeError = useRouteError();
  console.error(error || routeError);
  return (
    <Card
      className="ErrorPage"
      sx={{ background: theme?.palette?.headerGradient?.default }}
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
        <ButtonGroup>
          <Button variant="contained" component={Link} to={0}>
            reload page
          </Button>
          <Button component={Link} to={-1}>
            go Back
          </Button>
          <Button
            component={Link}
            to="/"
            // sx={{ width: "50%" }}
          >
            go Home
          </Button>
        </ButtonGroup>
      </CardContent>
    </Card>
  );
};
export default ErrorPage;
