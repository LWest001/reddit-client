import { Box } from "@mui/material";
import { LazyLoadComponent } from "react-lazy-load-image-component";
import Embed, { defaultProviders } from "react-tiny-oembed";
import VideoPlaceholder from "./VideoPlaceholder";
import replaceEntities from "../../../functions/replaceEntities";

function RichVideoWrapper({ richVideo, thumbnail }) {
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;
  return (
    <Box
      className="VideoWrapper"
      sx={{ display: "flex", flexDirection: "column", placeItems: "center" }}
    >
      <LazyLoadComponent
        placeholder={<img src={thumbnail} />}
        threshold={screenHeight * 3}
      >
        <Embed
          className="richVideoEmbed"
          url={replaceEntities(richVideo.url)}
          providers={[...defaultProviders, richVideo.provider]}
          LoadingFallbackElement={
            <VideoPlaceholder thumbnail={richVideo.oembed} />
          }
          FallbackElement={<VideoPlaceholder thumbnail={richVideo.oembed} />}
          // proxy="https://cors-anywhere.herokuapp.com/"
        />
      </LazyLoadComponent>
    </Box>
  );
}
export default RichVideoWrapper;
