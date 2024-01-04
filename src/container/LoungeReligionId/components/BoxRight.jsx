import React, { useEffect, useState } from "react";
import { authHeaderAndAccount } from "api/rest/header";
import axiosClients from "api/rest/axiosClients";
import moment from "moment";
import { isEmpty } from "lodash";

const BoxRight = ({ TestID }) => {
  const messages = [
    {
      name: "xxx ",
      message: "Hey Jordan! ",
    },
    {
      name: "xxx ",
      message: "Coffee sometime?  ",
    },
    {
      name: "xxx",
      message: "Like your bio ",
    },
    {
      name: "xxx",
      message: "Hey Jordan! ",
    },
    {
      name: "xxx",
      message: "Hey Jordan! ",
    },
    {
      name: "xxx",
      message: "Coffee sometime? ",
    },
    {
      name: "xxx",
      message: "Like your bio",
    },
    {
      name: "xxx",
      message: "Hey Jordan!",
    },
    {
      name: "xxx",
      message: "Coffee sometime?",
    },
    {
      name: "xxx",
      message: "Like your bio",
    },
    {
      name: "xxx",
      message: " Coffee sometime?",
    },
    {
      name: "xxx",
      message: "Like your bio",
    },
    {
      name: "xxx",
      message: "Hey Jordan! ",
    },
    {
      name: "xxx",
      message: "Coffee sometime?",
    },
    {
      name: "xxx",
      message: "Like your bio",
    },
  ];

  const [getToDay, setGetToDay] = useState([]);
  const [getWeek, setGetWeek] = useState([]);
  const [getMonth, setGetMonth] = useState([]);
  const [getYear, setGetYear] = useState([]);

  useEffect(() => {
    (async () => {
      const data = await axiosClients.get(`/Test/${TestID}/events`, {
        headers: authHeaderAndAccount(),
      });
      let currentYear = new Date().getFullYear();

      if (data.message === "ok") {
        let todays = data.data.filter((value, i) => {
          return moment(value.start_at + "-" + currentYear).format(
            "MM-DD-YYYY"
          ) === moment(new Date()).format("MM-DD-YYYY")
            ? true
            : false;
        });

        let weeks = data.data.filter((value, i) => {
          return moment(value.start_at + "-" + currentYear).isoWeek() ===
            moment(new Date()).isoWeek()
            ? true
            : false;
        });

        let months = data.data.filter((value, i) => {
          return moment(value.start_at + "-" + currentYear).format(
            "MM-YYYY"
          ) === moment(new Date()).format("MM-YYYY")
            ? true
            : false;
        });
        let years = data.data;
        setGetToDay(todays);

        let weeksFormat = weeks.map((item) => {
          return {
            ...item,
            start_at: moment(Number(Date.parse(item.start_at))).format(
              " MMM DD"
            ),
          };
        });
        setGetWeek(weeksFormat);

        let monthsFormat = months.map((item) => {
          return {
            ...item,
            start_at: moment(Number(Date.parse(item.start_at))).format(
              " MMM DD"
            ),
          };
        });
        setGetMonth(monthsFormat);

        let yearsFormat = years.map((item) => {
          return {
            ...item,
            start_at: moment(Number(Date.parse(item.start_at))).format(
              " MMM DD"
            ),
          };
        });
        setGetYear(yearsFormat);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div id="sidebarright" className="div306 rightSideBar">
      <div className="sibar-inner-wrapper">
        {/* start of card */}
        <div className="card no-bottom-border upcomning-events">
          <div className="card-header">Upcoming Events</div>
          <div className="card-body">
            <div className="event">
              <p className="fs--12">
                <strong>
                  <span className="blue">Today</span>
                </strong>
                <br />
                {!isEmpty(getToDay)
                  ? getToDay.map((item) => {
                      return (
                        <>
                          <a href="/" className="fs--12 bright-blue">
                            {item.name}
                          </a>
                          <br />
                        </>
                      );
                    })
                  : "No Event"}
              </p>
            </div>
            <div className="event">
              <p className="fs--12">
                <strong>
                  <span className="blue">This Week</span>
                </strong>
                <br />
                {!isEmpty(getWeek)
                  ? getWeek.map((item) => {
                      return (
                        <>
                          <a href="/" className="fs--12 bright-blue">
                            {item.name} -{item.start_at}
                          </a>
                          <br />
                        </>
                      );
                    })
                  : "No Event"}
              </p>
            </div>
            <div className="event">
              <p className="fs--12">
                <strong>
                  <span className="blue">This Month</span>
                </strong>
                <br />
                {!isEmpty(getMonth)
                  ? getMonth.map((item) => {
                      return (
                        <>
                          <a href="/" className="fs--12 bright-blue">
                            {item.name} -{item.start_at}
                          </a>
                          <br />
                        </>
                      );
                    })
                  : "No Event"}
              </p>
            </div>
            <div className="event">
              <p className="fs--12">
                <strong>
                  <span className="blue">This Year</span>
                </strong>
                <br />
                {!isEmpty(getYear)
                  ? getYear.map((item) => {
                      return (
                        <>
                          <a href="/" className="fs--12 bright-blue">
                            {item.name} -{item.start_at}
                          </a>
                          <br />
                        </>
                      );
                    })
                  : "No Event"}
              </p>
            </div>
          </div>
        </div>
        {/* end of card */}
        {/* start of card */}
        <div className="card mt--5 no-bottom-border messages">
          <div className="card-header">
            Messages{" "}
            <small style={{ color: "#ffffff", marginLeft: 5 }}>
              <strong>(Hoshi Union)</strong>
            </small>
          </div>
          <div className="card-body">
            <ul className="msgs">
              {messages &&
                messages.map((item) => {
                  return (
                    <li>
                      <a
                        href="/"
                        data-toggle="modal"
                        data-target="#newMsg"
                        className="fs--12"
                      >
                        <span className="bright-blue">{item.name}</span>:{" "}
                        {item.message}
                        <img alt="alt" src="/img/msg-icon.jpg" />
                      </a>
                    </li>
                  );
                })}
            </ul>
            <form style={{ display: "none" }} className="msg-form">
              <button>See All Messages</button>
            </form>
          </div>
        </div>
        {/* end of card */}
        {/* start of card */}
        <div className="card mt--5 no-bottom-border member-directory">
          <div className="card-header">
            Board Members{" "}
            <small style={{ color: "#ffffff", marginLeft: 5 }}>
              <strong>(Hoshi Union)</strong>
            </small>
          </div>
          <div className="card-body">
            {/* start of member */}
            <div className="member mt--10">
              <img alt="alt" src="/img/avatar/jordanism.png" />
              <p className="fs--12 auth-name">
                <a href="/" className="bright-blue">
                  Jordan Holtzman <span className="loc">(Berkeley, CA)</span>
                </a>
                <br />
                Founder
              </p>
              <div className="clearfix" />
              <p className="fs--12">
                <span className="fw--700 blue">Board Service:</span> 2 years, 3
                months
                <br />
                <span className="fw--700 blue">Affiliation:</span> 4 years, 7
                months
              </p>
              <div className="intro">
                <p className="fs--12">
                  <span className="fw--700 blue">Introduction:</span> Welcome to
                  Jordanism. I look forward to interacting with you soon.
                </p>
              </div>
              <div className="intro">
                <p className="fs--12">
                  <span className="fw--700 blue">Bio:</span> I was born in New
                  York and came to the West Coast almost two decades ago. I’m
                  really into gardening, food, and creative projects.
                </p>
              </div>
              <p className="fs--10">
                <a href="/" className="bright-blue">
                  see more . . .
                </a>
              </p>
            </div>
            {/* end of member */}

            {/* start of member */}
            <div className="member mt--10">
              <img alt="alt" src="/img/avatar/sophists.png" />
              <p className="fs--12 auth-name">
                <a href="/" className="bright-blue">
                  Vince Truong <span className="loc">(St. Louis, MO)</span>
                </a>
                <br />
                Vice President of Religious Affairs
              </p>
              <div className="clearfix" />
              <p className="fs--12">
                <span className="fw--700 blue">Board Service:</span> 1 years, 2
                months
                <br />
                <span className="fw--700  blue">Affiliation:</span> 3 years, 6
                months
              </p>
              <div className="intro">
                <p className="fs--12">
                  <span className="fw--700 blue">Introduction:</span> I hope
                  Jordanism does for you all the great things it has done for
                  me.
                </p>
              </div>
              <div className="intro">
                <p className="fs--12">
                  <span className="fw--700 blue">Bio:</span> I am a web
                  developer living in the St. Louis area.
                </p>
              </div>
              <p className="fs--10">
                <a href="/" className="bright-blue">
                  see more . . .
                </a>
              </p>
            </div>
            {/* end of member */}
            {/* start of member */}
            <div className="member mt--10">
              <img alt="alt" src="/img/avatar/jordanism.png" />
              <p className="fs--12 auth-name">
                <a href="/" className="bright-blue">
                  Ed DeBevic <span className="loc" />
                </a>
                <br />
                Secretary
              </p>
              <div className="clearfix" />
              <p className="fs--12">
                <span className="fw--700 blue">Board Service:</span> 0 years, 8
                months
                <br />
                <span className="fw--700 blue">Affiliation:</span> 1 years, 9
                months
              </p>
              <div className="intro">
                <p className="fs--12 blue">
                  <span className="fw--700">Introduction:</span> Hi, I’m the guy
                  that jots it all down!
                </p>
              </div>
              <div className="intro">
                <p className="fs--12 blue">
                  <span className="fw--700">Bio:</span> I enjoy water skiing and
                  traveling the world in my free time. You’ll hopefully find
                  that I have a great sense of humor.
                </p>
              </div>
              <p className="fs--10">
                <a href="/" className="bright-blue">
                  see more . . .
                </a>
              </p>
            </div>
            {/* end of member */}
          </div>
          {/* end of card 
            <div class="bottomLabelBackground bottom-radius-lr-3px no-top-border-color" style="background-color: #ffffff;">
                <a href="/" class="bright-blue text-center fw--300 fs--12">Full Directory</a>
            </div> */}
        </div>
      </div>
      {/* end of right rails */}
      <div className="clearfix" />
    </div>
  );
};
export default BoxRight;
