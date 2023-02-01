function SkeletonSearchCard() {
  return (
    <div className="SearchCard skeleton">
      <div className="searchCardBody">
        <div className="searchCardHeader">
          <div className="subredditIcon"></div>
          <div className="subredditAndAuthor skeletonContent"></div>
        </div>
        <div className="threadPreview">
          <span className="skeleton threadType">.</span>
          <h2 className="threadTitle skeletonContent">
            ..................................................................................
          </h2>
        </div>
        <p className="searchCardFooter skeletonContent">
          <span className="viewComments"></span>

          <span></span>
        </p>
      </div>

      <figure className="thumbnailContainer"></figure>
    </div>
  );
}

export default SkeletonSearchCard;
