import React, { useState, useEffect } from "react";
import "./MainContent.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { modules, formats } from "components/common/EditorToolbar";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { isEmpty } from "lodash";
import axiosClients from "api/rest/axiosClients";
import { authHeaderAndAccount } from "api/rest/header";

const MainContent = ({
  TestId,
  bookId,
  bookTitle,
  bookCreate,
  chapterId,
  topicId,
  activeChapter,
  handleTopicSave,
  handleEditBook,
}) => {
  const [content, setContent] = useState("");
  const [errorValidate, setErrorValidate] = React.useState("");

  const defaultValues = {
    title: "",
    content: "",
  };

  const schema = yup.object().shape({
    title: yup.string().required("Title is required"),
    content: yup.string().required("Content is required"),
  });

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

  useEffect(() => {
    form.setValue("title", "");
    form.setValue("content", "");
    setContent("");
    setErrorValidate("");
    if (topicId) {
      form.setValue("title", activeChapter.title);
      form.setValue("content", activeChapter.content);
      setContent(activeChapter.content);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topicId, chapterId]);

  const onContent = (value) => {
    if (value !== "<p><br></p>") {
      setContent(value);
      form.setValue("content", value);
    }
  };

  const handleAddTopicSave = async (inputs) => {
    const res = await axiosClients.post(
      `/book/${bookId}/topic`,
      {
        Test_id: TestId,
        chapter_id: chapterId,
        title: inputs.title,
        content: inputs.content,
      },
      {
        headers: authHeaderAndAccount(),
      }
    );
    if (res.message === "ok") {
      form.setValue("title", "");
      form.setValue("content", "");
      setContent("");
      handleTopicSave();
    } else {
    }
  };

  const handleAddTopicEdit = async (inputs) => {
    const res = await axiosClients.put(
      `/book/${bookId}/topic`,
      {
        Test_id: TestId,
        chapter_id: chapterId,
        topic_id: topicId,
        title: inputs.title,
        content: inputs.content,
      },
      {
        headers: authHeaderAndAccount(),
      }
    );
    if (res.message === "ok") {
      handleTopicSave();
    } else {
    }
  };

  return (
    <div className="width820">
      <div className="card pb--50">
        <div className="card-header">
          <a href="/" className="printBook text-white hideOnSmallView">
            <img alt="alt" src="/img/print_icon.png" />
            &nbsp;&nbsp; Print Book
          </a>
          <a href="/" className="dlPDF text-white ml--30 hideOnSmallView">
            <img alt="alt" src="/img/download_pdf.png" />
            &nbsp;&nbsp; Download Book as PDF
          </a>
          <div className="text-right showOnSmallView">
            <a
              href="/"
              className="dlPDF text-white ml--30 showOnSmallView"
              title="Download Book as PDF"
            >
              <img alt="alt" src="/img/download_pdf.png" />
            </a>
            <a
              href="/"
              className="printBook text-white showOnSmallView"
              title="Print Book"
            >
              <img alt="alt" src="/img/print_icon.png" />
            </a>
          </div>
          <div className="clearfix" />
        </div>
        <div className="card-body">
          <div className="cardContent">
            <div className="headerHolder float-left">
              <h2>{bookTitle}</h2>
              <p className="author">
                (by{" "}
                <a href="/" className="colorLightBlue">
                  {bookCreate})
                </a>
              </p>
            </div>
            <button
              className="btn btn-round bg--defaultBlue text-white float-right editBookBtn"
              onClick={() => handleEditBook()}
            >
              <img alt="alt" src="/img/edit_book_pencil.png" /> Edit this book
            </button>
            <div className="clearfix" />
          </div>

          <div className="innerCardWrapper mt--10">
            <div className="card">
              <div className="card-body">
                <p
                  className={`${
                    !isEmpty(errorValidate?.title) ? "error-title" : ""
                  }`}
                >
                  <input
                    className=" fs--20 titleTopic"
                    type="text"
                    placeholder=" Enter a title"
                    name="title"
                    {...form.register("title")}
                    onChange={(e) => form.setValue("title", e.target.value)}
                  />

                  {errorValidate.title && (
                    <span className="error-login">
                      {errorValidate.title.message}
                    </span>
                  )}
                </p>
              </div>
              <div className="editContentWrapper card-body active">
                <ReactQuill
                  theme="snow"
                  value={content}
                  onChange={onContent}
                  placeholder={"Write something awesome..."}
                  modules={modules}
                  formats={formats}
                />
              </div>

              {/* <div className="editContentWrapper card-body active">
                <CustomEditor initialValue="" />
              </div> */}
            </div>
            {errorValidate.content && (
              <span className="error-login">
                {errorValidate.content.message}
              </span>
            )}
          </div>
        </div>
        <div className="text-center">
          {isEmpty(topicId) ? (
            <button
              className="btn btn-round bg--defaultBlue text-white"
              onClick={form.handleSubmit(handleAddTopicSave)}
              disabled={form.formState.isSubmitting}
            >
              Save
            </button>
          ) : (
            <button
              className="btn btn-round bg--defaultBlue text-white"
              onClick={form.handleSubmit(handleAddTopicEdit)}
              disabled={form.formState.isSubmitting}
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainContent;
