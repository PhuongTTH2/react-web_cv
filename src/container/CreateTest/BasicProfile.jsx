import { useEffect, useState, useRef } from "react";
import Footer from "../../components/Footer";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Header from "../../components/Header";
import axiosNoAuth from "api/rest/axiosNoAuth";
import apiGets from "api/rest/apiGets";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Country, State, City } from "country-state-city";
import { isEmpty } from "lodash";
import { authHeaderAndAccount } from "api/rest/header";
import apiPosts from "api/rest/apiPosts";
import axiosClientsFormData from "api/rest/axiosClientsFormData";
import moment from "moment";
import { isUserSelector } from "selectors/authSelector";
import { useSelector } from "react-redux";
import "./CreateTest.css";

const BasicProfile = ({ handleStep, handleTestID }) => {
  const schema = yup.object().shape({
    name: yup.string().required("Name is required").max(40).label("Name"),
    major_orientation: yup
      .string()
      .required("Major Orientation is required")
      .max(250)
      .label("Major Orientation"),
    mantra: yup.string().required("Mantra is required").max(60).label("Mantra"),
    founder_bio: yup.string().max(250).label("Founder Bio"),
    events: yup.array().of(
      yup.object().shape({
        name: yup.string().required("Name is required").label("Name"),
        type: yup.string().required("Event/Ceremony/Holiday is required"),
        description: yup
          .string()
          .required("Brief Description is required")
          .max(100)
          .label("Brief Description"),
      })
    ),
  });

  const defaulValueEvents = {
    name: "",
    type: "event",
    description: "",
    start_at: moment(new Date()).format("MM-DD"),
    end_at: moment(new Date()).format("MM-DD"),
  };

  const defaultValues = {
    name: "",
    country: "",
    state: "",
    city: "",
    major_orientation: "",
    influences: [],
    otherTest: "",
    mantra: "",
    founder_picture: "",
    founder_bio: "",
    events: [defaulValueEvents],
  };
  const user = useSelector(isUserSelector);

  const [startDate, setStartDate] = useState([new Date()]);
  const [endDate, setEndDate] = useState([new Date()]);
  const [errorValidate, setErrorValidate] = useState("");
  const [listCountry, setListCountry] = useState([]);
  const [listState, setListState] = useState([]);
  const [listCity, setListCity] = useState([]);
  const [uploadFile, setUploadFile] = useState(null);
  const [TestInfluences, setTestInfluences] = useState([]);
  const [openTextareaOther, setOpenTextareaOther] = useState(false);
  const [arrayCheck, setArrayCheck] = useState([]);
  const [arrayEvents, setArrayEvents] = useState([defaulValueEvents]);
  const [eventCheckboxs, setEventCheckboxs] = useState([false]);

  const ref = useRef();
  const ref1 = useRef();
  const ref2 = useRef();
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
    (async () => {
      setListCountry([Country.getCountryByCode("US")]);
      form.setValue("country", Country.getCountryByCode("US").isoCode);
      setListState(State.getStatesOfCountry("US"));
      const getTestInfluences = await axiosNoAuth.get(
        apiGets.getTestInfluences
      );

      let addOther = [...getTestInfluences.data, "Other"];
      const getCheck = [];
      addOther.forEach((value, i) => {
        if (i === 0) {
          getCheck.push(true);
        } else {
          getCheck.push(false);
        }
      });
      setArrayCheck(getCheck);
      setTestInfluences(addOther);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = () => {
    ref.current.click();
  };

  const handleClickEventStart = () => {
    ref1.current.setFocus(true);
  };

  const handleClickEventEnd = () => {
    ref2.current.setFocus(true);
  };

  const handleState = (e) => {
    let nameState = State.getStateByCodeAndCountry(
      e.target.value,
      form.getValues("country")
    );
    if (nameState) {
      form.setValue("state", nameState.name);
    }
    let currentCity = City.getCitiesOfState(
      form.getValues("country"),
      e.target.value
    );
    form.setValue("city", "");
    setListCity(currentCity);
  };

  const handleCity = (e) => {
    form.setValue("city", e.target.value);
  };

  const onChangeTestInfluences = (event, index) => {
    const newArrayCheck = [...arrayCheck];
    newArrayCheck[index] = !arrayCheck[index];
    const limit = newArrayCheck.filter((i) => i === true).length;
    if (limit > 5) return;
    if (newArrayCheck[newArrayCheck.length - 1]) {
      setOpenTextareaOther(true);
    } else {
      setOpenTextareaOther(false);
      form.setValue("otherTest", "");
    }
    setArrayCheck(newArrayCheck);
  };

  const handleUploadFileLocal = (event) => {
    const objectUrl = URL.createObjectURL(event.target.files[0]);
    setUploadFile(objectUrl);
    form.setValue("founder_picture", event.target.files[0]);
    event.target.value = null;
  };

  const handleFounderBio = () => {
    form.setValue("founder_bio", user?.users?.about);
  };
  const handleAddRow = () => {
    if (arrayEvents.length < 3) {
      setArrayEvents([...arrayEvents, defaulValueEvents]);
      setStartDate([...startDate, new Date()]);
      setEndDate([...endDate, new Date()]);
      setEventCheckboxs([...eventCheckboxs, false]);
      form.setValue(`events.${arrayEvents.length}`, defaulValueEvents);
    }
  };

  const handleRemoveRow = (index) => {
    let newArrayEvents = arrayEvents.filter((value, i) => i !== index);
    setArrayEvents(newArrayEvents);
    let newStartDate = startDate.filter((value, i) => i !== index);
    setStartDate(newStartDate);
    let newEndDate = endDate.filter((value, i) => i !== index);
    setEndDate(newEndDate);
    let newEventCheckboxs = eventCheckboxs.filter((value, i) => i !== index);
    setEventCheckboxs(newEventCheckboxs);
    let newEvents = form.getValues("events").filter((value, i) => i !== index);
    form.setValue("events", newEvents);
  };

  const onChangeEventRadio = (event, index) => {
    form.setValue(`events.${index}.type`, event.target.value);
    handleEventCheckbox(false, index);
  };

  const handleEventCheckbox = (event, index) => {
    const newEventCheckboxs = [...eventCheckboxs];
    if (event && form.getValues(`events.${index}.type`) !== "holiday") {
      newEventCheckboxs[index] = event;
      let newEndDate = [...endDate];
      newEndDate[index] = startDate[index];
      setEndDate(newEndDate);
      form.setValue(
        `events.${index}.end_at`,
        moment(startDate[index]).format("MM-DD")
      );
    } else {
      newEventCheckboxs[index] = false;
    }

    setEventCheckboxs(newEventCheckboxs);
  };

  const handleEventStartDate = (date, index) => {
    let newStartDate = [...startDate];
    newStartDate[index] = date;
    setStartDate(newStartDate);
    form.setValue(`events.${index}.start_at`, moment(date).format("MM-DD"));

    if (
      moment(date).isAfter(moment(endDate[index])) ||
      (eventCheckboxs[index] &&
        form.getValues(`events.${index}.type`) !== "holiday")
    ) {
      let newEndDate = [...endDate];
      newEndDate[index] = date;
      setEndDate(newEndDate);
      form.setValue(`events.${index}.end_at`, moment(date).format("MM-DD"));
    }
  };

  const handleEventEndDate = (date, index) => {
    let newDate = [...endDate];
    newDate[index] = date;
    setEndDate(newDate);
    form.setValue(`events.${index}.end_at`, moment(date).format("MM-DD"));

    if (
      eventCheckboxs[index] &&
      form.getValues(`events.${index}.type`) !== "holiday"
    ) {
      let newStartDate = [...startDate];
      newStartDate[index] = date;
      setStartDate(newStartDate);
      form.setValue(`events.${index}.start_at`, moment(date).format("MM-DD"));
    }
  };

  const onSubmit = async (inputs) => {
    let arrayTestInfluencesSave = [];
    for (let i = 0; i < TestInfluences.length - 1; i++) {
      if (arrayCheck[i]) {
        arrayTestInfluencesSave.push(TestInfluences[i]);
      }
    }
    if (arrayCheck[arrayCheck.length - 1]) {
      arrayTestInfluencesSave.push(inputs.otherTest);
    }
    let bodyFormData = new FormData();
    bodyFormData.append("name", inputs.name);
    bodyFormData.append("city", inputs.city);
    bodyFormData.append("state", inputs.state);
    bodyFormData.append("country", inputs.country);
    bodyFormData.append("major_orientation", inputs.major_orientation);
    bodyFormData.append("mantra", inputs.mantra);
    if (inputs.founder_picture) {
      bodyFormData.append("founder_picture", inputs.founder_picture);
    }
    bodyFormData.append("founder_bio", inputs.founder_bio);
    bodyFormData.append(
      "influences",
      JSON.stringify(arrayTestInfluencesSave)
    );
    bodyFormData.append("events", JSON.stringify(inputs.events));
    const res = await axiosClientsFormData({
      method: "post",
      url: apiPosts.createTest,
      headers: authHeaderAndAccount(),
      data: bodyFormData,
    });
    if (res.message === "ok") {
      handleStep(3);
      handleTestID(res.data.Test_id);
    } else {
    }
  };

  return (
    <div className="bg--white">
      <div id="main" className="surveyTemplate">
        {/* start of header */}
        <Header />
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
                  src="img/icons/search_reverse_96px.png"
                />
              </button>
            </div>
            <div className="width15">
              <a id="lside-btn" href="/">
                <img alt="alt" src="img/mmemu_dark_icon.png" />
              </a>
            </div>
            <div className="clearfix" />
          </div>
        </div>
        {/* end of mobile search bar */}
        {/* start of content */}
        <div id="surveyLayout" className="content">
          <div className="container no-padding-lr">
            <div id="my-create-page">
              <div className="my-page-title">
                <h1>Basic Religious Profile Information</h1>
                <p>Please tell us about your Test:</p>
              </div>
              <div className="create-cont">
                <div className="create-label">
                  <h3>
                    NRM Name<span className="required">*</span>
                  </h3>
                </div>
                <div className="create-inner">
                  <input
                    style={{
                      border: isEmpty(errorValidate?.name)
                        ? ""
                        : "solid 1px #ff0000",
                    }}
                    type="text"
                    placeholder="Enter your Test’s name here limit: 40 characters"
                    name="name"
                    onChange={(e) => form.setValue("name", e.target.value)}
                  />
                  {errorValidate.name && (
                    <span className="error-login">
                      {errorValidate.name.message}
                    </span>
                  )}
                  <div className="field-range">0/40 </div>
                </div>
                <div className="clearfix" />
              </div>
              {/* .create-cont */}
              <div className="create-cont geograph">
                <div className="create-label">
                  <h3>Geographic Base</h3>
                </div>
                <div className="create-inner">
                  <div className="inner-inputs">
                    <p>Where are you based?</p>
                    <select id="country" name="country" className="my-form">
                      {/* <option value="" selected="selected">
                        Country
                      </option> */}
                      {listCountry.map((option, index) => (
                        <option key={index} value={option.isoCode}>
                          {option.name}
                        </option>
                      ))}
                    </select>
                    <select
                      name="state"
                      className="my-form"
                      onChange={(e) => handleState(e)}
                    >
                      <option {...form.register("state")} selected="selected">
                        State/Province
                      </option>
                      {listState.map((option, index) => (
                        <option key={index} value={option.isoCode}>
                          {option.name}
                        </option>
                      ))}
                    </select>
                    <select
                      {...form.register("city")}
                      onChange={(e) => handleCity(e)}
                    >
                      <option value="">City/Town</option>
                      {listCity.map((option, index) => (
                        <option value={option.name}>{option.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="clearfix" />
              </div>
              {/* .create-cont.geograph */}
              <div className="create-cont">
                <div className="create-label">
                  <h3>
                    Major Orientation/Worldview
                    <span className="required">*</span>
                  </h3>
                </div>
                <div className="create-inner">
                  <textarea
                    type="text"
                    placeholder="Give a brief description of the major tenets, beliefs and emphases of your NRM and what distinguishes it from other Tests"
                    defaultValue={""}
                    style={{
                      border: isEmpty(errorValidate?.major_orientation)
                        ? ""
                        : "solid 1px #ff0000",
                    }}
                    name="major_orientation"
                    onChange={(e) =>
                      form.setValue("major_orientation", e.target.value)
                    }
                  />
                  {errorValidate.major_orientation && (
                    <span className="error-login">
                      {errorValidate.major_orientation.message}
                    </span>
                  )}
                  <div className="field-range">0/250 </div>
                </div>
                <div className="clearfix" />
              </div>
              {/* .create-cont */}
              <div className="create-cont Test-cont">
                <div className="create-label">
                  <h3>Religious Influences</h3>
                </div>
                <div className="create-inner">
                  <div className="inner-inputs">
                    <h4>
                      Which Tests influence your NRM? (check all that apply
                      - limit of five)
                    </h4>
                    <fieldset id="group1">
                      {TestInfluences.map((value, index) => (
                        <label className="radio-cont">
                          <input
                            type="radio"
                            value={value}
                            checked={arrayCheck[index]}
                            name={index}
                            style={{ marginRight: 5 }}
                            onClick={(e) =>
                              onChangeTestInfluences(e, index)
                            }
                          />
                          {value}
                        </label>
                      ))}
                      {openTextareaOther ? (
                        <label className="radio-cont">
                          <textarea
                            type="text"
                            name="otherTest"
                            defaultValue={""}
                            {...form.register("otherTest")}
                            onChange={(e) =>
                              form.setValue("otherTest", e.target.value)
                            }
                          />
                        </label>
                      ) : (
                        ""
                      )}
                    </fieldset>
                  </div>
                </div>
                <div className="clearfix" />
              </div>
              {/* .create-cont.Test-cont */}
              <div className="create-cont">
                <div className="create-label">
                  <h3>
                    Mantra<span className="required">*</span>
                  </h3>
                </div>
                <div className="create-inner">
                  <textarea
                    type="text"
                    placeholder="Please summarize the essence of your Test in 60 characters or less"
                    defaultValue={""}
                    style={{
                      height: 41,
                      resize: "none",
                      border: isEmpty(errorValidate?.mantra)
                        ? ""
                        : "solid 1px #ff0000",
                    }}
                    name="mantra"
                    onChange={(e) => form.setValue("mantra", e.target.value)}
                  />
                  {errorValidate.mantra && (
                    <span className="error-login">
                      {errorValidate.mantra.message}
                    </span>
                  )}
                  <div className="field-range">0/60 </div>
                </div>
                <div className="clearfix" />
              </div>
              {/* .create-cont */}
              <div className="create-cont">
                <div className="create-label">
                  <h3>
                    Major Events, Ceremonies and Holidays
                    <span className="required">*</span>
                  </h3>
                </div>
                <div className="create-inner">
                  <div className="inner-inputs">
                    {arrayEvents.map((item, index) => (
                      <div style={{ display: "flex" }}>
                        <div className="major-events" style={{ marginTop: 15 }}>
                          <input
                            style={{
                              border:
                                errorValidate?.events?.length &&
                                !isEmpty(errorValidate?.events[index]?.name)
                                  ? "solid 1px #ff0000"
                                  : "",
                            }}
                            type="text"
                            name="nameEvent"
                            placeholder="Enter name of event, ceremony or holiday"
                            {...form.register(`events.${index}.name`)}
                            onChange={(e) =>
                              form.setValue(
                                `events.${index}.name`,
                                e.target.value
                              )
                            }
                          />
                          {errorValidate?.events?.length &&
                            errorValidate?.events[index]?.name && (
                              <span className="error-login">
                                {errorValidate?.events[index]?.name.message}
                              </span>
                            )}
                          <div className="me-inner">
                            <div className="me-buttons">
                              <fieldset id="group2">
                                <p>Type: </p>
                                <label>
                                  <input
                                    {...form.register(`events.${index}.type`)}
                                    type="radio"
                                    name={`radioEvent.${index}`}
                                    value="event"
                                    onClick={(e) =>
                                      onChangeEventRadio(e, index)
                                    }
                                  />
                                  Event
                                </label>
                                <label>
                                  <input
                                    {...form.register(`events.${index}.type`)}
                                    type="radio"
                                    name={`radioEvent.${index}`}
                                    value="ceremony"
                                    onClick={(e) =>
                                      onChangeEventRadio(e, index)
                                    }
                                  />
                                  Ceremony
                                </label>
                                <label>
                                  <input
                                    {...form.register(`events.${index}.type`)}
                                    type="radio"
                                    name={`radioEvent.${index}`}
                                    value="holiday"
                                    onClick={(e) =>
                                      onChangeEventRadio(e, index)
                                    }
                                  />
                                  Holiday
                                </label>
                              </fieldset>
                              {errorValidate?.events?.length &&
                                errorValidate?.events[index]?.type && (
                                  <span className="error-login">
                                    {errorValidate?.events[index]?.type.message}
                                  </span>
                                )}
                            </div>
                            <div className="descriptionEvent">
                              <div style={{ minWidth: "120px" }}>
                                <label>Brief Description:</label>
                              </div>
                              <div style={{ width: "100%" }}>
                                <textarea
                                  style={{
                                    border:
                                      errorValidate?.events?.length &&
                                      !isEmpty(
                                        errorValidate?.events[index]
                                          ?.description
                                      )
                                        ? "solid 1px #ff0000"
                                        : "",
                                  }}
                                  type="text"
                                  defaultValue={""}
                                  {...form.register(
                                    `events.${index}.description`
                                  )}
                                  onChange={(e) =>
                                    form.setValue(
                                      `events.${index}.description`,
                                      e.target.value
                                    )
                                  }
                                />
                                {errorValidate?.events?.length &&
                                  errorValidate?.events[index]?.description && (
                                    <span className="error-login">
                                      {
                                        errorValidate?.events[index]
                                          ?.description.message
                                      }
                                    </span>
                                  )}
                                <div className="field-range">0/100 </div>
                              </div>
                            </div>
                            <div className="datePickerBox">
                              <span
                                style={{
                                  marginRight: "5px",
                                }}
                              >
                                Start:
                              </span>
                              <div className="datePickerEvent">
                                <DatePicker
                                  minDate={new Date()}
                                  maxDate={
                                    new Date(new Date().getFullYear(), 11, 31)
                                  }
                                  selected={startDate[index]}
                                  dateFormat="MM-dd"
                                  onChange={(date) =>
                                    handleEventStartDate(date, index)
                                  }
                                  ref={ref1}
                                />
                                <img
                                  alt="alt"
                                  style={{ width: "25px", height: "15px" }}
                                  className=" pl--5 pr--5"
                                  src="img/icons/icon_datepicker.png"
                                  onClick={handleClickEventStart}
                                />
                              </div>
                              <span
                                style={{
                                  marginRight: "5px",
                                }}
                              >
                                End:
                              </span>
                              <div className="datePickerEvent">
                                <DatePicker
                                  selected={endDate[index]}
                                  minDate={startDate[index]}
                                  maxDate={
                                    new Date(new Date().getFullYear(), 11, 31)
                                  }
                                  dateFormat="MM-dd"
                                  onChange={(date) =>
                                    handleEventEndDate(date, index)
                                  }
                                  ref={ref2}
                                />
                                <img
                                  alt="alt"
                                  style={{ width: "25px", height: "15px" }}
                                  className=" pl--5 pr--5"
                                  src="img/icons/icon_datepicker.png"
                                  onClick={handleClickEventEnd}
                                />
                              </div>
                            </div>
                            <div className="me-check">
                              <p style={{ display: "inline-flex" }}>
                                Check
                                <input
                                  style={{ margin: "0 2px" }}
                                  type="checkbox"
                                  checked={eventCheckboxs[index]}
                                  name={`checkboxs${index}`}
                                  onClick={(e) =>
                                    handleEventCheckbox(e.target.checked, index)
                                  }
                                />
                                if event/ceremony ends same day as it starts.
                              </p>
                            </div>
                          </div>
                        </div>
                        {arrayEvents.length === 1 ||
                        (arrayEvents.length === index + 1 &&
                          arrayEvents.length !== 3) ? (
                          <div className="addevents" style={{ marginTop: 15 }}>
                            <span
                              class="pointerA"
                              onClick={() => handleAddRow()}
                            >
                              <img alt="alt" src="img/icon-add.png" />
                            </span>
                            <p>Add New Event, Ceremony or Holiday</p>
                          </div>
                        ) : (
                          <div className="addevents" style={{ marginTop: 15 }}>
                            <span
                              class="pointerA"
                              onClick={() => handleRemoveRow(index)}
                            >
                              <img alt="alt" src="img/delete_red_icon.png" />
                            </span>
                            <p>Remove Event, Ceremony or Holiday</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="clearfix" />
              </div>
              {/* .create-cont */}
              <div className="create-cont">
                <div className="create-label">
                  <h3>Founder Bio</h3>
                </div>
                <div className="create-inner">
                  <div className="inner-inputs" style={{ paddingTop: 15 }}>
                    <input
                      type="file"
                      accept=".jpg,.jpeg,.png"
                      style={{ display: "none" }}
                      ref={ref}
                      alt="Upload"
                      onChange={(e) => handleUploadFileLocal(e)}
                    />
                    <div className="bio-prof">
                      <img
                        alt="alt"
                        style={{ width: 41, height: 41 }}
                        src={
                          uploadFile !== null ? uploadFile : "img/icon-bio.png"
                        }
                        onClick={handleClick}
                      />
                      Edit
                    </div>
                    <div className="bio-prof-mobile">
                      <img
                        alt="alt"
                        style={{ width: 41, height: 41 }}
                        src={
                          uploadFile !== null ? uploadFile : "img/icon-bio.png"
                        }
                        onClick={handleClick}
                      />
                      <div href="/">Edit</div>
                    </div>
                    <div className="bio-cont">
                      <textarea
                        type="text"
                        placeholder="Tell us about yourself and why you are creating this Test (limit:  250 words)"
                        defaultValue={""}
                        style={{
                          border: isEmpty(errorValidate?.founder_bio)
                            ? ""
                            : "solid 1px #ff0000",
                        }}
                        name="founder_bio"
                        {...form.register("founder_bio")}
                        onChange={(e) =>
                          form.setValue("founder_bio", e.target.value)
                        }
                      />
                      {errorValidate.founder_bio && (
                        <span className="error-login">
                          {errorValidate.founder_bio.message}
                        </span>
                      )}
                      <p>
                        Or click{" "}
                        <span
                          className="bright-blue pointerA"
                          onClick={handleFounderBio}
                        >
                          here
                        </span>{" "}
                        to re-use your regular bio
                      </p>
                    </div>
                    <div className="clearfix" />
                    <div className="field-range">0/250 </div>
                  </div>
                </div>
                <div className="clearfix" />
              </div>
              {/* .create-cont */}
              <div className="create-cont submit-create pt-40">
                <button
                  type="button"
                  onClick={form.handleSubmit(onSubmit)}
                  className="btn btn-primary fs--12"
                  disabled={form.formState.isSubmitting}
                >
                  Submit
                </button>
                {/* <a onClick={()=>{ handleStep(3)}} style={{cursor:'pointer', color:'#FFF'}} >Submit</a> */}
                <div className="clearfix" />
              </div>
              {/* .create-cont */}
            </div>
            {/* #my-create-page */}
            <div className="clearfix" />
          </div>
          {/* .container.no-padding-lr */}
          <div className="clearfix" />
        </div>
        {/* sart of footer */}
        <Footer />
        {/* end of footer */}
      </div>
    </div>
  );
};

export default BasicProfile;
