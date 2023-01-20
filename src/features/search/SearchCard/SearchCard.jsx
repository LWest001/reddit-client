import "./SearchCard.css";
import { useState } from "react";
import defaultThumb from "../../../assets/defaultThumb.png";
import selfThumb from "../../../assets/selfThumb.png";
import nsfwThumb from "../../../assets/nsfwThumb.png";
import axios from "axios";
import { useEffect } from "react";

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

  if (thumbnail === "default" || thumbnail === "spoiler") {
    thumbnail = defaultThumb;
  }
  if (thumbnail === "self") {
    thumbnail = selfThumb;
  }
  if (thumbnail === "nsfw") {
    thumbnail = nsfwThumb;
  }

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
          <p className="SearchCardHeaderText">
            <span className="subredditName">r/{subredditName}</span> ▪️
            <span className="author">u/{author}</span> ▪️
            <span className="timestamp">{timestamp}</span>
          </p>
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
          <span className="commentCount">🗨️{commentCount}</span> ▪️
          <span>👍{score}</span>
        </p>
      </div>
      {thumbnail && (
        <figure className="thumbnailContainer">

        <img
          className="thumbnail"
          src={thumbnail}
          alt={`Thumbnail for thread: ${threadTitle}`}
        />
        </figure>
      )}
    </div>
  );
};

export default SearchCard;
