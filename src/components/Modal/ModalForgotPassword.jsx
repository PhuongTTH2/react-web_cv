import { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import axiosNoAuth from "api/rest/axiosNoAuth";
import apiPosts from "api/rest/apiPosts";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { isEmpty } from "lodash";

const ModalForgotPassword = ({ modalOpen, close, handleModalOpen }) => {
  const [errorValidate, setErrorValidate] = useState("");
  const [errorEmail, setErrorEmail] = useState("");

  const [show, setShow] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const [openEmail, setOpenEmail] = useState(false);
  const [openNewPassword, setOpenNewPassword] = useState(false);

  const [errorValidateNewPassword, setErrorValidateNewPassword] = useState("");
  const [errorNewPassword, setErrorNewPassword] = useState("");

  const [username, setUsername] = useState("");
  const schema = yup.object().shape({
    email: yup.string().required("Email is required").email().label("Email"),
  });

  const defaultValues = {
    email: "",
  };

  const schemaNewPassword = yup.object().shape({
    password: yup
      .string()
      .required("Password is required")
      .min(7)
      .matches(
        /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[!@#$&*])/,
        "Password include at least one letter each for uppercase letters, lowercase letters, special characters and numbers"
      )
      .label("Password"),
    newPassword: yup
      .string()
      .required("New password is required")
      .oneOf([yup.ref("password"), null], "Passwords must match"),
    code: yup.string().required("Code is required"),
  });
  const form = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (modalOpen) {
      setOpenEmail(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalOpen]);

  useEffect(() => {
    if (form.formState.errors) {
      setErrorValidate(form.formState.errors);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.formState.errors]);

  const defaultValuesNewPassword = {
    password: "",
    newPassword: "",
    code: "",
  };
  const formNewPassword = useForm({
    defaultValues: defaultValuesNewPassword,
    resolver: yupResolver(schemaNewPassword),
  });
  useEffect(() => {
    if (formNewPassword.formState.errors) {
      setErrorValidateNewPassword(formNewPassword.formState.errors);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formNewPassword.formState.errors]);
  const handleBack = () => {
    setOpenEmail(true);
    setOpenNewPassword(false);
    setShowNewPassword(false);
    formNewPassword.setValue("password", "");
    formNewPassword.setValue("newPassword", "");
    formNewPassword.setValue("code", "");
    setErrorValidateNewPassword("");
  };
  const handleModalClose = (e) => {
    setShow(false);
    setShowNewPassword(false);
    setOpenEmail(false);
    setOpenNewPassword(false);

    handleModalOpen(e);
  };
  const handleEmail = async (inputs) => {
    const data = await axiosNoAuth.post(apiPosts.forgotPasswordInitiateEmail, {
      email: inputs.email,
    });

    if (data.message === "ok") {
      setOpenEmail(false);
      setOpenNewPassword(true);
      setUsername(data.username);
      setShow(false);
      setErrorEmail("");
    } else {
      setShow(true);
      setErrorEmail(data.message);
    }
  };

  const handleNewPassword = async (inputs) => {
    const data = await axiosNoAuth.post(apiPosts.forgotPasswordChange, {
      username: username,
      password: inputs.password,
      code: inputs.code,
    });

    if (data.message === "ok") {
      alert("Password reset successful");
      setShowNewPassword(false);
      setErrorNewPassword("");
      handleModalOpen();
      handleModalClose();
    } else {
      setShowNewPassword(true);
      setErrorNewPassword(data.message);
    }
  };
  return openEmail ? (
    <Modal
      show={openEmail}
      className="Acct"
      onHide={handleModalClose}
      size="lg"
    >
      <div className="modal-header">
        <a href="/" className="logo">
          <img alt="alt" src="img/logo.png" />
        </a>
      </div>
      <div className="modal-body">
        {show ? (
          <>
            <div class="alert alert-danger alert-dismissible">
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
        <p className="fs--20 fw--700">Recover your password</p>
        <p>
          Don't worry! You may have forgotten your password, but we can help you
          out. Enter your email address below and we'll email you your
          verification code to reset it.
        </p>
        <p
          className={`${!isEmpty(errorValidate?.email) ? "error-border" : ""}`}
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
          className="btn btn-default fs--12"
          onClick={form.handleSubmit(handleEmail)}
          disabled={form.formState.isSubmitting}
        >
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
          <span
            onClick={() => {
              handleModalOpen("Signin");
            }}
            class="bright-blue fw--700 firstLink pointerA"
          >
            LOG IN
          </span>
          <span
            onClick={() => {
              handleModalOpen("SignUp");
            }}
            class="bright-blue fw--700 pointerA"
          >
            SIGN UP
          </span>
        </div>
      </div>
    </Modal>
  ) : openNewPassword ? (
    <Modal
      show={openNewPassword}
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
          {showNewPassword ? (
            <>
              <div
                class="alert alert-danger alert-dismissible"
                style={{ height: "50px" }}
              >
                <span
                  onClick={() => setShowNewPassword(false)}
                  class="close"
                  data-dismiss="alert"
                  aria-label="close"
                  style={{ margin: "0px" }}
                >
                  &times;
                </span>
                <strong> {errorNewPassword}</strong>
                <br />
              </div>
            </>
          ) : (
            ""
          )}

          <p
            className={`${
              !isEmpty(errorValidateNewPassword?.password) ? "error-border" : ""
            }`}
          >
            <input
              placeholder="PASSWORD"
              type="password"
              name="password"
              onChange={(e) =>
                formNewPassword.setValue("password", e.target.value)
              }
            />
            {errorValidateNewPassword.password && (
              <span className="error-login">
                {errorValidateNewPassword.password.message}
              </span>
            )}
          </p>
          <p
            className={`${
              !isEmpty(errorValidateNewPassword?.newPassword)
                ? "error-border"
                : ""
            }`}
          >
            <input
              placeholder="NEW PASSWORD"
              type="password"
              name="newPassword"
              onChange={(e) =>
                formNewPassword.setValue("newPassword", e.target.value)
              }
            />
            {errorValidateNewPassword.newPassword && (
              <span className="error-login">
                {errorValidateNewPassword.newPassword.message}
              </span>
            )}
          </p>
          <p
            className={`${
              !isEmpty(errorValidateNewPassword?.code) ? "error-border" : ""
            }`}
          >
            <input
              placeholder="CODE"
              name="code"
              onChange={(e) => formNewPassword.setValue("code", e.target.value)}
            />
            {errorValidateNewPassword.code && (
              <span className="error-login">
                {errorValidateNewPassword.code.message}
              </span>
            )}
          </p>
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
            onClick={formNewPassword.handleSubmit(handleNewPassword)}
            className="btn btn-default fs--12 signupLink"
            disabled={formNewPassword.formState.isSubmitting}
          >
            RESET PASSWORD
          </button>

          <div class="clearfix"></div>
        </div>
      </div>
    </Modal>
  ) : (
    ""
  );
};

export default ModalForgotPassword;
