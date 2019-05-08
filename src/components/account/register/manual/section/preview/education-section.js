import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

class ExpereienceSection extends Component {
    render() {
        return (
            <div className="row">
                <div className="col-12 col-sm-12 col-md-12">
                    <div className="user-profile-flex">
                        <h3 className="">Education</h3>
                    </div>
                    {
                        this.props.registrationForm.education[0]["school"] !== "" &&
                        <div className="profile-wrap">
                            {
                                this.props.registrationForm.education.map((d, i) => (
                                    <div>
                                        <div className="row">
                                            <div className="col-12 col-sm-12 col-md-6 form-group mobile-profile">
                                                <div className="row">
                                                    <div className="col-12 col-sm-6 col-md-6"><label>College/University :</label>
                                                    </div>
                                                    <span
                                                        className="col-12 col-sm-6 col-md-6">{d.school}</span>
                                                </div>
                                            </div>
                                            <div className="col-12 col-sm-12 col-md-6 form-group mobile-profile">
                                                <div className="row">
                                                    <div className="col-12 col-sm-6 col-md-6"><label>Highest
                                                        Qualification :</label></div>
                                                    <span
                                                        className="col-12 col-sm-6 col-md-6">{d.highest_education}</span>
                                                </div>
                                            </div>
                                            <div className="col-12 col-sm-12 col-md-6 form-group mobile-profile">
                                                <div className="row">
                                                    <div className="col-12 col-sm-6 col-md-6"><label>Duration
                                                        :</label></div>
                                                    <span
                                                        className="col-12 col-sm-6 col-md-6">{d.startD}-{d.startY} to {d.endD}-{d.endY}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    }
                </div>
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
