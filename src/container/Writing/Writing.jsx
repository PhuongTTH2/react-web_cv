import React, { useState, useEffect } from "react";
import MainContent from "components/Writing/MainContent";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Modal } from "react-bootstrap";
import axiosClients from "api/rest/axiosClients";
import { authHeaderAndAccount } from "api/rest/header";
import { useParams } from "react-router-dom";
import apiPosts from "api/rest/apiPosts";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { isEmpty } from "lodash";

const Page = () => {
  let { Test_id } = useParams();
  const [editBook, setEditBook] = useState(false);
  const [activeChapter, setActiveChapter] = useState({});
  const [getBook, setGetBook] = useState([]);
  const [listBook, setListBook] = useState([]);
  const [bookId, setBookId] = useState("");
  const [chapterId, setChapterId] = useState("");
  const [topicId, setTopicId] = useState("");
  const [upDown, setUpDown] = useState([true, true]);
  const [modalBook, setModalBook] = useState(false);
  const [modalChapter, setModalChapter] = useState(false);
  const [addEditTopic, setAddEditTopic] = useState(false);
  const [bookTitle, setBookTitle] = useState("");
  const [bookCreate, setBookCreate] = useState("");
  const [bookSelect, setBookSelect] = useState(0);
  const [errorValidate, setErrorValidate] = React.useState("");
  const [errorValidateChapter, setErrorValidateChapter] = React.useState("");
  const [bookCallUseEffect, setBookCallUseEffect] = useState(true);
  const [chapterCallUseEffect, setChapterCallUseEffect] = useState(false);
  const schema = yup.object().shape({
    bookTitle: yup.string().required("Book Title is required"),
  });
  const schemaChapter = yup.object().shape({
    chapter: yup.string().required("Chapter Title is required"),
  });

  const defaultValues = {
    bookTitle: "",
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

  const defaultValuesChapter = {
    chapter: "",
  };

  const formChapter = useForm({
    defaultValues: defaultValuesChapter,
    resolver: yupResolver(schemaChapter),
  });

  useEffect(() => {
    if (formChapter.formState.errors) {
      setErrorValidateChapter(formChapter.formState.errors);
    }
  }, [formChapter.formState.errors]);

  useEffect(() => {
    (async () => {
      if (bookCallUseEffect) {
        let data = await axiosClients.get(`/Test/${Test_id}/books`, {
          headers: authHeaderAndAccount(),
        });

        setListBook(data.data);
        if (!isEmpty(data.data)) {
          let dataFirst = await axiosClients.get(
            `/book/${data.data[0].book_id}/menu-contents/${data.data[0].Test_id}`,
            {
              headers: authHeaderAndAccount(),
            }
          );

          if (dataFirst.message === "ok") {
            setBookId(data.data[0].book_id);
            setBookTitle(data.data[0].title);
            setBookCreate(data.data[0].created_by);
            setGetBook(dataFirst.data);
          }
        }
        setBookCallUseEffect(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookCallUseEffect]);

  useEffect(() => {
    (async () => {
      if (chapterCallUseEffect) {
        let data = await axiosClients.get(
          `/book/${bookId}/menu-contents/${Test_id}`,
          {
            headers: authHeaderAndAccount(),
          }
        );

        if (data.message === "ok") {
          setGetBook(data.data);
        }
        setChapterCallUseEffect(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chapterCallUseEffect]);

  const handleBookSelect = async (book, index) => {
    setAddEditTopic(false);
    await listBook.forEach((item) => {
      if (item.book_id === book.book_id) {
        setBookTitle(item.title);
        setBookCreate(item.created_by);
      }
    });
    let data = await axiosClients.get(
      `/book/${book.book_id}/menu-contents/${book.Test_id}`,
      {
        headers: authHeaderAndAccount(),
      }
    );

    if (data.message === "ok") {
      setBookId(book.book_id);
      setGetBook(data.data);
    }

    setBookSelect(index);
  };

  const handleClose = () => {
    setErrorValidate("");
    setErrorValidateChapter("");
    setModalBook(false);
    setModalChapter(false);
  };

  const handleCreateBook = async () => {
    form.setValue("bookTitle", "");
    setModalBook(true);
    setEditBook(false);
  };

  const handleCreateBookSave = async (inputs) => {
    const res = await axiosClients.post(
      apiPosts.book,
      {
        Test_id: Test_id,
        title: inputs.bookTitle,
      },
      {
        headers: authHeaderAndAccount(),
      }
    );

    if (res.message === "ok") {
      setBookSelect(0);
      setAddEditTopic(false);
      setBookCallUseEffect(true);
    } else {
    }

    setErrorValidate("");
    form.setValue("bookTitle", "");
    setModalBook(false);
  };

  const handleEditBook = () => {
    form.setValue("bookTitle", bookTitle);
    setModalBook(true);
    setEditBook(true);
  };

  const handleEditBookSave = async (inputs) => {
    const res = await axiosClients.put(
      `/book/${bookId}`,
      {
        Test_id: Test_id,
        title: inputs.bookTitle,
      },
      {
        headers: authHeaderAndAccount(),
      }
    );
    if (res.message === "ok") {
      setBookTitle(inputs.bookTitle);
      let newListBook = [...listBook];
      newListBook[bookSelect].title = res.data.title;
      setListBook(newListBook);
    } else {
    }
    setErrorValidate("");
    form.setValue("bookTitle", "");
    setModalBook(false);
  };

  const handleAddChapter = () => {
    setModalChapter(true);
  };

  const handleAddChapterSave = async (inputs) => {
    const res = await axiosClients.post(
      `/book/${bookId}/chapter`,
      {
        Test_id: Test_id,
        title: inputs.chapter,
      },
      {
        headers: authHeaderAndAccount(),
      }
    );

    if (res.message === "ok") {
      setChapterCallUseEffect(true);
    } else {
    }

    setErrorValidateChapter("");
    formChapter.setValue("chapter", "");
    setModalChapter(false);
  };

  const handleAddTopic = (item) => {
    setChapterId(item.chapter_id);
    setTopicId("");
    setActiveChapter({});
    setAddEditTopic(true);
  };

  const handleEditTopic = async (chapterId, topicId) => {
    const res = await axiosClients.get(
      `/book/${bookId}/${chapterId}/topic/${topicId}/${Test_id}`,
      {
        headers: authHeaderAndAccount(),
      }
    );
    if (res.message === "ok") {
      setActiveChapter(res.data);
    }

    setChapterId(chapterId);
    setTopicId(topicId);
    setAddEditTopic(true);
  };

  const handleTopicSave = () => {
    setChapterCallUseEffect(true);
  };

  const handleUpDown = (index, value) => {
    let newUpDown = [...upDown];
    newUpDown[index] = value;
    setUpDown(newUpDown);
  };

  return (
    <div id="main">
      {/* start of header */}
      <Header />
      {/* end of header */}

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
      <div
        id="twoColumnLayout"
        className="content"
        style={{ height: "calc(100vh - 300px)" }}
      >
        <div className="container no-padding-lr">
          <div id="sidebarleft" className="div306 leftSideBar">
            <div className="sidebar-x">
              <a id="lside-btn-x" href="/">
                x
              </a>
            </div>
            <div className="sibar-inner-wrapper">
              <div className="card cardWrapper slt-book">
                <div className="card-header">Select or create a book:</div>
                <div className="card-body">
                  <div className="cardContent">
                    <ul className="list-unstyled">
                      {!isEmpty(listBook)
                        ? listBook.map((book, index) => {
                            return (
                              <li>
                                <span
                                  className={`fw--700 pointerA ${
                                    bookSelect === index
                                      ? "colorLightGreen"
                                      : "colorLightBlue"
                                  } `}
                                  onClick={() => handleBookSelect(book, index)}
                                >
                                  Book {index + 1} : {book?.title}
                                </span>
                              </li>
                            );
                          })
                        : "No Book"}
                    </ul>
                  </div>
                  <div className="text-center mt--5">
                    <span
                      onClick={handleCreateBook}
                      className="btn btn-small btn-round bg--defaultBlue text-white"
                    >
                      + Create Book
                    </span>
                  </div>
                </div>
              </div>
              <div className="card mt--5 tbl-contents">
                <div className="card-header">Table of Contents</div>
                <div className="card-body">
                  {!isEmpty(listBook) ? (
                    <span
                      onClick={handleAddChapter}
                      className="d-block mb--5 colorLightBlue pointerA "
                    >
                      + Add Chapter
                    </span>
                  ) : (
                    ""
                  )}
                  {!isEmpty(getBook)
                    ? getBook?.map((item, indexChapter) => {
                        const { topics } = item;
                        return (
                          <div className="cardContent" key={indexChapter}>
                            <div className="wrapThisTable">
                              <table className="table table-borderless mb--8">
                                <thead>
                                  <tr>
                                    <th
                                      style={{ minWidth: 75 }}
                                      className="colorLightGray"
                                    >
                                      Chapter {indexChapter + 1}
                                    </th>
                                    <th className="colorGray">
                                      {item?.title}

                                      <span
                                        className="pl--10 pointerA"
                                        onClick={() =>
                                          handleUpDown(indexChapter, true)
                                        }
                                      >
                                        <i className="fa fa-chevron-down" />
                                      </span>
                                      <span
                                        className=" pointerA"
                                        onClick={() =>
                                          handleUpDown(indexChapter, false)
                                        }
                                      >
                                        <i className="fa fa-chevron-up" />
                                      </span>
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {!isEmpty(getBook) ? (
                                    <tr>
                                      <span
                                        onClick={() => handleAddTopic(item)}
                                        className="d-block mb--5 colorLightBlue pointerA "
                                        style={{ minWidth: 75 }}
                                      >
                                        + Add Topic
                                      </span>
                                    </tr>
                                  ) : (
                                    ""
                                  )}
                                  {upDown[indexChapter]
                                    ? topics?.map((topic, index) => {
                                        return (
                                          <tr key={topic.indexTopic}>
                                            <td className="colorLightGray text-center ">
                                              {indexChapter + 1}.{index + 1}
                                            </td>
                                            <td
                                              className="pointerA"
                                              onClick={() =>
                                                handleEditTopic(
                                                  item.chapter_id,
                                                  topic.topic_id
                                                )
                                              }
                                            >
                                              <span className="d-block mb--5 colorLightBlue pointerA ">
                                                {topic?.title}
                                              </span>
                                            </td>
                                          </tr>
                                        );
                                      })
                                    : ""}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        );
                      })
                    : "No Content"}
                </div>
              </div>
              <div className="clearfix" />
            </div>{" "}
          </div>
          {addEditTopic ? (
            <MainContent
              activeChapter={activeChapter}
              TestId={Test_id}
              bookId={bookId}
              bookTitle={bookTitle}
              bookCreate={bookCreate}
              chapterId={chapterId}
              topicId={topicId}
              handleTopicSave={handleTopicSave}
              handleEditBook={handleEditBook}
            />
          ) : (
            ""
          )}
        </div>
      </div>

      <Modal
        show={modalBook}
        onHide={handleClose}
        size="lg"
        className="Acct"
        style={{ maxWidth: "100%" }}
      >
        <div className="modal-header">
          <a href="/" className="logo">
            <img alt="alt" src="/img/logo.png" />
          </a>
        </div>

        <div className="modal-body">
          {editBook ? (
            <p className="fs--20 fw--700">Edit new Books</p>
          ) : (
            <p className="fs--20 fw--700">Create new Books</p>
          )}

          <p
            className={`${
              !isEmpty(errorValidate?.bookTitle) ? "error-border" : ""
            }`}
          >
            <input
              placeholder="ENTER A TITLE"
              name="bookTitle"
              {...form.register("bookTitle")}
              onChange={(e) => form.setValue("bookTitle", e.target.value)}
            />
            {errorValidate.bookTitle && (
              <span className="error-login">
                {errorValidate.bookTitle.message}
              </span>
            )}
          </p>
          {editBook ? (
            <button
              type="button"
              onClick={form.handleSubmit(handleEditBookSave)}
              disabled={form.formState.isSubmitting}
              className="btn btn-default fs--12"
            >
              Edit
            </button>
          ) : (
            <button
              type="button"
              onClick={form.handleSubmit(handleCreateBookSave)}
              disabled={form.formState.isSubmitting}
              className="btn btn-default fs--12"
            >
              CREATE
            </button>
          )}
        </div>
      </Modal>
      <Modal
        show={modalChapter}
        onHide={handleClose}
        size="lg"
        className="Acct"
        style={{ maxWidth: "100%" }}
      >
        <div className="modal-header">
          <a href="/" className="logo">
            <img alt="alt" src="/img/logo.png" />
          </a>
        </div>

        <div className="modal-body">
          <p className="fs--20 fw--700">Create new Chapters</p>
          <p
            className={`${
              !isEmpty(errorValidateChapter?.chapter) ? "error-border" : ""
            }`}
          >
            <input
              placeholder="ENTER A TITLE"
              name="chapter"
              {...formChapter.register("chapter")}
              onChange={(e) => formChapter.setValue("chapter", e.target.value)}
            />
            {errorValidateChapter.chapter && (
              <span className="error-login">
                {errorValidateChapter.chapter.message}
              </span>
            )}
          </p>
          <button
            type="button"
            onClick={formChapter.handleSubmit(handleAddChapterSave)}
            disabled={formChapter.formState.isSubmitting}
            className="btn btn-default fs--12"
          >
            CREATE
          </button>
        </div>
      </Modal>
      <Footer />
    </div>
  );
};

export default Page;
