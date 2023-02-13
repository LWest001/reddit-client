import "./CommentCard.css";
import parseMarkdownText from "../../functions/parseMarkdownText";
import upvote from "../../assets/upvote.svg";
import { getTimeStamp } from "../../functions/getTimeStamp";
import { fetchData } from "../../features/Thread/threadSlice";
import { useDispatch } from "react-redux";

function CommentCard({
  author,
  body,
  id,
  permalink,
  replies,
  score,
  timestamp,
  type,
}) {
  const dispatch = useDispatch();
  function handleCollapse() {
    const commentBody = document.getElementById(`comment-${id}`);
    if (commentBody.style.display !== "none") {
      commentBody.style.display = "none";
    } else {
      commentBody.style.display = "block";
    }
  }

  function handleReadMore() {
    dispatch(
      fetchData({
        link:
          "https://www.reddit.com" +
          permalink.substring(0, permalink.length - 1),
        requestType: "subreplies",
      })
    );
  }

  const bodyTextHTML = parseMarkdownText(body);
  let subcomments;
  if (replies) {
    subcomments = replies.map((subcomment) => {
      if (subcomment.kind === "more") {
        return (
          <button
            key={subcomment.keyId}
            id={subcomment.keyId}
            onClick={handleReadMore}
          >
            {subcomment.data.children.length} more replies
          </button>
        );
      }
      subcomment = subcomment.data;
      const keyId = subcomment.id;
      return (
        <CommentCard
          author={subcomment.author}
          body={subcomment.body}
          id={keyId}
          key={keyId}
          permalink={subcomment.permalink}
          replies={subcomment.replies?.data?.children}
          score={subcomment.score}
          timestamp={getTimeStamp(subcomment.created_utc)}
          type="subcomment"
        />
      );
    });
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
