import "./SearchCard.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import getDefaultThumbnail from "../../functions/getDefaultThumbnail";
import { setStatus as setThreadStatus } from "../Thread/threadSlice";
import SubredditLink from "../../components/SubredditLink";
import upvote from "../../assets/upvote.svg";
import commentBubble from "../../assets/commentBubble.svg";

const SearchCard = ({
  id,
  subredditName,
  author,
  timestamp,
  threadTitle,
  score,
  link,
  threadType,
  thumbnail,
  commentCount,
}) => {
  const [icon, setIcon] = useState("");
  const dispatch = useDispatch();

  thumbnail = getDefaultThumbnail(thumbnail);

  useEffect(() => {
    async function getIcon(subredditName) {
      const URL = `https://www.reddit.com/r/${subredditName}/about.json`;
      const response = await axios.get(URL);
      setIcon(response.data.data.icon_img);
    }
    getIcon(subredditName);
  }, [window.URL]);

  return (
    <div className="SearchCard" id={id}>
      <div className="searchCardBody">
        <div className="searchCardHeader">
          {icon ? (
            <img src={icon} alt="Subreddit avatar" className="subredditIcon" />
          ) : (
            <div className="subredditIcon">r/</div>
          )}
          <div className="subredditAndAuthor">
            <span className="subredditName">
              <SubredditLink
                subredditName={subredditName}
                display={`r/${subredditName}`}
              />
            </span>
            <span className="author">u/{author}</span>
          </div>
          <span className="timestamp">{timestamp}</span>
        </div>
        <div className="threadPreview">
          <span className="threadType">{threadType}</span>
          <Link
            to={`/${link.substring(19)}`}
            onClick={() => {
              dispatch(setThreadStatus("idle"));
            }}
          >
            {<h2 className="threadTitle">{threadTitle}</h2>}
          </Link>
        </div>
        <p className="searchCardFooter">
          <span className="viewComments">
            <img src={commentBubble} alt="comment bubble" className="icon" />
            {commentCount}
          </span>
          &nbsp;&nbsp;&nbsp;&nbsp;▪️&nbsp;&nbsp;&nbsp;&nbsp;
          <span>
            <img className="upArrow icon" src={upvote} alt="" />
            {score}
          </span>
        </p>
      </div>
      {thumbnail && (
        <Link
          to={`/${link.substring(19)}`}
          onClick={() => {
            dispatch(setThreadStatus("idle"));
            dispatch(setPermalink(link));
          }}
        >
          <figure className="thumbnailContainer">
            <img
              className="thumbnail"
              src={thumbnail}
              alt={`Thumbnail for thread: ${threadTitle}`}
            />
          </figure>
        </Link>
      )}
    </div>
  );
};

export default SearchCard;
