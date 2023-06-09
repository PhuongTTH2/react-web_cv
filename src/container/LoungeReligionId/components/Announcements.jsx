import { useEffect, useState } from "react";
import { isEmpty } from "lodash";
import { timeDiff } from "constants/index";
import moment from "moment";

import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
const Announcements = ({ data }) => {
  const [religionsPostActive, setReligionsPostActive] = useState("");

  const imageDefaultValues = ["jpg", "jpeg", "png", "gif"];

  useEffect(() => {
    (async () => {
      if (data.type === "COMMUNICATION") {
        let dateTimeLocations = data?.event?.date_time_locations.map(
          (subitem) => {
            return {
              ...subitem,
              date_time: moment(Number(subitem.date_time)).format(
                "MMMM DD, YYYY dddd h:mm a"
              ),
            };
          }
        );
        let result = timeDiff(
          new Date(),
          new Date(Number(data.created_at) * 1000)
        );

        setReligionsPostActive({
          ...data,
          setReligionsPostActive,
          timeFormat: result,
          dateTimeLocations: dateTimeLocations,
        });
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const options = {
    merge: true,
    loop: true,
    margin: 10,
    video: true,
    lazyLoad: true,
    center: true,
    responsive: {
      0: {
        items: 1,
      },
      700: {
        items: 1,
      },
      800: {
        items: 2,
      },
      1000: {
        items: 2,
      },
    },
  };
  return (
    <>
      {data.type === "COMMUNICATION" ? (
        <div className="eventWrapper mt--10">
          <div className="feedsContent">
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
                  !isEmpty(religionsPostActive?.created_by?.profile_picture_url_full)
                    ? religionsPostActive?.created_by?.profile_picture_url_full
                    : "/img/noPhotoImage.jpg"
                }
              />
              {/* <p>
                <a href="/">The Sophists Union</a> -{" "}
                <span className="fw--300">God Is You!</span>
              </p> */}
              <div className="clearfix" />
            </div>
            <div className="lineSeparator" />
            <div className="feedsPost">
              <div className="textTitle">
                <p>
                  <a href="/">
                    {religionsPostActive?.created_by?.first_name +
                      " " +
                      religionsPostActive?.created_by?.last_name +
                      " "}
                  </a>
                  <span className="fw--300">
                    (12/15): {religionsPostActive?.communication?.desc}
                  </span>
                </p>
              </div>
              <div className="timeStamp">
                <span className="fs--12 opacity--50">
                  {religionsPostActive?.timeFormat}
                </span>
              </div>
              <div className="clearfix" />

              {religionsPostActive?.communication?.files.length === 1 ? (
                <div className="videoWrapper">
                  {isEmpty(
                    religionsPostActive?.communication?.files[0].match(
                      /\.(jpg|jpeg|png|gif)$/i
                    )
                  ) ? (
                    <video controls style={{ width: "100%", height: "100%" }}>
                      <source
                        src={religionsPostActive?.communication?.files[0]}
                      ></source>
                    </video>
                  ) : (
                    <a href="/">
                      <img
                        alt="alt"
                        src={religionsPostActive?.communication?.files[0]}
                      />
                    </a>
                  )}
                </div>
              ) : (
                <>
                  <OwlCarousel className="owl-carousel owl-theme" {...options}>
                    {religionsPostActive?.communication?.files.map(
                      (subitem, index) =>
                        isEmpty(subitem.match(/\.(jpg|jpeg|png|gif)$/i)) ? (
                          <div class="item">
                            <div
                              class="item-video"
                              style={{ height: 278 }}
                              data-merge={index}
                            >
                              <video
                                controls
                                style={{ width: "100%", height: "100%" }}
                              >
                                <source src={subitem}></source>
                              </video>
                            </div>
                          </div>
                        ) : (
                          <img
                            alt="alt"
                            src={subitem}
                            style={{
                              height: 278,
                              objectFit: "cover",
                            }}
                          />
                        )
                    )}
                  </OwlCarousel>
                </>
              )}
            </div>
          </div>
          <div className="shareReportComment">
            <div className="sharable">
              <ul className="list-unstyled">
                <li>
                  <a
                    href="/"
                    className="no-text-decoration text--black"
                    title="comment"
                  >
                    <img
                      alt="alt"
                      className="iconasset opacity--50"
                      src="/img/icons/comments_96px.png"
                    />{" "}
                    <span className="hideOn320"> 13 comments</span>
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    className="no-text-decoration text--black"
                    title="share"
                  >
                    <img
                      alt="alt"
                      className="iconasset opacity--50"
                      src="/img/icons/share_96px.png"
                    />{" "}
                    <span className="hideOn320">Share</span>
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    className="no-text-decoration text--black"
                    title="report"
                  >
                    <img
                      alt="alt"
                      className="iconasset opacity--50"
                      src="/img/icons/flagpole_96px.png"
                    />{" "}
                    <span className="hideOn320">Report</span>
                  </a>
                </li>
              </ul>
              <div className="clearfix" />
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Announcements;
