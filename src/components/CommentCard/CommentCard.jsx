import "./CommentCard.css";
import parseMarkdownText from "../../functions/parseMarkdownText";
import upvote from "../../assets/upvote.svg";
import { getTimeStamp } from "../../functions/getTimeStamp";
import { fetchThread } from "../../features/Thread/threadSlice";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import ReadMoreButton from "../ReadMoreButton";

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

  function handleReadMore(children, e) {
    setTimeout(() => e.target.remove(), 500);
    e.target.disabled = true;
    e.target.style.textDecoration = "none"
    e.target.style.cursor = "wait"
    children.forEach((child) => {
      dispatch(
        fetchThread({
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
      if (data.count === 0) return;
      if (kind === "more") {
        return (
          <ReadMoreButton
            key={`btn_${data.id}`}
            data={data}
            onClick={(e) => handleReadMore(data.children, e)}
            id={`readMore-${data.id}`}
          >
            {data.children.length} more replies
          </ReadMoreButton>
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
    <div className={`CommentCard ${type}`} id={`cc-${id}`}>
      <div className="commentHeader" onClick={handleCollapse}>
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
