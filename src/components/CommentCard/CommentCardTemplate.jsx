import { Box, Card, CardContent, CardHeader } from "@mui/material";
import React, { useCallback, useMemo, useState } from "react";
import ExpandCollapseButton from "./ExpandCollapseButton";
import CommentAvatar from "./CommentAvatar";
import CommentHeaderText from "./CommentHeaderText";
import { getTimeStamp } from "../../functions/getTimeStamp";
import parseMarkdownText from "../../functions/parseMarkdownText";

const CommentCardTemplate = ({ data, replies, threadAuthor }) => {
  const [expanded, setExpanded] = useState(true);
  const handleCollapse = useCallback(() => {
    const commentBody = document.getElementById(`comment-${data.id}`);
    if (commentBody.style.display !== "none") {
      commentBody.style.display = "none";
      setExpanded(false);
    } else {
      commentBody.style.display = "block";
      setExpanded(true);
    }
  }, []);

  const bodyTextHTML = parseMarkdownText(data?.body_html);
  const timestamp = getTimeStamp(data.created_utc);
  const isOp = useMemo(() => threadAuthor === data?.author);

  return (
    <Card raised square className={"CommentCard"} id={`cc-${data.id}`}>
      <CardHeader
        className="commentHeader"
        variant="commentCard"
        avatar={
          <Box
            sx={{
              display: "flex",
              width: "100%",
              alignItems: "center",
              py: 0,
            }}
          >
            <ExpandCollapseButton
              expanded={expanded}
              handleCollapse={handleCollapse}
            />
            <CommentAvatar isOp={isOp} author={data.author} id={data.id} />
          </Box>
        }
        title={
          <CommentHeaderText
            timestamp={timestamp}
            score={data.score}
            handleCollapse={handleCollapse}
            id={data.id}
          />
        }
      />
      <CardContent
        className="commentBody"
        id={`comment-${data.id}`}
        sx={{ paddingRight: 0, paddingTop: "0.2rem" }}
      >
        {bodyTextHTML}

        {replies}
      </CardContent>
    </Card>
  );
};

export default CommentCardTemplate;
