import Footer from "../../components/Footer";
import Header from "../../components/Header";
const PleaseRead = ({ handleStep }) => {
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
                  src="/img/icons/search_reverse_96px.png"
                  alt=""
                />
              </button>
            </div>
            <div className="width15">
              <a id="lside-btn" href="/">
                <img src="/img/mmemu_dark_icon.png" alt="" />
              </a>
            </div>
            <div className="clearfix" />
          </div>
        </div>
        {/* end of mobile search bar */}
        {/* start of content */}
        <div id="surveyLayout" className="content">
          <div className="container no-padding-lr">
            <div id="my-pr">
              <h1>IMPORTANT - PLEASE READ!</h1>
              <p>
                We’re excited that you’re creating a new Test on our site!
              </p>
              <p>
                The first step is to create a basic profile so that seekers can
                learn about your Test.
              </p>
              <p>
                Once you’ve created your basic profile, you can then choose
                between:{" "}
              </p>
              <ul>
                <li>
                  Creating the first membership level (with any desired
                  requirements) for your Test.
                </li>
                <li>
                  Completing some or all of our Religious Match Survey which
                  matches seekers to your Test. <br />
                  You can also complete sections of this survey later.
                </li>
                <li>
                  Posting content to your lounge page - the central hub of all
                  your Test’s activity.
                </li>
              </ul>
              <p>We’ll step you through the process, one task at a time. </p>
              <p>
                Please note that you can modify your religious profile, survey
                answers or membership level settings from the administrative
                module link appearing on your Test’s lounge page at any
                time.
              </p>
              <p>
                We also encourage you to create profile entries and more
                extensive writings for your NRM, but for now, the goal is to
                complete as much of your introductory religious profile as
                possible so that seekers can learn about the basic aspects of
                your Test.
              </p>
              <p>
                Remember - The more complete your profile and the more content
                you post, the more followers you’ll get.
              </p>
              <p>
                Are you ready to create your Test? Click the button below to
                begin.
              </p>
              <div className="pr-btns">
                <div className="pr-btn">
                  <a
                    onClick={() => {
                      handleStep(2);
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    Begin Profile Creation
                  </a>
                </div>
              </div>
            </div>
          </div>{" "}
          {/* #my-pr */}
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
                <img src="/img/logo.png" alt="" />
              </a>
            </div>
            <div className="modal-body">
              <p className="fs--20 fw--700">Recover your username</p>
              <p>
                Don't worry! You may have forgotten your username, but we can
                help you out. Enter your email address below and we'll email you
                your username.
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
              <a href="/" className="logo">
                <img src="/img/logo.png" alt="" />
              </a>
            </div>
            <div className="modal-body">
              <p>
                <input placeholder="USERNAME" name="username" />
              </p>
              <p>
                <input name="password" />
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
                  href="#rstPassword"
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
                <img src="/img/logo.png" alt="" />
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
                <img src="/img/logo.png" alt="" />
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
                <img src="/img/logo.png" alt="" />
              </a>
            </div>
            <div className="modal-body">
              <p>
                <input placeholder="CHOOSE A USERNAME" name="email" />
              </p>
              <p>
                <input placeholder="PASSWORD" name="phone" />
              </p>
              <img src="/img/captcha.jpg" alt="" />
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
  );
};
export default PleaseRead;
