import { useDispatch, useSelector } from "react-redux";
import { increment, selectCount } from "./counterSlice";

export const Counter = () => {
  const dispatch = useDispatch();
  return (
    <button onClick={() => dispatch(increment())}>
      count is {useSelector(selectCount)}
    </button>
  );
};
