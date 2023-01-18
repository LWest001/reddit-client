import "./ThreadCard.css";
import { useState } from "react";
import defaultThumb from "../../assets/defaultThumb.png";
import selfThumb from "../../assets/selfThumb.png";
import nsfwThumb from "../../assets/nsfwThumb.png";
import axios from "axios";

const ThreadCard = ({
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
}) => {
  const [readMore, setReadMore] = useState("hide");
  const [icon, setIcon] = useState("");
  const handleReadMore = (e) => {
    const previewText = document.getElementById(`previewText${id}`);
    const fullText = document.getElementById(`fullText${id}`);
    const button = document.getElementById(`readMore${id}`);

    if (readMore === "hide") {
      previewText.style.display = "none";
      fullText.style.display = "block";
      button.textContent = "Hide full text";
      setReadMore("readMore");
    }
    if (readMore === "readMore") {
      previewText.style.display = "block";
      fullText.style.display = "none";
      button.textContent = "Read more";
      setReadMore("hide");
    }
  };

  if (thumbnail === "default") {
    thumbnail = defaultThumb;
  }
  if (thumbnail === "self") {
    thumbnail = selfThumb;
  }
  if (thumbnail === "nsfw") {
    thumbnail = nsfwThumb;
  }

  async function getIcon(subredditName) {
    const URL = `https://www.reddit.com/r/${subredditName}/about.json`;
    const response = await axios.get(URL);
    setIcon(response.data.data.icon_img);
  }
  getIcon(subredditName);

  return (
    <div className="ThreadCard" id={id}>
      <div className="threadCardHeader">
        {icon ? (
          <img src={icon} alt="Subreddit avatar" className="subredditIcon" />
        ) : (
          <div className="subredditIcon">r/</div>
        )}
        <p className="ThreadCardHeaderText">
          <span className="subredditName">r/{subredditName}</span>
          <span className="subtext">
            Posted by <span className="author">u/{author}</span> ▪️ {timestamp}
          </span>
        </p>
      </div>
      <div className="threadPreview">
        {!["link", "gallery", "self"].includes(threadType) && (
          <h2 className="threadTitle">{threadTitle}</h2>
        )}
        <div className="threadContentPreview">
          {image && (
            <div className="centered">
              <a href={image}>
                <img
                  src={image}
                  alt={`Image for thread: ${threadTitle}`}
                  className="previewImage"
                />
              </a>
            </div>
          )}
          {gallery && (
            <>
              <div className="galleryPreview">
                <a href={gallery} target="_blank">
                  <div className="galleryThumbnailBox">
                    <img
                      className="thumbnail"
                      src={thumbnail}
                      alt={`Thumbnail for thread: ${threadTitle}`}
                    />
                    Gallery
                  </div>
                </a>
                <p className="galleryText">{threadTitle}</p>
              </div>
            </>
          )}
          {threadType === "link" && (
            <div className="linkPreview">
              <img
                src={thumbnail}
                alt={`Thumbnail for thread: ${threadTitle}`}
                className="thumbnail"
              />
              <span className="linkText">{threadTitle}</span>
            </div>
          )}
          {video && (
            <>
              <video controls>
                <source src={video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <span className="vid-audio-message">
                Sorry! Reddit Client does not yet support video with audio.
                Click View Comments below to navigate to the Reddit page with
                audio.
              </span>
            </>
          )}
          {threadType === "self" && (
            <div className="selfPreview">
              <img
                src={thumbnail}
                alt={`Thumbnail for thread: ${threadTitle}`}
                className="thumbnail"
              />
              <p className="selfTitle">{threadTitle}</p>
              {selfText && (
                <>
                  <p className={`selfText previewText`} id={`previewText${id}`}>
                    {selfText.substring(0, 150)}...
                  </p>
                  <p className={`selfText fullText`} id={`fullText${id}`}>
                    {selfText}
                  </p>
                  <button
                    className="readMore"
                    id={`readMore${id}`}
                    onClick={handleReadMore}
                  >
                    Read more
                  </button>
                </>
              )}
            </div>
          )}
          {/* Rich Video: basically it sends html that embeds a video*/}
        </div>
      </div>
      <p className="threadFooter">
        <a href={link}>
          <button className="viewComments">🗨️View comments</button>
        </a>
        <span>👍{score}</span>
      </p>
    </div>
  );
};

export default ThreadCard;
