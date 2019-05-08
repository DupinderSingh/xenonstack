import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

let interests = "";

class BasicInformation extends Component {
    componentWillReceiveProps(nextProps) {
        if (this.props.registrationForm.selectedInterest !== nextProps.registrationForm.selectedInterest) {
            interests = "";
            const selectedInterest = nextProps.registrationForm.selectedInterest;
            for (let i in selectedInterest) {
                interests = interests + selectedInterest[i]["value"] + " , ";
            }
            interests = interests.slice(0, interests.length - 2)
        }
    }

    render() {
        return (
            <div className="col-12 col-sm-12 col-md-12">
                <div className="user-profile-flex">
                    <h3 className="">Basic Information </h3><span className=""
                                                                  onClick={() => this.props.history.push("/profile/information/edit")}><i
                    className="material-icons">edit</i></span>
                </div>
                <div className="profile-wrap">
                    <div className="row">
                        {/*<div className="col-12 col-sm-12 col-md-12">*/}
                        {/*<div className="row">*/}
                        {/*<div className="col-12 col-sm-6 col-md-4 form-group "><label>Job type :</label></div>*/}
                        {/*<span*/}
                        {/*className="col-12 col-sm-6 col-md-8 form-group ">{this.props.registrationForm.jobs[0]}</span>*/}
                        {/*<span*/}
                        {/*className="col-12 col-sm-6 col-md-8 form-group ">currently not available</span>*/}
                        {/*</div>*/}
                        {/*</div>*/}

                        <div className="col-12 col-sm-12 col-md-12 form-group mobile-profile">
                            <div className="row">
                                <div className="col-12 col-sm-6 col-md-4  "><label>Area of Interest :</label>
                                </div>
                                <span
                                    className="col-12 col-sm-6 col-md-8  ">{interests}</span>
                            </div>
                        </div>

                        <div className="col-12 col-sm-12 col-md-12 form-group mobile-profile">
                            <div className="row">
                                <div className="col-12 col-sm-6 col-md-4  "><label>Job Notification :</label>
                                </div>
                                <span
                                    className="col-12 col-sm-6 col-md-8  ">{this.props.registrationForm.notify ? "On" : "Off"}</span>
                            </div>
                        </div>

                        <div className="col-12 col-sm-12 col-md-12 form-group mobile-profile">
                            <div className="row">
                                <div className="col-12 col-sm-6 col-md-4  "><label>Resume :</label></div>
                                <span
                                    className="col-12 col-sm-6 col-md-8  ">{!!this.props.registrationForm.resume ? "Resume Uploaded" : ""}</span>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 col-sm-12 col-md-12 form-group mobile-profile">
                            <div className="row">
                                <div className="col-12 col-sm-6 col-md-4 "><label>LinkedIn URL :</label></div>
                                <div
                                    className="col-12 col-sm-6 col-md-8 "><span>
                                 {
                                     !!this.props.registrationForm.linkedInLink ?
                                         <a href={this.props.registrationForm.linkedInLink}
                                            target="_blank">{this.props.registrationForm.linkedInLink}</a> : ""
                                 }
                            </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 col-sm-12 col-md-12 form-group mobile-profile">
                            <div className="row">
                                <div className="col-12 col-sm-6 col-md-4 "><label>Github URL :</label></div>
                                <div
                                    className="col-12 col-sm-6 col-md-8 "><span>
                                {
                                    !!this.props.registrationForm.githubLink ?
                                        <a href={this.props.registrationForm.githubLink}
                                           target="_blank">{this.props.registrationForm.githubLink}</a> : ""
                                }
                                </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 col-sm-12 col-md-12 form-group">
                            <div className="row">
                                <div className="col-12 col-sm-6 col-md-4 "><label>Other URL :</label></div>
                                <div
                                    className="col-12 col-sm-6 col-md-8 "><span> {
                                    !!this.props.registrationForm.otherLink ?
                                        <a href={this.props.registrationForm.otherLink}
                                           target="_blank">{this.props.registrationForm.otherLink}</a> : ""}</span>
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
    const {registrationForm} = state.RegisterReducer;
    return {registrationForm}
}

export default withRouter(connect(mapStateToProps)(BasicInformation))