import "./ThreadCard.css";
import { useState } from "react";
import defaultThumb from "../../assets/defaultThumb.png";
import selfThumb from "../../assets/selfThumb.png";
import nsfwThumb from "../../assets/nsfwThumb.png";

const ThreadCard = ({
  subredditAvatar,
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

  return (
    <div className="ThreadCard" id={id}>
      <div className="threadCardSubredditHeader">
        <span>
          {/* Figure out how to get a subreddit avatar url */}
          {/* <img src={subredditAvatar} alt="Subreddit avatar" /> */}
          r/{subredditName}
        </span>{" "}
        <span>{timestamp}</span>
      </div>
      <p className="authorName">u/{author}</p>
      <div className="threadPreview">
        {!["link", "gallery", "self"].includes(threadType) && (
          <h2 className="threadTitle">{threadTitle}</h2>
        )}
        <div className="threadContentPreview">
          {image && (
            <a href={image}>
              <img
                src={image}
                alt={`Image for thread: ${threadTitle}`}
                className="previewImage"
              />
            </a>
          )}
          {gallery && (
            <>
              Gallery
              <div className="galleryPreview">
                <a href={gallery}>
                  <img
                    className="thumbnail"
                    src={thumbnail}
                    alt={`Thumbnail for thread: ${threadTitle}`}
                  />
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
              <p className="linkText">{threadTitle}</p>
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
      <p>
        <a href={link}>
          <button className="viewComments">🗨️View comments</button>
        </a>
        <span>👍{score}</span>
      </p>
    </div>
  );
};

export default ThreadCard;
