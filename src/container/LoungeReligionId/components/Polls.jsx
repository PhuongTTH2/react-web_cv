import { useEffect, useState } from "react";
import { isEmpty } from "lodash";
import { timeDiff } from "constants/index";

const Polls = ({ data }) => {
  const [TestsPostActive, setTestsPostActive] = useState("");

  useEffect(() => {
    (async () => {
      if (data.type === "POLL") {
        let total_vote = 0;
        data?.poll?.answers.forEach((subitem) => {
          total_vote += subitem.vote;
        });

        let result = timeDiff(
          new Date(),
          new Date(Number(data.created_at) * 1000)
        );

        setTestsPostActive({
          ...data,
          timeFormat: result,
          totalVote: total_vote,
        });
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <>
      {data.type === "POLL" ? (
        <div className="eventWrapper mt--10">
          <div className="feedsContent pb--20">
            <div className="author">
              <img
                className="avatarIcon"
                alt="File"
                style={{
                  width: 40,
                  height: 40,
                  objectFit: "cover",
                  borderRadius: "50%",
                }}
                src={
                  !isEmpty(TestsPostActive?.created_by?.profile_picture_url_full)
                    ? TestsPostActive?.created_by?.profile_picture_url_full
                    : "/img/noPhotoImage.jpg"
                }
              />
              <p>
                <a href="/">
                  {TestsPostActive?.created_by?.first_name +
                    " " +
                    TestsPostActive?.created_by?.last_name}
                </a>
                {/* <span className="fw--300">Life is precious - </span>
                <span className="colorLightGreen">Poll</span> */}
              </p>
              <div className="clearfix" />
            </div>
            <div className="lineSeparator" />
            <div className="feedsPost">
              <div className="textTitle">
                <p>
                  <span className="fw--300">
                    {TestsPostActive?.poll?.question}
                  </span>
                </p>
              </div>
              <div className="timeStamp">
                <span className="fs--12 opacity--50">
                  {TestsPostActive?.timeFormat}
                </span>
              </div>
              <div className="clearfix" />
              {/* start of poll */}
              <div className="pollContentWrapper">
                {/* select poll */}
                {TestsPostActive?.poll?.answers.map((subitem) => (
                  <div className="progHolder mt--8">
                    <div className="div25 float-left">
                      <input
                        className="mt--8"
                        type="radio"
                        name="pollDivinity"
                      />
                    </div>
                    <div className="div335 float-left">
                      <div className="progress pollBarBlue">
                        <div
                          className="progress-bar "
                          style={{
                            width:
                              `${
                                (subitem?.vote /
                                  TestsPostActive?.totalVote) *
                                100
                              }` + "%",
                          }}
                        ></div>
                        <span className="colorDarkBlue">{subitem?.answer}</span>
                      </div>
                    </div>
                    <div className="div53 float-right text-right">
                      <p className="colorLightGreen fs--11 mb--0 mt--5">
                        {subitem?.vote} votes
                      </p>
                    </div>
                    <div className="clearfix" />
                  </div>
                ))}
                {/* end of select poll */}
              </div>
              {/* end of poll */}
            </div>
          </div>
          {/* start share report */}
          <div className="shareReportComment">
            <div className="sharable">
              <ul className="list-unstyled">
                <li>
                  <a href="/" className="no-text-decoration text--black">
                    <img
                      className="iconasset opacity--50"
                      src="/img/icons/comments_96px.png"
                      alt=""
                    />{" "}
                    9 comments
                  </a>
                </li>
                <li>
                  <a href="/" className="no-text-decoration text--black">
                    <img
                      className="iconasset opacity--50"
                      src="/img/icons/share_96px.png"
                      alt=""
                    />{" "}
                    Share
                  </a>
                </li>
                <li>
                  <a href="/" className="no-text-decoration text--black">
                    <img
                      className="iconasset opacity--50"
                      src="/img/icons/flagpole_96px.png"
                      alt=""
                    />{" "}
                    Report
                  </a>
                </li>
              </ul>
              <div className="clearfix" />
            </div>
          </div>
          {/* end of share report */}
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Polls;
