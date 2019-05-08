import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

class Experience extends Component {
    render() {
        return (
            <div className="col-12 col-sm-12 col-md-12">
                <div className="user-profile-flex">
                    <h3 className="">Experience </h3><span className=""
                                                           onClick={() => this.props.history.push("/profile/experience/edit")}><i
                    className="material-icons">edit</i></span>
                </div>
                <div className="profile-wrap">
                    <div className="row">
                        <div className="col-12 col-sm-12 col-md-12 form-group ">
                            <div className="row">
                                <div className="col-12 col-sm-6 col-md-4  "><label>Experience :</label></div>
                                <span
                                    className="col-12 col-sm-6 col-md-8  ">{this.props.registrationForm.youAre === "Fresher" ? "0 yrs experience" : this.props.registrationForm.totalExperience}</span>
                            </div>
                        </div>
                        <div className="col-12 col-sm-12 col-md-12">
                            <div className="divider"></div>
                        </div>
                    </div>
                    {
                        this.props.registrationForm.youAre === "Experienced" &&
                        (
                            this.props.registrationForm.experience.map((d, i) => (
                                <div className="row">
                                    <div className="col-12 col-sm-12 col-md-12 form-group ">
                                        <div className="row">
                                            <div className="col-12 col-sm-6 col-md-4  "><label>Company
                                                :</label>
                                            </div>
                                            <span className="col-12 col-sm-6 col-md-8  ">{d.name}</span>
                                        </div>
                                    </div>
                                    <div className="col-12 col-sm-12 col-md-12 form-group ">
                                        <div className="row">
                                            <div className="col-12 col-sm-6 col-md-4   "><label>Designation
                                                :</label></div>
                                            <span className="col-12 col-sm-6 col-md-8  ">{d.position}</span>
                                        </div>
                                    </div>
                                    <div className="col-12 col-sm-12 col-md-12 form-group">
                                        <div className="row">
                                            <div className="col-12 col-sm-6 col-md-4  "><label>Duration
                                                :</label>
                                            </div>
                                            <span
                                                className="col-12 col-sm-6 col-md-8  ">{d.current ? d.start : d.start + "to" + d.end}</span>
                                        </div>
                                    </div>
                                    <div className="col-12 col-sm-12 col-md-12">
                                        <div className="divider"></div>
                                    </div>
                                </div>
                            ))
                        )
                    }
                    {
                        this.props.registrationForm.projects.map((d, i) => (
                            !!d.name &&
                            <div className="row">
                                <div
                                    className="col-12 col-sm-6 col-md-12 form-group">Project {i + 1}</div>

                                <div className="col-12 col-sm-12 col-md-12 form-group ">
                                    <div className="row">
                                        <div className="col-12 col-sm-6 col-md-4  "><label>Project Name
                                            :</label></div>
                                        <span className="col-12 col-sm-6 col-md-8  ">{d.name}</span>
                                    </div>
                                </div>
                                <div className="col-12 col-sm-12 col-md-12 form-group ">
                                    <div className="row">
                                        <div className="col-12 col-sm-6 col-md-4 "><label>Description
                                            :</label></div>
                                        <span
                                            className="col-12 col-sm-6 col-md-8  ">{d.description}</span>
                                    </div>
                                </div>
                                <div className="col-12 col-sm-12 col-md-12 form-group ">
                                    <div className="row">
                                        <div className="col-12 col-sm-6 col-md-4  "><label>Skills Applied
                                            :</label></div>
                                        <span className="col-12 col-sm-6 col-md-8  ">{d.skills}</span>
                                    </div>
                                </div>
                                <div className="col-12 col-sm-12 col-md-12">
                                    <div className="divider"></div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const {registrationForm, pageLoading} = state.RegisterReducer;
    return {registrationForm, pageLoading}
}

export default withRouter(connect(mapStateToProps)(Experience))