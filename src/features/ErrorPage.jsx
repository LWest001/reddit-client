import { Link, useRouteError } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setStatus } from "./ThreadList/threadListSlice";

const ErrorPage = () => {
  let error = useRouteError();
  console.log(error);
  const dispatch = useDispatch();
  return (
    <div className="ErrorPage">
      <p className="errorText">Oops! We have encountered an error.</p>
      <br />
      <Link to="/" onClick={() => dispatch(setStatus("idle"))}>
        <button>Return home</button>
      </Link>
    </div>
  );
};
export default ErrorPage;
