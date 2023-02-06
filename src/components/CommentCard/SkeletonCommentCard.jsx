function SkeletonCommentCard() {
  return (
    <div className={`skeleton CommentCard`}>
      <div className="commentHeader">
        <div className="author skeletonContent">.....</div>
        <div className="timestamp skeletonContent">......</div>
        <div></div>
        <div className="score skeletonContent">.....</div>
      </div>
      <div className="commentBody">
        <div className="commentBodyText skeletonContent">
          .....................
        </div>
      </div>
    </div>
  );
}

export default SkeletonCommentCard;
