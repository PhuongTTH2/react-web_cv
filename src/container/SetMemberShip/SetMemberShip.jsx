import React from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";

const SetMemberShip = () => {
  return (
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
                className="iconasset"
                src="img/icons/search_reverse_96px.png"
              />
            </button>
          </div>
          <div className="width15">
            <a id="lside-btn" href="#">
              <img src="img/mmemu_dark_icon.png" />
            </a>
          </div>
          <div className="clearfix" />
        </div>
      </div>
      {/* end of mobile search bar */}
      {/* start of content */}
      <div id="surveyLayout" className="content">
        <div className="container no-padding-lr">
          <div id="my-create-member">
            <h1>Create Brief Member Level Profile</h1>
            <h3>The following membership levels are currently active:</h3>
            <ul className="member-level">
              <li
                id="member-lvl1"
                onclick="javascript:ShowContent('member1-edit');javascript:HideContent('member2-edit');javascript:HideContent('member3-edit');"
              >
                Level 1 Member <span>(click to begin editing)</span>
              </li>
              <li
                id="member-lvl2"
                onclick="javascript:ShowContent('member2-edit');javascript:HideContent('member1-edit');javascript:HideContent('member3-edit');"
              >
                Level 2 Member <span />
              </li>
              <li
                id="member-lvl3"
                onclick="javascript:ShowContent('member3-edit');javascript:HideContent('member2-edit');javascript:HideContent('member1-edit');"
              >
                Level 3 Member <span />
              </li>
            </ul>
            <div className="add-levels">
              <ul>
                <li id="addlevel2">
                  <a
                    className="btn disable"
                    href="javascript:ShowContent('member-lvl2');javascript:ShowContent('addlevel3');javascript:HideContent('addlevel2');"
                  >
                    Add Level 2 Member
                  </a>
                  <div className="add_level_note">
                    <small>
                      You must first confirm Level 1 Member settings by clicking
                      the link above and submitting settings even if you do not
                      modify them.
                    </small>
                  </div>
                </li>
                <li id="addlevel3" style={{ display: "none" }}>
                  <a
                    className="btn disable"
                    href="javascript:ShowContent('member-lvl3');javascript:ShowContent('addlevel4');javascript:HideContent('addlevel3');"
                  >
                    Add Level 3 Member
                  </a>
                  <div className="add_level_note">
                    <small>
                      You must first confirm Level 1 Member settings by clicking
                      the link above and submitting settings even if you do not
                      modify them.
                    </small>
                  </div>
                </li>
                <li id="addlevel4" style={{ display: "none" }}>
                  No more levels possible
                </li>
              </ul>
            </div>
            <div
              id="member1-edit"
              className="members-edit"
              style={{ display: "none" }}
            >
              <div id="member-edit-1">
                <ul>
                  <li>
                    <label>Membership Level Name</label>
                    <span className="medit-field">
                      <input type="text" placeholder="Level 1 Member" />
                    </span>
                  </li>
                  <li>
                    <label>Membership Level Description</label>
                    <span className="medit-field">
                      <textarea
                        type="text"
                        placeholder="Describe at a general level the benefits and features available to this level of membership"
                        defaultValue={""}
                      />
                    </span>
                  </li>
                </ul>
                <h1>Create Brief Member Level Profile</h1>
                <h3>How will you admit members to the Level _ Member level?</h3>
                <fieldset id="group1_lvl1">
                  <label className="radio-cont">
                    <input
                      id="admision1_lvl1"
                      type="radio"
                      name="members_type"
                      defaultValue="open_admission_lvl"
                      onclick="javascript:HideContent('admin-rule1');javascript:HideContent('admin1');"
                      defaultChecked
                    />
                    <span>Open Admission</span>
                  </label>
                  <label className="radio-cont">
                    <input
                      id="admision2_lvl1"
                      htmlFor="admi2"
                      type="radio"
                      name="members_type"
                      onclick="javascript:ShowContent('admin1', 'req_2_no','admin-rule1');javascript:HideContent('admin-rule1');"
                    />
                    <span>Manual Admission</span>
                  </label>
                  <div
                    id="admin1"
                    className="manual-ad"
                    style={{ display: "none" }}
                  >
                    <label className="radio-cont">
                      <input
                        id
                        type="radio"
                        name="manual_select"
                        defaultValue="Yes"
                        onclick="javascript:ShowContent('manual_yes');"
                      />
                      <span>Yes</span>
                    </label>
                    <input
                      id="manual_yes"
                      type="text"
                      placeholder="Why do you want to join our NRM Level 1?"
                      style={{ display: "none" }}
                    />
                    <label id="req_2_no" className="radio-cont">
                      <input
                        id="req_2_lvl1_manual"
                        type="radio"
                        defaultValue="No"
                        name="manual_select"
                        onclick="javascript:HideContent('manual_yes');"
                      />
                      <span>No</span>
                    </label>
                  </div>
                  <label className="radio-cont">
                    <input
                      id="admision3_lvl1"
                      type="radio"
                      name="members_type"
                      onclick="javascript:ShowContent('admin-rule1');javascript:HideContent('admin1');"
                    />
                    <span>Admissions Rule</span>
                  </label>
                  <div
                    id="admin-rule1"
                    className="admin-rule"
                    style={{ display: "none" }}
                  >
                    <p>
                      Create simple or more complex admission rules using
                      Requirement Groups.{" "}
                    </p>
                    <p>
                      Applicants are admitted to your NRM level if they satisfy
                      the requirement conditions of any Requirement Group.{" "}
                    </p>
                    <p>
                      Each Requirement Group consists of one or more
                      requirements. If you add multiple requirements to a
                      Requirement Group, the applicant must meet all requirement
                      conditions in the Requirement Group to be admitted.
                    </p>
                    <input type="text" placeholder="Requirement Group 1" />
                    <a
                      className="add-req"
                      id="add_req_btn1"
                      onclick="javascript:ShowContent('req_group1');javascript:HideContent('add_req_btn1');"
                    >
                      + Add Requirement
                    </a>
                    <fieldset
                      className="requirement_wrapper"
                      id="req_group1"
                      style={{ display: "none" }}
                    >
                      <label>Choose a Requirement</label>
                      <label className="radio-cont">
                        <input
                          id="req_1"
                          type="radio"
                          name="rSelect"
                          defaultValue="ar1_req1"
                          onclick="javascript:ShowContent('ar1_req1');"
                        />
                        <span>
                          <strong>Match Score:</strong> Extent of user's match
                          to your religious profile based on the entire
                          Religious Match Survey.
                        </span>
                      </label>
                      <div
                        className="req_sub_wrapper requirementSelect"
                        id="ar1_req1"
                        style={{ display: "none" }}
                      >
                        <p>
                          Admit applicants whose match score with your Test
                          based on the full Religious Match Survey is % or
                          higher.{" "}
                        </p>
                        <p>
                          Note: You must complete at least 26% of the Religious
                          Match Survey items for this requirement to be
                          activated.{" "}
                        </p>
                        <p>
                          You can complete survey items right after you finish
                          creating the member level today or at any time in the
                          future
                        </p>
                      </div>
                      <label className="radio-cont">
                        <input
                          id="req_2"
                          type="radio"
                          name="rSelect"
                          defaultValue="ar1_req2"
                          onclick="javascript:ShowContent('ar1_req2');"
                        />
                        <span>
                          <strong>Custom Match Score:</strong> Extent of user's
                          match to your religious profile based on Religious
                          Match Survey items you complete.
                        </span>
                      </label>
                      <div
                        className="req_sub_wrapper requirementSelect"
                        id="ar1_req2"
                        style={{ display: "none" }}
                      >
                        <p>
                          Admit applicants whose custom match score with your
                          Test based on answered Religious Match Survey
                          items only is _% or higher.
                        </p>
                        <p>
                          Note: You must complete at least five sections of the
                          Religious Match Survey for this rule to be activated.
                        </p>
                        <p>
                          “Completing a section” means answering one or more
                          questions within that section.
                        </p>
                        <p>
                          Blank sections marked as “answered” do not count
                          towards the five “completed” sections for purposes of
                          activating this requirement.
                        </p>
                        <p>
                          You can complete survey items right after you finish
                          creating the member level today or at any time in the
                          future.
                        </p>
                      </div>
                      <label className="radio-cont">
                        <input
                          id="req_3"
                          type="radio"
                          name="rSelect"
                          defaultValue="ar1_req3"
                          onclick="javascript:ShowContent('ar1_req3');"
                        />
                        <span>
                          <strong>Affiliation Length:</strong> How long the
                          applicant has affiliated with your Test (not
                          recommended for new Tests).
                        </span>
                      </label>
                      <div
                        className="req_sub_wrapper requirementSelect"
                        id="ar1_req3"
                        style={{ display: "none" }}
                      >
                        <p>Discrete Affiliation Length Requirement***</p>
                        <p>Admit any applicant who has been a:</p>
                        <p>
                          [Tourist/L1 Member/L2 Member/L3 Member* of (NRM name)
                          for any time period**/at least/the most recent
                          <span
                            style={{
                              textDecoration: "underline",
                              display: "inline",
                            }}
                          >
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          </span>{" "}
                          days/weeks/months/years***
                        </p>
                      </div>
                      <label className="radio-cont">
                        <input
                          id="req_4"
                          type="radio"
                          name="rSelect"
                          defaultValue="ar1_req4_or"
                          onclick="javascript:ShowContent('ar1_req4_or');"
                        />
                        <span>
                          <strong>Current Affiliation Status:</strong>{" "}
                          Applicant's current affiliation status with your
                          Test.
                        </span>
                      </label>
                      <div
                        className="req_sub_wrapper requirementSelect"
                        id="ar1_req4_or"
                        style={{ display: "none" }}
                      >
                        <p>Applicant must currently be a:</p>
                        <p>
                          [Browser (i.e. no affiliation)/Tourist/L1 Member/L2
                          Member/L3 Member* of (NRM name)]{" "}
                          <a
                            href="javascript:void(0)"
                            className="btn small"
                            onclick="javascript:ShowContent('ar1_req4_or_display');"
                          >
                            +OR
                          </a>
                        </p>
                        <div
                          className="req_sub_wrapper requirementSelect"
                          id="ar1_req4_or_display"
                          style={{
                            display: "none",
                            left: 0,
                            marginTop: "10px",
                          }}
                        >
                          <p>
                            [Browser (i.e. no affiliation)/Tourist/L1 Member/L2
                            Member/L3 Member* of (NRM name)] *
                          </p>
                        </div>
                      </div>
                      <label className="radio-cont">
                        <input
                          id="req_5"
                          type="radio"
                          name="rSelect"
                          defaultValue="ar1_req5"
                          onclick="javascript:ShowContent('ar1_req5');"
                        />
                        <span>
                          <strong>Admissions Essay:</strong> Require a graded or
                          ungraded answer to an essay question.
                        </span>
                      </label>
                      <div
                        className="req_sub_wrapper requirementSelect"
                        id="ar1_req5"
                        style={{ display: "none" }}
                      >
                        <p style={{ marginTop: "16px" }}>
                          Admit any applicant:
                        </p>
                        <br />
                        <fieldset className="group_essay">
                          <label className="radio-cont">
                            <input
                              id="req_5_admission_essay_simple"
                              type="radio"
                              name="admission_essay"
                            />
                            <span>
                              (Simple Submission) Who has simply submitted an
                              essay response
                            </span>
                          </label>
                          <label className="radio-cont">
                            <input
                              id="req_5_admission_essay_minimum"
                              type="radio"
                              name="admission_essay"
                            />
                            <span>
                              (Minimum Length) Who has submitted an essay
                              response with at least{" "}
                              <span
                                style={{
                                  textDecoration: "underline",
                                  display: "inline",
                                }}
                              >
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                              </span>{" "}
                              words/characters
                            </span>
                          </label>
                          <label className="radio-cont">
                            <input
                              id="req_5_admission_essay_passfail"
                              type="radio"
                              name="admission_essay"
                            />
                            <span>
                              (Pass/Fail) Whose essay response is graded as
                              “Pass”
                            </span>
                          </label>
                          <span className="essay_edit_textfield">
                            <textarea
                              type="text"
                              placeholder="Why do you want to join our NRM (Level X)?"
                              defaultValue={""}
                            />
                          </span>
                        </fieldset>
                      </div>
                      <label className="radio-cont">
                        <input
                          id="req_6"
                          defaultValue="ar1_req6"
                          type="radio"
                          name="rSelect"
                          onclick="javascript:ShowContent('ar1_req6');"
                        />
                        <span>
                          <strong>Membership Dues Paid:</strong> Extent of prior
                          dues paid as a member of your Test (only available
                          for multi-level Tests)*
                        </span>
                      </label>
                      <div
                        className="req_sub_wrapper requirementSelect"
                        id="ar1_req6"
                        style={{ display: "none" }}
                      >
                        <p>Notes (for both Discrete and Cumulative scripts):</p>
                        <ol className="membership_due">
                          <li> Only show relevant member levels.</li>
                          <li>
                            {" "}
                            This option is disabled for NRMs that only have one
                            member level activated (i.e. L1) since it is meant
                            for admission into L1, L2 and L3 member levels based
                            on dues paid in L1, L2 and/or L3 membership levels.
                          </li>
                          <li>
                            {" "}
                            Choosing a Membership Level in first of two clauses
                            appended by +AND disables choice of identical
                            Membership level in second clause. Example: User
                            cannot enter: Paid at least $100 in dues as an L1
                            Member … +AND Paid at least $100 in dues as an L1
                            Member.
                          </li>
                        </ol>
                        <p>
                          <strong>Discrete***</strong>
                        </p>
                        <p>Admit any applicant who:</p>
                        <p>
                          [Paid at least
                          <span
                            style={{
                              textDecoration: "underline",
                              display: "inline",
                            }}
                          >
                            {" "}
                            $&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          </span>{" "}
                          in dues as an L1 Member/L2 Member/L3 Member over the
                          most recent/any{" "}
                          <span
                            style={{
                              textDecoration: "underline",
                              display: "inline",
                            }}
                          >
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          </span>{" "}
                          months/years any time period**]
                          <a
                            href="javascript:void(0)"
                            className="btn small"
                            onclick="javascript:ShowContent('ar1_req6_and');javascript:HideContent('ar1_req6_or');"
                          >
                            +AND
                          </a>
                          <a
                            href="javascript:void(0)"
                            className="btn small"
                            onclick="javascript:ShowContent('ar1_req6_or');javascript:HideContent('ar1_req6_and');"
                          >
                            +OR
                          </a>
                        </p>
                        <div
                          className="req_sub_wrapper"
                          id="ar1_req6_and"
                          style={{
                            display: "none",
                            marginTop: "10px",
                            left: 0,
                          }}
                        >
                          <p>
                            [AND paid at least{" "}
                            <span
                              style={{
                                textDecoration: "underline",
                                display: "inline",
                              }}
                            >
                              {" "}
                              $&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            </span>{" "}
                            in dues as an L1 Member/L2 Member/L3 Member over the
                            most recent/any{" "}
                            <span
                              style={{
                                textDecoration: "underline",
                                display: "inline",
                              }}
                            >
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            </span>{" "}
                            months/years any time period**]
                          </p>
                        </div>
                        <div
                          className="req_sub_wrapper"
                          id="ar1_req6_or"
                          style={{
                            display: "none",
                            marginTop: "10px",
                            left: 0,
                          }}
                        >
                          <p>
                            [Paid at least
                            <span
                              style={{
                                textDecoration: "underline",
                                display: "inline",
                              }}
                            >
                              {" "}
                              $&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            </span>{" "}
                            in dues as an L1 Member/L2 Member/L3 Member over the
                            most recent/any{" "}
                            <span
                              style={{
                                textDecoration: "underline",
                                display: "inline",
                              }}
                            >
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            </span>{" "}
                            months/years any time period**]
                          </p>
                        </div>
                        <div
                          className="cumulative_wrapper"
                          style={{ marginTop: "20px" }}
                        >
                          <p>
                            <strong>Cumulative***</strong>
                          </p>
                          <p>Admit any applicant who:</p>
                          <p>
                            Has paid total cumulative dues to (NRM Name) of at
                            least
                            <span
                              style={{
                                textDecoration: "underline",
                                display: "inline",
                              }}
                            >
                              {" "}
                              $&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            </span>{" "}
                            as an L1 and L2 Member*/L1 and L3 Member*/L2 and L3
                            Member* over the most recent/any{" "}
                            <span
                              style={{
                                textDecoration: "underline",
                                display: "inline",
                              }}
                            >
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            </span>{" "}
                            months/years any time period**
                          </p>
                          <br />
                          <p>
                            <strong>Notes:</strong>
                          </p>
                          <p>
                            *Requires applicant to have been a member at both
                            levels.
                          </p>
                          <p>
                            **If “any time period” is selected, then “
                            <span
                              style={{
                                textDecoration: "underline",
                                display: "inline",
                              }}
                            >
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            </span>{" "}
                            months/years” should be disabled.
                          </p>
                          <br />
                          <p>
                            *** Simultaneous use of Cumulative and Discrete
                            scripts is possible. The Cumulative script is only
                            available for use and should only be shown if
                            multiple member levels have been created.
                          </p>
                        </div>
                      </div>
                      <label className="radio-cont">
                        <input
                          id="req_7"
                          defaultValue="ar1_req7"
                          type="radio"
                          name="rSelect"
                          onclick="javascript:ShowContent('ar1_req7');"
                        />
                        <span>
                          <strong>Activity Level:</strong> Extent of
                          participation in your Test.
                        </span>
                      </label>
                      <div
                        className="req_sub_wrapper requirementSelect"
                        id="ar1_req7"
                        style={{ display: "none" }}
                      >
                        <p>
                          Inside your NRM/Outside your NRM/Both inside and
                          outside your NRM
                        </p>
                        <p>Low/Medium/High</p>
                        <p>Admit any applicant whose Activity Level:</p>
                        <p>
                          [Inside your NRM/Outside your NRM/Both Inside and
                          Outside your NRM is Low/Medium/High (check all that
                          apply)]
                          <a
                            href="javascript:void(0)"
                            className="btn small"
                            onclick="javascript:ShowContent('ar1_req7_and');javascript:HideContent('ar1_req7_or');"
                          >
                            +AND
                          </a>
                          <a
                            href="javascript:void(0)"
                            className="btn small"
                            onclick="javascript:ShowContent('ar1_req7_or');javascript:HideContent('ar1_req7_and');"
                          >
                            +OR
                          </a>
                        </p>
                        <div
                          className="req_sub_wrapper"
                          id="ar1_req7_and"
                          style={{
                            display: "none",
                            marginTop: "10px",
                            left: 0,
                          }}
                        >
                          [AND Inside your NRM/Outside your NRM/Both Inside and
                          Outside your NRM is Low/Medium/High (check all that
                          apply)]
                        </div>
                        <div
                          className="req_sub_wrapper"
                          id="ar1_req7_or"
                          style={{
                            display: "none",
                            marginTop: "10px",
                            left: 0,
                          }}
                        >
                          [Inside your NRM/Outside your NRM/Both Inside and
                          Outside your NRM is Low/Medium/High (check all that
                          apply)]
                        </div>
                        <p style={{ color: "red" }}>
                          [If user selects 'BOTH INSIDE AND OUTSIDE YOUR NMI'
                          for any clause, display:]
                        </p>
                        <p>
                          Choose Weights: _50_% INSIDE YOUR NRM: _50_% OUTSIDE
                          YOUR NRM
                        </p>
                        <p>
                          [weights are set at 50%/50% by default - user can
                          change either one and the other number adjusts so that
                          both sum to 100%]
                        </p>
                        <br />
                        <p>
                          <strong>*Note:</strong> Use of +AND gate to append two
                          clauses disables the choice of same Inside your
                          NRM/Outside your NRM/Both
                        </p>
                        <p>
                          Inside and Outside your NRM within the same compound
                          condition. Example: User cannot choose as follows:
                        </p>
                        <p>Admit any applicant whose Activity Level:</p>
                        <p>
                          [inside your NOM/is Low/Medium/High AND Inside your
                          NRM is Low/Medium]
                        </p>
                      </div>
                      <label className="radio-cont">
                        <input
                          id="req_8"
                          defaultValue="ar1_req8"
                          type="radio"
                          name="rSelect"
                        />
                        <span>
                          <strong>Threat Level (Disqualification):</strong>{" "}
                          Disqualify any applicants with poor conduct records.
                        </span>
                      </label>
                      <div
                        className="req_sub_wrapper requirementSelect"
                        id="ar1_req8"
                        style={{ display: "none" }}
                      >
                        <p>Disqualify by Threat Level</p>
                        <p>
                          [Automatically reject any applicant who was previously
                          banned from your NMI as a (check all that apply)]
                          <a
                            href="javascript:void(0)"
                            className="btn small"
                            onclick="javascript:ShowContent('ar1_req8_and');javascript:HideContent('ar1_req8_or');"
                          >
                            +AND
                          </a>
                          <a
                            href="javascript:void(0)"
                            className="btn small"
                            onclick="javascript:ShowContent('ar1_req8_or');javascript:HideContent('ar1_req8_and');"
                          >
                            +OR
                          </a>
                        </p>
                        <div
                          className="req_sub_wrapper"
                          id="ar1_req8_and"
                          style={{
                            display: "none",
                            marginTop: "10px",
                            left: 0,
                          }}
                        >
                          [AND automatically reject any applicant with a
                          High/Medium or High Threat Level Inside your
                          NRM/Outside your NRM/Both Inside and Outside your NRM]
                        </div>
                        <div
                          className="req_sub_wrapper"
                          id="ar1_req8_or"
                          style={{
                            display: "none",
                            marginTop: "10px",
                            left: 0,
                          }}
                        >
                          [automatically reject any applicant with a High/Medium
                          or High Threat Level Inside your NRM/Outside your
                          NRM/Both Inside and Outside your NRM]
                        </div>
                        <p style={{ color: "red" }}>
                          [If user selects 'Both Inside and Outside your NRM' in
                          any clause, display:]
                        </p>
                        <p>
                          Choose Weights: _50_% INSIDE YOUR NRM: _50_% OUTSIDE
                          YOUR NRM
                        </p>
                        <p>
                          [weights are set at 50%/50% by default - user can
                          change either and the other number adjusts so that sum
                          total of both is 100%]
                        </p>
                        <br />
                        <p>Disqualify previously banned applicants</p>
                        <p>
                          Automatically reject any applicant who was previously
                          banned from your NMI as a (check all that apply)
                        </p>
                        <p>
                          Tourist, LI Member, L2 Member, L3 Member, Any Level*
                          within the last{" "}
                          <span
                            style={{
                              textDecoration: "underline",
                              display: "inline",
                            }}
                          >
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          </span>
                          days/weeks/months/years/any time period**.
                        </p>
                        <p>
                          * Only show levels that have been activated, but
                          grey-out tne level the user is applying for admission
                          to. checking 'Any Level' checks all levels.
                        </p>
                        <p>** Choosing 'any time period'</p>
                      </div>
                    </fieldset>
                  </div>
                </fieldset>
              </div>{" "}
              {/* #member-edit-1 */}
            </div>{" "}
            {/* #member-edit-1 */}
            <div
              id="member2-edit"
              className="members-edit"
              style={{ display: "none" }}
            >
              <div id="member-edit-1">
                <ul>
                  <li>
                    <label>Membership Level Name</label>
                    <span className="medit-field">
                      <input type="text" placeholder="Level 2 Member" />
                    </span>
                  </li>
                  <li>
                    <label>Membership Level Description</label>
                    <span className="medit-field">
                      <textarea
                        type="text"
                        placeholder="Describe at a general level the benefits and features available to this level of membership"
                        defaultValue={""}
                      />
                    </span>
                  </li>
                </ul>
                <h1>Create Brief Member Level Profile</h1>
                <h3>How will you admit members to the Level _ Member level?</h3>
                <fieldset id="group1_lvl2">
                  <label className="radio-cont">
                    <input
                      id="admision1_lvl2"
                      type="radio"
                      name="members_type2"
                      defaultValue="open_admission_lvl2"
                      onclick="javascript:HideContent('admin2');javascript:HideContent('admin-rule2');"
                      defaultChecked
                    />
                    <span>Open Admission</span>
                  </label>
                  <label className="radio-cont">
                    <input
                      id="admision2_lvl2"
                      htmlFor="admi2"
                      type="radio"
                      name="members_type2"
                      onclick="javascript:ShowContent('admin2');javascript:HideContent('admin-rule2',);"
                    />
                    <span>Manual Admission</span>
                  </label>
                  <div
                    id="admin2"
                    className="manual-ad"
                    style={{ display: "none" }}
                  >
                    <label className="radio-cont">
                      <input
                        id
                        type="radio"
                        name="manual_select2"
                        defaultValue="Yes"
                        onclick="javascript:ShowContent('manual_yes_level_2');"
                      />
                      <span>Yes</span>
                    </label>
                    <input
                      id="manual_yes_level_2"
                      type="text"
                      placeholder="Why do you want to join our NRM Level 2?"
                      style={{ display: "none" }}
                    />
                    <label id="req_2_no" className="radio-cont">
                      <input
                        id="req_2_lvl2_manual"
                        type="radio"
                        name="manual_select2"
                        defaultValue="No"
                        onclick="javascript:HideContent('manual_yes_level_2');"
                        defaultChecked="true"
                      />
                      <span>No</span>
                    </label>
                  </div>
                  <label className="radio-cont">
                    <input
                      id="admision3_lvl2"
                      type="radio"
                      name="members_type2"
                      onclick="javascript:ShowContent('admin-rule2');javascript:HideContent('admin2');"
                    />
                    <span>Admissions Rule</span>
                  </label>
                  <div
                    id="admin-rule2"
                    className="admin-rule"
                    style={{ display: "none" }}
                  >
                    <p>
                      Create simple or more complex admission rules using
                      Requirement Groups.{" "}
                    </p>
                    <p>
                      Applicants are admitted to your NRM level if they satisfy
                      the requirement conditions of any Requirement Group.{" "}
                    </p>
                    <p>
                      Each Requirement Group consists of one or more
                      requirements. If you add multiple requirements to a
                      Requirement Group, the applicant must meet all requirement
                      conditions in the Requirement Group to be admitted.
                    </p>
                    <input type="text" placeholder="Requirement Group 2" />
                    <a
                      className="add-req"
                      id="add_req_btn2"
                      onclick="javascript:ShowContent('req_group2');javascript:HideContent('add_req_btn2');"
                    >
                      + Add Requirement
                    </a>
                    <fieldset
                      className="requirement_wrapper"
                      id="req_group2"
                      style={{ display: "none" }}
                    >
                      <label>Choose a Requirement</label>
                      <label className="radio-cont">
                        <input
                          id="req_1_ar2"
                          defaultValue="ar2_req1"
                          type="radio"
                          name="rSelect"
                          onclick="javascript:ShowContent('ar2_req1');"
                        />
                        <span>
                          <strong>Match Score:</strong> Extent of user's match
                          to your religious profile based on the entire
                          Religious Match Survey.
                        </span>
                      </label>
                      <div
                        className="req_sub_wrapper requirementSelect"
                        id="ar2_req1"
                        style={{ display: "none" }}
                      >
                        <p>
                          Admit applicants whose match score with your Test
                          based on the full Religious Match Survey is % or
                          higher.{" "}
                        </p>
                        <p>
                          Note: You must complete at least 26% of the Religious
                          Match Survey items for this requirement to be
                          activated.{" "}
                        </p>
                        <p>
                          You can complete survey items right after you finish
                          creating the member level today or at any time in the
                          future
                        </p>
                      </div>
                      <label className="radio-cont">
                        <input
                          id="req_2_ar2"
                          defaultValue="ar2_req2"
                          type="radio"
                          name="rSelect"
                          onclick="javascript:ShowContent('ar2_req2');"
                        />
                        <span>
                          <strong>Custom Match Score:</strong> Extent of user's
                          match to your religious profile based on Religious
                          Match Survey items you complete.
                        </span>
                      </label>
                      <div
                        className="req_sub_wrapper requirementSelect"
                        id="ar2_req2"
                        style={{ display: "none" }}
                      >
                        <p>
                          Admit applicants whose custom match score with your
                          Test based on answered Religious Match Survey
                          items only is _% or higher.
                        </p>
                        <p>
                          Note: You must complete at least five sections of the
                          Religious Match Survey for this rule to be activated.
                        </p>
                        <p>
                          “Completing a section” means answering one or more
                          questions within that section.
                        </p>
                        <p>
                          Blank sections marked as “answered” do not count
                          towards the five “completed” sections for purposes of
                          activating this requirement.
                        </p>
                        <p>
                          You can complete survey items right after you finish
                          creating the member level today or at any time in the
                          future.
                        </p>
                      </div>
                      <label className="radio-cont">
                        <input
                          id="req_3_ar2"
                          defaultValue="ar2_req3"
                          type="radio"
                          name="rSelect"
                          onclick="javascript:ShowContent('ar2_req3');"
                        />
                        <span>
                          <strong>Affiliation Length:</strong> How long the
                          applicant has affiliated with your Test (not
                          recommended for new Tests).
                        </span>
                      </label>
                      <div
                        className="req_sub_wrapper requirementSelect"
                        id="ar2_req3"
                        style={{ display: "none" }}
                      >
                        <p>Discrete Affiliation Length Requirement***</p>
                        <p>Admit any applicant who has been a:</p>
                        <p>
                          [Tourist/L1 Member/L2 Member/L3 Member* of (NRM name)
                          for any time period**/at least/the most recent
                          <span
                            style={{
                              textDecoration: "underline",
                              display: "inline",
                            }}
                          >
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          </span>{" "}
                          days/weeks/months/years***
                        </p>
                      </div>
                      <label className="radio-cont">
                        <input
                          id="req_4_ar2"
                          defaultValue="ar2_req4_or"
                          type="radio"
                          name="rSelect"
                          onclick="javascript:ShowContent('ar2_req4_or');"
                        />
                        <span>
                          <strong>Current Affiliation Status:</strong>{" "}
                          Applicant's current affiliation status with your
                          Test.
                        </span>
                      </label>
                      <div
                        className="req_sub_wrapper requirementSelect"
                        id="ar2_req4_or"
                        style={{ display: "none" }}
                      >
                        <p>Applicant must currently be a:</p>
                        <p>
                          [Browser (i.e. no affiliation)/Tourist/L1 Member/L2
                          Member/L3 Member* of (NRM name)]{" "}
                          <a
                            href="javascript:void(0)"
                            className="btn small"
                            onclick="javascript:ShowContent('ar2_req4_or_display');"
                          >
                            +OR
                          </a>
                        </p>
                        <div
                          className="req_sub_wrapper"
                          id="ar2_req4_or_display"
                          style={{
                            display: "none",
                            left: 0,
                            marginTop: "10px",
                          }}
                        >
                          <p>
                            [Browser (i.e. no affiliation)/Tourist/L1 Member/L2
                            Member/L3 Member* of (NRM name)] *
                          </p>
                        </div>
                      </div>
                      <label className="radio-cont">
                        <input
                          id="req_5_ar2"
                          defaultValue="ar2_req5"
                          type="radio"
                          name="rSelect"
                          onclick="javascript:ShowContent('ar2_req5');"
                        />
                        <span>
                          <strong>Admissions Essay:</strong> Require a graded or
                          ungraded answer to an essay question.
                        </span>
                      </label>
                      <div
                        className="req_sub_wrapper requirementSelect"
                        id="ar2_req5"
                        style={{ display: "none" }}
                      >
                        <p style={{ marginTop: "16px" }}>
                          Admit any applicant:
                        </p>
                        <br />
                        <fieldset className="group_essay">
                          <label className="radio-cont">
                            <input
                              id="req_5_admission_essay_simple_ar2"
                              type="radio"
                              name="admission_essay"
                            />
                            <span>
                              (Simple Submission) Who has simply submitted an
                              essay response
                            </span>
                          </label>
                          <label className="radio-cont">
                            <input
                              id="req_5_admission_essay_minimum_ar2"
                              type="radio"
                              name="admission_essay"
                            />
                            <span>
                              (Minimum Length) Who has submitted an essay
                              response with at least{" "}
                              <span
                                style={{
                                  textDecoration: "underline",
                                  display: "inline",
                                }}
                              >
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                              </span>{" "}
                              words/characters
                            </span>
                          </label>
                          <label className="radio-cont">
                            <input
                              id="req_5_admission_essay_passfail_ar2"
                              type="radio"
                              name="admission_essay"
                            />
                            <span>
                              (Pass/Fail) Whose essay response is graded as
                              “Pass”
                            </span>
                          </label>
                          <span className="essay_edit_textfield">
                            <textarea
                              type="text"
                              placeholder="Why do you want to join our NRM (Level X)?"
                              defaultValue={""}
                            />
                          </span>
                        </fieldset>
                      </div>
                      <label className="radio-cont">
                        <input
                          id="req_6_ar2"
                          defaultValue="ar2_req6"
                          type="radio"
                          name="rSelect"
                          onclick="javascript:ShowContent('ar2_req6');"
                        />
                        <span>
                          <strong>Membership Dues Paid:</strong> Extent of prior
                          dues paid as a member of your Test (only available
                          for multi-level Tests)*
                        </span>
                      </label>
                      <div
                        className="req_sub_wrapper requirementSelect"
                        id="ar2_req6"
                        style={{ display: "none" }}
                      >
                        <p>Notes (for both Discrete and Cumulative scripts):</p>
                        <ol className="membership_due">
                          <li> Only show relevant member levels.</li>
                          <li>
                            {" "}
                            This option is disabled for NRMs that only have one
                            member level activated (i.e. L1) since it is meant
                            for admission into L1, L2 and L3 member levels based
                            on dues paid in L1, L2 and/or L3 membership levels.
                          </li>
                          <li>
                            {" "}
                            Choosing a Membership Level in first of two clauses
                            appended by +AND disables choice of identical
                            Membership level in second clause. Example: User
                            cannot enter: Paid at least $100 in dues as an L1
                            Member … +AND Paid at least $100 in dues as an L1
                            Member.
                          </li>
                        </ol>
                        <p>
                          <strong>Discrete***</strong>
                        </p>
                        <p>Admit any applicant who:</p>
                        <p>
                          [Paid at least
                          <span
                            style={{
                              textDecoration: "underline",
                              display: "inline",
                            }}
                          >
                            {" "}
                            $&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          </span>{" "}
                          in dues as an L1 Member/L2 Member/L3 Member over the
                          most recent/any{" "}
                          <span
                            style={{
                              textDecoration: "underline",
                              display: "inline",
                            }}
                          >
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          </span>{" "}
                          months/years any time period**]
                          <a
                            href="javascript:void(0)"
                            className="btn small"
                            onclick="javascript:ShowContent('ar2_req6_and');javascript:HideContent('ar2_req6_or');"
                          >
                            +AND
                          </a>
                          <a
                            href="javascript:void(0)"
                            className="btn small"
                            onclick="javascript:ShowContent('ar2_req6_or');javascript:HideContent('ar2_req6_and');"
                          >
                            +OR
                          </a>
                        </p>
                        <div
                          className="req_sub_wrapper"
                          id="ar2_req6_and"
                          style={{
                            display: "none",
                            marginTop: "10px",
                            left: 0,
                          }}
                        >
                          <p>
                            [AND paid at least{" "}
                            <span
                              style={{
                                textDecoration: "underline",
                                display: "inline",
                              }}
                            >
                              {" "}
                              $&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            </span>{" "}
                            in dues as an L1 Member/L2 Member/L3 Member over the
                            most recent/any{" "}
                            <span
                              style={{
                                textDecoration: "underline",
                                display: "inline",
                              }}
                            >
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            </span>{" "}
                            months/years any time period**]
                          </p>
                        </div>
                        <div
                          className="req_sub_wrapper"
                          id="ar2_req6_or"
                          style={{
                            display: "none",
                            marginTop: "10px",
                            left: 0,
                          }}
                        >
                          <p>
                            [Paid at least
                            <span
                              style={{
                                textDecoration: "underline",
                                display: "inline",
                              }}
                            >
                              {" "}
                              $&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            </span>{" "}
                            in dues as an L1 Member/L2 Member/L3 Member over the
                            most recent/any{" "}
                            <span
                              style={{
                                textDecoration: "underline",
                                display: "inline",
                              }}
                            >
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            </span>{" "}
                            months/years any time period**]
                          </p>
                        </div>
                        <div
                          className="cumulative_wrapper"
                          style={{ marginTop: "20px" }}
                        >
                          <p>
                            <strong>Cumulative***</strong>
                          </p>
                          <p>Admit any applicant who:</p>
                          <p>
                            Has paid total cumulative dues to (NRM Name) of at
                            least
                            <span
                              style={{
                                textDecoration: "underline",
                                display: "inline",
                              }}
                            >
                              {" "}
                              $&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            </span>{" "}
                            as an L1 and L2 Member*/L1 and L3 Member*/L2 and L3
                            Member* over the most recent/any{" "}
                            <span
                              style={{
                                textDecoration: "underline",
                                display: "inline",
                              }}
                            >
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            </span>{" "}
                            months/years any time period**
                          </p>
                          <br />
                          <p>
                            <strong>Notes:</strong>
                          </p>
                          <p>
                            *Requires applicant to have been a member at both
                            levels.
                          </p>
                          <p>
                            **If “any time period” is selected, then “
                            <span
                              style={{
                                textDecoration: "underline",
                                display: "inline",
                              }}
                            >
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            </span>{" "}
                            months/years” should be disabled.
                          </p>
                          <br />
                          <p>
                            *** Simultaneous use of Cumulative and Discrete
                            scripts is possible. The Cumulative script is only
                            available for use and should only be shown if
                            multiple member levels have been created.
                          </p>
                        </div>
                      </div>
                      <label className="radio-cont">
                        <input
                          id="req_7_ar2"
                          defaultValue="ar2_req7"
                          type="radio"
                          name="rSelect"
                          onclick="javascript:ShowContent('ar2_req7');"
                        />
                        <span>
                          <strong>Activity Level:</strong> Extent of
                          participation in your Test.
                        </span>
                      </label>
                      <div
                        className="req_sub_wrapper requirementSelect"
                        id="ar2_req7"
                        style={{ display: "none" }}
                      >
                        <p>
                          Inside your NRM/Outside your NRM/Both inside and
                          outside your NRM
                        </p>
                        <p>Low/Medium/High</p>
                        <p>Admit any applicant whose Activity Level:</p>
                        <p>
                          [Inside your NRM/Outside your NRM/Both Inside and
                          Outside your NRM is Low/Medium/High (check all that
                          apply)]
                          <a
                            href="javascript:void(0)"
                            className="btn small"
                            onclick="javascript:ShowContent('ar2_req7_and');javascript:HideContent('ar2_req7_or');"
                          >
                            +AND
                          </a>
                          <a
                            href="javascript:void(0)"
                            className="btn small"
                            onclick="javascript:ShowContent('ar2_req7_or');javascript:HideContent('ar2_req7_and');"
                          >
                            +OR
                          </a>
                        </p>
                        <div
                          className="req_sub_wrapper"
                          id="ar12_req7_and"
                          style={{
                            display: "none",
                            marginTop: "10px",
                            left: 0,
                          }}
                        >
                          [AND Inside your NRM/Outside your NRM/Both Inside and
                          Outside your NRM is Low/Medium/High (check all that
                          apply)]
                        </div>
                        <div
                          className="req_sub_wrapper"
                          id="ar2_req7_or"
                          style={{
                            display: "none",
                            marginTop: "10px",
                            left: 0,
                          }}
                        >
                          [Inside your NRM/Outside your NRM/Both Inside and
                          Outside your NRM is Low/Medium/High (check all that
                          apply)]
                        </div>
                        <p style={{ color: "red" }}>
                          [If user selects 'BOTH INSIDE AND OUTSIDE YOUR NMI'
                          for any clause, display:]
                        </p>
                        <p>
                          Choose Weights: _50_% INSIDE YOUR NRM: _50_% OUTSIDE
                          YOUR NRM
                        </p>
                        <p>
                          [weights are set at 50%/50% by default - user can
                          change either one and the other number adjusts so that
                          both sum to 100%]
                        </p>
                        <br />
                        <p>
                          <strong>*Note:</strong> Use of +AND gate to append two
                          clauses disables the choice of same Inside your
                          NRM/Outside your NRM/Both
                        </p>
                        <p>
                          Inside and Outside your NRM within the same compound
                          condition. Example: User cannot choose as follows:
                        </p>
                        <p>Admit any applicant whose Activity Level:</p>
                        <p>
                          [inside your NOM/is Low/Medium/High AND Inside your
                          NRM is Low/Medium]
                        </p>
                      </div>
                      <label className="radio-cont">
                        <input
                          id="req_8_ar2"
                          defaultValue="ar2_req8"
                          type="radio"
                          name="rSelect"
                        />
                        <span>
                          <strong>Threat Level (Disqualification):</strong>{" "}
                          Disqualify any applicants with poor conduct records.
                        </span>
                      </label>
                      <div
                        className="req_sub_wrapper requirementSelect"
                        id="ar2_req8"
                        style={{ display: "none" }}
                      >
                        <p>Disqualify by Threat Level</p>
                        <p>
                          [Automatically reject any applicant who was previously
                          banned from your NMI as a (check all that apply)]
                          <a
                            href="javascript:void(0)"
                            className="btn small"
                            onclick="javascript:ShowContent('ar2_req8_and');javascript:HideContent('ar2_req8_or');"
                          >
                            +AND
                          </a>
                          <a
                            href="javascript:void(0)"
                            className="btn small"
                            onclick="javascript:ShowContent('ar2_req8_or');javascript:HideContent('ar2_req8_and');"
                          >
                            +OR
                          </a>
                        </p>
                        <div
                          className="req_sub_wrapper"
                          id="ar2_req8_and"
                          style={{
                            display: "none",
                            marginTop: "10px",
                            left: 0,
                          }}
                        >
                          [AND automatically reject any applicant with a
                          High/Medium or High Threat Level Inside your
                          NRM/Outside your NRM/Both Inside and Outside your NRM]
                        </div>
                        <div
                          className="req_sub_wrapper"
                          id="ar2_req8_or"
                          style={{
                            display: "none",
                            marginTop: "10px",
                            left: 0,
                          }}
                        >
                          [automatically reject any applicant with a High/Medium
                          or High Threat Level Inside your NRM/Outside your
                          NRM/Both Inside and Outside your NRM]
                        </div>
                        <p style={{ color: "red" }}>
                          [If user selects 'Both Inside and Outside your NRM' in
                          any clause, display:]
                        </p>
                        <p>
                          Choose Weights: _50_% INSIDE YOUR NRM: _50_% OUTSIDE
                          YOUR NRM
                        </p>
                        <p>
                          [weights are set at 50%/50% by default - user can
                          change either and the other number adjusts so that sum
                          total of both is 100%]
                        </p>
                        <br />
                        <p>Disqualify previously banned applicants</p>
                        <p>
                          Automatically reject any applicant who was previously
                          banned from your NMI as a (check all that apply)
                        </p>
                        <p>
                          Tourist, LI Member, L2 Member, L3 Member, Any Level*
                          within the last{" "}
                          <span
                            style={{
                              textDecoration: "underline",
                              display: "inline",
                            }}
                          >
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          </span>
                          days/weeks/months/years/any time period**.
                        </p>
                        <p>
                          * Only show levels that have been activated, but
                          grey-out tne level the user is applying for admission
                          to. checking 'Any Level' checks all levels.
                        </p>
                        <p>** Choosing 'any time period'</p>
                      </div>
                    </fieldset>
                  </div>
                </fieldset>
              </div>
              {/* #member-edit-1 */}
            </div>
            {/* #member-edit-2 */}
            <div
              id="member3-edit"
              className="members-edit"
              style={{ display: "none" }}
            >
              <div id="member-edit-1">
                <ul>
                  <li>
                    <label>Membership Level Name</label>
                    <span className="medit-field">
                      <input type="text" placeholder="Level 3 Member" />
                    </span>
                  </li>
                  <li>
                    <label>Membership Level Description</label>
                    <span className="medit-field">
                      <textarea
                        type="text"
                        placeholder="Describe at a general level the benefits and features available to this level of membership"
                        defaultValue={""}
                      />
                    </span>
                  </li>
                </ul>
                <h1>Create Brief Member Level Profile</h1>
                <h3>How will you admit members to the Level _ Member level?</h3>
                <fieldset id="group1_lvl3">
                  <label className="radio-cont">
                    <input
                      id="admision1_lvl3"
                      type="radio"
                      name="members_type3"
                      defaultValue="open_admission_lvl3"
                      onclick="javascript:HideContent('admin3');javascript:HideContent('admin-rule3','admin3');"
                      defaultChecked
                    />
                    <span>Open Admission</span>
                  </label>
                  <label className="radio-cont">
                    <input
                      id="admision2_lvl3"
                      htmlFor="admi2"
                      type="radio"
                      name="members_type3"
                      onclick="javascript:ShowContent('admin3');javascript:HideContent('admin-rule3');"
                    />
                    <span>Manual Admission</span>
                  </label>
                  <div
                    id="admin3"
                    className="manual-ad"
                    style={{ display: "none" }}
                  >
                    <label className="radio-cont">
                      <input
                        id
                        type="radio"
                        name="manual_select3"
                        defaultValue="Yes"
                        onclick="javascript:ShowContent('manual_yes_level_3');"
                      />
                      <span>Yes</span>
                    </label>
                    <input
                      id="manual_yes_level_3"
                      type="text"
                      placeholder="Why do you want to join our NRM Level 3?"
                      style={{ display: "none" }}
                    />
                    <label id="req_2_no" className="radio-cont">
                      <input
                        id="req_2_lvl3_manual"
                        type="radio"
                        name="manual_select3"
                        defaultValue="No"
                        onclick="javascript:HideContent('manual_yes_level_3');"
                        defaultChecked="true"
                      />
                      <span>No</span>
                    </label>
                  </div>
                  <label className="radio-cont">
                    <input
                      id="admision3_lvl3"
                      type="radio"
                      name="members_type3"
                      onclick="javascript:ShowContent('admin-rule3');javascript:HideContent('admin3');"
                    />
                    <span>Admissions Rule</span>
                  </label>
                  <div
                    id="admin-rule3"
                    className="admin-rule"
                    style={{ display: "none" }}
                  >
                    <p>
                      Create simple or more complex admission rules using
                      Requirement Groups.{" "}
                    </p>
                    <p>
                      Applicants are admitted to your NRM level if they satisfy
                      the requirement conditions of any Requirement Group.{" "}
                    </p>
                    <p>
                      Each Requirement Group consists of one or more
                      requirements. If you add multiple requirements to a
                      Requirement Group, the applicant must meet all requirement
                      conditions in the Requirement Group to be admitted.
                    </p>
                    <input type="text" placeholder="Requirement Group 3" />
                    <a
                      className="add-req"
                      id="add_req_btn3"
                      onclick="javascript:ShowContent('req_group3');javascript:HideContent('add_req_btn3');"
                    >
                      + Add Requirement
                    </a>
                    <fieldset
                      className="requirement_wrapper"
                      id="req_group3"
                      style={{ display: "none" }}
                    >
                      <label>Choose a Requirement</label>
                      <label className="radio-cont">
                        <input
                          id="req_1_ar3"
                          defaultValue="ar3_req1"
                          type="radio"
                          name="rSelect"
                          onclick="javascript:ShowContent('ar3_req1');"
                        />
                        <span>
                          <strong>Match Score:</strong> Extent of user's match
                          to your religious profile based on the entire
                          Religious Match Survey.
                        </span>
                      </label>
                      <div
                        className="req_sub_wrapper requirementSelect"
                        id="ar3_req1"
                        style={{ display: "none" }}
                      >
                        <p>
                          Admit applicants whose match score with your Test
                          based on the full Religious Match Survey is % or
                          higher.{" "}
                        </p>
                        <p>
                          Note: You must complete at least 26% of the Religious
                          Match Survey items for this requirement to be
                          activated.{" "}
                        </p>
                        <p>
                          You can complete survey items right after you finish
                          creating the member level today or at any time in the
                          future
                        </p>
                      </div>
                      <label className="radio-cont">
                        <input
                          id="req_2_ar3"
                          defaultValue="ar3_req2"
                          type="radio"
                          name="rSelect"
                          onclick="javascript:ShowContent('ar3_req2');"
                        />
                        <span>
                          <strong>Custom Match Score:</strong> Extent of user's
                          match to your religious profile based on Religious
                          Match Survey items you complete.
                        </span>
                      </label>
                      <div
                        className="req_sub_wrapper requirementSelect"
                        id="ar3_req2"
                        style={{ display: "none" }}
                      >
                        <p>
                          Admit applicants whose custom match score with your
                          Test based on answered Religious Match Survey
                          items only is _% or higher.
                        </p>
                        <p>
                          Note: You must complete at least five sections of the
                          Religious Match Survey for this rule to be activated.
                        </p>
                        <p>
                          “Completing a section” means answering one or more
                          questions within that section.
                        </p>
                        <p>
                          Blank sections marked as “answered” do not count
                          towards the five “completed” sections for purposes of
                          activating this requirement.
                        </p>
                        <p>
                          You can complete survey items right after you finish
                          creating the member level today or at any time in the
                          future.
                        </p>
                      </div>
                      <label className="radio-cont">
                        <input
                          id="req_3_ar3"
                          defaultValue="ar3_req3"
                          type="radio"
                          name="rSelect"
                          onclick="javascript:ShowContent('ar3_req3');"
                        />
                        <span>
                          <strong>Affiliation Length:</strong> How long the
                          applicant has affiliated with your Test (not
                          recommended for new Tests).
                        </span>
                      </label>
                      <div
                        className="req_sub_wrapper requirementSelect"
                        id="ar3_req3"
                        style={{ display: "none" }}
                      >
                        <p>Discrete Affiliation Length Requirement***</p>
                        <p>Admit any applicant who has been a:</p>
                        <p>
                          [Tourist/L1 Member/L2 Member/L3 Member* of (NRM name)
                          for any time period**/at least/the most recent
                          <span
                            style={{
                              textDecoration: "underline",
                              display: "inline",
                            }}
                          >
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          </span>{" "}
                          days/weeks/months/years***
                        </p>
                      </div>
                      <label className="radio-cont">
                        <input
                          id="req_4_ar3"
                          defaultValue="ar3_req4_or"
                          type="radio"
                          name="rSelect"
                          onclick="javascript:ShowContent('ar3_req4_or');"
                        />
                        <span>
                          <strong>Current Affiliation Status:</strong>{" "}
                          Applicant's current affiliation status with your
                          Test.
                        </span>
                      </label>
                      <div
                        className="req_sub_wrapper requirementSelect"
                        id="ar3_req4_or"
                        style={{ display: "none" }}
                      >
                        <p>Applicant must currently be a:</p>
                        <p>
                          [Browser (i.e. no affiliation)/Tourist/L1 Member/L2
                          Member/L3 Member* of (NRM name)]{" "}
                          <a
                            href="javascript:void(0)"
                            className="btn small"
                            onclick="javascript:ShowContent('ar3_req4_or_display');"
                          >
                            +OR
                          </a>
                        </p>
                        <div
                          className="req_sub_wrapper"
                          id="ar3_req4_or_display"
                          style={{
                            display: "none",
                            left: 0,
                            marginTop: "10px",
                          }}
                        >
                          <p>
                            [Browser (i.e. no affiliation)/Tourist/L1 Member/L2
                            Member/L3 Member* of (NRM name)] *
                          </p>
                        </div>
                      </div>
                      <label className="radio-cont">
                        <input
                          id="req_5_ar3"
                          defaultValue="ar3_req5"
                          type="radio"
                          name="rSelect"
                          onclick="javascript:ShowContent('ar3_req5');"
                        />
                        <span>
                          <strong>Admissions Essay:</strong> Require a graded or
                          ungraded answer to an essay question.
                        </span>
                      </label>
                      <div
                        className="req_sub_wrapper requirementSelect"
                        id="ar3_req5"
                        style={{ display: "none" }}
                      >
                        <p style={{ marginTop: "16px" }}>
                          Admit any applicant:
                        </p>
                        <br />
                        <fieldset className="group_essay">
                          <label className="radio-cont">
                            <input
                              id="req_5_admission_essay_simple_ar3"
                              type="radio"
                              name="admission_essay"
                            />
                            <span>
                              (Simple Submission) Who has simply submitted an
                              essay response
                            </span>
                          </label>
                          <label className="radio-cont">
                            <input
                              id="req_5_admission_essay_minimum_ar3"
                              type="radio"
                              name="admission_essay"
                            />
                            <span>
                              (Minimum Length) Who has submitted an essay
                              response with at least{" "}
                              <span
                                style={{
                                  textDecoration: "underline",
                                  display: "inline",
                                }}
                              >
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                              </span>{" "}
                              words/characters
                            </span>
                          </label>
                          <label className="radio-cont">
                            <input
                              id="req_5_admission_essay_passfail_ar3"
                              type="radio"
                              name="admission_essay"
                            />
                            <span>
                              (Pass/Fail) Whose essay response is graded as
                              “Pass”
                            </span>
                          </label>
                          <span className="essay_edit_textfield">
                            <textarea
                              type="text"
                              placeholder="Why do you want to join our NRM (Level X)?"
                              defaultValue={""}
                            />
                          </span>
                        </fieldset>
                      </div>
                      <label className="radio-cont">
                        <input
                          id="req_6_ar3"
                          defaultValue="ar3_req6"
                          type="radio"
                          name="rSelect"
                          onclick="javascript:ShowContent('ar3_req6');"
                        />
                        <span>
                          <strong>Membership Dues Paid:</strong> Extent of prior
                          dues paid as a member of your Test (only available
                          for multi-level Tests)*
                        </span>
                      </label>
                      <div
                        className="req_sub_wrapper requirementSelect"
                        id="ar3_req6"
                        style={{ display: "none" }}
                      >
                        <p>Notes (for both Discrete and Cumulative scripts):</p>
                        <ol className="membership_due">
                          <li> Only show relevant member levels.</li>
                          <li>
                            {" "}
                            This option is disabled for NRMs that only have one
                            member level activated (i.e. L1) since it is meant
                            for admission into L1, L2 and L3 member levels based
                            on dues paid in L1, L2 and/or L3 membership levels.
                          </li>
                          <li>
                            {" "}
                            Choosing a Membership Level in first of two clauses
                            appended by +AND disables choice of identical
                            Membership level in second clause. Example: User
                            cannot enter: Paid at least $100 in dues as an L1
                            Member … +AND Paid at least $100 in dues as an L1
                            Member.
                          </li>
                        </ol>
                        <p>
                          <strong>Discrete***</strong>
                        </p>
                        <p>Admit any applicant who:</p>
                        <p>
                          [Paid at least
                          <span
                            style={{
                              textDecoration: "underline",
                              display: "inline",
                            }}
                          >
                            {" "}
                            $&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          </span>{" "}
                          in dues as an L1 Member/L2 Member/L3 Member over the
                          most recent/any{" "}
                          <span
                            style={{
                              textDecoration: "underline",
                              display: "inline",
                            }}
                          >
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          </span>{" "}
                          months/years any time period**]
                          <a
                            href="javascript:void(0)"
                            className="btn small"
                            onclick="javascript:ShowContent('ar3_req6_and');javascript:HideContent('ar3_req6_or');"
                          >
                            +AND
                          </a>
                          <a
                            href="javascript:void(0)"
                            className="btn small"
                            onclick="javascript:ShowContent('ar3_req6_or');javascript:HideContent('ar3_req6_and');"
                          >
                            +OR
                          </a>
                        </p>
                        <div
                          className="req_sub_wrapper"
                          id="ar3_req6_and"
                          style={{
                            display: "none",
                            marginTop: "10px",
                            left: 0,
                          }}
                        >
                          <p>
                            [AND paid at least{" "}
                            <span
                              style={{
                                textDecoration: "underline",
                                display: "inline",
                              }}
                            >
                              {" "}
                              $&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            </span>{" "}
                            in dues as an L1 Member/L2 Member/L3 Member over the
                            most recent/any{" "}
                            <span
                              style={{
                                textDecoration: "underline",
                                display: "inline",
                              }}
                            >
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            </span>{" "}
                            months/years any time period**]
                          </p>
                        </div>
                        <div
                          className="req_sub_wrapper"
                          id="ar3_req6_or"
                          style={{
                            display: "none",
                            marginTop: "10px",
                            left: 0,
                          }}
                        >
                          <p>
                            [Paid at least
                            <span
                              style={{
                                textDecoration: "underline",
                                display: "inline",
                              }}
                            >
                              {" "}
                              $&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            </span>{" "}
                            in dues as an L1 Member/L2 Member/L3 Member over the
                            most recent/any{" "}
                            <span
                              style={{
                                textDecoration: "underline",
                                display: "inline",
                              }}
                            >
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            </span>{" "}
                            months/years any time period**]
                          </p>
                        </div>
                        <div
                          className="cumulative_wrapper"
                          style={{ marginTop: "20px" }}
                        >
                          <p>
                            <strong>Cumulative***</strong>
                          </p>
                          <p>Admit any applicant who:</p>
                          <p>
                            Has paid total cumulative dues to (NRM Name) of at
                            least
                            <span
                              style={{
                                textDecoration: "underline",
                                display: "inline",
                              }}
                            >
                              {" "}
                              $&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            </span>{" "}
                            as an L1 and L2 Member*/L1 and L3 Member*/L2 and L3
                            Member* over the most recent/any{" "}
                            <span
                              style={{
                                textDecoration: "underline",
                                display: "inline",
                              }}
                            >
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            </span>{" "}
                            months/years any time period**
                          </p>
                          <br />
                          <p>
                            <strong>Notes:</strong>
                          </p>
                          <p>
                            *Requires applicant to have been a member at both
                            levels.
                          </p>
                          <p>
                            **If “any time period” is selected, then “
                            <span
                              style={{
                                textDecoration: "underline",
                                display: "inline",
                              }}
                            >
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            </span>{" "}
                            months/years” should be disabled.
                          </p>
                          <br />
                          <p>
                            *** Simultaneous use of Cumulative and Discrete
                            scripts is possible. The Cumulative script is only
                            available for use and should only be shown if
                            multiple member levels have been created.
                          </p>
                        </div>
                      </div>
                      <label className="radio-cont">
                        <input
                          id="req_7_ar3"
                          defaultValue="ar3_req7"
                          type="radio"
                          name="rSelect"
                          onclick="javascript:ShowContent('ar3_req7');"
                        />
                        <span>
                          <strong>Activity Level:</strong> Extent of
                          participation in your Test.
                        </span>
                      </label>
                      <div
                        className="req_sub_wrapper requirementSelect"
                        id="ar3_req7"
                        style={{ display: "none" }}
                      >
                        <p>
                          Inside your NRM/Outside your NRM/Both inside and
                          outside your NRM
                        </p>
                        <p>Low/Medium/High</p>
                        <p>Admit any applicant whose Activity Level:</p>
                        <p>
                          [Inside your NRM/Outside your NRM/Both Inside and
                          Outside your NRM is Low/Medium/High (check all that
                          apply)]
                          <a
                            href="javascript:void(0)"
                            className="btn small"
                            onclick="javascript:ShowContent('ar3_req7_and');javascript:HideContent('ar3_req7_or');"
                          >
                            +AND
                          </a>
                          <a
                            href="javascript:void(0)"
                            className="btn small"
                            onclick="javascript:ShowContent('ar3_req7_or');javascript:HideContent('ar3_req7_and');"
                          >
                            +OR
                          </a>
                        </p>
                        <div
                          className="req_sub_wrapper"
                          id="ar13_req7_and"
                          style={{
                            display: "none",
                            marginTop: "10px",
                            left: 0,
                          }}
                        >
                          [AND Inside your NRM/Outside your NRM/Both Inside and
                          Outside your NRM is Low/Medium/High (check all that
                          apply)]
                        </div>
                        <div
                          className="req_sub_wrapper"
                          id="ar3_req7_or"
                          style={{
                            display: "none",
                            marginTop: "10px",
                            left: 0,
                          }}
                        >
                          [Inside your NRM/Outside your NRM/Both Inside and
                          Outside your NRM is Low/Medium/High (check all that
                          apply)]
                        </div>
                        <p style={{ color: "red" }}>
                          [If user selects 'BOTH INSIDE AND OUTSIDE YOUR NMI'
                          for any clause, display:]
                        </p>
                        <p>
                          Choose Weights: _50_% INSIDE YOUR NRM: _50_% OUTSIDE
                          YOUR NRM
                        </p>
                        <p>
                          [weights are set at 50%/50% by default - user can
                          change either one and the other number adjusts so that
                          both sum to 100%]
                        </p>
                        <br />
                        <p>
                          <strong>*Note:</strong> Use of +AND gate to append two
                          clauses disables the choice of same Inside your
                          NRM/Outside your NRM/Both
                        </p>
                        <p>
                          Inside and Outside your NRM within the same compound
                          condition. Example: User cannot choose as follows:
                        </p>
                        <p>Admit any applicant whose Activity Level:</p>
                        <p>
                          [inside your NOM/is Low/Medium/High AND Inside your
                          NRM is Low/Medium]
                        </p>
                      </div>
                      <label className="radio-cont">
                        <input
                          id="req_8_ar3"
                          defaultValue="ar3_req8"
                          type="radio"
                          name="rSelect"
                        />
                        <span>
                          <strong>Threat Level (Disqualification):</strong>{" "}
                          Disqualify any applicants with poor conduct records.
                        </span>
                      </label>
                      <div
                        className="req_sub_wrapper requirementSelect"
                        id="ar3_req8"
                        style={{ display: "none" }}
                      >
                        <p>Disqualify by Threat Level</p>
                        <p>
                          [Automatically reject any applicant who was previously
                          banned from your NMI as a (check all that apply)]
                          <a
                            href="javascript:void(0)"
                            className="btn small"
                            onclick="javascript:ShowContent('ar3_req8_and');javascript:HideContent('ar3_req8_or');"
                          >
                            +AND
                          </a>
                          <a
                            href="javascript:void(0)"
                            className="btn small"
                            onclick="javascript:ShowContent('ar3_req8_or');javascript:HideContent('ar3_req8_and');"
                          >
                            +OR
                          </a>
                        </p>
                        <div
                          className="req_sub_wrapper"
                          id="ar3_req8_and"
                          style={{
                            display: "none",
                            marginTop: "10px",
                            left: 0,
                          }}
                        >
                          [AND automatically reject any applicant with a
                          High/Medium or High Threat Level Inside your
                          NRM/Outside your NRM/Both Inside and Outside your NRM]
                        </div>
                        <div
                          className="req_sub_wrapper"
                          id="ar3_req8_or"
                          style={{
                            display: "none",
                            marginTop: "10px",
                            left: 0,
                          }}
                        >
                          [automatically reject any applicant with a High/Medium
                          or High Threat Level Inside your NRM/Outside your
                          NRM/Both Inside and Outside your NRM]
                        </div>
                        <p style={{ color: "red" }}>
                          [If user selects 'Both Inside and Outside your NRM' in
                          any clause, display:]
                        </p>
                        <p>
                          Choose Weights: _50_% INSIDE YOUR NRM: _50_% OUTSIDE
                          YOUR NRM
                        </p>
                        <p>
                          [weights are set at 50%/50% by default - user can
                          change either and the other number adjusts so that sum
                          total of both is 100%]
                        </p>
                        <br />
                        <p>Disqualify previously banned applicants</p>
                        <p>
                          Automatically reject any applicant who was previously
                          banned from your NMI as a (check all that apply)
                        </p>
                        <p>
                          Tourist, LI Member, L2 Member, L3 Member, Any Level*
                          within the last{" "}
                          <span
                            style={{
                              textDecoration: "underline",
                              display: "inline",
                            }}
                          >
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          </span>
                          days/weeks/months/years/any time period**.
                        </p>
                        <p>
                          * Only show levels that have been activated, but
                          grey-out tne level the user is applying for admission
                          to. checking 'Any Level' checks all levels.
                        </p>
                        <p>** Choosing 'any time period'</p>
                      </div>
                    </fieldset>
                  </div>
                </fieldset>
              </div>{" "}
              {/* #member-edit-1 */}
            </div>{" "}
            {/* #member-edit-3 */}
          </div>{" "}
          {/* #my-create-member */}
          <div className="clearfix" />
        </div>{" "}
        {/* .container.no-padding-lr */}
        <div className="clearfix" />
      </div>{" "}
      {/* .content */}
      {/* forgot Account */}
      <div
        className="modal fade Acct"
        id="forgotAcct"
        tabIndex={-1}
        data-focus-on="input:first"
      >
        <div className="modal-dialog">
          {/* Modal content*/}
          <div className="modal-content">
            <div className="modal-header">
              <a href="#" className="logo">
                <img src="img/logo.png" />
              </a>
            </div>
            <div className="modal-body">
              <p className="fs--20 fw--700">Recover your username</p>
              <p>
                Don't worry! You may have forgotten your username, but we can
                help you out. Enter your email address below and we'll email you
                your username.
              </p>
              <p>
                <input
                  placeholder="EMAIL"
                  oninput="this.className = ''"
                  name="email"
                />
              </p>
              <button type="button" className="btn btn-default fs--12">
                EMAIL ME
              </button>
              <p>
                If you are having trouble accessing your account, follow{" "}
                <a href="#" className="bright-blue">
                  this link
                </a>
                .
              </p>
              <div className="login-signup-links">
                <a
                  href="#loginAcct"
                  className="bright-blue fw--700 firstLink"
                  data-toggle="modal"
                  data-target="#loginAcct"
                  data-dismiss="modal"
                >
                  LOG IN
                </a>
                <a
                  href="#"
                  className="bright-blue fw--700"
                  data-toggle="modal"
                  data-target="#signUp1st"
                  data-dismiss="modal"
                >
                  SIGN UP
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Login Account */}
      <div
        className="modal fade Acct"
        id="loginAcct"
        tabIndex={-1}
        data-focus-on="input:first"
      >
        <div className="modal-dialog">
          {/* Modal content*/}
          <div className="modal-content">
            <div className="modal-header">
              <a href="#" className="logo">
                <img src="img/logo.png" />
              </a>
            </div>
            <div className="modal-body">
              <p>
                <input
                  placeholder="USERNAME"
                  oninput="this.className = ''"
                  name="username"
                />
              </p>
              <p>
                <input
                  placeholder="PASSWORD"
                  oninput="this.className = ''"
                  name="password"
                />
              </p>
              <button type="button" className="btn btn-default fs--12">
                SIGN IN
              </button>
              <div className="login-signup-links">
                <a
                  href="#"
                  className="bright-blue firstLink"
                  data-toggle="modal"
                  data-target="#forgotAcct"
                  data-dismiss="modal"
                >
                  Forgot username
                </a>
                <a
                  href="#rstPassword"
                  className="bright-blue"
                  data-toggle="modal"
                  data-target="#forgotAcct"
                  data-dismiss="modal"
                >
                  Forgot email
                </a>
              </div>
              <p>
                New to t?{" "}
                <a
                  href="#"
                  className="bright-blue"
                  data-toggle="modal"
                  data-target="#signUp1st"
                  data-dismiss="modal"
                >
                  Sign Up
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* reset Password */}
      <div
        className="modal fade Acct"
        id="rstPassword"
        tabIndex={-1}
        data-focus-on="input:first"
      >
        <div className="modal-dialog">
          {/* Modal content*/}
          <div className="modal-content">
            <div className="modal-header">
              <a href="#" className="logo">
                <img src="img/logo.png" />
              </a>
            </div>
            <div className="modal-body">
              <p className="fs--20 fw--700">Reset your password</p>
              <p>
                Don't worry! You may have forgotten your password, but we can
                help you out. Enter your username below and we'll email you a
                link to reset your password.
              </p>
              <p>
                <input
                  placeholder="USERNAME"
                  oninput="this.className = ''"
                  name="username"
                />
              </p>
              <p>
                <input
                  placeholder="PASSWORD"
                  oninput="this.className = ''"
                  name="password"
                />
              </p>
              <button type="button" className="btn btn-default fs--12">
                EMAIL ME
              </button>
              <a href="#" className="bright-blue fw--700 frgtUsrname">
                FORGOT USERNAME
              </a>
              <p>
                If you are having trouble accessing your account, follow{" "}
                <a href="#" className="bright-blue">
                  this link
                </a>
                .
              </p>
              <div className="login-signup-links">
                <a
                  href="#"
                  className="bright-blue fw--700 firstLink"
                  data-toggle="modal"
                  data-target="#loginAcct"
                  data-dismiss="modal"
                >
                  LOG IN
                </a>
                <a
                  href="#"
                  className="bright-blue fw--700"
                  data-toggle="modal"
                  data-target="#signUp1st"
                  data-dismiss="modal"
                >
                  SIGN UP
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* sign up */}
      <div
        className="modal fade Acct signup"
        id="signUp1st"
        tabIndex={-1}
        data-focus-on="input:first"
      >
        <div className="modal-dialog">
          {/* Modal content*/}
          <div className="modal-content">
            <button type="button" className="close" data-dismiss="modal">
              ×
            </button>
            <div className="signup-header">
              <a href="#" className="logo">
                <img src="img/logo.png" />
              </a>
            </div>
            <div className="signup-body">
              <div className="form">
                <p>
                  <input
                    placeholder="EMAIL"
                    oninput="this.className = ''"
                    name="email"
                  />
                </p>
                <a
                  href="#"
                  className="bright-blue fw--700 btn btn-default fs--12"
                  data-toggle="modal"
                  data-target="#signUp2nd"
                  data-dismiss="modal"
                >
                  NEXT
                </a>
                <p>
                  Already a t?{" "}
                  <a
                    href="#loginAcct"
                    className="fw--700"
                    data-toggle="modal"
                    data-target="#loginAcct"
                    data-dismiss="modal"
                  >
                    LOG IN
                  </a>
                </p>
                <p>
                  By continuing, you agree to our <a href="#">User Agreement</a>{" "}
                  and <a href="#">Privacy Policy</a>
                </p>
              </div>
            </div>
            <div className="clearfix" />
          </div>
        </div>
      </div>
      <div
        className="modal fade Acct signup"
        id="signUp2nd"
        tabIndex={-1}
        data-focus-on="input:first"
      >
        <div className="modal-dialog">
          {/* Modal content*/}
          <div className="modal-content">
            <div className="modal-header">
              <a href="#" className="logo">
                <img src="img/logo.png" />
              </a>
            </div>
            <div className="modal-body">
              <p>
                <input
                  placeholder="CHOOSE A USERNAME"
                  oninput="this.className = ''"
                  name="email"
                />
              </p>
              <p>
                <input
                  placeholder="PASSWORD"
                  oninput="this.className = ''"
                  name="phone"
                />
              </p>
              <img src="img/captcha.jpg" />
            </div>
            <div className="modal-footer">
              <a
                href="#"
                className="bright-blue backLink"
                data-toggle="modal"
                data-target="#signUp1st"
                data-dismiss="modal"
              >
                Back
              </a>
              <a
                href="#"
                className="bright-blue fw--700 btn btn-default fs--12 signupLink"
              >
                SIGN UP
              </a>
              <div className="clearfix" />
            </div>
          </div>
        </div>
      </div>
      {/* end of content */}
      {/* sart of footer */}
      <Footer />
      {/* end of footer */}
    </div>
  );
};

export default SetMemberShip;
