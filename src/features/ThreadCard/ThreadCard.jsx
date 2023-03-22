// Library imports
import { createContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// Slice imports
import { setStatus as setThreadStatus } from "../Thread/threadSlice";
import {
  fetchIcon,
  selectIconBySubreddit,
} from "../ThreadList/threadListSlice";

// Component imports
import SubredditLink from "../../components/SubredditLink";
import ThreadCardSubheader from "./ThreadCardSubheader";
import ThreadTitle from "./ThreadTitle";

// Function imports
import getDefaultThumbnail from "../../functions/getDefaultThumbnail";

// Media imports

import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";

// Stylesheet
import "./ThreadCard.css";

// MUI imports
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Stack,
  Typography,
} from "@mui/material";

// Content Wrapper imports
import ImageWrapper from "./ContentWrappers/ImageWrapper";
import LinkPostWrapper from "./ContentWrappers/LinkPostWrapper";
import SelfPostWrapper from "./ContentWrappers/SelfPostWrapper";
import GalleryWrapper from "./ContentWrappers/GalleryWrapper";
import DashVideoWrapper from "./ContentWrappers/DashVideoWrapper";
import RichVideoWrapper from "./ContentWrappers/RichVideoWrapper";

import theme from "../../assets/theme";
import ThreadCardHeaderTitle from "./ThreadCardHeaderTitle";
import replaceEntities from "../../functions/replaceEntities";

export const ThreadContentContext = createContext({
  threadTitle: null,
  flair: null,
});

const ThreadCard = ({
  author,
  cardType,
  commentCount,
  galleryCaptions,
  galleryData,
  id,
  image,
  link,
  flair,
  richVideo,
  score,
  selfText,
  subredditName,
  timestamp,
  threadTitle,
  threadType, // gallery | link | self | video | richVideo | image
  thumbnail,
  url,
  video,
}) => {
  const dispatch = useDispatch();
  thumbnail = getDefaultThumbnail(thumbnail);
  const icon = useSelector((state) =>
    selectIconBySubreddit(state, subredditName)
  );

  useEffect(() => {
    if (icon === "loading" || !icon) {
      dispatch(fetchIcon(subredditName));
    }
  }, []);

  return (
    <Card className="ThreadCard" id={id}>
      <CardHeader
        className="ThreadCardHeader"
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
            <ThreadCardHeaderTitle
              subredditName={subredditName}
              timestamp={timestamp}
            />
          )
        }
        subheader={
          <ThreadCardSubheader
            author={author}
            timestamp={timestamp}
            cardType={cardType}
          />
        }
      />

      <ThreadContentContext.Provider value={{ threadTitle, flair }}>
        <CardContent className="threadPreview">
          {["image", "video", "richVideo"].includes(threadType) && (
            <ThreadTitle />
          )}

          <Box className="threadContentPreview">
            {threadType == "image" && (
              <ImageWrapper image={image} link={link} />
            )}

            {threadType == "gallery" && (
              <GalleryWrapper
                galleryData={galleryData}
                galleryCaptions={galleryCaptions}
              />
            )}

            {threadType === "link" && (
              <LinkPostWrapper url={url} thumbnail={thumbnail} />
            )}

            {threadType == "video" && (
              <DashVideoWrapper
                video={video}
                previewUrl={replaceEntities(
                  image.previewSizeImage[image.previewSizeImage.length - 1].url
                )}
              />
            )}

            {threadType === "self" && <SelfPostWrapper text={selfText} />}

            {threadType === "richVideo" && (
              <RichVideoWrapper richVideo={richVideo} />
            )}
          </Box>
        </CardContent>
      </ThreadContentContext.Provider>
      <Stack
        className="threadFooter"
        direction="row"
        sx={{
          px: 1,
          justifyContent: "space-between",
          alignItems: "center",
          background: theme.palette.headerGradient.default,
          width: "100%",
        }}
      >
        {cardType !== "thread" && (
          <Button
            component={Link}
            to={`/${link.substring(19)}`}
            onClick={() => {
              dispatch(setThreadStatus("idle"));
            }}
            className="viewComments button"
            sx={{ gap: 1 }}
          >
            <CommentOutlinedIcon />
            <Typography>View {commentCount} comments</Typography>
          </Button>
        )}
        <Stack direction="row" gap={1}>
          <ThumbUpOutlinedIcon />
          {score}
        </Stack>
      </Stack>
    </Card>
  );
};

export default ThreadCard;
