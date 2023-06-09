import { useEffect, useState } from "react";
import { isEmpty } from "lodash";
import { timeDiff } from "constants/index";
import moment from "moment";
const Events = ({ data }) => {
  const [religionsPostActive, setReligionsPostActive] = useState("");

  useEffect(() => {
    (async () => {
      if (data.type === "EVENT") {
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
          timeFormat: result,
          dateTimeLocations: dateTimeLocations,
        });
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <>
      {data.type === "EVENT" ? (
        <div className="eventWrapper mt--10">
          {/* start event content */}
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
                  !isEmpty(religionsPostActive?.created_by?.profile_picture_url_full)
                    ? religionsPostActive?.created_by?.profile_picture_url_full
                    : "/img/noPhotoImage.jpg"
                }
              />
              <p>
                <a href="/">
                  {religionsPostActive?.created_by?.first_name +
                    " " +
                    religionsPostActive?.created_by?.last_name}
                </a>
                {/* <span className="fw--300">We improve you - </span>
                <span className="colorLightGreen">Event</span> */}
              </p>
              <div className="clearfix" />
            </div>
            <div className="lineSeparator" />
            <div className="feedsPost">
              <div className="textTitle">
                <p>
                  <a href="#">{religionsPostActive?.event?.name}</a>{" "}
                  <span className="fw--300">
                    {religionsPostActive?.event?.desc}
                  </span>
                </p>
              </div>
              <div className="timeStamp">
                <span className="fs--12 opacity--50">
                  {religionsPostActive?.timeFormat}
                </span>
              </div>
              <div className="clearfix" />
              <div className="eventDetails">
                {!isEmpty(religionsPostActive?.dateTimeLocations) &&
                  religionsPostActive?.dateTimeLocations?.map(
                    (subitem, index) => (
                      <div>
                        <span className="fw--300">Event Date: </span>
                        <span className="colorLightGreen">
                          {subitem?.date_time}
                        </span>
                      </div>
                    )
                  )}

                {religionsPostActive?.event?.is_rsvp ? (
                  <div className="responseButtons">
                    <a
                      href="/"
                      className="btn btn-round bg--defaultBlue text-white"
                    >
                      RSPV
                    </a>
                    <a href="/" className="btn btn-round bgLightGray colorGray">
                      Maybe
                    </a>
                    <a href="/" className="btn btn-round bgLightGray colorGray">
                      Can't go
                    </a>
                    {/* <a className="btn btn-round bgLightGray colorGray float-right">
                    Invite
                  </a> */}
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
          {/* end event content */}
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

export default Events;
