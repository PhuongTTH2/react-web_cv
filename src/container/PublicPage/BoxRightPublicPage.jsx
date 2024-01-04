import { useState, useEffect } from "react";
import axiosNoAuth from "api/rest/axiosNoAuth";
import apiGets from "api/rest/apiGets";
import { isEmpty } from "lodash";
import { STORAGE_KEY } from "constants/index";

const BoxRightPublicPage = () => {
  // const navigate = useNavigate();

  const [countBestNRM, setCountBestNRM] = useState(4);
  const [countTrendingNRM, setCountTrendingNRM] = useState(4);

  const [listTests, setListTests] = useState([]);
  const [listBestNRM, setListBestNRM] = useState([]);
  const [listTrendingNRM, setListTrendingNRM] = useState([]);

  useEffect(() => {
    (async () => {
      const list = await axiosNoAuth.get(apiGets.listTests);
      if (list.message === "ok") {
        setListTests(list.data);
        setListBestNRM(list.data.slice(0, countBestNRM));
        setListTrendingNRM(list.data.slice(0, countBestNRM));
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleUpBestNRM = () => {
    let newCountBestNRM = countBestNRM + 4;
    setListBestNRM(listTests.slice(0, newCountBestNRM));
    setCountBestNRM(newCountBestNRM);
  };

  const handleUpTrending = () => {
    let newCountTrendingNRM = countTrendingNRM + 4;
    setListTrendingNRM(listTests.slice(0, newCountTrendingNRM));
    setCountTrendingNRM(newCountTrendingNRM);
  };

  const handleJoinedTest = (item) => {
    window.location.href = `/lounge/${item.Test_id}`;
  };

  return (
    <div id="sidebarright" className="div306 rightSideBar">
      <div className="sidebar-x">
        <a id="rside-btn-x" href="/">
          x
        </a>
      </div>
      <div className="sibar-inner-wrapper">
        {/* start of card */}
        <div className="card no-bottom-border">
          <div className="card-header">Best NRM Matches</div>
          <div className="card-body">
            <p className="fs--12">NRMs trending on our site today:</p>
            {/* start of progress bars */}
            {!isEmpty(listBestNRM)
              ? listBestNRM.map((item) => {
                  return (
                    <div
                      className="author pointerA"
                      onClick={() => handleJoinedTest(item)}
                    >
                      <div className="leftAuthor">
                        <img
                          alt="alt"
                          className="avatarIcon"
                          src={
                            !isEmpty(item.founder_picture_url_full)
                              ? item.founder_picture_url_full
                              : "/img/noPhotoImage.jpg"
                          }
                          style={{
                            width: 40,
                            height: 40,
                            borderRadius: "50%",
                            objectFit: "cover",
                          }}
                        />
                        <p className="fs--12">
                          <a
                            href={`lounge/${item.Test_id}`}
                            className="bright-blue"
                          >
                            {item.name}
                          </a>

                          <span className="fs--11">{item.mantra}</span>
                        </p>
                        <div className="clearfix" />
                      </div>
                      <div className="rightAuthor">
                        <div className="progHolder">
                          {localStorage.getItem(STORAGE_KEY.IS_LOGIN) ? (
                            <div className="progress redBar">
                              <div
                                className="progress-bar"
                                style={{ width: `${item.matching_percent}%` }}
                              ></div>
                              <span className="outside">
                                {item.matching_percent} %
                              </span>
                            </div>
                          ) : (
                            ""
                          )}
                          <p className="fs--10 mt--8 mb--0">
                            {item.member_count}
                            <span className="fw--300"> new members</span>
                          </p>
                        </div>
                      </div>
                      <div className="clearfix" />
                    </div>
                  );
                })
              : "No Test."}
            {/* end of progress bars */}
            {listTests.length < 4 ||
            countBestNRM >= listTests.length ? (
              ""
            ) : (
              <span
                className="bright-blue text-center fw--300 fs--11 pointerA"
                style={{ display: "block" }}
                onClick={handleUpBestNRM}
              >
                see more . . .
              </span>
            )}
          </div>
        </div>
        {/* end of card */}
        {/* start of card */}
        <div className="card mt--5 no-bottom-border trend-nrm">
          <div className="card-header">Trending NRMs</div>
          <div className="card-body">
            <p className="fs--12">NRMs trending on our site today:</p>
            {!isEmpty(listTrendingNRM)
              ? listTrendingNRM.map((item) => {
                  return (
                    <div
                      className="author pointerA"
                      onClick={() => handleJoinedTest(item)}
                    >
                      <div className="leftAuthor">
                        <img
                          alt="alt"
                          className="avatarIcon"
                          src={
                            !isEmpty(item.founder_picture_url_full)
                              ? item.founder_picture_url_full
                              : "/img/noPhotoImage.jpg"
                          }
                          style={{
                            width: 40,
                            height: 40,
                            borderRadius: "50%",
                            objectFit: "cover",
                          }}
                        />
                        <p className="fs--12">
                          <a
                            href={`lounge/${item.Test_id}`}
                            className="bright-blue"
                          >
                            {item.name}
                          </a>

                          <span className="fs--11">{item.mantra}</span>
                        </p>
                        <div className="clearfix" />
                      </div>
                      <div className="rightAuthor">
                        <div className="progHolder">
                          {localStorage.getItem(STORAGE_KEY.IS_LOGIN) ? (
                            <div className="progress redBar">
                              <div
                                className="progress-bar"
                                style={{ width: `${item.matching_percent}%` }}
                              ></div>
                              <span className="outside">
                                {item.matching_percent} %
                              </span>
                            </div>
                          ) : (
                            ""
                          )}
                          <p className="fs--10 mt--8 mb--0">
                            {item.member_count}
                            <span className="fw--300"> new members</span>
                          </p>
                        </div>
                      </div>
                      <div className="clearfix" />
                    </div>
                  );
                })
              : "No Test."}
            {listTests.length < 4 ||
            countTrendingNRM >= listTests.length ? (
              ""
            ) : (
              <span
                className="bright-blue text-center fw--300 fs--11 pointerA"
                style={{ display: "block" }}
                onClick={handleUpTrending}
              >
                see more . . .
              </span>
            )}
          </div>
        </div>
        {/* end of card */}
        {/* start of card */}
        <div className="card mt--5 no-bottom-border reg-desires">
          <div className="card-header">
            Religious Goals &amp; Desires
            <br />
            <span className="fw--300 fs--12">Last Update: June 1, 2020</span>
          </div>
          <div className="card-body">
            <p className="fs--11">
              Complete this part of the survey, move to another section or link
              to the full survey. The more items you complete, the better your
              NRM matches will be.
            </p>
            <p className="fs--12 fw--400">
              <a href="/" className="colorDarkBlue">
                Pre-Determinism vs. Self-Determinism
              </a>
            </p>
            <p>
              <span className="colorDarkBlue">I believe:</span>{" "}
              <a href="/" className="font-italic float-right colorGray fw--300">
                (check all that apply)
              </a>
            </p>
            <div className="clearfix" />
            {/* start of checkboxes bars */}
            <div className="checkboxListWrapper">
              <form>
                <div className="form-group">
                  <label>
                    <input type="checkbox" />
                    Our will controls the fate of the universe.
                  </label>
                </div>
                <div className="form-group">
                  <label>
                    <input type="checkbox" />
                    God has a plan for all life, the planet and the universe.
                  </label>
                </div>
                <div className="form-group">
                  <label>
                    <input type="checkbox" />
                    We control our own happiness.
                  </label>
                </div>
                <div className="form-group">
                  <label>
                    <input type="checkbox" />
                    People who commit wrongdoings will be punished.
                  </label>
                </div>
                <div className="form-group">
                  <label>
                    <input type="checkbox" />
                    Good things happen to good people.
                  </label>
                </div>
                <div className="form-group">
                  <label>
                    <input type="checkbox" />
                    Bad things happen to bad people.
                  </label>
                </div>
                <div className="form-group">
                  <label>
                    <input type="checkbox" />
                    Misery is unavoidable for all human beings.
                  </label>
                </div>
                <div className="form-group">
                  <label>
                    <input type="checkbox" />
                    We have free will (the ability to think and do as one
                    pleases).
                  </label>
                </div>
              </form>
            </div>
            {/* end of checkboxes bars */}
            <div>
              <a href="/" className="float-left colorDarkRed fw--400 clear">
                <i className="fa fa-arrow-up" />
                clear all
              </a>
              <div className="clearfix" />
            </div>
            <div className="navigationLink">
              <a
                href="/"
                className="float-left btn btn-round bg--defaultBlue text-white"
              >
                &lt; State of World
              </a>
              <a
                href="/"
                className="float-right btn btn-round bg--defaultBlue text-white"
              >
                Wordly Boundaries &gt;
              </a>
              <div className="clearfix" />
            </div>
            <center>
              <a
                href="/"
                className="btn btn-round bg--defaultBlue text-center fw--300 text-white full-surv"
              >
                Full Survey
              </a>
            </center>
          </div>
        </div>
        {/* end of card */}
      </div>
      {/* end of right rails */}
      <div className="clearfix" />
    </div>
  );
};
export default BoxRightPublicPage;
