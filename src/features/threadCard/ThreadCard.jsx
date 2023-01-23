import "./ThreadCard.css";
import { useState } from "react";
import getDefaultThumbnail from "../../functions/getDefaultThumbnail";
import axios from "axios";
import { useEffect } from "react";
import Embed, { defaultProviders } from "react-tiny-oembed";
import { Link } from "react-router-dom";
import { setStatus as setHomepageStatus } from "../homepage/homepageSlice";
import { useDispatch } from "react-redux";

const ThreadCard = ({
  id,
  cardType,
  subredditName,
  author,
  timestamp,
  threadTitle,
  score,
  commentCount,
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
  const dispatch = useDispatch();
  const handleReadMore = () => {
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

  thumbnail = getDefaultThumbnail(thumbnail);

  useEffect(() => {
    if (cardType === "homepage") {
      async function getIcon(subredditName) {
        const URL = `https://www.reddit.com/r/${subredditName}/about.json`;
        const response = await axios.get(URL);
        setIcon(response.data.data.icon_img);
      }
      getIcon(subredditName);
    }
  }, [window.URL]);

  return (
    <div className="ThreadCard" id={id}>
      <div className="threadCardHeader">
        {icon ? (
          <img
            src={icon}
            alt="Subreddit avatar"
            className={`subredditIcon ${cardType}`}
          />
        ) : (
          <div className={`subredditIcon ${cardType}`}>r/</div>
        )}
        <p className="ThreadCardHeaderText">
          {cardType === "homepage" && (
            <span className="subredditName">
              <Link
                to={`/r/${subredditName}`}
                onClick={() => dispatch(setHomepageStatus("idle"))}
              >
                r/{subredditName}
              </Link>
            </span>
          )}
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
          {threadType == "image" && (
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
          {threadType == "gallery" && (
            <>
              <div className="galleryPreview">
                <a href={gallery} target="_blank">
                  <div className="galleryThumbnailBox">
                    <img
                      className="thumbnail"
                      src={thumbnail}
                      alt={`Thumbnail for thread: ${threadTitle}`}
                    />
                    View gallery ➡️
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
          {threadType == "video" && (
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
          {threadType === "richVideo" && (
            <Embed
              url={richVideo.url}
              providers={[...defaultProviders, richVideo.provider]}
              // proxy="https://cors-anywhere.herokuapp.com/"
            />
          )}
        </div>
      </div>
      <p className="threadFooter">
        <a href={link}>
          <button className="viewComments">
            🗨️View {commentCount} comments
          </button>
        </a>
        <span>👍{score}</span>
      </p>
    </div>
  );
};

export default ThreadCard;
