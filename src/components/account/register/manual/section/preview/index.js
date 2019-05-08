import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {checkSignupStatus, signup} from "../../../../../../actions/account/registration-action";
import PersonalInfoSection from "./personal-info-section";
import EducationSection from "./education-section";
import ExperienceSection from "./experience-section";
import BasicInformation from './info-section';
import BarLoaderSpinner from "../../../../../../components/app/spinner/barloader";


class PreviewSection extends Component {
    componentWillMount() {
        window.scrollTo(0, 0);
        document.title = "Registration | Preview | Xenonstack Hiring Portal";
        checkSignupStatus(this.props.goToRegistration, window.location.href);
    }

    submitFinalReview(e) {
        e.preventDefault();
        const self = this.props;
        let fileInput = "", file = "";
        fileInput = self.state.RegisterReducer.registrationForm.resume;
        file = fileInput.files[0];
        let education = self.state.RegisterReducer.registrationForm.education;
        if (education[0]["highest_education"] === "") {
            education = [];
        } else {
            for (let i in education) {
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
        }
        let experience = self.state.RegisterReducer.registrationForm.experience;
        if (experience.length === 0) {
            experience = []
        } else {
            if (experience[0]["name"] === "") {
                experience = [];
            } else {
                for (let i in experience) {
                    // noinspection JSUnfilteredForInLoop
                    experience[i]["start"] = experience[i]["startD"] + "-" + experience[i]["startY"];
                    experience[i]["end"] = experience[i]["endD"] + "-" + experience[i]["endY"]
                }
            }
        }
        ;
        const registerData = {
            email: self.state.RegisterReducer.registrationForm.email,
            password: self.state.RegisterReducer.registrationForm.password,
            contact: self.state.RegisterReducer.registrationForm.contact,
            fname: self.state.RegisterReducer.registrationForm.f_name,
            lname: self.state.RegisterReducer.registrationForm.l_name,
            name: self.state.RegisterReducer.registrationForm.f_name + " " + self.state.RegisterReducer.registrationForm.l_name,
            country: self.state.RegisterReducer.registrationForm.country,
            state: self.state.RegisterReducer.registrationForm.state,
            city: self.state.RegisterReducer.registrationForm.city,
            postal: self.state.RegisterReducer.registrationForm.postal,
            appliedAs: self.state.RegisterReducer.registrationForm.appliedAs,
            interests: self.state.RegisterReducer.registrationForm.selectedInterest.map((d) => d.value),
            experience,
            education,
            whoYouAre: self.state.RegisterReducer.registrationForm.youAre,
            projects: self.state.RegisterReducer.registrationForm.projects,
            linkedin: self.state.RegisterReducer.registrationForm.linkedInLink,
            github: self.state.RegisterReducer.registrationForm.githubLink,
            otherLink: self.state.RegisterReducer.registrationForm.otherLink,
            notify: self.state.RegisterReducer.registrationForm.notify
        };
        self.dispatch(signup(file, registerData));
    }


    render() {
        window.onbeforeunload = function () {
            return "Do you really want to leave our brilliant application?";
        };
        return (
            <div className="wrapper">
                <div className="row">
                    <div className="col-12 col-sm-12 col-md-12">
                        <form onSubmit={this.submitFinalReview.bind(this)}>
                            <PersonalInfoSection/>
                            {
                                !this.props.state.RegisterReducer.skipEducation &&
                                <EducationSection/>
                            }
                            {
                                !this.props.state.RegisterReducer.skipExperience &&
                                <ExperienceSection/>
                            }
                            <BasicInformation/>
                            {
                                this.props.state.RegisterReducer.error &&
                                <div className="wrapper">
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
                                <div className="wrapper">
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
                                <div className="wrapper">
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
                                <div className="wrapper">
                                    <div className="form-group">
                                        <div className="bPad24px">
                                <span className="errorText">
                                    Error while updating the profile
                                </span>
                                        </div>
                                    </div>
                                </div>
                            }

                            <section className="progress-bottom-btn">
                                <div className="row">
                                    <div className="col-12 offset-sm-5 col-sm-7 offset-md-6 col-md-6">
                                        <div className=" btn-group right ">
                                            <button type="button"  onClick={() => this.props.history.push("/apply-manual/review")} className="btn signin mar-t-2">Edit </button>
                                            <button type="submit"
                                                    disabled={this.props.state.RegisterReducer.pageLoading ? true : false}
                                                    className="btn signin mar-t-2">Submit</button>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </form>
                    </div>
                </div>
                <BarLoaderSpinner pageLoading={this.props.state.RegisterReducer.pageLoading}/>
            </div>

        )
    }
}

function mapStateToProps(state) {
    const {registrationForm, goToRegistration, skipEducation, skipExperience} = state.RegisterReducer;
    return {registrationForm, goToRegistration, skipEducation, skipExperience, state}
}

export default withRouter(connect(mapStateToProps)(PreviewSection))
