import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import { useAppDispatch } from "app/hooks";
import { TestID } from "slices";
import { Modal } from "react-bootstrap";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { uploadFile, deleteFile } from "utils/helper";
import { isEmpty } from "lodash";
import axiosClients from "api/rest/axiosClients";
import apiPosts from "api/rest/apiPosts";

import { authHeaderAndAccount } from "api/rest/header";
const ModalCommunication = ({
  modalCommunication,
  handleCloseModal,
  handleModalSave,
}) => {
  const dispatch = useAppDispatch();
  let { Test_id } = useParams();

  const [checkBoxCommunication, setCheckBoxCommunication] = useState(false);
  const [progressBar, setProgressBar] = useState(false);
  const [arrayFileCommunication, setArrayFileCommunication] = useState([]);

  const defaultValuesCommunication = {
    desc: "",
    path: "",
    files: [""],
  };

  const schemaCommunication = yup.object().shape({
    desc: yup
      .string()
      .required("Communication is required")
      .max(40)
      .label("Communication"),
    path: yup.string().required("Add Video/Images/file is required"),
  });
  const [errorValidateCommunication, setErrorValidateCommunication] =
    useState("");

  const formCommunication = useForm({
    defaultValues: defaultValuesCommunication,
    resolver: yupResolver(schemaCommunication),
  });

  useEffect(() => {
    if (Test_id) {
      dispatch(TestID(Test_id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Test_id]);

  useEffect(() => {
    if (formCommunication.formState.errors) {
      setErrorValidateCommunication(formCommunication.formState.errors);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formCommunication.formState.errors]);

  const handleCloseModalCommunication = () => {
    setErrorValidateCommunication("");
    setArrayFileCommunication([]);
    formCommunication.setValue("desc", "");
    formCommunication.setValue("files", [""]);
    setCheckBoxCommunication(false);
    handleCloseModal();
  };

  const handleUploadFileS3 = async (event) => {
    setProgressBar(true);
    const file = event.target.files[0];
    let infoPath = await uploadFile(Test_id, file);
    setArrayFileCommunication([
      ...arrayFileCommunication,
      { file: file, path: infoPath.Location, key: infoPath.key },
    ]);
    formCommunication.setValue("path", infoPath.Location);

    setProgressBar(false);
  };

  const handleRemoveRowUploadFile = async (item, index) => {
    await deleteFile(item);
    let newArrayFileCommunication = arrayFileCommunication.filter(
      (value, i) => i !== index
    );
    setArrayFileCommunication(newArrayFileCommunication);
    if (newArrayFileCommunication) {
      formCommunication.setValue("path", newArrayFileCommunication[0]);
    } else {
      formCommunication.setValue("path", "");
    }
  };

  const handleSubmitCommunication = async (inputs) => {
    let arrayPath = [];
    arrayFileCommunication.forEach((item) => {
      arrayPath.push(String(item.path));
    });
    const res = await axiosClients.post(
      apiPosts.createCommunication,
      {
        Test_id: Test_id,
        communication: {
          desc: inputs.desc,
          files: arrayPath,
          is_co_post: checkBoxCommunication,
        },
      },
      {
        headers: authHeaderAndAccount(),
      }
    );

    if (res.message === "ok") {
      handleCloseModal();
      handleModalSave();
    } else {
    }
  };

  return (
    <Modal
      show={modalCommunication}
      onHide={handleCloseModalCommunication}
      size="lg"
      className="ModelLounge"
      style={{ maxWidth: "100%" }}
    >
      {/* Modal content*/}
      <div id="comWrapper" className="modal-content">
        <div className="card-header text-center">
          <span className="colorLightBlue fs--16">
            <strong>Communication</strong>
          </span>
          <div style={{ position: "absolute", top: "15px", right: "20px" }}>
            <button
              style={{ color: "#395898" }}
              type="button"
              className="close"
              onClick={() => {
                handleCloseModalCommunication();
              }}
            >
              ×
            </button>
          </div>
        </div>
        <div className="modal-body">
          <div className="create-cont">
            <div className="create-inner">
              <textarea
                style={{
                  border: isEmpty(errorValidateCommunication?.desc)
                    ? ""
                    : "solid 1px #ff0000",
                }}
                type="text"
                placeholder="Describe the main purpose of the poll in 300 characters or less."
                name="desc"
                {...formCommunication.register("desc")}
                onChange={(e) =>
                  formCommunication.setValue("desc", e.target.value)
                }
              />
              {errorValidateCommunication.desc && (
                <span className="error-login">
                  {errorValidateCommunication.desc.message}
                </span>
              )}
            </div>
            <div className="create-inner addButton ">
              {progressBar ? (
                <div className="progress blueBar">
                  <div className="progress-bar" style={{ width: "59%" }}>
                    59%
                  </div>
                </div>
              ) : (
                <label className="custom-file-upload">
                  <input
                    type="file"
                    accept="*"
                    style={{ display: "none" }}
                    alt="Upload"
                    onChange={(e) => handleUploadFileS3(e)}
                  />
                  <img src="/img/icon-add.png" alt="" /> Add Video/Images/file
                </label>
              )}
              {errorValidateCommunication.path && (
                <div className="create-inner addButton">
                  <span className="error-login">
                    {errorValidateCommunication.path.message}
                  </span>
                </div>
              )}
            </div>

            {arrayFileCommunication.length !== 0 && (
              <div className="create-inner addButton">
                <label className="custom-file-upload">List of Files</label>
                {arrayFileCommunication.map((item, index) => (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      textAlign: "start",
                    }}
                  >
                    <div
                      style={{
                        width: "150px",
                      }}
                      className="custom-file-upload"
                    >
                      {item.file.name}
                    </div>
                    <div className="">
                      <span
                        class="pointerA"
                        onClick={() => handleRemoveRowUploadFile(item, index)}
                      >
                        <img
                          alt="alt"
                          style={{ width: "12px", height: "12px" }}
                          src="/img/wrong-red-icon.png"
                        />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="create-inner pb--20">
              <label>
                <input
                  type="checkbox"
                  checked={checkBoxCommunication}
                  onClick={() =>
                    setCheckBoxCommunication(!checkBoxCommunication)
                  }
                />{" "}
                &nbsp;&nbsp; Co-post image, video or file to Resource Archives
              </label>
            </div>
            <div className="create-inner f--width"></div>

            <div className="f--width text-center">
              <button
                type="button"
                onClick={formCommunication.handleSubmit(
                  handleSubmitCommunication
                )}
                className="btn bg--defaultBlue text-white padding--lr40"
                disabled={formCommunication.formState.isSubmitting}
                style={{ marginTop: "20px" }}
              >
                POST
              </button>
            </div>
            <div className="clearfix" />
          </div>
        </div>
        <div className="clearfix" />
      </div>
    </Modal>
  );
};

export default ModalCommunication;
