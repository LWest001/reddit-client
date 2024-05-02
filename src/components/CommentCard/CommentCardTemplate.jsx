import { Box, Card, CardContent, CardHeader } from "@mui/material";
import React from "react";
import ExpandCollapseButton from "./ExpandCollapseButton";
import CommentAvatar from "./CommentAvatar";
import CommentHeaderText from "./CommentHeaderText";

const CommentCardTemplate = ({
  data,
  expanded,
  handleCollapse,
  isOp,
  timestamp,
  bodyTextHTML,
  replies,
}) => {
  return (
    <Card raised={true} className={"CommentCard"} id={`cc-${data.id}`}>
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
