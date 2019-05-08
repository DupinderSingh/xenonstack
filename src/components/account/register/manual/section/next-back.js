/*eslint-disable*/
import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import PreviousNextSection from './previous-next';
import {changeRegistrationForm, updateSkipEducation, updateSkipExperience} from "../../../../../actions/account/registration-action";

class NextBackSection extends Component {
    doLater() {
        const self = this.props;
        switch (self.location.pathname) {
            // case "/apply-manual/personal-information":
            //     const personalInformation = [{
            //         f_name: "",
            //         l_name: "",
            //         email: "",
            //         contact: "+91",
            //         countries: [],
            //         states: [],
            //         cities: [],
            //         country: "",
            //         state: "",
            //         city: "",
            //         updateCountry: "", updateState: "",
            //         postal: "",
            //     }];
            //     const newPersonalInformationRegistrationForm = Object.assign(self.registrationForm, {personalInformation: personalInformation});
            //     self.dispatch(changeRegistrationForm(newPersonalInformationRegistrationForm));
            //     return self.history.push("/apply-manual/education");

            case "/apply-manual/education":
                const education = [{
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
                    dateError: false,
                    current: true
                }];
                const newEducationRegistrationForm = Object.assign(self.registrationForm, {education: education});
                self.dispatch(updateSkipEducation(true));
                self.dispatch(changeRegistrationForm(newEducationRegistrationForm));
                return self.history.push("/apply-manual/experience");

            case "/apply-manual/experience":
                const experience = [{
                    name: "",
                    position: "",
                    start: "",
                    startD: "",
                    startY: "",
                    end: "",
                    endD: "",
                    endY: "",
                    current: false
                }];
                const projects = [
                    {
                        name: "",
                        description: "",
                        skills: ""
                    },
                    {
                        name: "",
                        description: "",
                        skills: ""
                    }
                ];
                const youAre = "Fresher", totalExperience = "";
                self.dispatch(updateSkipExperience(true));
                const newExperienceRegistrationForm = Object.assign(self.registrationForm, {experience: experience}, {projects}, {totalExperience}, {youAre: youAre});
                self.dispatch(changeRegistrationForm(newExperienceRegistrationForm));
                return self.history.push("/apply-manual/information");

            // case "/apply-manual/information":
            //     const appliedAs = "Internship", notify = false, resume = "",
            //         selectedJob = {}, jobs = [], jobError = "", requestedAreaOfInterest = [], selectedInterest = [],
            //         interests = [],
            //         githubLink = "", linkedInLink = "", otherLink = "";
            //     const newInformationRegistrationForm = Object.assign(self.registrationForm, {appliedAs: appliedAs},
            //         {notify: notify},
            //         {resume: resume},
            //         {selectedJob}, {jobs}, {jobError},
            //         {requestedAreaOfInterest}, {selectedInterest}, {interests},
            //         {githubLink: githubLink}, {linkedInLink: linkedInLink}, {otherLink: otherLink});
            //     self.dispatch(changeRegistrationForm(newInformationRegistrationForm));
            //     return self.history.push("/apply-manual/create-password");
            default:
                return 0
        }
    }
    render() {
        return (
            <section className="progress-bottom-btn">
                <div className="">
                    <div className="row">
                        <div className="col-12 col-sm-5 col-md-6">{
                            (this.props.location.pathname === "/apply-manual/education" || this.props.location.pathname === "/apply-manual/experience") &&
                            <a onClick={this.doLater.bind(this)} tabIndex={0} className="btn mar-t-2">Do it later ></a>
                        }</div>
                        <PreviousNextSection/>
                    </div>
                </div>
            </section>
        )
    }
}

function mapStateToProps(state) {
    const {registrationForm} = state.RegisterReducer;
    return {registrationForm}
}

export default withRouter(connect(mapStateToProps)(NextBackSection))
