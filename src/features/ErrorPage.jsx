import { Link, useRouteError } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setStatus } from "./threadList/threadListSlice";

const ErrorPage = () => {
  let error = useRouteError();
  console.log(error);
  const dispatch = useDispatch();
  return (
    <div className="ErrorPage">
      <h2 className="errorText">Oops! We have encountered an error.</h2>
      <br />
      <Link to="/" onClick={() => dispatch(setStatus("idle"))}>
        Return home.
      </Link>
    </div>
  );
};
export default ErrorPage;
