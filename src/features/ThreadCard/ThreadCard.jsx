// Library imports
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// Slice imports
import { setStatus as setThreadStatus } from "../Thread/threadSlice";
import { fetchIcon, selectIcons } from "../ThreadList/threadListSlice";

// Component imports
import Embed, { defaultProviders } from "react-tiny-oembed";
import ReactPlayer from "react-player";
import SubredditLink from "../../components/SubredditLink";
import { LazyLoadImage } from "react-lazy-load-image-component";

// Function imports
import getDefaultThumbnail from "../../functions/getDefaultThumbnail";
import parseMarkdownText from "../../functions/parseMarkdownText";
import isiOS from "../../functions/isiOS";

// Media imports

import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";

// Stylesheet
import "./ThreadCard.css";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Stack,
  Typography,
} from "@mui/material";
import ImageModal from "../../components/ImageModal/ImageModal";
import ThreadCardSubheader from "./ThreadCardSubheader";
import FlairBox from "./FlairBox";

const ThreadCard = ({
  author,
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
  url,
  video,
}) => {
  const [readMore, setReadMore] = useState("hide");
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

  const icons = useSelector(selectIcons);

  useEffect(() => {
    if (!Object.hasOwn(icons, subredditName)) {
      dispatch(fetchIcon(subredditName));
    }
  }, []);

  const bodyTextHTML = selfText && parseMarkdownText(selfText);
  const titleTextHTML = threadTitle && {
    __html: parseMarkdownText(`##${threadTitle}`),
  };

  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  return (
    <Card className="ThreadCard" id={id}>
      <CardHeader
        className="threadCardHeader"
        avatar={
          <SubredditLink
            subredditName={subredditName}
            type="avatar"
            alt="Subreddit avatar"
            cardType={cardType}
          />
        }
        title={
          cardType !== "subreddit" && (
            <SubredditLink subredditName={subredditName} type="text" />
          )
        }
        subheader={
          <ThreadCardSubheader author={author} timestamp={timestamp} />
        }
      />

      <CardContent className="threadPreview">
        {!["link", "gallery", "self"].includes(threadType) && (
          <Box className={`flairAndTitle ${cardType}`}>
            {postFlair?.text && <FlairBox flair={postFlair} />}

            <div
              className="threadTitle"
              dangerouslySetInnerHTML={titleTextHTML}
            />
          </Box>
        )}
        <div className="threadContentPreview">
          {threadType == "image" && (
            <div className="centered">
              <LazyLoadImage
                src={image.previewSizeImage.url}
                // height={image.previewSizeImage.height}
                // width={image.previewSizeImage.width}
                placeholderSrc={image.placeholderImage.url}
                effect="blur"
                alt={`Image for thread: ${threadTitle}`}
                className="previewImage"
                onClick={handleOpenModal}
              />
              <ImageModal
                open={openModal}
                image={image.fullSizeImage}
                handleClose={handleCloseModal}
                title={threadTitle}
                link={link}
              />
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
              <a href={url}>
                <img
                  src={thumbnail}
                  alt={`Thumbnail for thread: ${threadTitle}`}
                  className="thumbnail"
                />
                <div
                  className="linkText"
                  dangerouslySetInnerHTML={titleTextHTML}
                />
              </a>
            </div>
          )}

          {threadType == "video" && (
            <div className="centered videoWrapper">
              <ReactPlayer
                url={isiOS() ? video.hls : video.dashManifest}
                controls={true}
                width="100%"
                maxheight="80vh"
                playsinline={true}
                volume={1}
                muted={true}
                autoPlay={false}
                light={image.previewSizeImage.url}
                fallback={
                  <video>
                    <source src={video.fallback} type="video/mp4" />
                  </video>
                }
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
                  <Button
                    className="readMore"
                    id={`readMore${id}`}
                    onClick={handleReadMore}
                    style={{ float: "right" }}
                  >
                    Read more
                  </Button>
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
      </CardContent>
      <Box className="threadFooter">
        {cardType !== "thread" && (
          <Button
            component={Link}
            to={`/${link.substring(19)}`}
            onClick={() => {
              dispatch(setThreadStatus("idle"));
            }}
            className="viewComments button"
          >
            <CommentOutlinedIcon />
            <Typography>View {commentCount} comments</Typography>
          </Button>
        )}
        <Stack direction="row" gap={1}>
          <ThumbUpOutlinedIcon />
          {score}
        </Stack>
      </Box>
    </Card>
  );
};
export default ThreadCard;
