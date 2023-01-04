import { useDispatch } from "react-redux";
import { sortType } from "../features/homepage/homepageSlice";
import { useNavigate } from "react-router-dom";

const SortSelector = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = ({ target }) => {
    dispatch(sortType(target.value));
    navigate(target.value);
  };
  return (
    <select
      className="SortSelector"
      name="SortSelector"
      onChange={handleChange}
    >
      <option value="best">👍Best</option>
      <option value="hot">🔥Hot</option>
      <option value="new">✨New</option>
      <option value="top">⬆️Top</option>
      <option value="rising">⤴️Rising</option>
    </select>
  );
};

export default SortSelector;
