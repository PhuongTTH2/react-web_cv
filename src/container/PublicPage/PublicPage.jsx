// import { useState, useEffect } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";

import BoxLeftPublicPage from "./BoxLeftPublicPage";
import BoxRightPublicPage from "./BoxRightPublicPage";
const PublicPage = () => {
  return (
    <div id="main">
      {/* start of header */}
      <Header />
      {/* end of header */}
      {/*- mobile search bar */}
      <div className="showOnMobile mobileSearchBar">
        <div className="container no-padding-lr">
          <div className="input-container searchWrapper">
            <input className="input-field" type="text" placeholder="Search" />
            <button className="submitBtn" type="submit">
              <img
                  alt="alt"
                  className="iconasset"
                  src="/img/icons/search_reverse_96px.png"
              />
            </button>
          </div>
          <div className="width15">
            <a id="lside-btn" href="/">
              <img alt="alt" src="/img/mmemu_dark_icon.png" />
            </a>
          </div>
          <div className="clearfix" />
        </div>
      </div>
      {/* end of mobile search bar */}
      {/* start of content */}
      <div className="content">
        <div className="container no-padding-lr">
          {/* start of left side rail */}
          <BoxLeftPublicPage />
          {/* end of left side rail */}
          {/* start of feeds */}
          <div className="div503">
            {/* start of feeds */}
            <div className="feedsWrapper">
              <div className="feedsContent">
                <div className="recentNRMsearch">
                  <p className="colorDarkRed">
                    Recently Searched NRMs:{" "}
                    <a className="colorDarkRed" href="/">
                      Redondulus
                    </a>
                    ,{" "}
                    <a className="colorDarkRed" href="/">
                      Jordanism
                    </a>
                    ,{" "}
                    <a className="colorDarkRed" href="/">
                      Keyman Faith
                    </a>
                  </p>
                </div>
                <div className="author">
                  <img
                    alt="alt"
                    className="avatarIcon"
                    src="img/avatar/jordanism.png"
                  />
                  <p>
                    <a href="/">The Sophists Union</a> -{" "}
                    <span className="fw--300">God Is You!</span>
                  </p>
                  <div className="clearfix" />
                </div>
                <div className="lineSeparator" />
                <div className="feedsPost">
                  <div className="textTitle">
                    <p>
                      <a href="/">Tom Jones</a>{" "}
                      <span className="fw--300">
                        (12/15): Here is my weekly video sermon. <br />
                        This week's topic is "Human Frailty".
                      </span>
                    </p>
                  </div>
                  <div className="timeStamp">
                    <span className="fs--12 opacity--50">4 mins ago</span>
                  </div>
                  <div className="clearfix" />
                  <div className="videoWrapper">
                    <a href="/">
                      <img alt="alt" src="img/videosample.jpg" />
                    </a>
                  </div>
                </div>
              </div>
              <div className="shareReportComment">
                <div className="sharable">
                  <ul className="list-unstyled">
                    <li>
                      <a
                        href="/"
                        className="no-text-decoration text--black"
                        title="comment"
                      >
                        <img
                          alt="alt"
                          className="iconasset opacity--50"
                          src="img/icons/comments_96px.png"
                        />{" "}
                        <span className="hideOn320"> 13 comments</span>
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
                          src="img/icons/share_96px.png"
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
                          src="img/icons/flagpole_96px.png"
                        />{" "}
                        <span className="hideOn320">Report</span>
                      </a>
                    </li>
                  </ul>
                  <div className="clearfix" />
                </div>
              </div>
            </div>
            {/* end of feed */}
            {/* start of feed */}
            <div className="feedsWrapper mt--5">
              <div className="feedsContent pb--20">
                <div className="author">
                  <img
                    alt="alt"
                    className="avatarIcon"
                    src="img/avatar/passbarn.png"
                  />
                  <p>
                    <a href="/">Passbarn Study Union</a> -{" "}
                    <span className="fw--300">Life is precious - </span>
                    <span className="colorLightGreen">Poll</span>
                  </p>
                  <div className="clearfix" />
                </div>
                <div className="lineSeparator" />
                <div className="feedsPost">
                  <div className="textTitle">
                    <p>
                      <span className="fw--300">
                        Should we change our stance of divinity?
                      </span>
                    </p>
                  </div>
                  <div className="timeStamp">
                    <span className="fs--12 opacity--50">9 mins ago</span>
                  </div>
                  <div className="clearfix" />
                  {/* start of poll */}
                  <div className="pollContentWrapper">
                    <form>
                      {/* select poll */}
                      <div className="progHolder">
                        <div className="div25 float-left">
                          <input
                            className="mt--8"
                            type="radio"
                            name="pollDivinity"
                          />
                        </div>
                        <div className="div335 float-left">
                          <div className="progress pollBarBlue">
                            <div
                              className="progress-bar "
                              style={{ width: 223 }}
                            ></div>
                            <span className="colorDarkBlue">
                              Libero enim sed faucibus turpis.
                            </span>
                          </div>
                        </div>
                        <div className="div53 float-right text-right">
                          <p className="colorLightGreen fs--11 mb--0 mt--5">
                            18 votes
                          </p>
                        </div>
                        <div className="clearfix" />
                      </div>
                      {/* end of select poll */}
                      {/* select poll */}
                      <div className="progHolder mt--8">
                        <div className="div25 float-left">
                          <input
                            className="mt--8"
                            type="radio"
                            name="pollDivinity"
                          />
                        </div>
                        <div className="div335 float-left">
                          <div className="progress pollBarBlue">
                            <div
                              className="progress-bar "
                              style={{ width: 109 }}
                            ></div>
                            <span className="colorDarkBlue">
                              In hac habitasse platea dictumst vestibulum.
                            </span>
                          </div>
                        </div>
                        <div className="div53 float-right text-right">
                          <p className="colorLightGreen fs--11 mb--0 mt--5">
                            7 votes
                          </p>
                        </div>
                        <div className="clearfix" />
                      </div>
                      {/* end of select poll */}
                      <div className="progHolder mt--8">
                        <div className="div25 float-left">
                          <input
                            className="mt--8"
                            type="radio"
                            name="pollDivinity"
                          />
                        </div>
                        <div className="div335 float-left">
                          <div className="progress pollBarBlue">
                            <div
                              className="progress-bar "
                              style={{ width: 0 }}
                            ></div>
                            <span className="colorDarkBlue">
                              Tempus egestas sed sed risus pretium
                            </span>
                          </div>
                        </div>
                        <div className="div53 float-right text-right">
                          <p className="colorLightGreen fs--11 mb--0 mt--5">
                            0 votes
                          </p>
                        </div>
                        <div className="clearfix" />
                      </div>
                      {/* end of select poll */}
                      {/* end of select poll */}
                      <div className="progHolder mt--8">
                        <div className="div25 float-left">
                          <input
                            className="mt--8"
                            type="radio"
                            name="pollDivinity"
                          />
                        </div>
                        <div className="div335 float-left">
                          <div className="progress pollBarBlue">
                            <div
                              className="progress-bar "
                              style={{ width: 34 }}
                            ></div>
                            <span className="colorDarkBlue">
                              In hac habitasse platea dictumst vestibulum.
                            </span>
                          </div>
                        </div>
                        <div className="div53 float-right text-right">
                          <p className="colorLightGreen fs--11 mb--0 mt--5">
                            1 votes
                          </p>
                        </div>
                        <div className="clearfix" />
                      </div>
                      {/* end of select poll */}
                    </form>
                  </div>
                  {/* end of poll */}
                </div>
              </div>
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
                          src="img/icons/comments_96px.png"
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
                          src="img/icons/share_96px.png"
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
                          src="img/icons/flagpole_96px.png"
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
                        Aliquet bibendum enim facilisis gravida neque. Quis
                        varius quam quisque id diam.
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
                        <a href="/">Melissa Gertrude</a> Porttitor eget dolor
                        morbi non.
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
                            src="img/icons/telegram_app_96px.png"
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                  {/* end of comment reply */}
                </div>
                {/* end of nested comments */}
              </div>
              {/* end of share comments */}
              {/* start of event */}
              <div className="eventWrapper mt--5">
                {/* start event content */}
                <div className="feedsContent pb--20">
                  <div className="author">
                    <img
                      alt="alt"
                      className="avatarIcon"
                      src="img/avatar/passbarn_study.png"
                    />
                    <p>
                      <a href="/">Staprinclock Church</a> -{" "}
                      <span className="fw--300">We improve you - </span>
                      <span className="colorLightGreen">Event</span>
                    </p>
                    <div className="clearfix" />
                  </div>
                  <div className="lineSeparator" />
                  <div className="feedsPost">
                    <div className="textTitle">
                      <p>
                        <a href="/">Hoshi Union Fall Picnic</a>{" "}
                        <span className="fw--300">
                          Come picnic with us under the trees. <br />
                          Enjoy a ribs and chicken bbq.
                        </span>
                      </p>
                    </div>
                    <div className="timeStamp">
                      <span className="fs--12 opacity--50">10 mins ago</span>
                    </div>
                    <div className="clearfix" />
                    <div className="eventDetails">
                      <span className="fw--300">Event Date: </span>
                      <a href="/">
                        <span className="colorLightGreen">
                          May 19, 2019 Saturday • 2pm
                        </span>
                      </a>
                      <div className="responseButtons">
                        <a className="btn btn-round bg--defaultBlue text-white">
                          RSPV
                        </a>
                        <a className="btn btn-round bgLightGray colorGray">
                          Maybe
                        </a>
                        <a className="btn btn-round bgLightGray colorGray">
                          Can't go
                        </a>
                        <a className="btn btn-round bgLightGray colorGray float-right">
                          Invite
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                {/* end event content */}
                {/* start share report */}
                <div className="shareReportComment">
                  <div className="sharable">
                    <ul className="list-unstyled">
                      <li>
                        <a
                          href="/"
                          className="no-text-decoration text--black"
                          title="comment"
                        >
                          <img
                            alt="alt"
                            className="iconasset opacity--50"
                            src="img/icons/comments_96px.png"
                          />{" "}
                          <span className="hideOn320"> 13 comments</span>
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
                            src="img/icons/share_96px.png"
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
                            src="img/icons/flagpole_96px.png"
                          />{" "}
                          <span className="hideOn320">Report</span>
                        </a>
                      </li>
                    </ul>
                    <div className="clearfix" />
                  </div>
                </div>
                {/* end of share report */}
              </div>
              {/* end of event */}
            </div>
          </div>
          {/* end of feeds */}
          {/* start of right rails */}
          <BoxRightPublicPage />
          {/* .sibar-inner-wrapper */}
        </div>
        {/* .container.no-padding-lr */}
        <div className="clearfix" />
      </div>
      {/* .content */}
      {/* start of footer */}
      <Footer />
      {/* end of footer */}
    </div>
  );
};

export default PublicPage;
