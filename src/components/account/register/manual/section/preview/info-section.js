import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

let interests = "";

class InformationSection extends Component {
    componentWillMount() {
        interests = "";
        const selectedInterest = this.props.registrationForm.selectedInterest;
        for (let i in selectedInterest) {
            interests = interests + selectedInterest[i]["value"] + " , ";
        }
        interests = interests.slice(0, interests.length - 2)
    }

    render() {
        return (
            <div className="row">
                <div className="col-12 col-sm-12 col-md-12">
                    <div className="user-profile-flex">
                        <h3 className="">Basic Information </h3>
                    </div>
                    <div className="profile-wrap">
                        <div className="row">
                            {/*<div className="col-12 col-sm-12 col-md-6">*/}
                            {/*<div className="row">*/}
                            {/*<div className="col-12 col-sm-6 col-md-6 form-group "><label>Job type :</label>*/}
                            {/*</div>*/}
                            {/*<span*/}
                            {/*className="col-12 col-sm-6 col-md-6 form-group ">{this.props.registrationForm.appliedAs}</span>*/}
                            {/*</div>*/}
                            {/*</div>*/}
                            <div className="col-12 col-sm-12 col-md-6 form-group mobile-profile">
                                <div className="row">
                                    <div className="col-12 col-sm-6 col-md-6 "><label>Area of Interest
                                        :</label>
                                    </div>
                                    <span
                                        className="col-12 col-sm-6 col-md-6 ">{interests}
                                    </span>
                                </div>
                            </div>
                            <div className="col-12 col-sm-12 col-md-6 form-group mobile-profile">
                                <div className="row">
                                    <div className="col-12 col-sm-6 col-md-6 "><label>Job Notification
                                        :</label></div>
                                    <span
                                        className="col-12 col-sm-6 col-md-6 ">{this.props.registrationForm.notify ? "On" : "Off"}</span>
                                </div>
                            </div>
                            <div className="col-12 col-sm-12 col-md-6 form-group mobile-profile">
                                <div className="row">
                                    <div className="col-12 col-sm-6 col-md-6"><label>Resume :</label></div>
                                    <span
                                        className="col-12 col-sm-6 col-md-6">{this.props.registrationForm.resume !== "" ? "resume Uploaded" : ""}</span>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 col-sm-12 col-md-12 form-group mobile-profile">
                                <div className="row">
                                    <div className="col-12 col-sm-6 col-md-3"><label>LinkedIn URL :</label>
                                    </div>
                                    <div className="col-12 col-sm-6 col-md-9">
                                        <span> {
                                            !!this.props.registrationForm.linkedInLink ?
                                                <a href={this.props.registrationForm.linkedInLink}
                                                   target="_blank">{this.props.registrationForm.linkedInLink}</a> : ""
                                        }</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 col-sm-12 col-md-12 form-group mobile-profile">
                                <div className="row">
                                    <div className="col-12 col-sm-6 col-md-3"><label>Github URL :</label>
                                    </div>
                                    <div className="col-12 col-sm-6 col-md-9">
                                        <span>{
                                            !!this.props.registrationForm.githubLink ?
                                                <a href={this.props.registrationForm.githubLink}
                                                   target="_blank">{this.props.registrationForm.githubLink}</a> : ""
                                        }</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 col-sm-12 col-md-12 form-group">
                                <div className="row">
                                    <div className="col-12 col-sm-6 col-md-3"><label>Other URL :</label>
                                    </div>
                                    <div className="col-12 col-sm-6 col-md-9">
                                        <span> {
                                            !!this.props.registrationForm.otherLink ?
                                                <a href={this.props.registrationForm.otherLink}
                                                   target="_blank">{this.props.registrationForm.otherLink}</a> : ""}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const {registrationForm, status, message, goToRegistration} = state.RegisterReducer;
    const {selectedInterest} = registrationForm;
    return {
        registrationForm,
        status,
        message,
        goToRegistration,
        selectedInterest
    }
}

export default withRouter(connect(mapStateToProps)(InformationSection))
