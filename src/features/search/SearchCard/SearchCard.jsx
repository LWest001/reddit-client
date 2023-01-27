import "./SearchCard.css";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { setStatus as setHomepageStatus } from "../../homepage/homepageSlice";
import { useDispatch } from "react-redux";
import getDefaultThumbnail from "../../../functions/getDefaultThumbnail";
import upvote from "../../../assets/upvote.svg";

const SearchCard = ({
  id,
  subredditName,
  author,
  timestamp,
  threadTitle,
  score,
  awards,
  gallery,
  image,
  link,
  richVideo,
  selfText,
  threadType,
  thumbnail,
  video,
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
          <div className="searchCardHeaderText">
            <span className="subredditName">
              <Link
                to={`/r/${subredditName}`}
                onClick={() => dispatch(setHomepageStatus("idle"))}
              >
                r/{subredditName}
              </Link>
            </span>
            <span className="author">u/{author}</span>
          </div>
          <span className="timestamp">{timestamp}</span>
        </div>
        <a href={link}>
          <div className="threadPreview">
            {
              <h2 className="threadTitle">
                <span className="threadType">{threadType}</span>
                {threadTitle}
              </h2>
            }
          </div>
        </a>
        <p className="searchCardFooter">
          <span className="commentCount">🗨️{commentCount}</span>
          &nbsp;&nbsp;&nbsp;&nbsp;▪️&nbsp;&nbsp;&nbsp;&nbsp;
          <span>
            <img className="upArrow" src={upvote} alt="" />
            {score}
          </span>
        </p>
      </div>
      {thumbnail && (
        <a href={link}>
          <figure className="thumbnailContainer">
            <img
              className="thumbnail"
              src={thumbnail}
              alt={`Thumbnail for thread: ${threadTitle}`}
            />
          </figure>
        </a>
      )}
    </div>
  );
};

export default SearchCard;
