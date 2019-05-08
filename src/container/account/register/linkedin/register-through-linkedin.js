/*eslint-disable*/
import React, {Component} from 'react';
import {connect} from 'react-redux';
import PersonalInfoSection from '../../.././../components/account/register/linkedin/section/personal-info-section';
import EducationSection from '../../.././../components/account/register/linkedin/section/education-section';
import ExperienceSection from '../../.././../components/account/register/linkedin/section/experience-section';
import InfoSection from '../../.././../components/account/register/linkedin/section/info-section';
import NextBackSection from '../../../../components/account/register/manual/section/next-back';
import {checkSignupStatus, clearApiErrorMessage, signup} from "../../../../actions/account/registration-action";
import BarLoaderSpinner from "../../../../components/app/spinner/barloader";
import {withRouter} from "react-router-dom";
import {
    getProfile,
    setUpdateResumeGoToProfileTrue,
    updateProfile,
    updateResume
} from "../../../../actions/dashboard/profile";

var isGithubUrl = require('is-github-url');

let phone = null;

class RegisterThroughLinked extends Component {
    componentWillMount() {
        if (this.props.location.pathname !== "/profile/personal-information/edit" &&
            this.props.location.pathname !== "/profile/education/edit" &&
            this.props.location.pathname !== "/profile/experience/edit" &&
            this.props.location.pathname !== "/profile/information/edit" &&
            this.props.location.pathname !== "/apply-manual/review") {
            this.props.history.push("/profile");
        }
        this.props.dispatch(clearApiErrorMessage());
        document.title = this.props.state.LoginReducer.auth.isAuthenticated ? "Profile | Edit | Xenonstack Hiring Portal" : "Registration | Review Final | Xenonstack Hiring Portal";
        if (!this.props.state.LoginReducer.auth.isAuthenticated) {
            checkSignupStatus(this.props.state.RegisterReducer.goToRegistration, window.location.href)
        } else {
            // fetching user profile from server........
            this.props.dispatch(getProfile());
        }
    }

    componentDidMount() {
        phone = document.querySelector('input[type=tel]');
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

    componentWillReceiveProps(nextProps) {
        if (nextProps.state.RegisterReducer.updateProfileGoToProfile === true && nextProps.state.RegisterReducer.updateResumeGoToProfile === true) {
            nextProps.history.push("/profile")
        }
    }

    submitFinalReview(e) {
        e.preventDefault();
        const self = this.props;
        const thi = this;
        let educationDateError = false;
        const education = self.state.RegisterReducer.registrationForm.education;
        for (let i in education) {
            if (education[i]["startY"] !== "" && education[i]["endY"] !== "" && education[i]["startD"] !== "" && education[i]["endD"] !== "") {
                if ((Number(education[i]["startY"]) <= Number(education[i]["endY"]))) {
                    if (Number(education[i]["startY"]) === Number(education[i]["endY"])) {
                        let startMonth, endMonth;
                        startMonth = thi.checkMonthCount(education[i]["startD"]);
                        endMonth = thi.checkMonthCount(education[i]["endD"]);
                        if (Number(startMonth) <= Number(endMonth)) {
                            console.log(Number(startMonth) <= Number(endMonth), "date error false")
                            // dateError = false
                        } else {
                            console.log(Number(startMonth) <= Number(endMonth), "date error ")
                            educationDateError = true
                        }
                    } else {
                        // dateError = false
                    }
                } else {
                    educationDateError = true
                }
            } else {
                educationDateError = true
            }
        }
        if (phone === null) {
            phone = {
                value: {
                    length: 5
                }
            };
        }
        let phoneValidation = false;
        if (phone.value.length >= 5) {
            phoneValidation = true
        }
        let resume = true;

        if (self.state.RegisterReducer.registrationForm.resume === "") {
            resume = false
        } else {
            if (self.state.RegisterReducer.registrationForm.resume.type === "file") {
                if (self.state.RegisterReducer.registrationForm.resume === "") {
                    // e.target.parentElement.classList.add("has-error");
                    resume = false
                } else {
                    console.log(self.state.RegisterReducer.registrationForm.resume.files[0]["name"], "file..");
                    switch ((self.state.RegisterReducer.registrationForm.resume.files[0]["name"].match(/\.([^\.]+)$/i)[1]).toLowerCase()) {
                        case 'pdf':
                            // e.target.parentElement.classList.remove("has-error");
                            resume = true;
                            break;
                        case 'doc':
                            // e.target.parentElement.classList.remove("has-error");
                            resume = true;
                            break;
                        case 'docx':
                            // e.target.parentElement.classList.remove("has-error");
                            resume = true;
                            break;
                        default:
                            // e.target.parentElement.classList.add("has-error");
                            resume = false;
                            break;
                    }
                }

            } else {
                resume = true
            }
        }


        const projects = self.state.RegisterReducer.registrationForm.projects;
        console.log(projects, "projects")
        const pattern = /^([a-zA-Z.!-”$%&’()*\+,\/;\[\\\]\^_`{|}~]+\s)*[a-zA-Z.!-”$%&’()*\+,\/;\[\\\]\^_`{|}~]+$/;
        for (let i in projects) {
            let currentProject = document.querySelectorAll("#project" + i);
            // console.log(currentProject)
            if (projects[i]["name"] === "" && projects[i]["description"] === "" && projects[i]["skills"] === "") {
                for (let index = 0; index < currentProject.length; index++) {
                    currentProject[index].required = false;
                    currentProject[index].parentElement.classList.remove("has-error")
                }
            } else {
                console.log(currentProject.length);
                for (let index = 0; index < currentProject.length; index++) {
                    currentProject[index].required = true;
                    console.log(currentProject[index].required, "required ??");
                    if (currentProject[index].name === "description") {
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
        }
        let projectDescValidError = false;
        if (self.location.pathname === "/apply-manual/review" || self.location.pathname === "/profile/experience/edit") {
            if (!self.state.RegisterReducer.skipExperience) {
                if (document.querySelectorAll("#project0")[2].required === true ||
                    document.querySelectorAll("#project1")[2].required === true) {
                    if (document.querySelectorAll("#project0")[2].required === true) {
                        if (!pattern.test(self.state.RegisterReducer.registrationForm.projects[0]["description"])) {
                            projectDescValidError = true;
                        }
                    }
                    if (document.querySelectorAll("#project1")[2].required === true) {
                        if (!pattern.test(self.state.RegisterReducer.registrationForm.projects[1]["description"])) {
                            projectDescValidError = true;
                        }
                    }
                }
            }
        }


        let experienceDateError = false;
        if (self.state.RegisterReducer.registrationForm.youAre === "Experienced") {
            const experience = self.state.RegisterReducer.registrationForm.experience;
            for (let i in experience) {
                if (!experience[i]["current"]) {
                    if (experience[i]["startY"] !== "" && experience["endY"] !== "" && experience["startD"] !== "" && experience["endD"] !== "") {
                        if ((Number(experience[i]["startY"]) <= Number(experience[i]["endY"]))) {
                            if (Number(experience[i]["startY"]) === Number(experience[i]["endY"])) {
                                let startMonth, endMonth;
                                startMonth = thi.checkMonthCount(experience[i]["startD"]);
                                endMonth = thi.checkMonthCount(experience[i]["endD"]);
                                if (Number(startMonth) <= Number(endMonth)) {
                                    // dateError = false
                                } else {
                                    experienceDateError = true
                                }
                            } else {
                                // dateError = false
                            }
                        } else {
                            experienceDateError = true
                        }
                    } else {
                        experienceDateError = true
                    }
                }
            }
        }

        let isValidGithubLink = true;
        if (self.location.pathname === "/profile/information/edit" || self.location.pathname === "/apply-manual/review") {
            if (self.state.RegisterReducer.registrationForm.githubLink !== "") {
                document.getElementsByName("githubLink")[0].required = true;
                const isValidGithub = isGithubUrl(self.state.RegisterReducer.registrationForm.githubLink, {repository: true});
                if (isValidGithub) {
                    isValidGithubLink = true;
                } else {
                    isValidGithubLink = false;
                }
            }

        }

        if (self.location.pathname.match("/edit")) {
            if (self.location.pathname === "/profile/personal-information/edit") {
                educationDateError = false;
                experienceDateError = false;
                projectDescValidError = false;
                resume = true;
            }
            if (self.location.pathname === "/profile/information/edit") {
                educationDateError = false;
                experienceDateError = false;
                projectDescValidError = false;
                phoneValidation = true;
            }
            if (self.location.pathname === "/profile/education/edit") {
                resume = true;
                experienceDateError = false;
                projectDescValidError = false;
                phoneValidation = true;
            }
            if (self.location.pathname === "/profile/experience/edit") {
                resume = true;
                educationDateError = false;
                phoneValidation = true;
            }
        }

        if (self.state.RegisterReducer.skipEducation || self.state.RegisterReducer.skipExperience) {
            if (self.state.RegisterReducer.skipEducation) {
                educationDateError = false
            }
            if (self.state.RegisterReducer.skipExperience) {
                experienceDateError = false;
                projectDescValidError = false
            }
        }
        // false true true false false false "check "

        if (e.target.checkValidity() && phoneValidation && resume && educationDateError === false && experienceDateError === false && projectDescValidError === false && isValidGithubLink) {
            const self = this.props;
            let fileInput = "", file = "";
            console.log(self.state.RegisterReducer.registrationForm.resume, "resume");
            if (self.state.RegisterReducer.registrationForm.resume.type === "file") {
                fileInput = self.state.RegisterReducer.registrationForm.resume;
                file = fileInput.files[0];
            }
            let education = self.state.RegisterReducer.registrationForm.education;
            if (education.length > 0) {
                if (education[0].school !== "") {
                    for (let i in education) {
                        console.log(typeof i, i, "i")
                        if (Number(i) === 0) {
                            education[i]["highest"] = true;
                        } else {
                            education[i]["highest"] = false;
                        }
                        education[i]["school"] = education[i]["school"];
                        education[i]["degree"] = education[i]["highest_education"];
                        education[i]["start"] = education[i]["startD"] + "-" + education[i]["startY"];
                        education[i]["end"] = education[i]["endD"] + "-" + education[i]["endY"]
                    }
                } else {
                    education = []
                }
            }

            console.log(education, "edu")
            let experience = self.state.RegisterReducer.registrationForm.experience;
            if (experience.length === 0) {
                experience = []
            } else {
                if (experience[0]["name"] === "") {
                    experience = [];
                } else {

                    for (let i in experience) {
                        experience[i]["start"] = experience[i]["startD"] + "-" + experience[i]["startY"];
                        experience[i]["end"] = experience[i]["endD"] + "-" + experience[i]["endY"]
                    }
                }
            }
            const registerData = {
                email: self.state.RegisterReducer.registrationForm.email,
                password: self.state.RegisterReducer.registrationForm.password,
                contact: self.state.RegisterReducer.registrationForm.contact,
                name: self.state.RegisterReducer.registrationForm.f_name + " " + self.state.RegisterReducer.registrationForm.l_name,
                fname: self.state.RegisterReducer.registrationForm.f_name,
                lname: self.state.RegisterReducer.registrationForm.l_name,
                country: self.state.RegisterReducer.registrationForm.country,
                state: self.state.RegisterReducer.registrationForm.state,
                city: self.state.RegisterReducer.registrationForm.city,
                postal: self.state.RegisterReducer.registrationForm.postal,
                interests: self.state.RegisterReducer.registrationForm.selectedInterest.map((d) => (d.value)),
                experience,
                education,
                whoYouAre: self.state.RegisterReducer.registrationForm.youAre,
                projects: self.state.RegisterReducer.registrationForm.projects,
                linkedin: self.state.RegisterReducer.registrationForm.linkedInLink,
                github: self.state.RegisterReducer.registrationForm.githubLink,
                otherLink: self.state.RegisterReducer.registrationForm.otherLink,
                notify: self.state.RegisterReducer.registrationForm.notify
            };
            if (!this.props.state.LoginReducer.auth.isAuthenticated) {
                self.dispatch(signup(file, registerData));
            } else {
                self.dispatch(updateProfile(registerData));
                if (self.state.RegisterReducer.registrationForm.resume.type === "file") {
                    self.dispatch(updateResume(file))
                } else {
                    self.dispatch(setUpdateResumeGoToProfileTrue())
                }
            }
        } else {
            let allInvalidElements = [];
            // personal-info invalid elements

            if (self.location.pathname === "/profile/personal-information/edit" || self.location.pathname === "/apply-manual/review") {
                if (phone.value.length < 5) {
                    phone.setCustomValidity('invalid');
                    document.getElementsByClassName("telephone-outer")[0].parentElement.classList.add("has-error");
                }
                const invalidElmsPersonalInfo = document.querySelectorAll(".personal-info-form .form-group input:invalid");
                if (invalidElmsPersonalInfo.length > 0) {
                    allInvalidElements.push(invalidElmsPersonalInfo[0]);
                }
                for (let i = 0; i < invalidElmsPersonalInfo.length; i++) {
                    invalidElmsPersonalInfo[i].parentElement.classList.add("has-error")
                }
                const invalidElmsPersonalInfoSelect = document.querySelectorAll(".personal-info-form #select");
                for (let i = 0; i < invalidElmsPersonalInfoSelect.length; i++) {
                    if (invalidElmsPersonalInfoSelect[i].value === "") {
                        invalidElmsPersonalInfoSelect[i].parentElement.classList.add("has-error");
                        invalidElmsPersonalInfoSelect[i].parentElement.classList.add("personal-select-with-error");
                        invalidElmsPersonalInfoSelect[i].parentElement.classList.remove("personal-select-without-error")
                    } else {
                        invalidElmsPersonalInfoSelect[i].parentElement.classList.remove("has-error");
                        invalidElmsPersonalInfoSelect[i].parentElement.classList.remove("personal-select-with-error");
                        invalidElmsPersonalInfoSelect[i].parentElement.classList.add("personal-select-without-error")
                    }
                }
            }


            // education invalid elemets

            if (self.location.pathname === "/profile/education/edit" || self.location.pathname === "/apply-manual/review") {
                if (!self.state.RegisterReducer.skipEducation) {
                    const invalidElmsInputEducation = document.querySelectorAll(".education-form .form-group input:invalid");
                    if (invalidElmsInputEducation.length > 0) {
                        allInvalidElements.push(invalidElmsInputEducation[0]);
                    }
                    for (let i = 0; i < invalidElmsInputEducation.length; i++) {
                        invalidElmsInputEducation[i].parentElement.classList.add("has-error")
                    }

                    const invalidSelectEducation = document.querySelectorAll(".education-form #select");
                    if (invalidSelectEducation.length > 0) {
                        allInvalidElements.push(invalidSelectEducation[0]);
                    }
                    for (let i = 0; i < invalidSelectEducation.length; i++) {
                        if (invalidSelectEducation[i].value === "") {
                            if (invalidSelectEducation[i].value === "") {
                                invalidSelectEducation[i].parentElement.classList.add("has-error");
                                invalidSelectEducation[i].parentElement.classList.add("personal-select-with-error");
                                invalidSelectEducation[i].parentElement.classList.remove("personal-select-without-error")
                            } else {
                                invalidSelectEducation[i].parentElement.classList.remove("has-error");
                                invalidSelectEducation[i].parentElement.classList.remove("personal-select-with-error");
                                invalidSelectEducation[i].parentElement.classList.add("personal-select-without-error");
                            }
                        }
                    }
                    for (let index = 0; index < education.length; index++) {
                        if (education[index]["satrtY"] !== "" && education[index]["endY"] !== "" && education[index]["startD"] !== "" && education[index]["endD"] !== "") {
                            if ((Number(education[index]["startY"]) <= Number(education[index]["endY"]))) {
                                if (Number(education[index]["startY"]) === Number(education[index]["endY"])) {
                                    let startMonth, endMonth;
                                    startMonth = thi.checkMonthCount(education[index]["startD"]);
                                    endMonth = thi.checkMonthCount(education[index]["endD"]);
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

            // experience invalid elements

            if (self.location.pathname === "/profile/experience/edit" || self.location.pathname === "/apply-manual/review") {
                if (!self.state.RegisterReducer.skipExperience) {
                    if (self.state.RegisterReducer.registrationForm.youAre === "Experienced") {
                        const invalidSelectExperience = document.querySelectorAll(".experience-form #select");
                        if (invalidSelectExperience.length > 0) {
                            allInvalidElements.push(invalidSelectExperience[0]);
                        }
                        for (let index = 0; index < experience.length; index++) {
                            if (!experience[index]["current"]) {
                                if (experience[index]["satrtY"] !== "" && experience[index]["endY"] !== "" && experience[index]["startD"] !== "" && experience[index]["endD"] !== "") {
                                    if ((Number(experience[index]["startY"]) <= Number(experience[index]["endY"]))) {
                                        if (Number(experience[index]["startY"]) === Number(experience[index]["endY"])) {
                                            let startMonth, endMonth;
                                            startMonth = thi.checkMonthCount(experience[index]["startD"]);
                                            endMonth = thi.checkMonthCount(experience[index]["endD"]);
                                            if (Number(startMonth) <= Number(endMonth)) {
                                                const validDates = document.querySelectorAll(".experience_select" + index);
                                                for (let i = 0; i < validDates.length; i++) {
                                                    validDates[i].parentElement.classList.remove("has-error");
                                                    validDates[i].parentElement.classList.add("personal-select-without-error");
                                                    validDates[i].parentElement.classList.remove("personal-select-with-error");
                                                }
                                            } else {
                                                const inValidDates = document.querySelectorAll(".experience_select" + index);
                                                for (let i = 0; i < inValidDates.length; i++) {
                                                    inValidDates[i].parentElement.classList.add("has-error");
                                                    inValidDates[i].parentElement.classList.add("personal-select-with-error");
                                                    inValidDates[i].parentElement.classList.remove("personal-select-without-error");
                                                }
                                            }
                                        } else {
                                            const validDates = document.querySelectorAll(".experience_select" + index);
                                            for (let i = 0; i < validDates.length; i++) {
                                                validDates[i].parentElement.classList.remove("has-error");
                                                validDates[i].parentElement.classList.add("personal-select-without-error");
                                                validDates[i].parentElement.classList.remove("personal-select-with-error");
                                            }
                                        }
                                    } else {
                                        const inValidDates = document.querySelectorAll(".experience_select" + index);
                                        for (let i = 0; i < inValidDates.length; i++) {
                                            inValidDates[i].parentElement.classList.add("has-error");
                                            inValidDates[i].parentElement.classList.add("personal-select-with-error");
                                            inValidDates[i].parentElement.classList.remove("personal-select-without-error");
                                        }
                                    }
                                } else {
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


                    const invalidElmsExperience = document.querySelectorAll(".experience-form .form-group input:invalid");
                    if (invalidElmsExperience.length > 0) {
                        allInvalidElements.push(invalidElmsExperience[0]);
                    }
                    for (let i = 0; i < invalidElmsExperience.length; i++)
                        invalidElmsExperience[i].parentElement.classList.add("has-error")
                }
            }


            // information invalid elements

            if (self.location.pathname === "/profile/information/edit" || self.location.pathname === "/apply-manual/review") {


                if (self.state.RegisterReducer.registrationForm.resume === "") {
                    document.getElementsByName("resume")[0].parentElement.classList.add("has-error");
                } else {
                    if (self.state.RegisterReducer.registrationForm.resume.type === "file") {
                        if (self.state.RegisterReducer.registrationForm.resume === "") {
                            // e.target.parentElement.classList.add("has-error");
                            document.getElementsByName("resume")[0].parentElement.classList.add("has-error");
                        } else {
                            console.log(self.state.RegisterReducer.registrationForm.resume.files[0]["name"], "file..");
                            switch ((self.state.RegisterReducer.registrationForm.resume.files[0]["name"].match(/\.([^\.]+)$/i)[1]).toLowerCase()) {
                                case 'pdf':
                                    // e.target.parentElement.classList.remove("has-error");
                                    document.getElementsByName("resume")[0].parentElement.classList.remove("has-error");
                                    break;
                                case 'doc':
                                    // e.target.parentElement.classList.remove("has-error");
                                    document.getElementsByName("resume")[0].parentElement.classList.remove("has-error");
                                    break;
                                case 'docx':
                                    // e.target.parentElement.classList.remove("has-error");
                                    document.getElementsByName("resume")[0].parentElement.classList.remove("has-error");
                                    break;
                                default:
                                    // e.target.parentElement.classList.add("has-error");
                                    document.getElementsByName("resume")[0].parentElement.classList.add("has-error");
                                    break;
                            }
                        }

                    } else {
                        document.getElementsByName("resume")[0].parentElement.classList.remove("has-error");
                    }
                }


                if (!isValidGithubLink) {
                    document.getElementsByName("githubLink")[0].parentElement.classList.add("has-error");
                } else {
                    document.getElementsByName("githubLink")[0].parentElement.classList.remove("has-error");
                }
                const invalidElms = document.querySelectorAll(".info-form .form-group input:invalid");
                for (let i = 0; i < invalidElms.length; i++)
                    invalidElms[i].parentElement.classList.add("has-error")

                if (!document.getElementsByName("resume")[0].checkValidity() || self.state.RegisterReducer.registrationForm.resume === "")
                    document.getElementsByName("resume")[0].parentElement.classList.add("has-error");


                // create password invalid elements

                const invalidElmsCreatePassword = document.querySelectorAll(".create-password-form .form-group input:invalid");
                if (invalidElmsCreatePassword.length > 0) {
                    allInvalidElements.push(invalidElmsCreatePassword[0]);
                }
                for (let i = 0; i < invalidElmsCreatePassword.length; i++)
                    invalidElmsCreatePassword[i].parentElement.classList.add("has-error")

                // for focusing the element

                if (allInvalidElements.length > 0) {
                    allInvalidElements[0].focus();
                }
            }
        }
    }

    render() {
        // just for temp purpose....
        // if (!this.props.state.LoginReducer.auth.isAuthenticated) {
        //     window.onbeforeunload = () => {
        //         return "Do you really want to leave....."
        //     }
        // }
        return (
            <form onSubmit={this.submitFinalReview.bind(this)} noValidate={true} className="">
                <BarLoaderSpinner pageLoading={this.props.state.RegisterReducer.pageLoading}/>
                {
                    (this.props.location.pathname === "/profile/personal-information/edit" || this.props.location.pathname === "/apply-manual/review") &&
                    <PersonalInfoSection>
                        {this.props.children}
                    </PersonalInfoSection>
                }

                {
                    ((this.props.location.pathname === "/profile/education/edit" || this.props.location.pathname === "/apply-manual/review") && !this.props.state.RegisterReducer.skipEducation) &&
                    <EducationSection>
                        {this.props.children}
                    </EducationSection>
                }

                {
                    ((this.props.location.pathname === "/profile/experience/edit" || this.props.location.pathname === "/apply-manual/review") && !this.props.state.RegisterReducer.skipEducation) &&
                    <ExperienceSection>
                        {this.props.children}
                    </ExperienceSection>
                }

                {
                    (this.props.location.pathname === "/profile/information/edit" || this.props.location.pathname === "/apply-manual/review") &&
                    <InfoSection>
                        {this.props.children}
                    </InfoSection>
                }
                {
                    this.props.state.RegisterReducer.error &&
                    <div className="wrapper review-wrapper error-wrapper">
                        <div className="form-group">
                            <div className="bPad24px">
                                <span className="errorText">
                                    {this.props.state.RegisterReducer.message}
                                </span>
                            </div>
                        </div>
                    </div>
                }
                {
                    (this.props.state.RegisterReducer.updateProfileError === false && this.props.state.RegisterReducer.updateResumeError === "") &&
                    <div className="wrapper review-wrapper error-wrapper">
                        <div className="form-group">
                            <div className="bPad24px">
                                <span className="errorText success">
                                    Profile updated successfully
                                </span>
                            </div>
                        </div>
                    </div>
                }
                {
                    (this.props.state.RegisterReducer.updateProfileError === false && this.props.state.RegisterReducer.updateResumeError === false) &&
                    <div className="wrapper review-wrapper error-wrapper">
                        <div className="form-group">
                            <div className="bPad24px">
                                <span className="errorText success">
                                    Profile updated successfully
                                </span>
                            </div>
                        </div>
                    </div>
                }
                {
                    (this.props.state.RegisterReducer.updateProfileError === true || this.props.state.RegisterReducer.updateResumeError === true) &&
                    <div className="wrapper review-wrapper error-wrapper">
                        <div className="form-group">
                            <div className="bPad24px">
                                <span className="errorText">
                                    Error while updating the profile
                                </span>
                            </div>
                        </div>
                    </div>
                }
                <div className="wrapper review-wrapper">
                    <NextBackSection>
                        {this.props.children}
                    </NextBackSection>
                </div>

                <BarLoaderSpinner pageLoading={this.props.state.RegisterReducer.pageLoading}/>
            </form>
        )
    }
}

function mapStateToProps(state) {
    return {state}
}

export default withRouter(connect(mapStateToProps)(RegisterThroughLinked))
