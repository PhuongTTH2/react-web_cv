import React from "react";

const All = () => {
  return (
    <div className="updatesContent mb--5">
      <div className="textTitle">All</div>

      {/* start of share comments and nestest */}
      <div className="shareReportComment">
        <div className="sharable">
          <ul className="list-unstyled">
            <li>
              <a
                href="/"
                className="no-text-decoration colorDarkBlue"
                title="comment"
              >
                <img
                  alt="alt"
                  className="iconasset opacity--50"
                  src="/img/icons/comments_96px.png"
                />{" "}
                <span className="hideOn320"> 3 comments</span>
              </a>
            </li>
            <li>
              <a
                href="/"
                className="no-text-decoration text--black"
                title="share"
              >
                <img
                  alt="alt"
                  className="iconasset opacity--50"
                  src="/img/icons/share_96px.png"
                />{" "}
                <span className="hideOn320">Share</span>
              </a>
            </li>
            <li>
              <a
                href="/"
                className="no-text-decoration text--black"
                title="report"
              >
                <img
                  alt="alt"
                  className="iconasset opacity--50"
                  src="/img/icons/flagpole_96px.png"
                />{" "}
                <span className="hideOn320">Report</span>
              </a>
            </li>
          </ul>
          <div className="clearfix" />
        </div>
        {/* start of nested comments */}
        <div className="nestedComments">
          {/* start of comment */}
          <div className="author">
            <div className="imageAvatar">
              <a href="/">
                <span className="profileImage">JS</span>
              </a>
            </div>
            <p>
              <a href="/">Jenna Smith</a>{" "}
              <span className="fw--300">
                Aliquet bibendum enim facilisis gravida neque. Quis varius quam
                quisque id diam.
              </span>
            </p>
            <div className="clearfix" />
          </div>
          <div className="clearfix" />
          {/* end of comment */}
          {/* start of comment reply */}
          <div className="commentReplayWrapper">
            <div className="author">
              <div className="imageAvatar">
                <a href="/">
                  <span className="profileImage blue">TJ</span>
                </a>
              </div>
              <p>
                <a href="/">Tom Jones</a>{" "}
                <span className="fw--300">
                  {" "}
                  Erat velit scelerisque in dictum non consectetur.
                </span>
              </p>
              <div className="clearfix" />
            </div>
          </div>
          {/* end of comment reply */}
          {/* start of comment reply */}
          <div className="commentReplayWrapper">
            <div className="author">
              <div className="imageAvatar">
                <a href="/">
                  <span className="profileImage orange">Mg</span>
                </a>
              </div>
              <p>
                <a href="/">Melissa Gertrude</a> Porttitor eget dolor morbi non.
                <span className="fw--300" />
              </p>
              <div className="clearfix" />
            </div>
          </div>
          {/* end of comment reply */}
          <div className="commentReplayWrapper">
            <div className="author">
              <div className="input-container replyWrapper">
                <div className="imageAvatar">
                  <a href="/">
                    <span className="profileImage orange">Mg</span>
                  </a>
                </div>
                <input
                  className="input-field mt--5"
                  type="text"
                  placeholder="Reply to Melissa Gertrude"
                />
                <button
                  className="submitBtn"
                  type="submit"
                  style={{ zIndex: 2 }}
                >
                  <img
                    alt="alt"
                    className="iconasset"
                    src="/img/icons/telegram_app_96px.png"
                  />
                </button>
              </div>
            </div>
          </div>
          {/* end of comment reply */}
        </div>
        {/* end of nested comments */}
      </div>
    </div>
  );
};

export default All;
