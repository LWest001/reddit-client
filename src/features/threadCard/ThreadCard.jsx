import "./ThreadCard.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import Embed, { defaultProviders } from "react-tiny-oembed";
import axios from "axios";
import { setStatus as setHomepageStatus } from "../homepage/homepageSlice";
import getDefaultThumbnail from "../../functions/getDefaultThumbnail";
import parseMarkdownText from "../../functions/parseMarkdownText";

const ThreadCard = ({
  author,
  awards,
  cardType,
  commentCount,
  gallery,
  id,
  image,
  link,
  postFlair,
  richVideo,
  score,
  selfText,
  subredditName,
  timestamp,
  threadTitle,
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

  const bodyTextHTML = selfText && parseMarkdownText(selfText);
  const titleTextHTML = threadTitle && {
    __html: parseMarkdownText(threadTitle),
  };

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
          <>
            <span className="postFlair">{postFlair?.text}</span>
            <h2
              className="threadTitle"
              dangerouslySetInnerHTML={titleTextHTML}
            />
          </>
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
                <p
                  className="galleryText"
                  dangerouslySetInnerHTML={titleTextHTML}
                />
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
              <span
                className="linkText"
                dangerouslySetInnerHTML={titleTextHTML}
              />
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
              <p
                className="selfTitle"
                dangerouslySetInnerHTML={titleTextHTML}
              />
              {selfText && (
                <>
                  <p
                    className={`selfText previewText`}
                    id={`previewText${id}`}
                    dangerouslySetInnerHTML={{
                      __html: `${bodyTextHTML.textContent.substring(
                        0,
                        150
                      )}...`,
                    }}
                  ></p>
                  <p
                    className={`selfText fullText`}
                    id={`fullText${id}`}
                    dangerouslySetInnerHTML={{
                      __html: bodyTextHTML,
                    }}
                  ></p>
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
