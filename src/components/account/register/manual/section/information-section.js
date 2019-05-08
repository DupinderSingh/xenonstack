import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import Select from 'react-select';
import Animated from 'react-select/lib/animated';
import Input from '../../../../app/input/input';
import NextBackSection from './next-back';
import {
    changeRegistrationForm,
    checkSignupStatus,
    clearApiErrorMessage
} from "../../../../../actions/account/registration-action";
import UploadIcon from "../../../../app/upload_icon/upload-icon";
import {areaOfInterest, colourStyles} from "../../../../app/area_of_interest/area-of-interest";
import {checkValidation} from "../../../../../actions/app/app";

var isGithubUrl = require('is-github-url');

let self = null;

class InformationSection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedInterest: this.props.registrationForm.selectedInterest,
        }
    }

    componentWillMount() {
        window.scrollTo(0, 0);
        document.title = "Registration | Basic Information | Xenonstack Hiring Portal";
        self = this.props;
        this.props.dispatch(clearApiErrorMessage());
        checkSignupStatus(this.props.goToRegistration, window.location.href);
        const selectedInterest = this.props.registrationForm.selectedInterest;
        this.setState({
            selectedInterest
        })
    }

    submitInformationForm(e) {
        e.preventDefault();
        const self = this.props;
        let isValidGithubLink = true;
        if (self.registrationForm.githubLink !== "") {
            document.getElementsByName("githubLink")[0].required = true;
            const isValidGithub = isGithubUrl(self.registrationForm.githubLink, {repository: true});
            if (isValidGithub) {
                isValidGithubLink = true;
            } else {
                isValidGithubLink = false;
            }
        }

        let isValidResume = true;

        if (self.registrationForm.resume === "") {
            // e.target.parentElement.classList.add("has-error");
            isValidResume = false
        } else {
            console.log(self.registrationForm.resume.files[0]["name"], "file..")
            switch ((self.registrationForm.resume.files[0]["name"].match(/\.([^\.]+)$/i)[1]).toLowerCase()) {
                case 'pdf':
                    // e.target.parentElement.classList.remove("has-error");
                    isValidResume = true;
                    break;
                case 'doc':
                    // e.target.parentElement.classList.remove("has-error");
                    isValidResume = true;
                    break;
                case 'docx':
                    // e.target.parentElement.classList.remove("has-error");
                    isValidResume = true;
                    break;
                default:
                    // e.target.parentElement.classList.add("has-error");
                    isValidResume = false;
                    break;
            }
        }


        if (e.target.checkValidity() && isValidResume && isValidGithubLink) {
            self.history.push("/apply-manual/create-password");
        } else {
            if (!isValidGithubLink) {
                document.getElementsByName("githubLink")[0].parentElement.classList.add("has-error");
            } else {
                document.getElementsByName("githubLink")[0].parentElement.classList.remove("has-error");
            }
            const invalidElms = document.querySelectorAll(".info-form .form-group input:invalid");
            for (let i = 0; i < invalidElms.length; i++)
                invalidElms[i].parentElement.classList.add("has-error")

            if (document.getElementsByName("resume")[0].checkValidity() === false || self.registrationForm.resume === "") {

                document.getElementsByName("resume")[0].parentElement.classList.add("has-error");
            }
            if (!isValidResume) {
                if (this.props.registrationForm.resume === "") {
                    document.getElementsByName("resume")[0].parentElement.classList.add("has-error");
                } else {
                    switch ((self.registrationForm.resume.files[0]["name"].match(/\.([^\.]+)$/i)[1]).toLowerCase()) {
                        case 'pdf':
                            document.getElementsByName("resume")[0].parentElement.classList.remove("has-error");
                            break;
                        case 'doc':
                            document.getElementsByName("resume")[0].parentElement.classList.remove("has-error");
                            break;
                        case 'docx':
                            document.getElementsByName("resume")[0].parentElement.classList.remove("has-error");
                            break;
                        default:
                            document.getElementsByName("resume")[0].parentElement.classList.add("has-error");
                            return 0
                    }
                }
            }
        }
    }

    // removeResume() {
    //     const newRegistrationForm = Object.assign(self.registrationForm, {resume: ""});
    //     document.getElementsByName("resume")[0].parentElement.classList.add("has-error");
    //     this.props.dispatch(changeRegistrationForm(newRegistrationForm));
    // }


    onChange(e) {
        const self = this.props;
        self.dispatch(clearApiErrorMessage());
        checkValidation(e);
        const existingRegisterationForm = this.props.registrationForm;
        if (e.target.name === "githubLink") {
            if (e.target.value === "") {
                e.target.required = false;
                e.target.parentElement.classList.remove("has-error")
            } else {
                e.target.required = true;
                const isValidGithub = isGithubUrl(e.target.value, {repository: true});
                if (isValidGithub) {
                    e.target.parentElement.classList.remove("has-error")
                } else {
                    e.target.parentElement.classList.add("has-error")
                }
            }
        }
        if (e.target.name === "otherLink") {
            if (e.target.value === "") {
                e.target.required = false;
                e.target.parentElement.classList.remove("has-error")
            } else {
                e.target.required = true;
                if (e.target.checkValidity()) {
                    e.target.parentElement.classList.remove("has-error")
                } else {
                    e.target.parentElement.classList.add("has-error")
                }
            }
        }
        if (e.target.name === "resume") {
            console.log(e.target.value, "csv value..........");
            if (e.target.value === "") {
                e.target.parentElement.classList.add("has-error");
                const newRegistrationForm = Object.assign(self.registrationForm, {resume: ''});
                self.dispatch(changeRegistrationForm(newRegistrationForm));
            } else {
                switch ((e.target.value.match(/\.([^\.]+)$/i)[1]).toLowerCase()) {
                    case 'pdf':
                        e.target.parentElement.classList.remove("has-error");
                        self.dispatch(changeRegistrationForm(Object.assign(self.registrationForm, {resume: document.getElementById('uploadResume_1')})));
                        break;
                    case 'doc':
                        e.target.parentElement.classList.remove("has-error");
                        self.dispatch(changeRegistrationForm(Object.assign(self.registrationForm, {resume: document.getElementById('uploadResume_1')})));
                        break;
                    case 'docx':
                        e.target.parentElement.classList.remove("has-error");
                        self.dispatch(changeRegistrationForm(Object.assign(self.registrationForm, {resume: document.getElementById('uploadResume_1')})));
                        break;
                    default:
                        e.target.parentElement.classList.add("has-error");
                        self.dispatch(changeRegistrationForm(Object.assign(self.registrationForm, {resume: ""})));
                        return 0
                }
            }
        } else {
            existingRegisterationForm[e.target.name] = e.target.type === "checkbox" ? !JSON.parse(e.target.value) : e.target.value;
            self.dispatch(changeRegistrationForm(existingRegisterationForm))
        }

    }


    interestChange = (selectedOption) => {
        if (selectedOption.length > 0) {
            if (selectedOption.length <= 3) {
                this.setState({
                    selectedInterest: selectedOption
                });
                const newRegistrationForm = Object.assign(self.registrationForm,
                    {selectedInterest: selectedOption});
                self.dispatch(changeRegistrationForm(newRegistrationForm));
            }
        } else { // when removing the area of iterest..
            // if length  === 0
            this.setState({selectedInterest: []});

            const newRegistrationForm = Object.assign(self.registrationForm,
                {selectedInterest: []});
            self.dispatch(changeRegistrationForm(newRegistrationForm));
        }
    };

    render() {
        window.onbeforeunload = function () {
            return "Do you really want to leave our brilliant application?";
        };
        const {selectedInterest} = this.state;
        return (
            <form onSubmit={this.submitInformationForm.bind(this)} className="info-form"
                  noValidate={true}>
                <section id="information">
                    <div className="wrapper">
                        <div className="section_header">
                            <h3 className="big-heading">Basic Information </h3>
                        </div>
                        <div className="row">
                            <div className="col-12 col-sm-12 col-md-12">
                                <div className="section_content">
                                    {/*<div className="row">*/}
                                    {/*<div className="col-12 col-sm-12 col-md-12">*/}
                                    {/*<label className="subtitle">Are you looking for an internship or are  new/recent graduate role? </label>*/}
                                    {/*</div>*/}
                                    {/*<div className="col-12 col-sm-6 col-md-6">*/}
                                    {/*<div className="form-group">*/}
                                    {/*<div className="radio-btn-div">*/}
                                    {/*<label htmlFor="intership">*/}
                                    {/*<Input type="radio"*/}
                                    {/*id="intership"*/}
                                    {/*name="appliedAs"*/}
                                    {/*checked={this.props.registrationForm.appliedAs === "Internship" ? true : false}*/}
                                    {/*value="Internship"*/}
                                    {/*onChange={this.onChange.bind(this)}*/}
                                    {/*className="radio-btn"/> Yes</label>*/}
                                    {/*</div>*/}
                                    {/*</div>*/}
                                    {/*</div>*/}
                                    {/*<div className="col-12 col-sm-6 col-md-6">*/}
                                    {/*<div className="form-group">*/}
                                    {/*<div className="radio-btn-div">*/}
                                    {/*<label htmlFor="nonInternship">*/}
                                    {/*<Input type="radio"*/}
                                    {/*id="nonInternship"*/}
                                    {/*name="appliedAs"*/}
                                    {/*checked={this.props.registrationForm.appliedAs === "Job" ? true : false}*/}
                                    {/*value="Job"*/}
                                    {/*onChange={this.onChange.bind(this)}*/}
                                    {/*className="radio-btn"/> No</label>*/}
                                    {/*</div>*/}
                                    {/*</div>*/}
                                    {/*</div>*/}
                                    {/*</div>*/}
                                    {/*<div className="row">*/}
                                    {/*<div className="col-12 col-sm-12 col-md-6">*/}
                                    {/*<div className="form-group">*/}
                                    {/*<div style={{zindex: "2"}}>*/}
                                    {/*<label className="subtitle">You want to apply job for <span*/}
                                    {/*className=""></span></label>*/}
                                    {/*<Select*/}
                                    {/*closeMenuOnSelect={true}*/}
                                    {/*value={selectedJob}*/}
                                    {/*components={Animated()}*/}
                                    {/*onChange={this.jobChange.bind(this)}*/}
                                    {/*placeholder="You want to apply job for"*/}
                                    {/*options={jobOptions}*/}
                                    {/*/>*/}
                                    {/*<p style={{*/}
                                    {/*display: "block",*/}
                                    {/*color: "#d50000",*/}
                                    {/*fontSize: "13px",*/}
                                    {/*padding: "5px 0 0 0"*/}
                                    {/*}}>{this.state.jobError}</p>*/}
                                    {/*</div>*/}
                                    {/*</div>*/}
                                    {/*</div>*/}
                                    {/*</div>*/}
                                    <div className="row">
                                        <div className="col-12 col-sm-12 col-md-12">
                                            <div className="row">
                                                <div className="col-12 col-sm-12 col-md-12">
                                                    <label className="subtitle">Area of Interest <span><small> (You can select upto 3 area of interest) </small></span></label>
                                                </div>
                                                <div className="col-12 col-sm-12 col-md-6">
                                                    <div className="form-group">
                                                        <div>
                                                            <Select
                                                                closeMenuOnSelect={false}
                                                                value={selectedInterest}
                                                                components={Animated()}
                                                                onChange={this.interestChange.bind(this)}
                                                                placeholder="Area of Interest"
                                                                isSearchable={true}
                                                                styles={colourStyles}
                                                                isMulti={true}
                                                                options={areaOfInterest}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                {/*<div className="col-12 col-sm-12 col-md-6">*/}
                                                {/*<div className="form-group">*/}
                                                {/*<div>*/}
                                                {/*<Select*/}
                                                {/*closeMenuOnSelect={false}*/}
                                                {/*value={selectedInterestTwo}*/}
                                                {/*components={Animated()}*/}
                                                {/*onChange={this.interestChangeTwo.bind(this)}*/}
                                                {/*placeholder="Select second area of interest"*/}
                                                {/*isSearchable={false}*/}
                                                {/*styles={colourStyles}*/}
                                                {/*isMulti={true}*/}
                                                {/*options={this.props.registrationForm.requestedAreaOfInterestTwo.map((d) => ({*/}
                                                {/*label: d.label,*/}
                                                {/*value: d.value*/}
                                                {/*}))}*/}
                                                {/*/>*/}
                                                {/*</div>*/}
                                                {/*</div>*/}
                                                {/*</div>*/}
                                                {/*<div className="col-12 col-sm-12 col-md-6">*/}
                                                {/*<div className="form-group">*/}
                                                {/*<div>*/}
                                                {/*<Select*/}
                                                {/*closeMenuOnSelect={false}*/}
                                                {/*value={selectedInterestThree}*/}
                                                {/*components={Animated()}*/}
                                                {/*onChange={this.interestChangeThree.bind(this)}*/}
                                                {/*placeholder="Select third area of interest"*/}
                                                {/*isSearchable={false}*/}
                                                {/*styles={colourStyles}*/}
                                                {/*isMulti={true}*/}
                                                {/*options={this.props.registrationForm.requestedAreaOfInterestThree.map((d) => ({*/}
                                                {/*label: d.label,*/}
                                                {/*value: d.value*/}
                                                {/*}))}*/}
                                                {/*/>*/}
                                                {/*</div>*/}
                                                {/*</div>*/}
                                                {/*</div>*/}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-12 col-sm-12 col-md-12">
                                            <label className="subtitle ">ADD YOUR SOCIAL LINKS <span><small>(Github account add advantage to your profile) </small></span>
                                            </label>
                                            <div className="section_content">
                                                <div className="row">
                                                    <div className="col-12 col-sm-12 col-md-12">
                                                        <div className="form-group">
                                                            <label>Linkedin URL<span className="req">*</span></label>
                                                            <Input type="text" name="linkedInLink"
                                                                   autoComplete="off"
                                                                   className="form-ctrl"
                                                                   placeholder="Linkedin URL"
                                                                   pattern={"^(https?)?:?(\\/\\/)?(([w]{3}||\\w\\w)\\.)?linkedin.com(\\w+:{0,1}\\w*@)?(\\S+)(:([0-9])+)?(\\/|\\/([\\w#!:.?+=&%@!\\-\\/]))$"}
                                                                   value={this.props.registrationForm.linkedInLink}
                                                                   onChange={this.onChange.bind(this)}
                                                                   required={true}/>
                                                            <p className="with-error">Please enter valid linkedin url.</p>
                                                        </div>
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-12">
                                                        <div className="form-group">
                                                            <label>Github URL</label>
                                                            <Input type="text" name="githubLink"
                                                                   className="form-ctrl"
                                                                   placeholder="Github URL"
                                                                   value={this.props.registrationForm.githubLink}
                                                                   onChange={this.onChange.bind(this)}
                                                                   required={false}/>
                                                            <p className="with-error">Please enter valid github url.</p>
                                                        </div>
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-12">
                                                        <div className="form-group">
                                                            <label>Other URL</label>
                                                            <Input type="url" name="otherLink"
                                                                   className="form-ctrl"
                                                                   placeholder="Other URL"
                                                                   value={this.props.registrationForm.otherLink}
                                                                   onChange={this.onChange.bind(this)}
                                                                   required={false}/>
                                                            <p className="with-error">Please enter valid url.</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-12 col-sm-12 col-md-12 form-group ">
                                            <label>UPLOAD YOUR RESUME OR DOCUMENT<span className="req">*</span></label>
                                            <div className="section_content">
                                                <div className="row">
                                                    <div className="col-sm-6">
                                                        <div className="form-group">
                                                            <Input type="file"
                                                                   title=""
                                                                   id="uploadResume_1"
                                                                   name="resume"
                                                                   pattern={"([^\\s])"}
                                                                   accept=".doc, .docx, .pdf"
                                                                   required={this.props.registrationForm.resume === "" ? true : false}
                                                                   onChange={this.onChange.bind(this)}
                                                                   placeholder="Resume"
                                                                   className="form-ctrl select-fileupload"/>
                                                            <p className="with-error">Please upload valid file. Supported files are doc, docx, pdf.</p>
                                                            <UploadIcon/>
                                                            {
                                                                !!this.props.registrationForm.resume &&
                                                                <div
                                                                    className="image-preview">Resume Uploaded
                                                                    {/*<span*/}
                                                                    {/*onClick={this.removeResume.bind(this)}></span>*/}
                                                                </div>
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 col-sm-12 col-md-12">
                                            {/*<div className="form-group">*/}
                                            {/*    <div className="checkbox">*/}
                                            {/*        <label className="subtitle">*/}
                                            {/*            <Input type="checkbox"  name="notify"     onChange={this.onChange.bind(this)}*/}
                                            {/*             checked={this.props.registrationForm.notify} value={this.props.registrationForm.notify}*/}
                                            {/*        /> Signup for job notification &amp; be the first to know about new opportunities.</label>*/}
                                            {/*    </div>*/}
                                            {/*</div>*/}
                                            <div className="form-group">
                                                <label
                                                    className="cstm-checkbox"> Signup for job notification &amp; be the
                                                    first to know about new opportunities.
                                                    <Input disabled={false}
                                                           className="exp-input"
                                                           type="checkbox"
                                                           checked={this.props.registrationForm.notify}
                                                           name="notify"
                                                           required={false}
                                                           onChange={this.onChange.bind(this)}
                                                           value={this.props.registrationForm.notify}
                                                    />
                                                    <span
                                                        className="checkmark"></span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <NextBackSection>
                            {this.props.children}
                        </NextBackSection>
                    </div>
                </section>
            </form>

        )
    }
}

function mapStateToProps(state) {
    const {registrationForm, status, message, goToRegistration} = state.RegisterReducer;
    return {registrationForm, status, message, goToRegistration}
}

export default withRouter(connect(mapStateToProps)(InformationSection))
