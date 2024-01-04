import React, { useEffect } from "react";
import { Modal } from "react-bootstrap";
import axiosNoAuth from "api/rest/axiosNoAuth";
import apiPosts from "api/rest/apiPosts";
import Recaptcha from "react-recaptcha";

import { useNavigate } from "react-router";
import { pathName } from "constants/index";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { isEmpty } from "lodash";
import { STORAGE_KEY } from "constants/index";

const ModalSignUp = ({ modalOpen, close, handleModalOpen }) => {
  const navigate = useNavigate();
  const [openEmail, setOpenEmail] = React.useState(false);
  const [openUser, setOpenUser] = React.useState(false);
  const [openCode, setOpenCode] = React.useState(false);

  const [errorValidate, setErrorValidate] = React.useState("");
  const [errorValidateSignUp, setErrorValidateSignUp] = React.useState("");
  const [errorEmail, setErrorEmail] = React.useState("");
  const [errorSignUp, setErrorSignUp] = React.useState("");
  const [errorCode, setErrorCode] = React.useState("");

  const [show, setShow] = React.useState(false);
  const [showSignUp, setShowSignUp] = React.useState(false);
  const [showCode, setShowCode] = React.useState(false);

  const [code, setCode] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [captcha, setCaptcha] = React.useState(false);
  const [isDisabled, setIsDisabled] = React.useState(false);

  const schema = yup.object().shape({
    email: yup.string().required("Email is required").email().label("Email"),
  });

  const schemaSignUp = yup.object().shape({
    username: yup
      .string()
      .required("Username is required")
      .min(6)
      .label("Username"),
    password: yup
      .string()
      .required("Password is required")
      .min(7)
      .matches(
        /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[!@#$&*])/,
        "Password include at least one letter each for uppercase letters, lowercase letters, special characters and numbers"
      )
      .label("Password"),
  });

  const defaultValues = {
    email: "",
  };

  const form = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (form.formState.errors) {
      setErrorValidate(form.formState.errors);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.formState.errors]);

  const defaultValuesSignUp = {
    username: "",
    password: "",
  };

  const formSignUp = useForm({
    defaultValues: defaultValuesSignUp,
    resolver: yupResolver(schemaSignUp),
  });

  useEffect(() => {
    if (formSignUp.formState.errors) {
      setErrorValidateSignUp(formSignUp.formState.errors);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formSignUp.formState.errors]);

  useEffect(() => {
    if (modalOpen) {
      setOpenEmail(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalOpen]);

  const handleEmail = async (inputs) => {
    const data = await axiosNoAuth.post(apiPosts.signUpValidateEmail, {
      email: inputs.email,
    });

    if (data.message === "ok") {
      setOpenEmail(false);
      setOpenUser(true);
      setOpenCode(false);
      setEmail(inputs.email);
      setShow(false);
      setErrorEmail("");
    } else {
      setShow(true);
      setErrorEmail(data.message);
    }
  };

  const handleSignUp = async (inputs) => {
    if (captcha) {
      const data = await axiosNoAuth.post(apiPosts.signUp, {
        username: inputs.username,
        email: email,
        password: inputs.password,
      });
      if (data.message === "ok") {
        setOpenCode(true);
        setOpenUser(false);
        setOpenEmail(false);
        setShowSignUp(false);
        setErrorSignUp("");
      } else {
        setShowSignUp(true);
        setErrorSignUp(data.message);
      }
    } else {
      alert("Please verify that you are a human!");
    }
  };

  const handleCode = async () => {
    setIsDisabled(true);
    const data = await axiosNoAuth.post(apiPosts.signUpConfirm, {
      username: formSignUp.getValues("username"),
      password: formSignUp.getValues("password"),
      code: code,
    });
    if (data.message === "ok") {
      localStorage.setItem(
        STORAGE_KEY.EXPIRES_IN,
        Number(Date.now() / 1000) + Number(86400)
      );
      localStorage.setItem(STORAGE_KEY.ACCESS_TOKEN, data.AccessToken);
      localStorage.setItem(STORAGE_KEY.REFRESH_TOKEN, data.RefreshToken);
      localStorage.setItem(
        STORAGE_KEY.USER_CURRENT,
        formSignUp.getValues("username")
      );
      localStorage.setItem(STORAGE_KEY.IS_LOGIN, true);
      handleModalOpen();
      navigate(pathName.PERSONAL_PROFILE);
      window.location.reload();
    } else {
      setShowCode(true);
      setIsDisabled(false);
      setErrorCode(data.message);
    }
  };

  const handleBack = () => {
    setOpenEmail(true);
    setOpenUser(false);
    formSignUp.setValue("username", "");
    formSignUp.setValue("password", "");
    setErrorSignUp("");
    setErrorValidateSignUp("");
    setCaptcha(false);
  };

  const handleModalClose = (e) => {
    setOpenEmail(false);
    setOpenUser(false);
    handleModalOpen(e);
  };

  const recaptchaLoaded = () => {};
  const verifyCallback = (response) => {
    if (response) {
      setCaptcha(true);
    }
  };

  return openEmail ? (
    <Modal
      show={openEmail}
      className="Acct signup"
      onHide={handleModalClose}
      size="lg"
    >
      <div class="Acct signup" id="signUp1st">
        <span
          onClick={() => {
            handleModalClose();
          }}
          class="closeSignup pointerA"
        >
          {" "}
          &times;
        </span>

        <div class="signup-header">
          <a href="/" class="logo">
            <img src="img/logo.png" alt="alt" />
          </a>
        </div>
        <div class="signup-body">
          {show ? (
            <>
              <div
                class="alert alert-danger alert-dismissible"
                //  style={{height: '40px'}}
              >
                <span
                  onClick={() => setShow(false)}
                  class="close"
                  data-dismiss="alert"
                  aria-label="close"
                  style={{ margin: "0px" }}
                >
                  &times;
                </span>
                <strong> {errorEmail}</strong>
                <br />
              </div>
            </>
          ) : (
            ""
          )}
          <p
            className={`${
              !isEmpty(errorValidate?.email) ? "error-border" : ""
            }`}
          >
            <input
              placeholder="EMAIL"
              name="email"
              onChange={(e) => form.setValue("email", e.target.value)}
            />
            {errorValidate.email && (
              <span className="error-login">{errorValidate.email.message}</span>
            )}
          </p>
          <button
            type="button"
            onClick={form.handleSubmit(handleEmail)}
            className="btn btn-default fs--12"
            disabled={form.formState.isSubmitting}
          >
            NEXT
          </button>
          <p>
            Already a t?
            <span
              onClick={() => {
                handleModalClose("Signin");
              }}
              class="fw--700 pl--10 bright-blue pointerA"
            >
              LOG IN
            </span>
          </p>
          <p>
            By continuing, you agree to our{" "}
            <a href="/user-agreement">User Agreement</a> and{" "}
            <a href="/privacy">Privacy Policy</a>
          </p>
        </div>

        <div class="clearfix"></div>
      </div>
    </Modal>
  ) : openUser ? (
    <Modal
      show={openUser}
      className="Acct signup"
      onHide={handleModalClose}
      size="lg"
    >
      <div class="Acct signup" id="signUp2nd">
        <div class="modal-header">
          <a href="/" class="logo">
            <img src="img/logo.png" alt="alt" />
          </a>
        </div>
        <div class="modal-body">
          {showSignUp ? (
            <>
              <div
                class="alert alert-danger alert-dismissible"
                style={{ height: "50px" }}
              >
                <span
                  onClick={() => setShowSignUp(false)}
                  class="close"
                  data-dismiss="alert"
                  aria-label="close"
                  style={{ margin: "0px" }}
                >
                  &times;
                </span>
                <strong> {errorSignUp}</strong>
                <br />
              </div>
            </>
          ) : (
            ""
          )}

          <p
            className={`${
              !isEmpty(errorValidateSignUp?.username) ? "error-border" : ""
            }`}
          >
            <input
              placeholder="CHOOSE A USERNAME"
              name="username"
              onChange={(e) => formSignUp.setValue("username", e.target.value)}
            />
            {errorValidateSignUp.username && (
              <span className="error-login">
                {errorValidateSignUp.username.message}
              </span>
            )}
          </p>
          <p
            className={`${
              !isEmpty(errorValidateSignUp?.password) ? "error-border" : ""
            }`}
          >
            <input
              placeholder="PASSWORD"
              type="password"
              name="password"
              onChange={(e) => formSignUp.setValue("password", e.target.value)}
            />
            {errorValidateSignUp.password && (
              <span className="error-login">
                {errorValidateSignUp.password.message}
              </span>
            )}
          </p>

          <Recaptcha
            sitekey="6Le33uogAAAAAACjeWmtMmhSBSNZtpqNUA9spxmq"
            render="explicit"
            onloadCallback={recaptchaLoaded}
            verifyCallback={verifyCallback}
          />
        </div>
        <div class="modal-footer">
          <span
            onClick={() => handleBack()}
            class="bright-blue backLink"
            style={{ cursor: "pointer" }}
          >
            Back
          </span>

          <button
            type="button"
            onClick={formSignUp.handleSubmit(handleSignUp)}
            className="btn btn-default fs--12 signupLink"
            disabled={formSignUp.formState.isSubmitting}
          >
            SIGN UP
          </button>

          <div class="clearfix"></div>
        </div>
      </div>
    </Modal>
  ) : openCode ? (
    <Modal
      show={openCode}
      className="Acct signup"
      onHide={handleModalClose}
      size="lg"
    >
      <div class="Acct signup" id="signUp1st">
        <div class="signup-header">
          <a href="/" class="logo">
            <img src="img/logo.png" alt="alt" />
          </a>
        </div>
        <div class="signup-body">
          {showCode ? (
            <>
              <div
                class="alert alert-danger alert-dismissible"
                //  style={{height: '40px'}}
              >
                <span
                  onClick={() => setShowCode(false)}
                  class="close"
                  data-dismiss="alert"
                  aria-label="close"
                  style={{ margin: "0px" }}
                >
                  &times;
                </span>
                <strong> {errorCode}</strong>
                <br />
              </div>
            </>
          ) : (
            ""
          )}
          <p>
            <input
              placeholder="Code"
              name="code"
              onChange={(e) => setCode(e.target.value)}
              value={code}
            />
          </p>
          <button
            type="button"
            onClick={handleCode}
            disabled={isDisabled}
            className="btn btn-default fs--12"
          >
            Confirm
          </button>
        </div>

        <div class="clearfix"></div>
      </div>
    </Modal>
  ) : (
    ""
  );
};

export default ModalSignUp;
