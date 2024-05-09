import { Box } from "@mui/material";
import { useContext } from "react";
import { ThreadContentContext } from "../ThreadCard";
import ThreadTitle from "../ThreadTitle";
import Thumbnail from "../../../components/Thumbnail";

function LinkPostWrapper({ url, thumbnail }) {
  const { title } = useContext(ThreadContentContext);
  return (
    <Box className="LinkPostWrapper">
      <a href={url}>
        <Thumbnail image={thumbnail} alt={title} />
        <ThreadTitle />
      </a>
    </Box>
  );
}
export default LinkPostWrapper;
