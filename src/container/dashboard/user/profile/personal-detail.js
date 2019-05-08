import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

class PersonalDetail extends Component {
    render() {
        return (
            <div className="col-12 col-sm-12 col-md-12">
                <div className="user-profile-flex">
                    <h3 className="">Personal Information </h3><span className=""
                                                                onClick={() => this.props.history.push("/profile/personal-information/edit")}><i
                    className="material-icons">edit</i></span>
                </div>
                <div className="profile-wrap">
                    <div className="row">
                        <div className="col-12 col-sm-12 col-md-12 form-group mobile-profile">
                            <div className="row">
                                <div className="col-12 col-sm-6 col-md-4 "><label>Name :</label></div>
                                <span
                                    className="col-12 col-sm-6 col-md-8  ">{this.props.registrationForm.f_name + " " + this.props.registrationForm.l_name}</span>
                            </div>
                        </div>
                        <div className="col-12 col-sm-12 col-md-12 form-group mobile-profile">
                            <div className="row">
                                <div className="col-12 col-sm-6 col-md-4  "><label>Email Address :</label>
                                </div>
                                <span
                                    className="col-12 col-sm-6 col-md-8  ">{this.props.registrationForm.email}</span>
                            </div>
                        </div>
                        <div className="col-12 col-sm-12 col-md-12 form-group mobile-profile">
                            <div className="row">
                                <div className="col-12 col-sm-6 col-md-4  "><label>Contact Number :</label>
                                </div>
                                <span
                                    className="col-12 col-sm-6 col-md-8  ">{this.props.registrationForm.contact}</span>
                            </div>
                        </div>
                        <div className="col-12 col-sm-12 col-md-12 form-group mobile-profile">
                            <div className="row">
                                <div className="col-12 col-sm-6 col-md-4  "><label>Country :</label></div>
                                <span
                                    className="col-12 col-sm-6 col-md-8  ">{this.props.registrationForm.country}</span>
                            </div>
                        </div>
                        <div className="col-12 col-sm-12 col-md-12 form-group mobile-profile">
                            <div className="row">
                                <div className="col-12 col-sm-6 col-md-4  "><label>State :</label></div>
                                <span
                                    className="col-12 col-sm-6 col-md-8  ">{this.props.registrationForm.state}</span>
                            </div>
                        </div>
                        <div className="col-12 col-sm-12 col-md-12 form-group mobile-profile">
                            <div className="row">
                                <div className="col-12 col-sm-6 col-md-4  "><label>City :</label></div>
                                <span
                                    className="col-12 col-sm-6 col-md-8 ">{this.props.registrationForm.city}</span>
                            </div>
                        </div>
                        <div className="col-12 col-sm-12 col-md-12 form-group">
                            <div className="row">
                                <div className="col-12 col-sm-6 col-md-4  "><label>Postal Code :</label></div>
                                <span
                                    className="col-12 col-sm-6 col-md-8  ">{this.props.registrationForm.postal}</span>
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

export default withRouter(connect(mapStateToProps)(PersonalDetail))