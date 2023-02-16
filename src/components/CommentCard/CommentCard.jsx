import "./CommentCard.css";
import parseMarkdownText from "../../functions/parseMarkdownText";
import upvote from "../../assets/upvote.svg";
import { getTimeStamp } from "../../functions/getTimeStamp";
import { fetchData } from "../../features/Thread/threadSlice";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

function CommentCard({
  author,
  body,
  id,
  indexTree,
  replies,
  score,
  timestamp,
  type,
}) {
  const dispatch = useDispatch();
  const { subredditName, redditId, threadTitle } = useParams();

  function handleCollapse() {
    const commentBody = document.getElementById(`comment-${id}`);
    if (commentBody.style.display !== "none") {
      commentBody.style.display = "none";
    } else {
      commentBody.style.display = "block";
    }
  }

  const bodyTextHTML = parseMarkdownText(body);
  let subcomments;
  async function handleReadMore(children) {
    children.forEach((child) => {
      dispatch(
        fetchData({
          link: `https://www.reddit.com/r/${subredditName}/comments/${redditId}/${threadTitle}/${child}`,
          requestType: "subreplies",
          indexTree: indexTree,
        })
      );
    });
  }

  function generateSubcomments() {
    subcomments = replies?.data?.children?.map((subcomment, subIndex) => {
      const { data, kind } = subcomment;
      if (kind === "more") {
        return (
          <button
            key={data.id}
            id={data.id}
            onClick={() => handleReadMore(data.children)}
            type="readMore"
          >
            {data.children.length} more replies
          </button>
        );
      }
      return (
        <CommentCard
          author={data.author}
          body={data.body_html}
          id={data.id}
          indexTree={[...indexTree, subIndex]}
          key={data.id}
          replies={data.replies}
          score={data.ups}
          timestamp={getTimeStamp(data.created_utc)}
          type="subcomment"
        />
      );
    });
  }

  if (replies) {
    generateSubcomments();
  }

  return (
    <div className={`CommentCard ${type}`}>
      <div className="commentHeader" onClick={handleCollapse} id={id}>
        <div className="author">{author}</div>
        <div className="timestamp">{timestamp}</div>
        <div></div>
        <div className="score">
          <img src={upvote} alt="upvote arrow" className="upArrow" />
          {score}
        </div>
      </div>
      <div className="commentBody" id={`comment-${id}`}>
        <div
          className="commentBodyText"
          dangerouslySetInnerHTML={{ __html: bodyTextHTML }}
        ></div>
        {subcomments && subcomments}
      </div>
    </div>
  );
}

export default CommentCard;
