import "./ThreadCard.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import Embed, { defaultProviders } from "react-tiny-oembed";
import axios from "axios";
import { setStatus } from "../homepage/homepageSlice";
import getDefaultThumbnail from "../../functions/getDefaultThumbnail";
import parseMarkdownText from "../../functions/parseMarkdownText";
import ReactPlayer from "react-player";
import upvote from "../../assets/upvote.svg";
import commentBubble from "../../assets/commentBubble.svg";

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
  }, []);

  const bodyTextHTML = selfText && parseMarkdownText(selfText);
  const titleTextHTML = threadTitle && {
    __html: parseMarkdownText(`##${threadTitle}`),
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
                onClick={() => dispatch(setStatus("idle"))}
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
          <div className={`flairAndTitle ${cardType}`}>
            <div className="postFlairContainer">
              {postFlair?.text && (
                <span
                  className="postFlair"
                  style={{ backgroundColor: postFlair?.backgroundColor }}
                >
                  {postFlair?.text}
                </span>
              )}
            </div>
            <div
              className="threadTitle"
              dangerouslySetInnerHTML={titleTextHTML}
            />
          </div>
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
                <div
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
              <div
                className="linkText"
                dangerouslySetInnerHTML={titleTextHTML}
              />
            </div>
          )}

          {threadType == "video" && (
            <div className="centered videoWrapper">
              <ReactPlayer
                url={video.dashManifest}
                controls={true}
                width="100%"
                maxheight="80vh"
              />
            </div>
          )}

          {threadType === "self" && (
            <div className="selfPreview">
              <img
                src={thumbnail}
                alt={`Thumbnail for thread: ${threadTitle}`}
                className="thumbnail"
              />
              <div
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
                    style={{ float: "right" }}
                  >
                    Read more
                  </button>
                </>
              )}
            </div>
          )}

          {threadType === "richVideo" && (
            <div className="videoWrapper">
              <Embed
                className="richVideoEmbed"
                url={richVideo.url}
                providers={[...defaultProviders, richVideo.provider]}
                options={{ height: "200" }}
                // proxy="https://cors-anywhere.herokuapp.com/"
              />
            </div>
          )}
        </div>
      </div>
      <div className="threadFooter">
        <a href={link} className="viewComments button">
          <img src={commentBubble} alt="comment bubble" className="icon" />
          <span>View {commentCount} comments</span>
        </a>
        <span>
          <img src={upvote} alt="up arrow" className="upArrow" />
          {score}
        </span>
      </div>
    </div>
  );
};

export default ThreadCard;
