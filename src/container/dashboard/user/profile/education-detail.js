import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

class EducationDetail extends Component {
    render() {
        return (
            <div className="col-12 col-sm-12 col-md-12">
                <div className="user-profile-flex">
                    <h3 className="">Education </h3><span className=""
                                                          onClick={() => this.props.history.push("/profile/education/edit")}><i
                    className="material-icons">edit</i></span>
                </div>
                <div className="profile-wrap">
                    {
                        this.props.registrationForm.education.map((d, i) => (
                            <div>
                                <div className="row">
                                    <div className="col-12 col-sm-12  col-md-12 form-group mobile-profile">
                                        <div className="row">
                                            <div className="col-12 col-sm-6 col-md-4 "><label>College/University :</label>
                                            </div>
                                            <span className="col-12 col-sm-6 col-md-8 ">{d.school}</span>
                                        </div>
                                    </div>
                                    <div className="col-12 col-sm-12 col-md-12 form-group mobile-profile">
                                        <div className="row">
                                            <div className="col-12 col-sm-6 col-md-4 ">
                                                <label>{i === 0 ? "Highest Qualification :" : "Other Qualification :"}</label>
                                            </div>
                                            <span
                                                className="col-12 col-sm-6 col-md-8 ">{d.highest_education}</span>
                                        </div>
                                    </div>
                                    <div className="col-12 col-sm-12 col-md-12 form-group">
                                        <div className="row">
                                            <div className="col-12 col-sm-6 col-md-4 "><label>Duration
                                                :</label></div>
                                            <span
                                                className="col-12 col-sm-6 col-md-8 ">{d.start} to {d.end}</span>
                                        </div>
                                    </div>
                                    <div className="col-12 col-sm-12 col-md-12">
                                        <div className="divider"></div>
                                    </div>
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
    const {registrationForm} = state.RegisterReducer;
    return {registrationForm}
}

export default withRouter(connect(mapStateToProps)(EducationDetail))