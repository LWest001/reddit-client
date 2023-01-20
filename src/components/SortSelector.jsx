import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSortType } from "./sortSelectorSlice";
import { useParams } from "react-router-dom";
import { setStatus } from "../features/homepage/homepageSlice";

const SortSelector = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { sortType } = useParams();

  const handleChange = ({ target }) => {
    dispatch(setSortType(target.value));
    dispatch(setStatus("idle"));
    navigate(target.value);
  };
  return (
    <select
      className="SortSelector"
      name="SortSelector"
      onChange={handleChange}
      value={sortType}
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
