import { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "app/hooks";
import { TestID } from "slices";
import "react-datepicker/dist/react-datepicker.css";
import Announcements from "./components/Announcements";
import Polls from "./components/Polls";
import Events from "./components/Events";
import ModalCommunication from "./components/ModalCommunication";
import ModalEvent from "./components/ModalEvent";
import ModalPoll from "./components/ModalPoll";
import BoxLeft from "./components/BoxLeft";
import BoxRight from "./components/BoxRight";
import axiosClients from "api/rest/axiosClients";
import { authHeaderAndAccount } from "api/rest/header";
import InfiniteScroll from "react-infinite-scroll-component";
import { isEmpty } from "lodash";
const LoungeTestId = () => {
  const dispatch = useAppDispatch();
  let { Test_id } = useParams();

  const [modalCommunication, setModalCommunication] = useState(false);
  const [modalEvent, setModalEvent] = useState(false);
  const [modalPoll, setModalPoll] = useState(false);
  const [activeTab, setActiveTab] = useState("tab1");
  const [listTestsPostActive, setListTestsPostActive] = useState([]);
  const [lastPage, setLastPage] = useState(false);
  const [pageKey, setPageKey] = useState("");

  useEffect(() => {
    window.history.scrollRestoration = "manual";
  }, []);

  useEffect(() => {
    if (Test_id) {
      dispatch(TestID(Test_id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Test_id]);

  useEffect(() => {
    (async () => {
      if (activeTab) {
        handleFirstAndSave(activeTab);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  const handleFirstAndSave = async (tab) => {
    let getTestsPostActive = "";
    if (tab === "tab1") {
      getTestsPostActive = await axiosClients.get(
        `/post/${Test_id}/list`,
        {
          headers: authHeaderAndAccount(),
        }
      );
    }

    if (tab === "tab2") {
      getTestsPostActive = await axiosClients.get(
        `/post/${Test_id}/list?type=COMMUNICATION`,
        {
          headers: authHeaderAndAccount(),
        }
      );
    }
    if (tab === "tab4") {
      getTestsPostActive = await axiosClients.get(
        `/post/${Test_id}/list?type=POLL`,
        {
          headers: authHeaderAndAccount(),
        }
      );
    }
    console.log(getTestsPostActive);
    if (tab === "tab5") {
      getTestsPostActive = await axiosClients.get(
        `/post/${Test_id}/list?type=EVENT`,
        {
          headers: authHeaderAndAccount(),
        }
      );
    }

    setListTestsPostActive(getTestsPostActive.data.items);

    if (getTestsPostActive.data.next_page) {
      setPageKey(`page_key=${getTestsPostActive.data.next_page}`);
      setLastPage(false);
    } else {
      setLastPage(true);
    }
  };
  const handleTab = async (tab) => {
    setActiveTab(tab);
  };

  const handleCloseModal = () => {
    setModalCommunication(false);
    setModalEvent(false);
    setModalPoll(false);
  };

  const handleModalSave = () => {
    handleFirstAndSave(activeTab);
  };

  const fetchImages = async () => {
    if (!lastPage) {
      let getTestsPostActive = "";
      if (activeTab === "tab1") {
        getTestsPostActive = await axiosClients.get(
          `/post/${Test_id}/list?${pageKey}`,
          {
            headers: authHeaderAndAccount(),
          }
        );
      }
      if (activeTab === "tab2") {
        getTestsPostActive = await axiosClients.get(
          `/post/${Test_id}/list?type=COMMUNICATION&${pageKey}`,
          {
            headers: authHeaderAndAccount(),
          }
        );
      }
      if (activeTab === "tab4") {
        getTestsPostActive = await axiosClients.get(
          `/post/${Test_id}/list?type=POLL&${pageKey}`,
          {
            headers: authHeaderAndAccount(),
          }
        );
      }

      if (activeTab === "tab5") {
        getTestsPostActive = await axiosClients.get(
          `/post/${Test_id}/list?type=EVENT&${pageKey}`,
          {
            headers: authHeaderAndAccount(),
          }
        );
      }

      setListTestsPostActive([
        ...listTestsPostActive,
        ...getTestsPostActive.data.items,
      ]);
      console.log(getTestsPostActive);
      if (getTestsPostActive.data.next_page) {
        setPageKey(`page_key=${getTestsPostActive.data.next_page}`);
        setLastPage(false);
      } else {
        setLastPage(true);
      }
    }
  };

  return (
    <div id="main">
      <div style={{ position: "fixed", left: 0, top: 0, right: 0, zIndex: 10 }}>
        <Header />
      </div>

      <InfiniteScroll
        dataLength={listTestsPostActive.length}
        next={fetchImages}
        hasMore={true}
        loader={<p>Load more...</p>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        {/* start of header */}

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
            <div>
              <BoxLeft TestID={Test_id} />
            </div>
            {/* end of left side rail */}
            {/* start of updates */}
            <div className="div503">
              {/* start of updates */}
              <div className="updatesWrapper">
                <div className="card-header">
                  Updates
                  <ul>
                    <li
                      className={`fs--12 pointerA ${
                        activeTab === "tab1" ? "active" : ""
                      }`}
                      onClick={() => handleTab("tab1")}
                    >
                      All
                    </li>
                    <li
                      className={`fs--12 pointerA ${
                        activeTab === "tab2" ? "active" : ""
                      }`}
                      onClick={() => handleTab("tab2")}
                    >
                      Announcements
                    </li>
                    <li
                      className={`fs--12 pointerA ${
                        activeTab === "tab4" ? "active" : ""
                      }`}
                      onClick={() => handleTab("tab4")}
                    >
                      Polls
                    </li>
                    <li
                      className={`fs--12 pointerA ${
                        activeTab === "tab5" ? "active" : ""
                      }`}
                      onClick={() => handleTab("tab5")}
                    >
                      Events
                    </li>
                  </ul>
                </div>

                <div className="updatesContent mb--5">
                  <div className="row flexThis">
                    <div className="col-md-5 makeRelative">
                      <span
                        className="colorDarkBlue pointerA"
                        onClick={() => setModalCommunication(true)}
                      >
                        <img alt="alt" src="/img/icon-add.png" />
                        <div className="threeTextInfo">
                          <span className="fs--16 colorLightBlue">
                            <strong>Post a/an:</strong>
                          </span>
                          <br />
                          <span className="colorDarkBlue">
                            <strong>Communication</strong>
                          </span>
                          <br />
                          <small className="colorDarkBlue">
                            (Text, Image, Video or File)
                          </small>
                        </div>
                      </span>
                    </div>
                    <div className="col-md-3">
                      <span
                        className="colorDarkBlue pointerA"
                        onClick={() => setModalEvent(true)}
                      >
                        <img
                          alt="alt"
                          style={{ marginRight: 9 }}
                          src="/img/icon-add.png"
                          width="20px"
                          height="20px"
                        />{" "}
                        <strong>An Events</strong>
                      </span>
                    </div>
                    <div className="col-md-3">
                      <span
                        className="colorDarkBlue pointerA"
                        onClick={() => setModalPoll(true)}
                      >
                        <img
                          alt="alt"
                          style={{ marginRight: 9 }}
                          src="/img/icon-add.png"
                          width="20px"
                          height="20px"
                        />{" "}
                        <strong>Polls</strong>
                      </span>
                    </div>
                  </div>
                </div>
                <div id="scrollableDiv">
                  {!isEmpty(listTestsPostActive)
                    ? listTestsPostActive.map((data, index) => (
                        <div key={index}>
                          <Announcements data={data} />
                          <Events data={data} />
                          <Polls data={data} />
                        </div>
                      ))
                    : ""}
                </div>
              </div>
              {/* end of updates */}
            </div>
            {/* end of updates */}
            {/* start of right rails */}
            <BoxRight TestID={Test_id} />

            {/* .sibar-inner-wrapper */}
          </div>
          {/* .container.no-padding-lr */}
          <div className="clearfix" />
        </div>

        {/* sart of footer */}

        <ModalCommunication
          modalCommunication={modalCommunication}
          handleCloseModal={handleCloseModal}
          handleModalSave={handleModalSave}
        />
        <ModalEvent
          modalEvent={modalEvent}
          handleCloseModal={handleCloseModal}
          handleModalSave={handleModalSave}
        />
        <ModalPoll
          modalPoll={modalPoll}
          handleCloseModal={handleCloseModal}
          handleModalSave={handleModalSave}
        />
        {/* end of footer */}
        <div style={{ position: "sticky", bottom: 0, zIndex: 10 }}>
          <Footer />
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default LoungeTestId;
