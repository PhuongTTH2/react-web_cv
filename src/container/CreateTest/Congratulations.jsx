import React from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
const CreateTest = ({ TestID }) => {
  return (
    <div className="bg--white">
      <div id="main" className="surveyTemplate">
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
                  className="iconasset"
                  src="img/icons/search_reverse_96px.png"
                  alt=""
                />
              </button>
            </div>
            <div className="width15">
              <a id="lside-btn" href="/">
                <img src="img/mmemu_dark_icon.png" alt="" />
              </a>
            </div>
            <div className="clearfix" />
          </div>
        </div>
        {/* end of mobile search bar */}
        {/* start of content */}
        <div id="surveyLayout" className="content">
          <div className="container no-padding-lr">
            <div id="my-congrats">
              <h1>
                Congratulations! Your LX Member level is now ready to accept
                members.
              </h1>
              <div className="scoresWrapper">
                <p>Match Score:</p>
                <br />
                <p>
                  You must answer at least 25% of the Religious Match Survey
                  items for this requirement to be active.
                </p>
                <p>% of total available survey items have been answered.</p>
                This requirement is therefore currently active/inactive.
                <p />
                <br />
                <p>Custom Match Score:</p>
                <p>
                  You must answer at least five sections of the Religious Match
                  Survey for this requirement to be activated.
                </p>
                <p>
                  “Answering a section” means answering one or more questions
                  within that section (marking a blank section as ‘answered’
                  does not count).
                </p>
                <br />
                <p>X survey sections have been answered.</p>
                <p>This requirement is therefore currently active/inactive.</p>
              </div>
              <p>You may now:</p>
              <ol>
                <li>Create a membership level,</li>
                <li>Complete Religious Match Survey items, or</li>
                <li>
                  Begin posting content (communications, documents, videos,
                  polls, etc.) in your NRM’s lounge page
                </li>
              </ol>
              <div className="pr-btns">
                <div className="pr-btn">
                  <a href="/">Create Membership Level</a>
                </div>
                <div className="pr-btn">
                  <a href={`/lounge/${TestID}`}>Begin Posting in Lounge</a>
                </div>
                <div className="pr-btn">
                  <a href="/">Complete Religious Match Survey items</a>
                  <small>
                    (recommended for brand new Tests like yours)*
                  </small>
                </div>
              </div>
            </div>{" "}
            {/* #my-please-read */}
            <div className="clearfix" />
          </div>{" "}
          {/* .container.no-padding-lr */}
          <div className="clearfix" />
        </div>{" "}
        {/* .content */}
        {/* forgot Account */}
        <div
          className="modal fade Acct"
          id="forgotAcct"
          tabIndex={-1}
          data-focus-on="input:first"
        >
          <div className="modal-dialog">
            {/* Modal content*/}
            <div className="modal-content">
              <div className="modal-header">
                <a href="/" className="logo">
                  <img src="img/logo.png" alt="" />
                </a>
              </div>
              <div className="modal-body">
                <p className="fs--20 fw--700">Recover your username</p>
                <p>
                  Don't worry! You may have forgotten your username, but we can
                  help you out. Enter your email address below and we'll email
                  you your username.
                </p>
                <p>
                  <input placeholder="EMAIL" name="email" />
                </p>
                <button type="button" className="btn btn-default fs--12">
                  EMAIL ME
                </button>
                <p>
                  If you are having trouble accessing your account, follow{" "}
                  <a href="/" className="bright-blue">
                    this link
                  </a>
                  .
                </p>
                <div className="login-signup-links">
                  <a
                    href="#loginAcct"
                    className="bright-blue fw--700 firstLink"
                    data-toggle="modal"
                    data-target="#loginAcct"
                    data-dismiss="modal"
                  >
                    LOG IN
                  </a>
                  <a
                    href="/"
                    className="bright-blue fw--700"
                    data-toggle="modal"
                    data-target="#signUp1st"
                    data-dismiss="modal"
                  >
                    SIGN UP
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Login Account */}
        <div
          className="modal fade Acct"
          id="loginAcct"
          tabIndex={-1}
          data-focus-on="input:first"
        >
          <div className="modal-dialog">
            {/* Modal content*/}
            <div className="modal-content">
              <div className="modal-header">
                <a href="#/" className="logo">
                  <img src="img/logo.png" alt="" />
                </a>
              </div>
              <div className="modal-body">
                <p>
                  <input placeholder="USERNAME" name="username" />
                </p>
                <p>
                  <input placeholder="PASSWORD" name="password" />
                </p>
                <button type="button" className="btn btn-default fs--12">
                  SIGN IN
                </button>
                <div className="login-signup-links">
                  <a
                    href="/"
                    className="bright-blue firstLink"
                    data-toggle="modal"
                    data-target="#forgotAcct"
                    data-dismiss="modal"
                  >
                    Forgot username
                  </a>
                  <a
                    href="/rstPassword"
                    className="bright-blue"
                    data-toggle="modal"
                    data-target="#forgotAcct"
                    data-dismiss="modal"
                  >
                    Forgot password
                  </a>
                </div>
                <p>
                  New to t?{" "}
                  <a
                    href="/"
                    className="bright-blue"
                    data-toggle="modal"
                    data-target="#signUp1st"
                    data-dismiss="modal"
                  >
                    Sign Up
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* reset Password */}
        <div
          className="modal fade Acct"
          id="rstPassword"
          tabIndex={-1}
          data-focus-on="input:first"
        >
          <div className="modal-dialog">
            {/* Modal content*/}
            <div className="modal-content">
              <div className="modal-header">
                <a href="/" className="logo">
                  <img src="img/logo.png" alt="" />
                </a>
              </div>
              <div className="modal-body">
                <p className="fs--20 fw--700">Reset your password</p>
                <p>
                  Don't worry! You may have forgotten your password, but we can
                  help you out. Enter your username below and we'll email you a
                  link to reset your password.
                </p>
                <p>
                  <input placeholder="USERNAME" name="username" />
                </p>
                <p>
                  <input placeholder="PASSWORD" name="password" />
                </p>
                <button type="button" className="btn btn-default fs--12">
                  EMAIL ME
                </button>
                <a href="/" className="bright-blue fw--700 frgtUsrname">
                  FORGOT USERNAME
                </a>
                <p>
                  If you are having trouble accessing your account, follow{" "}
                  <a href="/" className="bright-blue">
                    this link
                  </a>
                  .
                </p>
                <div className="login-signup-links">
                  <a
                    href="/"
                    className="bright-blue fw--700 firstLink"
                    data-toggle="modal"
                    data-target="#loginAcct"
                    data-dismiss="modal"
                  >
                    LOG IN
                  </a>
                  <a
                    href="/"
                    className="bright-blue fw--700"
                    data-toggle="modal"
                    data-target="#signUp1st"
                    data-dismiss="modal"
                  >
                    SIGN UP
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* sign up */}
        <div
          className="modal fade Acct signup"
          id="signUp1st"
          tabIndex={-1}
          data-focus-on="input:first"
        >
          <div className="modal-dialog">
            {/* Modal content*/}
            <div className="modal-content">
              <button type="button" className="close" data-dismiss="modal">
                ×
              </button>
              <div className="signup-header">
                <a href="/" className="logo">
                  <img src="img/logo.png" alt="" />
                </a>
              </div>
              <div className="signup-body">
                <div className="form">
                  <p>
                    <input placeholder="EMAIL" name="email" />
                  </p>
                  <a
                    href="/"
                    className="bright-blue fw--700 btn btn-default fs--12"
                    data-toggle="modal"
                    data-target="#signUp2nd"
                    data-dismiss="modal"
                  >
                    NEXT
                  </a>
                  <p>
                    Already a t?{" "}
                    <a
                      href="#loginAcct"
                      className="fw--700"
                      data-toggle="modal"
                      data-target="#loginAcct"
                      data-dismiss="modal"
                    >
                      LOG IN
                    </a>
                  </p>
                  <p>
                    By continuing, you agree to our{" "}
                    <a href="/user-agreement">User Agreement</a> and{" "}
                    <a href="/privacy">Privacy Policy</a>
                  </p>
                </div>
              </div>
              <div className="clearfix" />
            </div>
          </div>
        </div>
        <div
          className="modal fade Acct signup"
          id="signUp2nd"
          tabIndex={-1}
          data-focus-on="input:first"
        >
          <div className="modal-dialog">
            {/* Modal content*/}
            <div className="modal-content">
              <div className="modal-header">
                <a href="/" className="logo">
                  <img src="img/logo.png" alt="" />
                </a>
              </div>
              <div className="modal-body">
                <p>
                  <input placeholder="CHOOSE A USERNAME" name="email" />
                </p>
                <p>
                  <input placeholder="PASSWORD" name="phone" />
                </p>
                <img src="img/captcha.jpg" />
              </div>
              <div className="modal-footer">
                <a
                  href="/"
                  className="bright-blue backLink"
                  data-toggle="modal"
                  data-target="#signUp1st"
                  data-dismiss="modal"
                >
                  Back
                </a>
                <a
                  href="/"
                  className="bright-blue fw--700 btn btn-default fs--12 signupLink"
                >
                  SIGN UP
                </a>
                <div className="clearfix" />
              </div>
            </div>
          </div>
        </div>
        {/* end of content */}
        {/* sart of footer */}
        <Footer />
        {/* end of footer */}
      </div>
    </div>
  );
};
export default CreateTest;
