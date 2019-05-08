/*eslint-disable*/
import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import Input from '../../../../app/input/input';
import Select from '../../../../app/select/select';
import {changeExperience, changeRegistrationForm} from "../../../../../actions/account/registration-action";
import {startEndYear} from "../../../../app/startEnd/startEndYear";
import {month} from "../../../../app/month/month";
import {checkValidation} from "../../../../../actions/app/app";

class ExpereienceSection extends Component {
    componentWillMount() {
        window.scrollTo(0, 0);
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
        checkValidation(e);
        const existingExperience = this.props.experience;
        const existingRegisterationForm = this.props.registrationForm;
        existingExperience[index][e.target.name] = (e.target.type === "checkbox" ? !JSON.parse(e.target.value) : e.target.value);
        existingRegisterationForm.experience = existingExperience;
        self.dispatch(changeRegistrationForm(existingRegisterationForm));
        if (!self.experience[index]["current"]) {
            if (target.name !== "name" && target.name !== "position" && target.name !== "current" &&
                self.experience[index]["startD"] !== "" && self.experience[index]["startY"] !== "" &&
                self.experience[index]["endD"] !== "" && self.experience[index]["endY"] !== "") {
                if ((Number(self.experience[index]["startY"]) <= Number(self.experience[index]["endY"]))) {
                    if (Number(self.experience[index]["startY"]) === Number(self.experience[index]["endY"])) {
                        let startMonth, endMonth;
                        startMonth = thi.checkMonthCount(self.experience[index]["startD"]);
                        endMonth = thi.checkMonthCount(self.experience[index]["endD"]);
                        if (Number(startMonth) <= Number(endMonth)) {
                            const validDates = document.querySelectorAll(".experience_select" + index);
                            for (let i = 0; i < validDates.length; i++) {
                                validDates[i].parentElement.classList.remove("has-error");
                                validDates[i].parentElement.classList.add("personal-select-without-error");
                                validDates[i].parentElement.classList.remove("personal-select-with-error");
                            }
                        }
                        else {
                            const inValidDates = document.querySelectorAll(".experience_select" + index);
                            for (let i = 0; i < inValidDates.length; i++) {
                                inValidDates[i].parentElement.classList.add("has-error");
                                inValidDates[i].parentElement.classList.add("personal-select-with-error");
                                inValidDates[i].parentElement.classList.remove("personal-select-without-error");
                            }
                        }
                    }
                    else {
                        const validDates = document.querySelectorAll(".experience_select" + index);
                        for (let i = 0; i < validDates.length; i++) {
                            validDates[i].parentElement.classList.remove("has-error");
                            validDates[i].parentElement.classList.add("personal-select-without-error");
                            validDates[i].parentElement.classList.remove("personal-select-with-error");
                        }
                    }
                }
                else {
                    const inValidDates = document.querySelectorAll(".experience_select" + index);
                    for (let i = 0; i < inValidDates.length; i++) {
                        inValidDates[i].parentElement.classList.add("has-error");
                        inValidDates[i].parentElement.classList.add("personal-select-with-error");
                        inValidDates[i].parentElement.classList.remove("personal-select-without-error");
                    }
                }
            }
        }
    }

    handleChange(e) {
        const self = this.props;
        checkValidation(e);
        const newRegistrationForm = Object.assign(self.registrationForm, {[e.target.name]: e.target.value});
        self.dispatch(changeRegistrationForm(newRegistrationForm))
    }

    addExperience() {
        const existingExperience = this.props.registrationForm.experience;
        existingExperience.push({
            name: "",
            position: "",
            start: "",
            startD: "",
            startY: "",
            end: "",
            endD: "",
            endY: "",
            current: false
        });
        this.props.dispatch(changeExperience(existingExperience))
    }

    removeExperience(i) {
        const registrationForm = this.props.registrationForm;
        const experience = registrationForm.experience;
        experience.splice(i, 1);
        const newRegistrationForm = Object.assign(registrationForm, {experience});
        this.props.dispatch(changeRegistrationForm(newRegistrationForm));
    }

    changeProject(e, i) {
        let projects = this.props.projects;
        projects[i][e.target.name] = e.target.value;
        const currentProject = document.querySelectorAll("#project" + i);
        console.log(currentProject, "current project..")
        if (projects[i]["name"] === "" && projects[i]["description"] === "" && projects[i]["skills"] === "") {
            for (let index = 0; index < currentProject.length; index++) {
                currentProject[index].required = false;
                currentProject[index].parentElement.classList.remove("has-error")

            }
        } else {
            for (let index = 0; index < currentProject.length; index++) {
                currentProject[index].required = true;
                console.log(currentProject[index].required, "required ??");
                if (currentProject[index].name === "description") {
                    const pattern = /^([a-zA-Z.!-”$%&’()*\+,\/;\[\\\]\^_`{|}~]+\s)*[a-zA-Z.!-”$%&’()*\+,\/;\[\\\]\^_`{|}~]+$/;
                    if (pattern.test(currentProject[index].value)) {
                        currentProject[index].parentElement.classList.remove("has-error");
                    } else {
                        currentProject[index].parentElement.classList.add("has-error");
                    }
                } else {
                    if (currentProject[index].checkValidity()) {
                        currentProject[index].parentElement.classList.remove("has-error");
                    } else {
                        currentProject[index].parentElement.classList.add("has-error");
                    }

                }
            }

        }
        this.props.dispatch(changeRegistrationForm(Object.assign(this.props.registrationForm, {projects})))
    }


    render() {
        return (
            <div className="experience-form">
                <section id="experience">
                    <div className="wrapper">
                        <div className="section_header">
                            <h3 className="big-heading">Experience</h3>
                        </div>
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="form-group">
                                    <h4 className="subtitle">Please tell us you are:</h4>
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="form-group">
                                    <div className="radio-btn-div">
                                        <label htmlFor="fresher" style={{cursor: "pointer"}}>
                                            <Input type="radio"
                                                   id="fresher"
                                                   name="youAre"
                                                   checked={this.props.registrationForm.youAre === "Fresher" ? true : false}
                                                   value="Fresher"
                                                   required={false}
                                                   onChange={this.handleChange.bind(this)}
                                                   className="radio-btn"/> Fresher</label>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="form-group">
                                    <div className="radio-btn-div">
                                        <label htmlFor="exp" style={{cursor: "pointer"}}>
                                            <Input type="radio"
                                                   id="exp"
                                                   name="youAre"
                                                   checked={this.props.registrationForm.youAre === "Experienced" ? true : false}
                                                   value="Experienced"
                                                   required={false}
                                                   onChange={this.handleChange.bind(this)}
                                                   className="radio-btn"/> Experienced</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            {
                                this.props.registrationForm.youAre === "Experienced" &&
                                (
                                    <div className="col-12 col-sm-12 col-md-12 mar-xs-30">
                                        <h4 className="page-heading-desc">Please specify your complete full-time
                                            and
                                            part-time employment history, including self-employment. You may
                                            include
                                            any verified work performed on a volunteer basis</h4>
                                        <div className="section_content">
                                            {
                                                this.props.experience.map((d, index) => (
                                                    <div className={index === 0 ? "" : "row-wrapper"}>
                                                        <div key={index} className="row">
                                                            <div className="col-sm-6">
                                                                <div className="form-group">
                                                                    <label>Company<span
                                                                        className="req">*</span></label>
                                                                    <Input type="text"
                                                                           minLength={3}
                                                                           maxLength={50}
                                                                           pattern={"([a-zA-Z.!-”$%&’()*\\+,\\/;\\[\\\\\\]\\^_`{|}~]+\\s)*[a-zA-Z.!-”$%&’()*\\+,\\/;\\[\\\\\\]\\^_`{|}~]+$"}
                                                                           name="name" className="form-ctrl"
                                                                           placeholder="Company"
                                                                           onChange={(e) => this.onChange(e, index)}
                                                                           value={d.name}
                                                                           required={true}/>
                                                                    <p className="with-error">Please enter company name (Min 3 characters required. Only characters, numbers and special symbols are allowed).</p>
                                                                </div>
                                                            </div>
                                                            <div className="col-sm-6">
                                                                <div className="form-group">
                                                                    <label>Position<span
                                                                        className="req">*</span></label>
                                                                    <Input type="text"
                                                                           minLength={3}
                                                                           maxLength={50}
                                                                           pattern={"[a-zA-Z][a-zA-Z.\\s]{2,}$"}
                                                                           name="position" className="form-ctrl"
                                                                           placeholder="Position"
                                                                           onChange={(e) => this.onChange(e, index)}
                                                                           value={d.position} required={true}/>
                                                                    <p className="with-error">Please enter
                                                                        position
                                                                        (Min 3
                                                                        characters required).</p>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-5">
                                                                <div className="row">
                                                                    <div
                                                                        className="col-12 col-sm-6 col-md-6 mar-xs-30">
                                                                        <div
                                                                            className="form-group select-wrapper personal-select-without-error">
                                                                            <label>Start Month<span
                                                                                className="req">*</span></label>
                                                                            <Select id="select" name="startD"
                                                                                    value={d.startD}
                                                                                    required={true}
                                                                                    placeholder="Start Month"
                                                                                    onChange={(e) => this.onChange(e, index)}
                                                                                    className={"form-ctrl experience_select" + index}>
                                                                                <option disabled=""
                                                                                        value="">Start
                                                                                    Month
                                                                                </option>
                                                                                {
                                                                                    month.map((d) => (
                                                                                        <option
                                                                                            value={d}>{d}</option>
                                                                                    ))
                                                                                }
                                                                            </Select>
                                                                            <p className="with-error">Invalid
                                                                                date.</p>
                                                                        </div>
                                                                    </div>
                                                                    <div
                                                                        className="col-12 col-sm-6 col-md-6 mar-xs-30">
                                                                        <div
                                                                            className="form-group select-wrapper personal-select-without-error">
                                                                            <label>Start Year<span
                                                                                className="req">*</span></label>
                                                                            <Select id="select" name="startY"
                                                                                    required={true}
                                                                                    placeholder="Start Year"
                                                                                    onChange={(e) => this.onChange(e, index)}
                                                                                    value={d.startY}
                                                                                    className={"form-ctrl experience_select" + index}>
                                                                                <option disabled=""
                                                                                        value="">Start
                                                                                    Year
                                                                                </option>
                                                                                {
                                                                                    startEndYear.map((d) => (
                                                                                        <option
                                                                                            value={d}>{d}</option>
                                                                                    ))
                                                                                }
                                                                            </Select>
                                                                            <p className="with-error">Invalid
                                                                                date.</p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-7">
                                                                <div className="row">
                                                                    {
                                                                        !d.current &&
                                                                        <div
                                                                            className="col-12 col-sm-4 col-md-4 mar-xs-30">
                                                                            <div
                                                                                className="form-group select-wrapper personal-select-without-error">
                                                                                <label>End Month<span
                                                                                    className="req">*</span></label>
                                                                                <Select id="select" name="endD"
                                                                                        value={d.endD}
                                                                                        required={true}
                                                                                        placeholder="End Month"
                                                                                        onChange={(e) => this.onChange(e, index)}
                                                                                        className={"form-ctrl experience_select" + index}>
                                                                                    <option disabled=""
                                                                                            value="">End
                                                                                        Month
                                                                                    </option>
                                                                                    {
                                                                                        month.map((d) => (
                                                                                            <option
                                                                                                value={d}>{d}</option>
                                                                                        ))
                                                                                    }
                                                                                </Select>
                                                                                <p className="with-error">Invalid
                                                                                    date.</p>
                                                                            </div>
                                                                        </div>

                                                                    }
                                                                    {
                                                                        !d.current &&
                                                                        <div
                                                                            className="col-12 col-sm-4 col-md-4 mar-xs-30">
                                                                            <div
                                                                                className="form-group select-wrapper personal-select-without-error">
                                                                                <label>End Year<span
                                                                                    className="req">*</span></label>
                                                                                <Select id="select" name="endY"
                                                                                        required={true}
                                                                                        placeholder="End Year"
                                                                                        onChange={(e) => this.onChange(e, index)}
                                                                                        value={d.endY}
                                                                                        className={"form-ctrl experience_select" + index}>
                                                                                    <option disabled=""
                                                                                            value="">End
                                                                                        Year
                                                                                    </option>
                                                                                    {
                                                                                        d.startY === "" ?
                                                                                            startEndYear.map((d, i) => (
                                                                                                <option value={d}>{d}</option>
                                                                                            ))
                                                                                            :
                                                                                            startEndYear.filter((data)=> data >= d.startY).map((d, i) => (
                                                                                                <option value={d}>{d}</option>
                                                                                            ))
                                                                                    }
                                                                                </Select>
                                                                                <p className="with-error">Invalid
                                                                                    date.</p>
                                                                            </div>
                                                                        </div>

                                                                    }
                                                                    <div className="col-sm-2">
                                                                        <div className="form-group">
                                                                            <label></label>
                                                                            <label
                                                                                className="cstm-checkbox"> Current
                                                                                <Input disabled={false}
                                                                                       type="checkbox"
                                                                                       checked={JSON.parse(d.current)}
                                                                                       name="current"
                                                                                       required={false}
                                                                                       onChange={(e) => this.onChange(e, index)}
                                                                                       value={d.current}/>
                                                                                <span
                                                                                    className="checkmark"></span>
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {
                                                            (index !== 0) && (
                                                                <div className="cross-btn">
                                                                        <span
                                                                            onClick={() => this.removeExperience(index)}><i
                                                                            className="material-icons">clear</i></span>
                                                                </div>)
                                                        }
                                                    </div>
                                                ))
                                            }
                                            <div className="row">
                                                <div className="col-sm-12">
                                                    <div className="form-group">
                                                        <a style={{cursor: "pointer"}}
                                                           onClick={this.addExperience.bind(this)}
                                                           className="add-btn"><span>+</span> ADD EXPERIENCE</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                            <div className="col-12 col-sm-12 col-md-12 mar-xs-30">
                                <h4 className="subtitle">ADD YOUR PROJECTS</h4>
                                <div className="section_content">
                                    <div id="loginForm">
                                        <div className="row">
                                            {
                                                this.props.projects.map((d, i) => (
                                                    <div className="col-12 col-sm-12 col-md-12 ">
                                                        <h4 className="subtitle">Project {i + 1}</h4>
                                                        <div className="row">
                                                            <div className="col-12 col-sm-12 col-md-6">
                                                                <div className="form-group">
                                                                    <label>Project Name</label>
                                                                    <input
                                                                        type="text"
                                                                        id={"project" + i}
                                                                        name="name"
                                                                        minLength={3}
                                                                        maxLength={50}
                                                                        pattern={"([a-zA-Z.!-”$%&’()*\\+,\\/;\\[\\\\\\]\\^_`{|}~]+\\s)*[a-zA-Z.!-”$%&’()*\\+,\\/;\\[\\\\\\]\\^_`{|}~]+$"}
                                                                        className="form-ctrl"
                                                                        placeholder="Project Name"
                                                                        value={d.name}
                                                                        onChange={(e) => this.changeProject(e, i)}
                                                                        required={false}/>
                                                                    <p className="with-error">Please enter project name
                                                                        (Min 3 characters required. Only characters,
                                                                        numbers and special symbols are allowed).</p>
                                                                </div>
                                                            </div>
                                                            <div className="col-12 col-sm-12 col-md-6 ">
                                                                <label>Skills Applied</label>
                                                                <div className="form-group">
                                                                    <input
                                                                        type="text"
                                                                        id={"project" + i}
                                                                        name="skills"
                                                                        maxLength={50}
                                                                        pattern={"([a-zA-Z.!-”$%&’()*\\+,\\/;\\[\\\\\\]\\^_`{|}~]+\\s)*[a-zA-Z.!-”$%&’()*\\+,\\/;\\[\\\\\\]\\^_`{|}~]+$"}
                                                                        className="form-ctrl"
                                                                        placeholder="Skills Applied"
                                                                        value={d.skills}
                                                                        onChange={(e) => this.changeProject(e, i)}
                                                                        required={false}/>
                                                                    <p className="with-error"><p
                                                                        className="with-error">Please enter skills
                                                                        applied (Min 3 characters required. Only
                                                                        characters, numbers and special symbols are
                                                                        allowed).</p></p>
                                                                </div>
                                                            </div>
                                                            <div className="col-12 col-sm-12 col-md-12 ">
                                                                <div className="form-group">
                                                                    <label>Description</label>
                                                                    <textarea
                                                                        rows="2"
                                                                        id={"project" + i}
                                                                        cols="3"
                                                                        minLength={3}
                                                                        pattern={"([a-zA-Z.!-”$%&’()*\\+,\\/;\\[\\\\\\]\\^_`{|}~]+\\s)*[a-zA-Z.!-”$%&’()*\\+,\\/;\\[\\\\\\]\\^_`{|}~]+$"}
                                                                        name="description"
                                                                        className="form-ctrl"
                                                                        placeholder="Description"
                                                                        value={d.description}
                                                                        onChange={(e) => this.changeProject(e, i)}
                                                                        required={false}
                                                                    >
                                                                        </textarea>
                                                                    <p className="with-error"><p
                                                                        className="with-error">Please enter description (Min 3 characters required. Only
                                                                        characters, numbers and special symbols are
                                                                        allowed).</p></p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))
                                            }
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
    const {experience, projects} = registrationForm;
    return {experience, registrationForm, goToRegistration, projects}
}

export default withRouter(connect(mapStateToProps)(ExpereienceSection))
