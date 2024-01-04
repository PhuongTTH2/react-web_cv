import { useState, useEffect } from "react";
import axiosClients from "api/rest/axiosClients";
import { authHeaderAndAccount } from "api/rest/header";
import apiGets from "api/rest/apiGets";
import { STORAGE_KEY } from "constants/index";
import { isEmpty } from "lodash";
import { monthDiff } from "constants/index";
import axiosNoAuth from "api/rest/axiosNoAuth";

const BoxLeftPublicPage = () => {
  const [listJoinedTests, setListJoinedTests] = useState([]);
  const [listTouring, setListTouring] = useState([]);
  const [getFeatureTest, setGetFeatureTest] = useState({});
  const [diffDate, setDiffDate] = useState("");

  useEffect(() => {
    (async () => {
      if (localStorage.getItem(STORAGE_KEY.IS_LOGIN)) {
        const data = await axiosClients.get(apiGets.getJoinedTests, {
          headers: authHeaderAndAccount(),
        });

        if (data.message === "ok") {
          setListJoinedTests(data.data);
        }
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    (async () => {
      if (localStorage.getItem(STORAGE_KEY.IS_LOGIN)) {
        const touring = await axiosClients.get(apiGets.getFollowedTests, {
          headers: authHeaderAndAccount(),
        });

        if (touring.message === "ok") {
          setListTouring(touring.data);
        }
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    (async () => {
      const feature = await axiosNoAuth.get(apiGets.getFeatureTest);
      var result = monthDiff(
        new Date(),
        new Date(Number(feature.data.created_at) * 1000)
      );
      setDiffDate(result);
      if (feature.message === "ok") {
        setGetFeatureTest(feature.data);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleJoinedTest = (item) => {
    window.location.href = `/lounge/${item.Test_id}`;
  };

  return (
    <div id="sidebarleft" className="div306 leftSideBar">
      <div className="sibar-inner-wrapper">
        {/* start of card */}
        <div className="card featuredNRM">
          <div className="card-header">Today's Featured NRM</div>
          <div className="card-body">
            <div className="author">
              <img
                alt="alt"
                className="avatarIcon pointerA"
                onClick={() => handleJoinedTest(getFeatureTest)}
                src={
                  !isEmpty(getFeatureTest.founder_picture_url_full)
                    ? getFeatureTest.founder_picture_url_full
                    : "/img/noPhotoImage.jpg"
                }
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
              <p>
                <a
                  href={`lounge/${getFeatureTest.Test_id}`}
                  className="bright-blue"
                >
                  {getFeatureTest.name}
                </a>
                <br />{" "}
                <span className="fs--12">
                  {getFeatureTest.mantra}
                  <br />{" "}
                  <span className="pr--5">
                    {" "}
                    {getFeatureTest.affiliate_count} Affiliates
                  </span>{" "}
                  {diffDate}
                  old
                </span>
              </p>
              <div className="clearfix" />
            </div>
            <p className="fs--12">{getFeatureTest.major_orientation}</p>
          </div>
        </div>
        {/* end of card */}
        {/* start of card */}
        <div className="card mt--5 ujoined">
          <div className="card-header">You Joined</div>
          <div className="card-body">
            {/* start of group */}
            {!isEmpty(listJoinedTests)
              ? listJoinedTests.map((item, index) => {
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
                            {item.Test_name}
                          </a>
                          <br />
                          <span className="fs--11">
                            {item.major_orientation}
                          </span>
                        </p>
                        <div className="clearfix" />
                      </div>
                      <div className="rightAuthor">
                        <span className="counter fs--12">
                          {" "}
                          {item.member_count}
                        </span>
                      </div>
                      <div className="clearfix" />
                    </div>
                  );
                })
              : "No Test."}
          </div>
        </div>
        {/* end of card */}
        {/* start of card */}
        <div className="card mt--5 ujoined">
          <div className="card-header">You're Touring</div>
          <div className="card-body">
            {/* start of group */}
            {!isEmpty(listTouring)
              ? listTouring.map((item, index) => {
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
                            {item.Test_name}
                          </a>
                          <br />
                          <span className="fs--11">
                            {item.major_orientation}
                          </span>
                        </p>
                        <div className="clearfix" />
                      </div>
                      <div className="rightAuthor">
                        <span className="counter fs--12">
                          {item.follower_count}
                        </span>
                      </div>
                      <div className="clearfix" />
                    </div>
                  );
                })
              : "No Test."}
          </div>
        </div>
        {/* end of card */}
        {/* start of card */}
        <div className="card mt--5 impt-weight">
          <div className="card-header">Importance Weights</div>
          <div className="card-body">
            <p className="fs--11">
              Overall, how important are each of the following aspects of the
              Test(s) you affiliate with?
              <br />
              <span className="colorLightBlue font-italic">
                (1 = not important at all, 10 = very important)
              </span>
            </p>
          </div>
          {/* start of rate bar */}
          <div className="rateBarWrapper bg--lightBlue">
            <h3 className="title">Religious Philosophy</h3>
            <p className="fs--11">
              What the Test believes and how it views the world
            </p>
            <div className="rateBar">
              <div className="progHolder">
                <div className="div240 float-left">
                  <div className="progress">
                    <div className="progress-bar" style={{ width: 120 }}></div>
                    <div className="slider-val">
                      <span>5</span>
                    </div>
                  </div>
                  <div className="lbl">
                    <span className="left">1</span>
                    <span className="cnter">5</span>
                    <span className="right">10</span>
                  </div>
                </div>
                <div className="clearfix" />
              </div>
            </div>
          </div>
          {/* end of rate bar */}
          {/* start of rate bar */}
          <div className="rateBarWrapper1">
            <h3 className="title">Religious Practice</h3>
            <p className="fs--11">
              How the Test is actually physically and mentally practiced
            </p>
            <div className="rateBar">
              <div className="progHolder">
                <div className="div240 float-left">
                  <div className="progress">
                    <div className="progress-bar" style={{ width: 192 }}></div>
                  </div>
                  <div className="slider-val">
                    <span>8</span>
                  </div>
                  <div className="lbl">
                    <span className="left">1</span>
                    <span className="cnter">5</span>
                    <span className="right">10</span>
                  </div>
                </div>
                <div className="clearfix" />
              </div>
            </div>
          </div>
          {/* end of rate bar */}
          {/* start of rate bar */}
          <div className="rateBarWrapper bg--lightBlue">
            <h3 className="title">Personal Orientation</h3>
            <p className="fs--11">
              Benefits the Test provides to its members
            </p>
            <div className="rateBar">
              <div className="progHolder">
                <div className="div240 float-left">
                  <div className="progress">
                    <div className="progress-bar" style={{ width: 120 }}></div>
                  </div>
                  <div className="slider-val">
                    <span>5</span>
                  </div>
                  <div className="lbl">
                    <span className="left">1</span>
                    <span className="cnter">5</span>
                    <span className="right">10</span>
                  </div>
                </div>
                <div className="clearfix" />
              </div>
            </div>
          </div>
          {/* end of rate bar */}
          {/* start of rate bar */}
          <div className="rateBarWrapper1">
            <h3 className="title">Conduct</h3>
            <p className="fs--11">
              How to behave and defining what is right vs. wrong
            </p>
            <div className="rateBar">
              <div className="progHolder">
                <div className="div240 float-left">
                  <div className="progress">
                    <div className="progress-bar" style={{ width: 120 }}></div>
                  </div>
                  <div className="slider-val">
                    <span>5</span>
                  </div>
                  <div className="lbl">
                    <span className="left">1</span>
                    <span className="cnter">5</span>
                    <span className="right">10</span>
                  </div>
                </div>
                <div className="clearfix" />
              </div>
            </div>
          </div>
          {/* end of rate bar */}
          <div className="rateBarWrapper bg--lightBlue">
            <h3 className="title">Relationship to Society</h3>
            <p className="fs--11">How the Test relates to society</p>
            <div className="rateBar">
              <div className="progHolder">
                <div className="div240 float-left">
                  <div className="progress">
                    <div className="progress-bar" style={{ width: 216 }}></div>
                  </div>
                  <div className="slider-val">
                    <span>9</span>
                  </div>
                  <div className="lbl">
                    <span className="left">1</span>
                    <span className="cnter">5</span>
                    <span className="right">10</span>
                  </div>
                </div>
                <div className="clearfix" />
              </div>
            </div>
          </div>
          {/* end of rate bar */}
          {/* start of rate bar */}
          <div className="rateBarWrapper1">
            <h3 className="title">Organizational Orientation</h3>
            <p className="fs--11">
              The Test’s membership composition and how members and leaders
              relate to each other
            </p>
            <div className="rateBar">
              <div className="progHolder">
                <div className="div240 float-left">
                  <div className="progress">
                    <div className="progress-bar" style={{ width: 120 }}></div>
                  </div>
                  <div className="slider-val">
                    <span>5</span>
                  </div>
                  <div className="lbl">
                    <span className="left">1</span>
                    <span className="cnter">5</span>
                    <span className="right">10</span>
                  </div>
                </div>
                <div className="clearfix" />
              </div>
            </div>
          </div>
          {/* end of rate bar */}
        </div>
        {/* end of card */}
        <div className="clearfix" />
      </div>{" "}
      {/* .sibar-inner-wrapper */}
    </div>
  );
};
export default BoxLeftPublicPage;
