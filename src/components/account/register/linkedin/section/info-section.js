import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import Select from 'react-select';
import Animated from 'react-select/lib/animated';
import Input from '../../../../app/input/input';
import {changeRegistrationForm, clearApiErrorMessage} from "../../../../../actions/account/registration-action";
import UploadIcon from "../../../../app/upload_icon/upload-icon";
import {areaOfInterest, colourStyles} from "../../../../app/area_of_interest/area-of-interest";
import {checkValidation} from "../../../../../actions/app/app";

var isGithubUrl = require('is-github-url');
let self = null;

class InformationSection extends Component {
    componentWillMount() {
        window.scrollTo(0, 0);
    }

    constructor(props) {
        super(props);
        this.state = {
            selectedInterest: this.props.registrationForm.selectedInterest,
        }
    }

    componentWillReceiveProps(nextProps) {
        self = nextProps;
    }

    // removeResume() {
    //     const newRegistrationForm = Object.assign(self.registrationForm, {resume: ""});
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
        console.log(selectedOption, "selected option.....")
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
            console.log(selectedOption, "should be blank...");
            this.setState({selectedInterest: []});

            const newRegistrationForm = Object.assign(self.registrationForm,
                {selectedInterest: []});
            self.dispatch(changeRegistrationForm(newRegistrationForm));
        }
    };

    // jobChange = (selectedOption) => {
    //     console.log(self, "self");
    //     let selected = [];
    //     selected.push(selectedOption);
    //     let jobs = [];
    //     this.setState({jobError: ""});
    //     for (let i in selected) {
    //         jobs.push(selected[i].value)
    //     }
    //     const newRegistrationForm = Object.assign(self.registrationForm, {jobs: jobs}, {selectedJob: selectedOption});
    //     self.dispatch(changeRegistrationForm(newRegistrationForm));
    //
    //     let newInterests = [];
    //     for (let i = 0; i < areaOfInterest.length; i++) {
    //         if (selectedOption.value === areaOfInterest[i].category) {
    //             newInterests.push(areaOfInterest[i]);
    //         }
    //     }
    //
    //     this.props.dispatch(changeRegistrationForm(Object.assign(this.props.registrationForm,
    //         {requestedAreaOfInterest: newInterests},
    //         {requestedAreaOfInterestOne: newInterests},
    //         {requestedAreaOfInterestTwo: newInterests},
    //         {requestedAreaOfInterestThree: newInterests},
    //         {interestOne: []},
    //         {interestTwo: []},
    //         {interestThree: []},
    //         {selectedInterestOne: []},
    //         {selectedInterestTwo: []},
    //         {selectedInterestThree: []},
    //         {selectedInterest: []},
    //         {interests: []})))
    // };

    // interestChangeOne = (selectedOption) => {
    //     if (selectedOption.length > 0) {   // adding new or replacing existing area of interest
    //         let selected = [];
    //         selected.push(selectedOption[selectedOption.length - 1]);
    //         let interestOne = [];
    //         interestOne.push(selectedOption[selectedOption.length - 1].value);
    //         console.log(interestOne, "interestOne")
    //         const requestedAreaOfInterestTwo = self.registrationForm.requestedAreaOfInterestTwo;
    //         console.log(self.registrationForm.requestedAreaOfInterestTwo, "two three")
    //         let updatedRequestedAreaOfInterestTwo = [];
    //         for (let i in requestedAreaOfInterestTwo) {
    //             if (selectedOption[selectedOption.length - 1].value !== requestedAreaOfInterestTwo[i]["value"]) {
    //                 updatedRequestedAreaOfInterestTwo.push({
    //                     value: requestedAreaOfInterestTwo[i]["value"],
    //                     label: requestedAreaOfInterestTwo[i]["label"]
    //                 });
    //             }
    //         }
    //
    //
    //         const requestedAreaOfInterestThree = self.registrationForm.requestedAreaOfInterestThree;
    //         let updatedRequestedAreaOfInterestThree = [];
    //         for (let i in requestedAreaOfInterestThree) {
    //             if (selectedOption[selectedOption.length - 1].value !== requestedAreaOfInterestThree[i]["value"]) {
    //                 updatedRequestedAreaOfInterestThree.push({
    //                     value: requestedAreaOfInterestThree[i]["value"],
    //                     label: requestedAreaOfInterestThree[i]["label"]
    //                 });
    //             }
    //         }
    //         console.log(selectedOption, "selectedOption")
    //         if (selectedOption.length === 2) { // adding the one that is un - selected to both cases...
    //             updatedRequestedAreaOfInterestTwo.push({
    //                 value: selectedOption[0]["value"],
    //                 label: selectedOption[0]["label"]
    //             });
    //             updatedRequestedAreaOfInterestThree.push({
    //                 value: selectedOption[0]["value"],
    //                 label: selectedOption[0]["label"]
    //             })
    //         }
    //
    //         const newRegistrationForm = Object.assign(self.registrationForm,
    //             {interestOne},
    //             {selectedInterestOne: selected},
    //             {requestedAreaOfInterestTwo: updatedRequestedAreaOfInterestTwo},
    //             {requestedAreaOfInterestThree: updatedRequestedAreaOfInterestThree});
    //         self.dispatch(changeRegistrationForm(newRegistrationForm));
    //     } else { // when removing the area of iterest..
    //         // if length  === 0
    //
    //         let requestedAreaOfInterestTwo = self.registrationForm.requestedAreaOfInterestTwo;
    //         let requestedAreaOfInterestThree = self.registrationForm.requestedAreaOfInterestThree;
    //         requestedAreaOfInterestTwo.push({
    //             value: self.registrationForm.selectedInterestOne[0]["value"],
    //             label: self.registrationForm.selectedInterestOne[0]["label"]
    //         });
    //         requestedAreaOfInterestThree.push({
    //             value: self.registrationForm.selectedInterestOne[0]["value"],
    //             label: self.registrationForm.selectedInterestOne[0]["label"]
    //         });
    //
    //
    //         const newRegistrationForm = Object.assign(self.registrationForm,
    //             {interestOne: []},
    //             {selectedInterestOne: []},
    //             {requestedAreaOfInterestTwo},
    //             {requestedAreaOfInterestThree});
    //         self.dispatch(changeRegistrationForm(newRegistrationForm));
    //     }
    // };
    //
    // interestChangeTwo = (selectedOption) => {
    //     if (selectedOption.length > 0) {   // adding new or replacing existing area of interest
    //
    //         let selected = [];
    //         selected.push(selectedOption[selectedOption.length - 1]);
    //
    //         let interestTwo = [];
    //         interestTwo.push(selectedOption[selectedOption.length - 1].value);
    //
    //
    //         const requestedAreaOfInterestOne = self.registrationForm.requestedAreaOfInterestOne;
    //         let updatedRequestedAreaOfInterestOne = [];
    //         for (let i in requestedAreaOfInterestOne) {
    //             if (selectedOption[selectedOption.length - 1].value !== requestedAreaOfInterestOne[i]["value"]) {
    //                 updatedRequestedAreaOfInterestOne.push({
    //                     value: requestedAreaOfInterestOne[i]["value"],
    //                     label: requestedAreaOfInterestOne[i]["label"]
    //                 });
    //             }
    //         }
    //
    //
    //         const requestedAreaOfInterestThree = self.registrationForm.requestedAreaOfInterestThree;
    //         let updatedRequestedAreaOfInterestThree = [];
    //         for (let i in requestedAreaOfInterestThree) {
    //             if (selectedOption[selectedOption.length - 1].value !== requestedAreaOfInterestThree[i]["value"]) {
    //                 updatedRequestedAreaOfInterestThree.push({
    //                     value: requestedAreaOfInterestThree[i]["value"],
    //                     label: requestedAreaOfInterestThree[i]["label"]
    //                 });
    //             }
    //         }
    //
    //         if (selectedOption.length === 2) { // adding the one that is un - selected to both cases...
    //             updatedRequestedAreaOfInterestOne.push({
    //                 value: selectedOption[0]["value"],
    //                 label: selectedOption[0]["label"]
    //             });
    //             updatedRequestedAreaOfInterestThree.push({
    //                 value: selectedOption[0]["value"],
    //                 label: selectedOption[0]["label"]
    //             })
    //         }
    //
    //         const newRegistrationForm = Object.assign(self.registrationForm,
    //             {interestTwo},
    //             {selectedInterestTwo: selected},
    //             {requestedAreaOfInterestOne: updatedRequestedAreaOfInterestOne},
    //             {requestedAreaOfInterestThree: updatedRequestedAreaOfInterestThree});
    //         self.dispatch(changeRegistrationForm(newRegistrationForm));
    //     } else { // when removing the area of iterest..
    //         // if length  === 0
    //
    //         let requestedAreaOfInterestOne = self.registrationForm.requestedAreaOfInterestOne;
    //         let requestedAreaOfInterestThree = self.registrationForm.requestedAreaOfInterestThree;
    //         requestedAreaOfInterestOne.push({
    //             value: self.registrationForm.selectedInterestTwo[0]["value"],
    //             label: self.registrationForm.selectedInterestTwo[0]["label"]
    //         });
    //         requestedAreaOfInterestThree.push({
    //             value: self.registrationForm.selectedInterestTwo[0]["value"],
    //             label: self.registrationForm.selectedInterestTwo[0]["label"]
    //         });
    //
    //
    //         const newRegistrationForm = Object.assign(self.registrationForm,
    //             {interestTwo: []},
    //             {selectedInterestTwo: []},
    //             {requestedAreaOfInterestOne},
    //             {requestedAreaOfInterestThree});
    //         self.dispatch(changeRegistrationForm(newRegistrationForm));
    //     }
    // };
    // interestChangeThree = (selectedOption) => {
    //     if (selectedOption.length > 0) {   // adding new or replacing existing area of interest
    //         let selected = [];
    //         selected.push(selectedOption[selectedOption.length - 1]);
    //
    //         let interestThree = [];
    //         interestThree.push(selectedOption[selectedOption.length - 1].value);
    //
    //
    //         const requestedAreaOfInterestOne = self.registrationForm.requestedAreaOfInterestOne;
    //         let updatedRequestedAreaOfInterestOne = [];
    //         for (let i in requestedAreaOfInterestOne) {
    //             if (selectedOption[selectedOption.length - 1].value !== requestedAreaOfInterestOne[i]["value"]) {
    //                 updatedRequestedAreaOfInterestOne.push({
    //                     value: requestedAreaOfInterestOne[i]["value"],
    //                     label: requestedAreaOfInterestOne[i]["label"]
    //                 });
    //             }
    //         }
    //
    //
    //         const requestedAreaOfInterestTwo = self.registrationForm.requestedAreaOfInterestTwo;
    //         let updatedRequestedAreaOfInterestTwo = [];
    //         for (let i in requestedAreaOfInterestTwo) {
    //             if (selectedOption[selectedOption.length - 1].value !== requestedAreaOfInterestTwo[i]["value"]) {
    //                 updatedRequestedAreaOfInterestTwo.push({
    //                     value: requestedAreaOfInterestTwo[i]["value"],
    //                     label: requestedAreaOfInterestTwo[i]["label"]
    //                 });
    //             }
    //         }
    //
    //         if (selectedOption.length === 2) { // adding the one that is un - selected to both cases...
    //             updatedRequestedAreaOfInterestOne.push({
    //                 value: selectedOption[0]["value"],
    //                 label: selectedOption[0]["label"]
    //             });
    //             updatedRequestedAreaOfInterestTwo.push({
    //                 value: selectedOption[0]["value"],
    //                 label: selectedOption[0]["label"]
    //             })
    //         }
    //
    //         const newRegistrationForm = Object.assign(self.registrationForm,
    //             {interestThree},
    //             {selectedInterestThree: selected},
    //             {requestedAreaOfInterestOne: updatedRequestedAreaOfInterestOne},
    //             {requestedAreaOfInterestTwo: updatedRequestedAreaOfInterestTwo});
    //         self.dispatch(changeRegistrationForm(newRegistrationForm));
    //     } else { // when removing the area of iterest..
    //         // if length  === 0
    //
    //         let requestedAreaOfInterestOne = self.registrationForm.requestedAreaOfInterestOne;
    //         let requestedAreaOfInterestTwo = self.registrationForm.requestedAreaOfInterestTwo;
    //
    //
    //         console.log(requestedAreaOfInterestOne, requestedAreaOfInterestTwo, "before")
    //         requestedAreaOfInterestTwo.push({
    //             value: self.registrationForm.selectedInterestThree[0]["value"],
    //             label: self.registrationForm.selectedInterestThree[0]["label"]
    //         });
    //         requestedAreaOfInterestOne.push({
    //             value: self.registrationForm.selectedInterestThree[0]["value"],
    //             label: self.registrationForm.selectedInterestThree[0]["label"]
    //         });
    //
    //         console.log(requestedAreaOfInterestOne, requestedAreaOfInterestTwo, "after")
    //         const newRegistrationForm = Object.assign(self.registrationForm,
    //             {interestThree: []},
    //             {selectedInterestThree: []},
    //             {requestedAreaOfInterestOne},
    //             {requestedAreaOfInterestTwo});
    //         self.dispatch(changeRegistrationForm(newRegistrationForm));
    //     }
    // };

    render() {
        self = this.props;
        console.log(self, "sel")
        return (
            <section id="information" className="info-form">
                <div className="wrapper">
                    <div className="section_header">
                        <h3 className="big-heading">Basic Information </h3>
                    </div>
                    <div className="row">
                        <div className="col-12 col-sm-12 col-md-12 mar-xs-30">
                            <div className="section_content">
                                {/*<div className="row">*/}
                                {/*<div className="col-sm-12">*/}
                                {/*<div className="form-group">*/}
                                {/*<label>Are you looking for an internship or are new/recent graduate*/}
                                {/*role?<span className="req">*</span></label>*/}
                                {/*</div>*/}
                                {/*</div>*/}
                                {/*<div className="col-sm-6">*/}
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
                                {/*<div className="col-sm-6">*/}
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
                                <div className="row">
                                    <div className="col-12 col-sm-12 col-md-12 mar-xs-30">
                                        <div className="section_content">
                                            <div className="row">
                                                {/*<div className="col-sm-6">*/}
                                                {/*<div className="form-group">*/}
                                                {/*<div style={{*/}
                                                {/*zindex: "2"*/}
                                                {/*}}>*/}
                                                {/*<label>You want to apply job for :</label>*/}
                                                {/*<Select*/}
                                                {/*closeMenuOnSelect={true}*/}
                                                {/*value={this.props.registrationForm.selectedJob}*/}
                                                {/*components={Animated()}*/}
                                                {/*onChange={this.jobChange.bind(this)}*/}
                                                {/*placeholder="You are applying job for.."*/}
                                                {/*options={jobOptions}*/}
                                                {/*/>*/}
                                                {/*/!*<p style={{*!/*/}
                                                {/*/!*display: "block",*!/*/}
                                                {/*/!*color: "#d50000",*!/*/}
                                                {/*/!*fontSize: "13px",*!/*/}
                                                {/*/!*padding: "5px 0 0 0"*!/*/}
                                                {/*/!*}}>{this.state.jobError}</p>*!/*/}

                                                {/*</div>*/}
                                                {/*</div>*/}
                                                {/*</div>*/}
                                                <div className="col-sm-6">
                                                    <div className="form-group">
                                                        <div>
                                                            <label>Area of Interest <span><small> (You can add upto three area of interest) </small></span></label>
                                                            <Select
                                                                closeMenuOnSelect={false}
                                                                value={this.props.registrationForm.selectedInterest}
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
                                                {/*<div className="col-sm-6">*/}
                                                {/*<div className="form-group">*/}
                                                {/*<div>*/}
                                                {/*<Select*/}
                                                {/*closeMenuOnSelect={false}*/}
                                                {/*value={this.props.registrationForm.selectedInterestTwo}*/}
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
                                                {/*<div className="col-sm-6">*/}
                                                {/*<div className="form-group">*/}
                                                {/*<div>*/}
                                                {/*<Select*/}
                                                {/*closeMenuOnSelect={false}*/}
                                                {/*value={this.props.registrationForm.selectedInterestThree}*/}
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
                                </div>

                                <div className="row">
                                    <div className="col-12 col-sm-12 col-md-12 mar-xs-30">
                                        <h4 className="subtitle">ADD YOUR SOCIAL LINKS <span><small> (Github account add advantage to your profile) </small></span>
                                        </h4>
                                        <div className="section_content">
                                            <div className="row">
                                                <div className="col-sm-12">
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
                                                <div className="col-sm-12">
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
                                                <div className="col-sm-12">
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
                                    <div className="col-sm-12">
                                        {/*<div className="form-group">*/}
                                        {/*    <div className="checkbox">*/}
                                        {/*        <label> <Input type="checkbox"*/}
                                        {/*                       name="notify"*/}
                                        {/*                       required={false}*/}
                                        {/*                       onChange={this.onChange.bind(this)}*/}
                                        {/*                       checked={this.props.registrationForm.notify === undefined ? false : this.props.registrationForm.notify}*/}
                                        {/*                       value={this.props.registrationForm.notify === undefined ? false : this.props.registrationForm.notify}*/}
                                        {/*        /> Signup*/}
                                        {/*            for job*/}
                                        {/*            notification &amp; be*/}
                                        {/*            the first to know about new opportunities.</label>*/}
                                        {/*    </div>arch*/}
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
                </div>
            </section>
        )
    }
}

function mapStateToProps(state) {
    const {registrationForm, status, message, goToRegistration} = state.RegisterReducer;
    const {updateJob, updateInterest} = registrationForm;
    console.log(registrationForm, "registrationForm")
    return {registrationForm, status, message, updateJob, updateInterest, goToRegistration}
}

export default withRouter(connect(mapStateToProps)(InformationSection))
