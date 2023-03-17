// Library imports
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// Slice imports
import { setStatus as setThreadStatus } from "../Thread/threadSlice";
import { fetchIcon, selectIcons } from "../ThreadList/threadListSlice";

// Component imports
import Embed, { defaultProviders } from "react-tiny-oembed";
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
  threadType, // gallery | link | self | video | richVideo | image
  thumbnail,
  url,
  video,
}) => {
  const dispatch = useDispatch();
  thumbnail = getDefaultThumbnail(thumbnail);
  const icons = useSelector(selectIcons);

  useEffect(() => {
    if (!Object.hasOwn(icons, subredditName)) {
      dispatch(fetchIcon(subredditName));
    }
  }, []);

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
        {["image", "video", "richVideo"].includes(threadType) && (
          <ThreadTitle title={threadTitle} flair={postFlair} />
        )}

        <div className="threadContentPreview">
          {threadType == "image" && (
            <ImageWrapper image={image} threadTitle={threadTitle} link={link} />
          )}

          {threadType == "gallery" && (
            <GalleryWrapper
              gallery={gallery}
              threadTitle={threadTitle}
              thumbnail={thumbnail}
            />
          )}

          {threadType === "link" && (
            <LinkPostWrapper
              url={url}
              thumbnail={thumbnail}
              threadTitle={threadTitle}
            />
          )}

          {threadType == "video" && (
            <DashVideoWrapper
              video={video}
              previewUrl={image.previewSizeImage.url}
            />
          )}

          {threadType === "self" && (
            <div>
              <SelfPostWrapper
                flair={postFlair}
                title={threadTitle}
                text={selfText}
              />
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
