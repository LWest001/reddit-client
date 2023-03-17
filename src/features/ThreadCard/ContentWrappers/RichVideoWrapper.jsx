import { Box } from "@mui/material";
import { LazyLoadComponent } from "react-lazy-load-image-component";
import Embed, { defaultProviders } from "react-tiny-oembed";
import VideoPlaceholder from "./VideoPlaceholder";
import replaceEntities from "../../../functions/replaceEntities";
import LazyLoad from "react-lazy-load";

function RichVideoWrapper({ richVideo, thumbnail }) {
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;
  return (
    <Box
      className="VideoWrapper"
      sx={{ display: "flex", flexDirection: "column", placeItems: "center" }}
    >
      <LazyLoad offset={screenHeight * 3} width={"100%"}>
        <Embed
          className="richVideoEmbed"
          url={replaceEntities(richVideo.url)}
          providers={[...defaultProviders, richVideo.provider]}
          LoadingFallbackElement={
            <VideoPlaceholder thumbnail={richVideo.oembed} />
          }
          FallbackElement={
            <VideoPlaceholder thumbnail={richVideo.oembed} disabled />
          }
          // proxy="https://cors-anywhere.herokuapp.com/"
        />
      </LazyLoad>
    </Box>
  );
}
export default RichVideoWrapper;
