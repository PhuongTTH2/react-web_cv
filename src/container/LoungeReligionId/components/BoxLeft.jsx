import { useEffect, useState } from "react";
import { authHeaderAndAccount } from "api/rest/header";
import axiosClients from "api/rest/axiosClients";
import { orderBy, isEmpty } from "lodash";
import { monthDiff } from "constants/index";

const BoxLeft = ({ TestID }) => {
  const [quickFacts, setQuickFacts] = useState([]);
  const [newMember, setNewMember] = useState([]);
  const [getBooks, setGetBooks] = useState([]);
  const [diffDate, setDiffDate] = useState("");
  const [quickFactUseEffect, setQuickFactUseEffect] = useState(true);
  const [isRequesting, setIsRequesting] = useState(false);
  const [isFollowed, setIsFollowed] = useState("");
  const [isJoined, setIsJoined] = useState("");

  useEffect(() => {
    (async () => {
      if (quickFactUseEffect) {
        const data = await axiosClients.get(`/Test/${TestID}`, {
          headers: authHeaderAndAccount(),
        });

        var result = monthDiff(
          new Date(),
          new Date(Number(data.data.created_at) * 1000)
        );

        setDiffDate(result);
        if (data.message === "ok") {
          setQuickFacts(data.data);
          setIsFollowed(data.data.is_followed);
          setIsJoined(data.data.is_joined);
        }
        setQuickFactUseEffect(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quickFactUseEffect]);

  useEffect(() => {
    (async () => {
      const data = await axiosClients.get(`/Test/${TestID}/members`, {
        headers: authHeaderAndAccount(),
      });

      let member = orderBy(data.data, [(obj) => obj.joined_at], ["desc"]);
      if (data.message === "ok") {
        setNewMember(member.slice(0, 5));
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    (async () => {
      const data = await axiosClients.get(
        `/Test/${TestID}/books`,
        {},
        {
          headers: authHeaderAndAccount(),
        }
      );

      if (data.message === "ok") {
        setGetBooks(data.data);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleUnFollowReligon = async () => {
    const res = await axiosClients.post(
      `/Test/${TestID}/unfollow`,
      {},
      {
        headers: authHeaderAndAccount(),
      }
    );

    if (res.message === "ok") {
      setIsFollowed(false);
    } else {
    }
  };

  const handleFollowReligon = async () => {
    const res = await axiosClients.post(
      `/Test/${TestID}/follow`,
      {},
      {
        headers: authHeaderAndAccount(),
      }
    );

    if (res.message === "ok") {
      setIsFollowed(true);
    } else {
    }
  };

  const handleLeaveReligon = async () => {
    if (!isRequesting) {
      const res = await axiosClients.post(
        `/Test/${TestID}/leave`,
        {},
        {
          headers: authHeaderAndAccount(),
        }
      );
      if (res.message === "ok") {
        setIsJoined(false);
      } else {
      }
    }
  };

  const handleJoinReligon = async () => {
    const res = await axiosClients.post(
      `/Test/${TestID}/join`,
      {},
      {
        headers: authHeaderAndAccount(),
      }
    );
    if (res.message === "ok") {
      setIsJoined(true);
      setIsRequesting(true);
    } else {
    }
  };

  return (
    <div id="sidebarleft" className="div306 leftSideBar">
      <div className="sibar-inner-wrapper">
        {/* start of card */}
        <div className="card quick-facts">
          <div className="card-header">Quick Facts</div>
          <div className="card-body">
            <div className="top">
              <div className="image">
                <img
                  alt="alt"
                  className="avatarIcon avatarIconWidthHeight"
                  src={
                    !isEmpty(quickFacts.founder_picture_url_full)
                      ? quickFacts.founder_picture_url_full
                      : "/img/noPhotoImage.jpg"
                  }
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
              </div>
              <div className="content">
                <p className="fs--12">
                  <a href="/">
                    <strong> {quickFacts.name}</strong>
                  </a>
                </p>
                <p className="fs--12">
                  <span className="blue">Your Status:</span> Level Member
                </p>
                <p className="fs--12" style={{ display: "inline-block" }}>
                  <span className="blue">Your Match:</span>{" "}
                </p>
                <div className="progress">
                  <div className="progress-bar" style={{ width: "46%" }} />
                </div>{" "}
                46%
                <p />
              </div>
              <div className="clearfix" />
            </div>
            <p className="fs--12">
              <span className="blue">
                <strong>Membership:</strong>
              </span>{" "}
              1,345 affiliates in 43 U.S. States and 20 countries
            </p>
            <p className="fs--12">
              <span className="blue">
                <strong>Age:</strong>
              </span>{" "}
              {diffDate}
            </p>
            <p className="fs--12">
              <span className="blue">
                <strong>Mantra:</strong>
              </span>{" "}
              {quickFacts?.mantra}
            </p>
            <p className="fs--12">
              <span className="blue">
                <strong>Major Orientation/Worldview:</strong>
              </span>{" "}
              {quickFacts?.major_orientation}
            </p>
          </div>
          <div
            className="card-footer"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              maxWidth: 300,
              flexWrap: "wrap",
              margin: "1px 1px 1px 1px",
            }}
          >
            {isFollowed ? (
              <span
                onClick={handleUnFollowReligon}
                className="float-left btn btn-round bg--defaultBlue text-white"
                style={{
                  margin: "1px 1px",
                }}
              >
                Unfollow {quickFacts.name}
              </span>
            ) : isFollowed === false ? (
              <span
                style={{
                  margin: "1px 1px ",
                }}
                onClick={handleFollowReligon}
                className="float-left btn btn-round bg--defaultBlue text-white"
              >
                Tour {quickFacts.name}
              </span>
            ) : (
              ""
            )}
            {isJoined ? (
              <span
                onClick={handleLeaveReligon}
                className="float-right btn btn-round bg--defaultBlue text-white"
              >
                {isRequesting ? "Requesting" : "Leave"} {quickFacts.name}
              </span>
            ) : isJoined === false ? (
              <span
                onClick={handleJoinReligon}
                className="float-right btn btn-round bg--defaultBlue text-white"
              >
                Join {quickFacts.name}
              </span>
            ) : (
              ""
            )}
            <div className="clearfix" />
          </div>
        </div>
        {/* end of card */}
        {/* start of card */}
        <div className="card mt--5 education">
          <div className="card-header">Education</div>
          <div className="card-body">
            <p className="fs--12">View Hoshi Union's:</p>
            <p className="fs--12">
              <a
                href={`https://develop.divj4fmlgk8ov.amplifyapp.com/auth/login/${TestID}`}
                target="_blank"
                className="bright-blue"
                rel="noopener noreferrer"
              >
                NRM Admin Panel
              </a>
            </p>
            <p className="fs--12">
              <a href="/" className="bright-blue">
                About our NRM
              </a>
            </p>
            <p className="fs--12">
              <a href="/" className="bright-blue">
                Religious Profile
              </a>
            </p>
            <p className="fs--12">
              <a href="/" className="bright-blue">
                Member Bios/Directory
              </a>
            </p>
            <p className="fs--12">
              <a href={`/writing/${TestID}`} className="bright-blue">
                Writings
              </a>
            </p>
            <ul className="writings-list">
              {getBooks.map((item, index) => {
                return (
                  <li className="fs--12">
                    <a href="/" className="bright-blue">
                      <i className="fa fa-book" />
                      Book {index + 1} : {item.title}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        {/* end of card */}
        {/* start of card */}
        <div className="card mt--5 new-members">
          <div className="card-header">New Members</div>
          <div className="card-body">
            {/* start of group */}

            {!isEmpty(newMember)
              ? newMember.map((item) => {
                  return (
                    <div className="author mt--5">
                      <img
                        alt="alt"
                        className="avatarIcon"
                        src={
                          !isEmpty(item.profile_picture_url_full)
                            ? item.profile_picture_url_full
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
                        <a className="bright-blue" href="/">
                          {item.first_name + item.last_name} (
                          <span>{item.city + item.state}</span> )
                        </a>
                        <br />
                        <small className="fs--12">{item.greeting}</small>
                      </p>
                      <div className="clearfix" />
                    </div>
                  );
                })
              : "No Members."}
          </div>
        </div>
        {/* end of card */}
        <div className="clearfix" />
      </div>
    </div>
  );
};
export default BoxLeft;
