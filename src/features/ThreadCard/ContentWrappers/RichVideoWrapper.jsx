import { Box } from "@mui/material";
import { LazyLoadComponent } from "react-lazy-load-image-component";
import Embed, { defaultProviders } from "react-tiny-oembed";

function RichVideoWrapper({ richVideo }) {
  const Placeholder = () => {
    return (
      <Box>
        <img
          src={richVideo.oembed.thumbnail_url}
          width={richVideo.oembed.thumbnail_width}
          height={richVideo.oembed.thumbnail_height}
          alt="Loading rich video content..."
        />
      </Box>
    );
  };
  return (
    <Box
      className="VideoWrapper"
      sx={{ display: "flex", flexDirection: "column", placeItems: "center" }}
    >
      <LazyLoadComponent placeholder={<Placeholder />} threshold={2000}>
        <Embed
          className="richVideoEmbed"
          url={richVideo.url}
          providers={[...defaultProviders, richVideo.provider]}
          options={{ height: "200" }}
          // proxy="https://cors-anywhere.herokuapp.com/"
        />
      </LazyLoadComponent>
    </Box>
  );
}
export default RichVideoWrapper;
