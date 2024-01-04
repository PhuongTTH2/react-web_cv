import { useState } from "react";
import ModalSignin from "./Modal/ModalSignin";
import ModalForgotPassword from "./Modal/ModalForgotPassword";
import ModalForgotUsername from "./Modal/ModalForgotUsername";
import ModalSignUp from "./Modal/ModalSignUp";
import { STORAGE_KEY } from "constants/index";

const Footer = () => {
  const [modalSignin, setModalSignin] = useState(false);
  const [modalForgotPassword, setModalForgotPassword] = useState(false);
  const [modalForgotUsername, setModalForgotUsername] = useState(false);
  const [modalSignUp, setModalSignUp] = useState(false);

  const handleToggleModal = () => {
    handleModalOpen();
  };
  const handleModalOpen = (e) => {
    setModalSignin(false);
    setModalForgotPassword(false);
    setModalForgotUsername(false);
    setModalSignUp(false);
    if (e === "Signin") {
      setModalSignin(true);
    } else if (e === "SignUp") {
      setModalSignUp(true);
    } else if (e === "ForgotUsername") {
      setModalForgotUsername(true);
    } else if (e === "ForgotPassword") {
      setModalForgotPassword(true);
    }
  };
  return (
    <footer>
      {/* start of upper footer */}
      <div className="no-gutters upperFooter">
        <div className="container no-padding-lr">
          <div className="row">
            <div className="col-lg-6 col-md-12 footerLeft">
              <ul className="list-unstyled footerNavigation">
                <li>
                  <a href="/">Home</a>
                </li>
                <li>
                  <a href="/personal_profile">Profile</a>
                </li>
                <li>
                  <a href="/">Directory</a>
                </li>
                <li>
                  <a href="/create-Test">Create</a>
                </li>
                {!localStorage.getItem(STORAGE_KEY.IS_LOGIN) ? (
                  <li>
                    <span
                      onClick={() => {
                        setModalSignin(true);
                      }}
                      style={{ color: "#FFF", cursor: "pointer" }}
                    >
                      Join / Signin
                    </span>
                  </li>
                ) : (
                  ""
                )}
                <li>
                  <a href="/">Message</a>
                </li>
              </ul>
            </div>
            <div className="col-lg-6 col-md-12 text-right footerRight">
              <ul className="list-unstyled">
                <li>t © 2019</li>
                <li>
                  <a href="/terms">· Terms </a>
                </li>
                <li>
                  <a href="/privacy">&nbsp;· Privacy </a>
                </li>
                <li>
                  <a href="/program-policies">&nbsp;· Program Policies</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* end of upper footer */}
      {/* start of lower footer */}
      <ModalSignin
        modalOpen={modalSignin}
        close={handleToggleModal}
        handleModalOpen={handleModalOpen}
      />
      <ModalSignUp
        modalOpen={modalSignUp}
        close={handleToggleModal}
        handleModalOpen={handleModalOpen}
      />
      <ModalForgotPassword
        modalOpen={modalForgotPassword}
        close={handleToggleModal}
        handleModalOpen={handleModalOpen}
      />
      <ModalForgotUsername
        modalOpen={modalForgotUsername}
        close={handleToggleModal}
        handleModalOpen={handleModalOpen}
      />
      <div className="no-gutters lowerFooter">
        <div className="container no-padding-lr">
          <div className="row">
            <div className="col-lg-6 col-md-12 footerlogoWrapper">
              <a href="/">
                <img alt="alt" src="/img/f-logo.png" />
              </a>
            </div>
            <div className="col-lg-6 col-md-12 text-right socialNavigation">
              <ul className="list-unstyled">
                <li>
                  <a href="https://www.youtube.com">
                    <img
                      alt="alt"
                      className="iconasset"
                      src="/img/icons/youtube_96px.png"
                    />
                  </a>
                </li>
                <li>
                  <a href="https://www.instagram.com">
                    <img
                      alt="alt"
                      className="iconasset"
                      src="/img/icons/instagram_96px.png"
                    />
                  </a>
                </li>
                <li>
                  <a href="https://www.pinterest.com">
                    <img
                      alt="alt"
                      className="iconasset"
                      src="/img/icons/pinterest_96px.png"
                    />
                  </a>
                </li>
                <li>
                  <a href="https://twitter.com">
                    <img
                      alt="alt"
                      className="iconasset"
                      src="/img/icons/twitter_squared_96px.png"
                    />
                  </a>
                </li>
                <li>
                  <a href="http://facebook.com">
                    <img
                      alt="alt"
                      className="iconasset"
                      src="/img/icons/facebook_f_96px.png"
                    />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* end of lower footer */}
    </footer>
  );
};

export default Footer;
