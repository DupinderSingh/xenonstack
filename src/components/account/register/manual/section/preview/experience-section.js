import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

let experience = 0;

class ExpereienceSection extends Component {
    componentWillMount() {
        const exp = this.props.experience;
        for (let i in exp) {
            if (!exp[i]["current"]) {
                let diff = Number(exp[i]["endY"]) - Number(exp[i]["startY"]);
                experience = experience + diff;
            }
        }
    }

    render() {
        return (
            <div className="row">
                <div className="col-12 col-sm-12 col-md-12">
                    <div className="user-profile-flex">
                        <h3 className="">Experience </h3>
                    </div>
                    <div className="profile-wrap">
                        <div className="row">
                            <div className="col-12 col-sm-12 col-md-6 form-group mobile-profile">
                                <div className="row">
                                <div className="col-12 col-sm-6 col-md-6"><label>Experience :</label></div>
                                <span
                                    className="col-12 col-sm-6 col-md-6 ">{this.props.registrationForm.youAre === "Fresher" ? "Fresher" : "Experienced"}</span>
                            </div>
                            </div>
                        </div>
                        {
                            this.props.registrationForm.youAre === "Experienced" &&
                            (
                                this.props.experience.map((d, i) => (
                                    <div className="row">
                                        <div className="col-12 col-sm-12 col-md-6 form-group">
                                            <div className="row">
                                            <div className="col-12 col-sm-6 col-md-6"><label>Company
                                                :</label></div>
                                            <span className="col-12 col-sm-6 col-md-6">{d.name}</span>
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-12 col-md-6 form-group">
                                            <div className="row">
                                            <div className="col-12 col-sm-6 col-md-6"><label>Designation
                                                :</label></div>
                                            <span className="col-12 col-sm-6 col-md-6">{d.position}</span>
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-12 col-md-6 form-group mobile-profile">
                                            <div className="row">
                                            <div className="col-12 col-sm-6 col-md-6"><label>Duration
                                                :</label></div>
                                            <span
                                                className="col-12 col-sm-6 col-md-6">{d.current ? (d.startD + "-" + d.startY) : (d.startD + "-" + d.startY + " to " + d.endD + "-" + d.endY)}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )

                        }
                        {

                            (
                                this.props.projects.map((d, i) => (
                                    !!d.name &&
                                    <div className="row">
                                        <div
                                            className="col-12 col-sm-6 col-md-12">Project {i + 1}</div>
                                        <div className="col-12 col-sm-12 col-md-6 form-group mobile-profile">
                                            <div className="row">
                                            <div className="col-12 col-sm-6 col-md-6"><label>Project Name
                                                :</label></div>
                                            <span className="col-12 col-sm-6 col-md-6">{d.name}</span>
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-12 col-md-6 form-group">
                                            <div className="row">
                                            <div className="col-12 col-sm-6 col-md-6"><label>Description
                                                :</label></div>
                                            <span className="col-12 col-sm-6 col-md-6">{d.description}</span>
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-12 col-md-6 form-group">
                                            <div className="row">
                                            <div className="col-12 col-sm-6 col-md-6"><label>Skills Applied
                                                :</label></div>
                                            <span className="col-12 col-sm-6 col-md-6">{d.skills}</span>
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-12 col-md-12">
                                            <div className="divider"></div>
                                        </div>
                                    </div>
                                ))
                            )
                        }
                    </div>
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
