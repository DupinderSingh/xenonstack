/*eslint-disable*/
import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {
    changeEducation,
    changeRegistrationForm
} from '../../../../../actions/account/registration-action';
import Select from '../../../../app/select/select';
import {startEndYear} from "../../../../app/startEnd/startEndYear";
import {month} from "../../../../app/month/month";
import {qualification} from "../../../../app/qualification/qualification";
import {checkValidation} from "../../../../../actions/app/app";
import {clearAll} from "../../../../../actions/dashboard/admin/college/college";
import BarLoaderSpinner from '../../../../../components/app/spinner/barloader';

const WebSocket = require('websocket').w3cwebsocket;

let ws = null;
let BASE_URL = "";

class EducationSection extends Component {
    componentWillMount() {
        window.scrollTo(0, 0);
        BASE_URL = process.env.REACT_APP_COLLEGES_WS;
        console.log(this.props.education, "education....");
        this.props.dispatch(clearAll());
    }

    componentWillUnmount() {
        // close the web socket connection....
        if (ws !== null && ws.onclose !== null) {
            ws.close();
        }
    }


    checkMonthCount(checkMonth) {
        switch (checkMonth) {
            case "January":
                return 1;
                break;
            case "February":
                return 2;
                break;
            case "March":
                return 3;
                break;
            case "April":
                return 4;
                break;
            case "May":
                return 5;
                break;
            case "June":
                return 6;
                break;
            case "July":
                return 7;
                break;
            case "August":
                return 8;
                break;
            case "September":
                return 9;
                break;
            case "October":
                return 10;
                break;
            case "November":
                return 11;
                break;
            case "December":
                return 12;
                break;
            default:
                return 0;
                break;
        }
    }

    onChange(e, index) {
        const self = this.props;
        const thi = this;
        const target = e.target;
        const existingEducation = self.education;
        const value = e.target.value;
        checkValidation(e);
        console.log(existingEducation, "existing education");
        existingEducation[index][e.target.name] = e.target.value;
        self.dispatch(changeRegistrationForm(Object.assign(self.registrationForm, {education: existingEducation})));
        if (target.name === "school") {
            if (target.value.length >= 3) {
                const serverApi = "wss://career-admin.xenon.team/api/drive-portal/v1/ws/college";
                ws = new WebSocket(serverApi);
                let education = self.registrationForm.education;
                education[index]["loading"] = true;
                education[index]["schools"] = [];
                self.dispatch(changeRegistrationForm(Object.assign(self.registrationForm, {education: education})));
                ws.onerror = () => {
                    //loading false
                    let education = self.registrationForm.education;
                    education[index]["loading"] = false;
                    education[index]["schools"] = [];
                    self.dispatch(changeRegistrationForm(Object.assign(self.registrationForm, {education: education})));

                    console.log("error")
                    // this.props.dispatch(homeResponseError("Server error.", 500))
                };
                ws.onopen = function () {
                    // alert("open")
                    if (ws.readyState === 1) {
                        console.log("send data...")
                        ws.send(value);
                    }

                    //When the socket connection is ready to use.
                    // if (ws.readyState === 1) {
                    //     ws.onheartbeat = function () {
                    //         //this will work when terminal is idle for more than 15 seconds,  this is for hearbeat purposes,
                    //         // so that socketjs connection is always active. otherwise it will disconnect with the message timed out.
                    //         if (conn.readyState === 1) {
                    //             conn.send(JSON.stringify({'Op': 'h'})); //this will not send any json string or any input, it
                    //             // just send the "h" which is for heartbeat. Nothing will get in return.
                    //         }
                    //     };
                    //     conn.send(JSON.stringify({'Op': 'bind',}));
                    //     conn.send(JSON.stringify({
                    //         'data': existingEducation[index]["school"]
                    //     }));
                    // }
                };
                ws.onmessage = (e) => {
                    // loading false
                    console.log("message");
                    const response = JSON.parse(e.data);
                    console.log(response, "response...");
                    let education = self.registrationForm.education;
                    education[index]["loading"] = false;
                    education[index]["schools"] = response;

                    let send = [];
                    for (let i = 0; i < response.length; i++) {
                        send.push({value: response[i].name, label: response[i].name})
                    }
                    self.dispatch(changeRegistrationForm(Object.assign(self.registrationForm, {education: education})));
                    const list = document.getElementById('browsers'+index);
                    console.log(list, "browsers..")
                    while (list.firstChild) {
                        list.removeChild(list.firstChild)
                    }
                    ;
                    console.log(list, "list")
                    send.forEach(d => {
                        let option = document.createElement('option');
                        option.value = d.value;
                        list.appendChild(option);
                    });
                };
                ws.onclose = () => {
                    // loading false
                    let education = self.registrationForm.education;
                    education[index]["loading"] = false;
                    self.dispatch(changeRegistrationForm(Object.assign(self.registrationForm, {education: education})));

                    console.log("close")
                    // this.props.dispatch(homeResponseError("Server error.", 500))
                };
                window.setTimeout(() => {
                    console.log(ws.readyState, "ready state..")
                    if (ws.readyState === 1) {
                        ws.close();
                    }
                }, 1000);

            } else {
                const list = document.getElementById('browsers'+index);
                console.log(list, "browsers..");
                while (list.firstChild) {
                    list.removeChild(list.firstChild)
                }
                ;
                let education = self.registrationForm.education;
                education[index]["schools"] = [];
                self.dispatch(changeRegistrationForm(Object.assign(self.registrationForm, {education: education})));
            }
            if (target.name !== "school" && target.name !== "highest_education" &&
                self.education[index]["startD"] !== "" && self.education[index]["startY"] !== "" &&
                self.education[index]["endD"] !== "" && self.education[index]["endY"] !== "") {
                if ((Number(self.education[index]["startY"]) <= Number(self.education[index]["endY"]))) {
                    if (Number(self.education[index]["startY"]) === Number(self.education[index]["endY"])) {
                        let startMonth, endMonth;
                        startMonth = thi.checkMonthCount(self.education[index]["startD"]);
                        endMonth = thi.checkMonthCount(self.education[index]["endD"]);
                        if (Number(startMonth) <= Number(endMonth)) {
                            const validDates = document.querySelectorAll(".education_select" + index);
                            for (let i = 0; i < validDates.length; i++) {
                                validDates[i].parentElement.classList.remove("has-error");
                                validDates[i].parentElement.classList.add("personal-select-without-error");
                                validDates[i].parentElement.classList.remove("personal-select-with-error");
                            }
                        } else {
                            const inValidDates = document.querySelectorAll(".education_select" + index);
                            for (let i = 0; i < inValidDates.length; i++) {
                                inValidDates[i].parentElement.classList.add("has-error");
                                inValidDates[i].parentElement.classList.add("personal-select-with-error");
                                inValidDates[i].parentElement.classList.remove("personal-select-without-error");
                            }
                        }
                    } else {
                        const validDates = document.querySelectorAll(".education_select" + index);
                        for (let i = 0; i < validDates.length; i++) {
                            validDates[i].parentElement.classList.remove("has-error");
                            validDates[i].parentElement.classList.add("personal-select-without-error");
                            validDates[i].parentElement.classList.remove("personal-select-with-error");
                        }
                    }
                } else {
                    const inValidDates = document.querySelectorAll(".education_select" + index);
                    for (let i = 0; i < inValidDates.length; i++) {
                        inValidDates[i].parentElement.classList.add("has-error");
                        inValidDates[i].parentElement.classList.add("personal-select-with-error");
                        inValidDates[i].parentElement.classList.remove("personal-select-without-error");
                    }
                }

            }
        }
    }


    componentWillReceiveProps(nextProps) {
        console.log(nextProps, "nextProps")
    }

    addEducation() {
        const existingEducation = this.props.education;
        existingEducation.push({
            school: "",
            loading: false,
            schools: [],
            highest_education: "",
            start: "",
            startD: "",
            startY: "",
            end: "",
            endD: "",
            endY: "",
            current: false
        });
        this.props.dispatch(changeEducation(existingEducation))
    }

    removeEducation(i) {
        const registrationForm = this.props.registrationForm;
        const education = registrationForm.education;
        education.splice(i, 1);
        const newRegistrationForm = Object.assign(registrationForm, {education});
        this.props.dispatch(changeRegistrationForm(newRegistrationForm));
    }

    render() {
        return (
            <div>
                <section id="education">
                    <div className="wrapper">
                        <div className="section_header">
                            <h3 className="big-heading">Education</h3>
                        </div>
                        <div className="row">
                            <div className="col-12 col-sm-12 col-md-12 mar-xs-30">
                                <div className="section_content">
                                    {
                                        this.props.education.map((d, i) => (
                                            <div className={i === 0 ? "" : "row-wrapper"}>
                                                <div key={i} className="row">
                                                    <div className="col-sm-12">
                                                        <div
                                                            className="form-group">
                                                            <label className="form-group">College/University
                                                                <span
                                                                    className="req">*</span>
                                                                <input list={"browsers"+i}
                                                                       minLength={3}
                                                                       pattern={"([a-zA-Z.!-”$%&’()*\\+,\\/;\\[\\\\\\]\\^_`{|}~]+\\s)*[a-zA-Z.!-”$%&’()*\\+,\\/;\\[\\\\\\]\\^_`{|}~]+$"}
                                                                       placeholder={"College/University"}
                                                                       className="form-ctrl" autoComplete="off"
                                                                       name="school" required={true}
                                                                       onChange={(e) => this.onChange(e, i)}
                                                                       value={d.school}/>
                                                                <datalist id={"browsers"+i}></datalist>
                                                                <BarLoaderSpinner
                                                                    pageLoading={d.loading}/>
                                                                    <p
                                                                    className="with-error">Please enter
                                                                    college/university (Min 3 characters required. Only
                                                                    characters, numbers and special symbols are
                                                                    allowed).</p>
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-12">
                                                        <div
                                                            className="form-group select-wrapper personal-select-without-error">
                                                            <label>
                                                                {i === 0 ? "Highest Qualification" : "Other Qualification"}<span
                                                                className="req">*</span>
                                                            </label>
                                                            <Select name="highest_education"
                                                                    id="select"
                                                                    required={true}
                                                                    placeholder={i === 0 ? "Highest Qualification" : "Other Qualification"}
                                                                    onChange={(e) => this.onChange(e, i)}
                                                                    value={d.highest_education} className="form-ctrl">
                                                                <option disabled=""
                                                                        value="">{i === 0 ? "Highest Qualification" : "Other Qualification"}</option>
                                                                {
                                                                    qualification.map((d) => (
                                                                        <option value={d}>{d}</option>
                                                                    ))
                                                                }
                                                                <option value="others">Others</option>
                                                            </Select>
                                                            <p className="with-error">This field is required.</p>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-5">
                                                        <div className="row">
                                                            <div className="col-12 col-sm-6 col-md-6 mar-xs-30">
                                                                <div
                                                                    className="form-group select-wrapper personal-select-without-error">
                                                                    <label>Start Month <span
                                                                        className="req">*</span></label>
                                                                    <Select id="select" name="startD"
                                                                            required={true}
                                                                            placeholder="Start Month"
                                                                            onChange={(e) => this.onChange(e, i)}
                                                                            value={d.startD}
                                                                            className={"form-ctrl education_select" + i}>
                                                                        <option disabled="" value="">Start Month
                                                                        </option>
                                                                        {
                                                                            month.map((d, i) => (
                                                                                <option
                                                                                    value={d}>{d}</option>
                                                                            ))
                                                                        }
                                                                    </Select>
                                                                    <p className="with-error">Invalid date.</p>
                                                                </div>
                                                            </div>
                                                            <div className="col-12 col-sm-6 col-md-6 mar-xs-30">
                                                                <div
                                                                    className="form-group select-wrapper personal-select-without-error select">
                                                                    <label>Start Year <span
                                                                        className="req">*</span></label>
                                                                    <Select id="select" name="startY"
                                                                            className={"form-ctrl education_select" + i}
                                                                            placeholder="Start Year"
                                                                            required={true}
                                                                            onChange={(e) => this.onChange(e, i)}
                                                                            value={d.startY}>
                                                                        <option disabled="" value="">Start Year</option>
                                                                        {
                                                                            startEndYear.map((d, i) => (
                                                                                <option value={d}>{d}</option>
                                                                            ))
                                                                        }
                                                                    </Select>
                                                                    <p className="with-error">Invalid date.</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-7">
                                                        <div className="row">
                                                            <div className="col-12 col-sm-6 col-md-4 mar-xs-30">
                                                                <div
                                                                    className="form-group select-wrapper personal-select-without-error">
                                                                    <label>End Month <span
                                                                        className="req">*</span></label>
                                                                    <Select id="select" name="endD"
                                                                            required={true}
                                                                            placeholder="End Month"
                                                                            onChange={(e) => this.onChange(e, i)}
                                                                            value={d.endD}
                                                                            className={"form-ctrl education_select" + i}>
                                                                        <option disabled="" value="">End Month</option>
                                                                        {
                                                                            month.map((d, i) => (
                                                                                <option
                                                                                    value={d}>{d}</option>
                                                                            ))
                                                                        }
                                                                    </Select>
                                                                    <p className="with-error">Invalid date.</p>
                                                                </div>
                                                            </div>
                                                            <div className="col-12 col-sm-6 col-md-4 mar-xs-30">
                                                                <div
                                                                    className="form-group select-wrapper personal-select-without-error">
                                                                    <label>End Year <span
                                                                        className="req">*</span></label>
                                                                    <Select id="select"
                                                                            className={"form-ctrl education_select" + i}
                                                                            name="endY"
                                                                            placeholder="End Year"
                                                                            required={true}
                                                                            onChange={(e) => this.onChange(e, i)}
                                                                            value={d.endY}>
                                                                        <option disabled="" value="">End Year
                                                                        </option>
                                                                        {
                                                                            d.startY === "" ?
                                                                                startEndYear.map((d, i) => (
                                                                                    <option value={d}>{d}</option>
                                                                                ))
                                                                                :
                                                                                startEndYear.filter((data) => data >= d.startY).map((d, i) => (
                                                                                    <option value={d}>{d}</option>
                                                                                ))
                                                                        }

                                                                    </Select>
                                                                    <p className="with-error">Invalid date.</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                {
                                                    (i !== 0) && (
                                                        <div className="cross-btn">
                                                            <span onClick={() => this.removeEducation(i)}><i
                                                                className="material-icons">clear</i></span>
                                                        </div>)
                                                }
                                            </div>
                                        ))
                                    }
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <a style={{cursor: "pointer"}} onClick={this.addEducation.bind(this)}
                                               className="add-btn"><span>+</span> ADD EDUCATION</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const {registrationForm, goToRegistration} = state.RegisterReducer;
    const {colleges} = state.adminCollegeReducer;
    const {education} = registrationForm;
    console.log(registrationForm.education, "education.....");
    return {education, registrationForm, goToRegistration, colleges}
}

export default withRouter(connect(mapStateToProps)(EducationSection))
