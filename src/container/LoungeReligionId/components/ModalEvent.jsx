import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "app/hooks";
import { TestID } from "slices";
import { Modal } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import { isEmpty } from "lodash";
import axiosClients from "api/rest/axiosClients";
import apiPosts from "api/rest/apiPosts";
import { authHeaderAndAccount } from "api/rest/header";

const ModalEvent = ({ modalEvent, handleCloseModal, handleModalSave }) => {
  const dispatch = useAppDispatch();
  let { Test_id } = useParams();

  const arrayNameNumber = ["First", "Second", "Third", "Fourth", "Fifth"];

  const defaulArrayDayEvent = {
    date_time: new Date().getTime(),
    location: "",
  };
  const defaultValuesEvent = {
    name: "",
    desc: "",
    date_time_locations: [defaulArrayDayEvent],
    is_rsvp: "",
  };
  const schemaEvent = yup.object().shape({
    name: yup
      .string()
      .required("Name of Event is required")
      .max(40)
      .label("Name of Event"),
    desc: yup
      .string()
      .required("Brief Description is required")
      .max(40)
      .label("Brief"),
    date_time_locations: yup.array().of(
      yup.object().shape({
        location: yup
          .string()
          .max(40)
          .required("Location is required")
          .label("Location"),
      })
    ),
  });

  const [errorValidatEvent, setErrorValidateEvent] =
    useState(defaultValuesEvent);
  const formEvent = useForm({
    defaultValues: defaultValuesEvent,
    resolver: yupResolver(schemaEvent),
  });

  useEffect(() => {
    if (Test_id) {
      dispatch(TestID(Test_id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Test_id]);

  useEffect(() => {
    if (formEvent.formState.errors) {
      setErrorValidateEvent(formEvent.formState.errors);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formEvent.formState.errors]);
  const [arrayDayEvent, setArrayDayEvent] = useState([defaulArrayDayEvent]);
  const [radioEvent, setRadioEvent] = useState(true);

  const handleCloseModalEvent = () => {
    setErrorValidateEvent(defaultValuesEvent);
    setArrayDayEvent([defaulArrayDayEvent]);
    formEvent.unregister("date_time_locations");
    formEvent.setValue("name", "");
    formEvent.setValue("desc", "");
    formEvent.setValue("date_time_locations", [defaulArrayDayEvent]);
    setRadioEvent(true);
    handleCloseModal();
  };

  const handleAddRowEvent = () => {
    if (arrayDayEvent.length < 5) {
      setArrayDayEvent([...arrayDayEvent, defaulArrayDayEvent]);
      formEvent.setValue(
        `date_time_locations.${arrayDayEvent.length}`,
        defaulArrayDayEvent
      );
    }
  };

  const handleRemoveRowEvent = (index) => {
    let newArrayDayEvent = arrayDayEvent.filter((value, i) => i !== index);
    setArrayDayEvent(newArrayDayEvent);
    let newFormEvent = formEvent
      .getValues("date_time_locations")
      .filter((value, i) => i !== index);
    formEvent.setValue("date_time_locations", newFormEvent);
  };

  const handleDuplicateRowEvent = (index) => {
    if (arrayDayEvent.length < 5) {
      let newArrayDayEvent = [];
      newArrayDayEvent.push({
        date_time: arrayDayEvent[0].date_time,
        location: arrayDayEvent[0].location,
      });
      for (let i = 0; i < arrayDayEvent.length; i++) {
        newArrayDayEvent.push({
          date_time: arrayDayEvent[i].date_time,
          location: arrayDayEvent[i].location,
        });
      }
      formEvent.unregister("date_time_locations");
      for (let i = 0; i < newArrayDayEvent.length; i++) {
        let dateGetTime = new Date(newArrayDayEvent[i].date_time).getTime();
        formEvent.setValue(`date_time_locations.${i}.date_time`, dateGetTime);
        formEvent.setValue(
          `date_time_locations.${i}.location`,
          newArrayDayEvent[i].location
        );
      }
      setArrayDayEvent(newArrayDayEvent);
    }
  };

  const handleChangeDatTimeEvent = (date, index) => {
    let newArrayDayEvent = [...arrayDayEvent];
    newArrayDayEvent[index].date_time = date;
    setArrayDayEvent(newArrayDayEvent);
    let dateGetTime = new Date(date).getTime();
    formEvent.setValue(`date_time_locations.${index}.date_time`, dateGetTime);
  };

  const handleChangeLocationEvent = (e, index) => {
    let newArrayDayEvent = [...arrayDayEvent];
    newArrayDayEvent[index].location = e.target.value;
    setArrayDayEvent(newArrayDayEvent);
    formEvent.setValue(`date_time_locations.${index}.location`, e.target.value);
  };

  const handleSubmitEvent = async (inputs) => {
    let arrayDateTimeLocations = [];
    inputs.date_time_locations.forEach((item) => {
      arrayDateTimeLocations.push({
        date_time: String(item.date_time),
        location: item.location,
      });
    });

    const res = await axiosClients.post(
      apiPosts.createEvent,
      {
        Test_id: Test_id,
        event: {
          name: inputs.name,
          desc: inputs.desc,
          date_time_locations: arrayDateTimeLocations,
          is_rsvp: radioEvent,
        },
      },
      {
        headers: authHeaderAndAccount(),
      }
    );

    if (res.message === "ok") {
      handleCloseModal();
      handleModalSave();
    } else {
    }
  };

  return (
    <Modal
      show={modalEvent}
      onHide={handleCloseModalEvent}
      size="lg"
      className="ModelLounge"
    >
      {/* Modal content*/}
      <div id="eventWrapper" className="modal-content">
        <div className="card-header text-center">
          <span className="colorLightBlue fs--16">
            <strong>Event</strong>
          </span>
          <div style={{ position: "absolute", top: "15px", right: "20px" }}>
            <button
              style={{ color: "#395898" }}
              type="button"
              className="close"
              onClick={() => {
                handleCloseModalEvent();
              }}
            >
              ×
            </button>
          </div>
        </div>
        <div className="modal-body">
          <div className="create-cont">
            <div className="create-inner">
              <div className="row">
                <div className="col-md-3">
                  <label>
                    Name of Event <span className="colorRed"> *</span>
                  </label>
                </div>
                <div className="col-md-9">
                  <input
                    style={{
                      border: isEmpty(errorValidatEvent?.name)
                        ? ""
                        : "solid 1px #ff0000",
                    }}
                    type="text"
                    placeholder="Enter Name of Event"
                    name="name"
                    {...formEvent.register("name")}
                    onChange={(e) => formEvent.setValue("name", e.target.value)}
                  />
                  {errorValidatEvent.name && (
                    <span className="error-login">
                      {errorValidatEvent.name.message}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="create-inner">
              <div className="row">
                <div className="col-md-3">
                  <label>
                    Brief Description <span className="colorRed"> *</span>
                  </label>
                </div>
                <div className="col-md-9">
                  <input
                    style={{
                      border: isEmpty(errorValidatEvent?.desc)
                        ? ""
                        : "solid 1px #ff0000",
                    }}
                    type="text"
                    placeholder="Enter Brief Description"
                    name="description"
                    {...formEvent.register("desc")}
                    onChange={(e) => formEvent.setValue("desc", e.target.value)}
                  />
                  {errorValidatEvent.desc && (
                    <span className="error-login">
                      {errorValidatEvent.desc.message}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="create-inner pt--20">
              <p className="fs--12">
                Date / Time / Location <span className="colorRed"> *</span>
              </p>
            </div>
            {arrayDayEvent.map((value, index) => (
              <div className=" create-inner-event create-inner iconAfter">
                <div className="row">
                  <div className="col-md-2">
                    <label>
                      {arrayNameNumber[index]} Day{" "}
                      <span className="colorRed"> *</span>
                    </label>
                  </div>
                  <div className="col-md-3 date-picker-event">
                    <div className="datePickerEvent">
                      <DatePicker
                        minDate={new Date()}
                        selected={arrayDayEvent[index].date_time}
                        dateFormat="MM/dd/yyyy h:mm aa"
                        showTimeSelect
                        onChange={(date) =>
                          handleChangeDatTimeEvent(date, index)
                        }
                      />
                    </div>
                  </div>
                  <div
                    className="col-md-7"
                    style={{
                      display: "flex",
                    }}
                  >
                    <input
                      style={{
                        border: isEmpty(errorValidatEvent?.date_time_locations)
                          ? ""
                          : errorValidatEvent?.date_time_locations[index]
                              ?.location
                          ? "solid 1px #ff0000"
                          : "",
                      }}
                      type="text"
                      name="description"
                      placeholder="Street Address City/ State/ Zip or Virtual Event Link *"
                      value={arrayDayEvent[index].location}
                      onChange={(e) => handleChangeLocationEvent(e, index)}
                    />
                    {/* {isEmpty(errorValidatEvent?.date_time_locations)
                  ? ""
                  : errorValidatEvent?.date_time_locations[index]
                      ?.location && (
                      <span className="error-login">
                        {
                          errorValidatEvent?.date_time_locations[index]
                            ?.location?.message
                        }
                      </span>
                    )} */}
                    {index === 0 ? (
                      <div
                        className=""
                        style={{
                          display: "flex",
                          alignItems: "center",
                          paddingLeft: "5px",
                        }}
                      >
                        <span
                          class="pointerA"
                          onClick={() => handleDuplicateRowEvent(index)}
                        >
                          <img
                            alt="alt"
                            style={{
                              width: "39px",
                              height: "35px",
                            }}
                            src="/img/duplicate-icon.png"
                          />
                        </span>
                      </div>
                    ) : (
                      <div
                        className=""
                        style={{
                          display: "flex",
                          alignItems: "center",
                          paddingLeft: "10px",
                        }}
                      >
                        <span
                          class="pointerA"
                          onClick={() => handleRemoveRowEvent(index)}
                        >
                          <img
                            alt="alt"
                            style={{
                              width: "24px",
                              height: "24px",
                              marginLeft: "10px",
                            }}
                            src="/img/wrong-red-icon.png"
                          />
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            {arrayDayEvent.length !== 5 ? (
              <div className="create-inner addButton pb--20">
                <span class="pointerA" onClick={() => handleAddRowEvent()}>
                  <img src="/img/icon-add.png" alt="" />
                  <span className="text--gray">
                    {" "}
                    Add another day/time/location
                  </span>
                </span>
              </div>
            ) : (
              ""
            )}
            <div className="create-inner pb--20">
              <label>
                {" "}
                Allow RSVPs? &nbsp;&nbsp;
                <input
                  type="radio"
                  name="rsvpChoice"
                  checked={radioEvent}
                  onClick={() => setRadioEvent(true)}
                />
                &nbsp;Yes &nbsp;&nbsp;&nbsp;&nbsp;
                <input
                  type="radio"
                  name="rsvpChoice"
                  checked={!radioEvent}
                  onClick={() => setRadioEvent(false)}
                />
                &nbsp;No
              </label>
            </div>
            <div className="create-inner f--width"></div>

            <div className="f--width text-center">
              <button
                type="button"
                onClick={formEvent.handleSubmit(handleSubmitEvent)}
                className="btn bg--defaultBlue text-white padding--lr40"
                disabled={formEvent.formState.isSubmitting}
                style={{ marginTop: "20px" }}
              >
                POST
              </button>
            </div>
            <div className="clearfix" />
          </div>
        </div>
        <div className="clearfix" />
      </div>
    </Modal>
  );
};

export default ModalEvent;
