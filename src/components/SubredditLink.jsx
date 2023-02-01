import { Link } from "react-router-dom";

function SubredditLink({ subredditName, display }) {
  return (
    <Link
      to={`/r/${subredditName}`}
      onClick={() => dispatch(setStatus("idle"))}
    >
      {display}
    </Link>
  );
}

export default SubredditLink;
