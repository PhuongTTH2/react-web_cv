import { useEffect, useState, useRef } from "react";
import "./PersonalProfile.css";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { isUserSelector } from "selectors/authSelector";
import { useSelector } from "react-redux";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import axiosClientsFormData from "api/rest/axiosClientsFormData";
import apiPuts from "api/rest/apiPuts";
import { forOwn, isEmpty } from "lodash";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import { useAppDispatch } from "app/hooks";
import { updateAccount } from "slices";
import { authHeaderAndAccount } from "api/rest/header";
import { Country, State, City } from "country-state-city";
import { deleteFileUser } from "utils/helper";
const PersonalProfile = () => {
  const users = useSelector(isUserSelector);
  const dispatch = useAppDispatch();
  const [fullDate, setFullDate] = useState(new Date());
  const minDate = new Date(fullDate.getFullYear(), fullDate.getMonth(), 1);
  const maxDate = new Date(fullDate.getFullYear(), fullDate.getMonth() + 1, 0);
  const [isOpenDatePicker, setIsOpenDatePicker] = useState(false);

  const schema = yup.object().shape({});
  const defaultValues = {
    first_name: "",
    last_name: "",
    profile_picture_url_full: "",
    phone: "",
    street_address_1: "",
    street_address_2: "",
    city: "",
    state: "",
    zip_code: "",
    country: "",
    birth_day: "",
    religious_affiliations: ["", ""],
    about: "",
    audience_type: "",
  };

  const form = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
  });
  const [arrayReligiousAffiliations, setArrayReligiousAffiliations] = useState(
    []
  );
  const [uploadFile, setUploadFile] = useState(null);
  const [uploadFileSave, setUploadFileSave] = useState(null);
  const [listCountry, setListCountry] = useState([]);
  const [listState, setListState] = useState([]);
  const [listCity, setListCity] = useState([]);
  const [removeFile, setRemoveFile] = useState(false);
  useEffect(() => {
    (async () => {
      if (users?.users) {
        let scopeUser = users?.users;

        forOwn(scopeUser, (value, key) => form.setValue(key, value));
        if (form.getValues("religious_affiliations")) {
          setArrayReligiousAffiliations(
            Array.isArray(form.getValues("religious_affiliations"))
              ? form.getValues("religious_affiliations")
              : JSON.parse(form.getValues("religious_affiliations"))
          );
        }
        if (form.getValues("birth_day")) {
          setFullDate(new Date(form.getValues("birth_day")));
        }
        if (form.getValues("profile_picture_url_full")) {
          setUploadFile(form.getValues("profile_picture_url_full"));
        }
        let currentCountry = Country.getCountryByCode("US");
        setListCountry([currentCountry]);
        form.setValue("country", currentCountry?.isoCode);
        setListState(State.getStatesOfCountry("US"));
        let listCurrentState = State.getStatesOfCountry(
          currentCountry?.isoCode
        );
        let currentState = listCurrentState.filter(
          (value, i) => value.name === form.getValues("state")
        );
        let currentCity = City.getCitiesOfState(
          currentCountry?.isoCode,
          currentState[0]?.isoCode
        );

        setListCity(currentCity);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [users?.users]);

  const ref = useRef();
  const handleClick = () => {
    ref.current.click();
  };

  const handleUploadFileLocal = (event) => {
    const objectUrl = URL.createObjectURL(event.target.files[0]);
    setUploadFile(objectUrl);
    setUploadFileSave(event.target.files[0]);
    event.target.value = null;
    setRemoveFile(false);
  };

  const removePhoto = async () => {
    setRemoveFile(true);
    setUploadFile(null);
    setUploadFileSave(null);
  };

  const handleReligiousAffiliations = (e, index) => {
    let newReligiousAffiliations = [...arrayReligiousAffiliations];
    newReligiousAffiliations[index] = e.target.value;
    setArrayReligiousAffiliations(newReligiousAffiliations);
  };

  const renderDayContents = (day, date) => {
    if (date < minDate || date > maxDate) {
      return <span></span>;
    }
    return <span>{date.getDate()}</span>;
  };

  const datepickerRef = useRef(null);

  const handleClickDatePicker = () => {
    setIsOpenDatePicker(!isOpenDatePicker);
    const datepickerElement = datepickerRef.current;

    datepickerElement.setFocus(true);
  };

  const handleChangeDatePicker = (date) => {
    setIsOpenDatePicker(!isOpenDatePicker);
    setFullDate(date);
  };

  const handleState = (e) => {
    form.setValue("city", "");
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
    setListCity(currentCity);
  };

  const handleCity = (e) => {
    form.setValue("city", e.target.value);
  };

  const handldeAddReligious = () => {
    setArrayReligiousAffiliations([...arrayReligiousAffiliations, ""]);
    form.setValue("religious_affiliations", [
      ...arrayReligiousAffiliations,
      "",
    ]);
  };

  const handleProfile = async (inputs) => {
    let bodyFormData = new FormData();
    bodyFormData.append("first_name", inputs.first_name);
    bodyFormData.append("last_name", inputs.last_name);
    if (removeFile) {
      bodyFormData.append("profile_picture_url_full", "");
      let arrayString = inputs.profile_picture_url_full.split("amazonaws.com/");
      if (arrayString.length !== 1) {
        await deleteFileUser(arrayString[1]);
      }
    }

    if (uploadFileSave) {
      bodyFormData.append("profile_picture", uploadFileSave);
    }

    bodyFormData.append("phone", inputs.phone);
    bodyFormData.append("birth_day", moment(fullDate).format("MM/DD/YYYY"));
    bodyFormData.append("about", inputs.about);
    bodyFormData.append("street_address_1", inputs.street_address_1);
    bodyFormData.append("street_address_2", inputs.street_address_2);
    bodyFormData.append("city", inputs.city);
    bodyFormData.append("state", inputs.state);
    bodyFormData.append("zip_code", inputs.zip_code);
    bodyFormData.append("country", inputs.country);
    bodyFormData.append("audience_type", inputs.audience_type);
    bodyFormData.append(
      "religious_affiliations",
      JSON.stringify(arrayReligiousAffiliations)
    );
    const res = await axiosClientsFormData({
      method: "put",
      url: apiPuts.updateAccount,
      headers: authHeaderAndAccount(),
      data: bodyFormData,
    });

    if (res.message === "ok") {
      dispatch(updateAccount(res.account));
    } else {
    }
  };

  const handleOption = (e) => {
    form.setValue("country", e.target.value);
  };

  return (
    <div id="main" className="singlePageTwoColumnLayout">
      {/* start of header */}
      <Header />
      {/* end of header */}
      {/* start of content */}

      <div className="content subPages">
        <div className="container no-padding-lr">
          <div className="headerHolder">
            <h2>Create Personal Profile</h2>
          </div>
          <form className="form defaultInput">
            <div className="row mb--40">
              {/* start of left column */}
              <div className="col-md-6 createProfileLeftColumn">
                {/* start of basic info */}
                <div className="inputForm basicInfo">
                  <div className="headerHolder mb--12">
                    <h4>Please tell us a little about yourself</h4>
                  </div>
                  <div className="row no-margin-lr">
                    <div className="col-md-6 no-padding-lr">
                      <div className="form-group pr--5">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="First Name"
                          name="first_name"
                          {...form.register("first_name")}
                          onChange={(e) =>
                            form.setValue("first_name", e.target.value)
                          }
                        />
                      </div>
                    </div>
                    <div className="col-md-6 no-padding-lr">
                      <div className="form-group pl--5">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Last Name"
                          name="last_name"
                          {...form.register("last_name")}
                          onChange={(e) =>
                            form.setValue("last_name", e.target.value)
                          }
                        />
                      </div>
                    </div>
                    <div className="col-md-12 no-padding-lr">
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Mobile Number"
                          name="phone"
                          {...form.register("phone")}
                          onChange={(e) =>
                            form.setValue("phone", e.target.value)
                          }
                        />
                      </div>
                    </div>
                    {/* <div className="col-md-6 no-padding-lr">
                    <div className="form-group pr--5">
                      <input
                        type="password"
                        className="form-control"
                        id="pass1"
                        placeholder="New Password"
                      />
                    </div>
                  </div>
                  <div className="col-md-6 no-padding-lr">
                    <div className="form-group pl--5">
                      <input
                        type="password"
                        className="form-control"
                        id="pass2"
                        placeholder="Retype Password"
                      />
                    </div>
                  </div> */}
                  </div>
                </div>
                {/* end of basic info */}
                {/* start of info address */}
                <div className="inputForm infoAddress">
                  <div className="headerHolder mb--12">
                    <h4>Address</h4>
                  </div>
                  <div className="row no-margin-lr">
                    <div className="col-md-12 no-padding-lr">
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Street Address"
                          name="street_address_1"
                          {...form.register("street_address_1")}
                          onChange={(e) =>
                            form.setValue("street_address_1", e.target.value)
                          }
                        />
                      </div>
                    </div>
                    <div className="col-md-12 no-padding-lr">
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Street Address 2"
                          name="street_address_2"
                          {...form.register("street_address_2")}
                          onChange={(e) =>
                            form.setValue("street_address_2", e.target.value)
                          }
                        />
                      </div>
                    </div>
                    <div className="col-md-6 no-padding-lr">
                      <div className="form-group pr--5 ">
                        <select
                          onChange={(e) => handleOption(e)}
                          id="country"
                          className="form-control"
                        >
                          {listCountry.map((option, index) => (
                            <option
                              {...form.register("country")}
                              value={option.isoCode}
                              selected={
                                form.getValues("country") === option.isoCode
                                  ? true
                                  : false
                              }
                            >
                              {option.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="col-md-6 no-padding-lr">
                      <div className="form-group pr--5 ">
                        <select
                          name="state"
                          id="state"
                          className="form-control"
                          onChange={(e) => handleState(e)}
                          // {...form.register("state")}
                        >
                          <option
                            selected={
                              form.getValues("state") === "" ? true : false
                            }
                          >
                            State/Province
                          </option>
                          {listState.map((option, index) => (
                            <option
                              selected={
                                form.getValues("state") === option.name
                                  ? true
                                  : false
                              }
                              key={index}
                              value={option.isoCode}
                            >
                              {option.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="col-md-6 no-padding-lr">
                      <div className="form-group pr--5 ">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Postal / Zip Code"
                          name="zip_code"
                          {...form.register("zip_code")}
                          onChange={(e) =>
                            form.setValue("zip_code", e.target.value)
                          }
                        />
                      </div>
                    </div>
                    <div className="col-md-6 no-padding-lr">
                      <div className="form-group pr--5 ">
                        <select
                          name="city"
                          id="city"
                          onChange={(e) => handleCity(e)}
                          className="form-control"
                          {...form.register("city")}
                        >
                          <option
                            selected={
                              form.getValues("city") === "" ? true : false
                            }
                            value=""
                          >
                            City/Town
                          </option>
                          {listCity.map((option, index) => (
                            <option
                              selected={
                                form.getValues("city") === option.name
                                  ? true
                                  : false
                              }
                              value={option.name}
                            >
                              {option.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                {/* end of info address */}
                {/* start of birthday */}
                <div>
                  <div className="headerHolder mb--12">
                    <h4>Birthday</h4>
                  </div>
                  <div className="myContainerDatePicker">
                    <div className="customDatePickerWidth">
                      <DatePicker
                        showMonthYearPicker
                        dateFormat="MMMM"
                        renderCustomHeader={({ date }) => <div></div>}
                        selected={fullDate}
                        onChange={(date) => handleChangeDatePicker(date)}
                      />
                    </div>
                    <div className="customDatePickerWidth">
                      {/* <div className="form-group pl--5"> */}
                      <DatePicker
                        dateFormat="dd"
                        renderCustomHeader={({ date }) => <div></div>}
                        selected={fullDate}
                        renderDayContents={renderDayContents}
                        onChange={(date) => handleChangeDatePicker(date)}
                      />
                      {/* </div> */}
                    </div>
                    <div className="customDatePickerWidth">
                      <DatePicker
                        selected={fullDate}
                        onChange={(date) => handleChangeDatePicker(date)}
                        showYearPicker
                        dateFormat="yyyy"
                      />
                    </div>
                    <div style={{ paddingTop: 12 }}>
                      <img
                        alt="alt"
                        className="iconasset"
                        src="img/icons/calendar_96px.png"
                        onClick={handleClickDatePicker}
                      />
                      <DatePicker
                        selected={fullDate}
                        className="datePickerHide"
                        onChange={(date) => handleChangeDatePicker(date)}
                        ref={datepickerRef}
                      />
                    </div>
                  </div>
                </div>
                {/* end of birthday */}
                {/* start of info Religious Affiliations */}
                <div className="inputForm infoAddress">
                  <div className="headerHolder mb--12">
                    <h4>Religious Affiliations</h4>
                  </div>
                  <div className="row no-margin-lr">
                    {arrayReligiousAffiliations.map((value, index) => (
                      <div className="col-md-12 no-padding-lr">
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control"
                            value={value}
                            onChange={(e) =>
                              handleReligiousAffiliations(e, index)
                            }
                          />
                        </div>
                      </div>
                    ))}

                    <div className="col-md-1 no-padding-lr iconAdd">
                      <div className="form-group pl--10">
                        <img
                          alt="alt"
                          className="width35 pointerA"
                          src="img/icons/add_96px.png"
                          onClick={handldeAddReligious}
                        />
                        {/* </button> */}
                      </div>
                    </div>
                  </div>
                </div>
                {/* end of info address */}
              </div>
              {/* end of left column */}
              {/* start of right column */}
              <div className="col-md-6 createProfileRighttColumn">
                {/* start of profile photo  */}
                <div className="inputForm basicInfo">
                  <div className="headerHolder mb--12">
                    <h4>Upload Your Photo</h4>
                  </div>
                  <div className="uploadPhotoWrapper">
                    <div className="imgHolder float-left">
                      <div
                        className="thisPhoto"
                        style={{ width: 168, height: 168 }}
                      >
                        {/* <label htmlFor="contained-button-file"> */}
                        <input
                          // id="contained-button-file"
                          type="file"
                          accept=".jpg,.jpeg,.png"
                          style={{ display: "none" }}
                          ref={ref}
                          alt="Upload"
                          onChange={(e) => handleUploadFileLocal(e)}
                        />
                        {uploadFile !== null ? (
                          <img
                            alt="uploadFile"
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                            src={uploadFile}
                            onClick={handleClick}
                          />
                        ) : (
                          <img
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                            alt="alt"
                            src="img/noPhotoImage.jpg"
                            onClick={handleClick}
                          />
                        )}
                        {/* </label> */}
                      </div>
                    </div>
                    <p className="removePhoto float-left ">
                      <span
                        className="colorDarkRed pointerA"
                        onClick={removePhoto}
                      >
                        Remove Photo
                      </span>
                    </p>
                  </div>
                  <div className="clearfix" />
                </div>
                {/* end of profile photo */}
                {/* start of About */}
                <div className="inputForm basicInfo">
                  <div className="headerHolder mb--12">
                    <h4>About</h4>
                  </div>
                  <div className="row no-margin-lr">
                    <div className="col-md-12 no-padding-lr">
                      <div className="form-group about">
                        <textarea
                          className="form-control"
                          defaultValue={
                            "Tell us a little bit about yourself. Possible topics - your interests and hobbies, your life philosophy, your goals, what you do for a living, etc., your favorite foods, etc."
                          }
                          name="about"
                          {...form.register("about")}
                          onChange={(e) =>
                            form.setValue("about", e.target.value)
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {/* end of About */}
                {/* start of audience */}
                <div className="inputForm infoBday">
                  <div className="headerHolder mb--12">
                    <h4>Audience</h4>
                  </div>
                  <div className="row no-margin-lr">
                    <div className="col-md-3 no-padding-lr">
                      <div className="form-group pr--5">
                        <select
                          id="privacy"
                          className="form-control"
                          onChange={(e) =>
                            form.setValue("audience_type", e.target.value)
                          }
                        >
                          <option
                            value="Public"
                            selected={
                              form.getValues("audience_type") === "Public"
                                ? true
                                : false
                            }
                          >
                            Public
                          </option>
                          <option
                            value="Private"
                            selected={
                              form.getValues("audience_type") === "Private"
                                ? true
                                : false
                            }
                          >
                            {" "}
                            Private{" "}
                          </option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-12 no-padding-lr">
                      <div className="noteContent">
                        <p className="colorGray fs--16 fw--300">
                          Note: Making your profile public means that when you
                          join NRMs, we will ask whether you'd like your profile
                          to be public within the NRM. You can make your profile
                          public for some NRMs and not for others, public for
                          all NRMs you join or entirely private.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* end of audience */}
              </div>
              <div className="text-center" style={{ width: "100%" }}>
                <button
                  type="button"
                  className="btn btn-primary fs--12"
                  onClick={form.handleSubmit(handleProfile)}
                  disabled={form.formState.isSubmitting}
                >
                  SUBMIT
                </button>
              </div>
              {/* end of right column */}
              {/* start of full width */}
              <div className="inputForm survey">
                <div className="headerHolder mb--12">
                  <h2>Faith Matcher Survey</h2>
                </div>
                <div className="surveyContent">
                  <p className="fs--20 fw--300 colorGray">
                    Directions: Thank you for taking the time to complete our
                    Faith Matcher survey. Completing the survey allows us to
                    match you with the NRMs that are most consistent with your
                    Religious Goals and Desires as well as your belief system.
                  </p>
                  <p className="fs--20 fw--300 colorGray">
                    Please note that you do not have to complete this entire
                    survey at once. Just click "Save and Complete Later"
                    whenever you'd like and you can return to your partially
                    completed survey at any point.
                  </p>
                  <p className="fs--20 fw--300 colorGray">
                    You are also free to skip any questions that are not
                    required. Be sure to tell Neoligion whether you are skipping
                    the question temporarily or permanently.
                  </p>
                </div>
                <div className="mb--50" />
                {/* start of survey field */}
                <div className="row no-margin-lr">
                  {/* survey start */}
                  <div className="col-md-6 no-padding-lr mb--50">
                    <p className="fs--16 fw--300 colorLightBlue mt--8">
                      I believe in life after death.
                    </p>
                  </div>
                  <div className="col-md-6 surveyAnswer">
                    <div className="form-inline">
                      <label>
                        <input type="radio" name="afterDeath" />
                        &nbsp; Yes
                      </label>
                      <label>
                        <input type="radio" name="afterDeath" />
                        &nbsp; No
                      </label>
                      <label>
                        <input type="radio" name="afterDeath" />
                        &nbsp; I don't know
                      </label>
                    </div>
                  </div>
                  <div className="clearfix" />
                  {/* survey end */}
                  {/* survey start */}
                  <div className="col-md-6 no-padding-lr mb--50">
                    <p className="fs--16 fw--300 colorLightBlue mt--8">
                      I believe that God exists.
                    </p>
                  </div>
                  <div className="col-md-6 surveyAnswer">
                    <div className="form-inline">
                      <label>
                        <input type="radio" name="GodExist" />
                        &nbsp; Yes
                      </label>
                      <label>
                        <input type="radio" name="GodExist" />
                        &nbsp; No
                      </label>
                      <label>
                        <input type="radio" name="GodExist" />
                        &nbsp; I don't know
                      </label>
                    </div>
                  </div>
                  <div className="clearfix" />
                  {/* survey end */}
                  {/* survey start */}
                  <div className="col-md-6 no-padding-lr mb--50">
                    <p className="fs--16 fw--300 colorLightBlue mt--8">
                      I believe that human beings determine the course of their
                      lives by their own decisions and behaviors.
                    </p>
                  </div>
                  <div className="col-md-6 surveyAnswer">
                    <div className="form-inline">
                      <label>
                        <input type="radio" name="ownDecisions" />
                        &nbsp; Yes
                      </label>
                      <label>
                        <input type="radio" name="ownDecisions" />
                        &nbsp; No
                      </label>
                      <label>
                        <input type="radio" name="ownDecisions" />
                        &nbsp; I don't know
                      </label>
                    </div>
                  </div>
                  <div className="clearfix" />
                  {/* survey end */}
                  {/* survey 2 start */}
                  <div className="col-md-6 no-padding-lr mb--50">
                    <p className="fs--20 fw--600 colorGray mt--8">
                      How important to you are each of the following in the
                      religious / faiths you join?
                    </p>
                  </div>
                  <div className="col-md-6 mb--50" />
                  <div className="clearfix" />
                  {/* end of survey2 */}
                  {/* survey start */}
                  <div className="col-md-6 no-padding-lr">
                    <p className="fs--16 fw--300 colorLightBlue mt--8">
                      Social Network and Connections
                    </p>
                  </div>
                  <div className="col-md-6 surveyAnswer mb--50">
                    <div className="form-inline">
                      <label>
                        <input type="radio" name="socialNetwork" />
                        &nbsp; Not importante to me at all
                      </label>
                      <label>
                        <input type="radio" name="socialNetwork" />
                        &nbsp; Somewhat importante to me
                      </label>
                      <label>
                        <input type="radio" name="socialNetwork" />
                        &nbsp; Very importante to me
                      </label>
                      <label>
                        <input type="radio" name="socialNetwork" />
                        &nbsp; Extremely important to me
                      </label>
                    </div>
                  </div>
                  <div className="clearfix" />
                  {/* survey end */}
                  {/* survey start */}
                  <div className="col-md-6 no-padding-lr">
                    <p className="fs--16 fw--300 colorLightBlue mt--8">
                      Having a set of rules, prescribed behaviors and moral
                      codes
                    </p>
                  </div>
                  <div className="col-md-6 surveyAnswer mb--50">
                    <div className="form-inline">
                      <label>
                        <input type="radio" name="moralCodes" />
                        &nbsp; Not importante to me at all
                      </label>
                      <label>
                        <input type="radio" name="moralCodes" />
                        &nbsp; Somewhat importante to me
                      </label>
                      <label>
                        <input type="radio" name="moralCodes" />
                        &nbsp; Very importante to me
                      </label>
                      <label>
                        <input type="radio" name="moralCodes" />
                        &nbsp; Extremely important to me
                      </label>
                    </div>
                  </div>
                  <div className="clearfix" />
                  {/* survey end */}
                  {/* survey start */}
                  <div className="col-md-6 no-padding-lr">
                    <p className="fs--16 fw--300 colorLightBlue mt--8">
                      Makes me feel special
                    </p>
                  </div>
                  <div className="col-md-6 surveyAnswer">
                    <div className="form-inline">
                      <label>
                        <input type="radio" name="moralCodes" />
                        &nbsp; Not importante to me at all
                      </label>
                      <label>
                        <input type="radio" name="moralCodes" />
                        &nbsp; Somewhat importante to me
                      </label>
                      <label>
                        <input type="radio" name="moralCodes" />
                        &nbsp; Very importante to me
                      </label>
                      <label>
                        <input type="radio" name="moralCodes" />
                        &nbsp; Extremely important to me
                      </label>
                    </div>
                  </div>
                  <div className="clearfix" />
                  {/* survey end */}
                </div>
                {/* end of survey field */}
              </div>
              {/* end of full width */}
            </div>
          </form>
        </div>
      </div>
      {/* start of footer */}
      <Footer />
      {/* end of footer */}
    </div>
  );
};

export default PersonalProfile;
