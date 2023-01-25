import { Link, useRouteError } from "react-router-dom";

const ErrorPage = () => {
  let error = useRouteError();
  console.log(error);
  return (
    <>
      Oops! We have encountered an error.
      <Link to="/">Return home.</Link>
    </>
  );
};
export default ErrorPage;
