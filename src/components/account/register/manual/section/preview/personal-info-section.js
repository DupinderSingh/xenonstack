import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import 'react-telephone-input/lib/withStyles'

// will decide wheater to forward to apply-manual sections or apply-linkedin sections

class PersonalInfoSection extends Component {
    render() {
        return (
            <div className="row" id="personal">
                <div className="col-12 col-sm-12 col-md-12">
                    <div className="user-profile-flex">
                        <h3 className="">Personal Information </h3>
                    </div>
                    <div className="profile-wrap">
                        <div className="row">
                            <div className="col-12 col-sm-12 col-md-6 form-group mobile-profile">
                                <div className="row">
                                <div className="col-12 col-sm-6 col-md-6 "><label>Name :</label></div>
                                <span className="col-12 col-sm-6 col-md-6 ">{this.props.f_name +" "+ this.props.l_name}</span>
                                </div>
                            </div>
                            <div className="col-12 col-sm-12 col-md-6 form-group mobile-profile">
                                <div className="row">
                                <div className="col-12 col-sm-6 col-md-6 "><label>Email Address :</label></div>
                                <span className="col-12 col-sm-6 col-md-6 ">{this.props.email}</span>
                                </div>
                            </div>
                            <div className="col-12 col-sm-12 col-md-6 form-group mobile-profile">
                                <div className="row">
                                <div className="col-12 col-sm-6 col-md-6 "><label>Contact Number :</label></div>
                                <span className="col-12 col-sm-6 col-md-6  ">{this.props.contact}</span>
                                </div>
                            </div>
                            <div className="col-12 col-sm-12 col-md-6 form-group mobile-profile">
                                <div className="row">
                                <div className="col-12 col-sm-6 col-md-6 "><label>Country :</label></div>
                                <span className="col-12 col-sm-6 col-md-6 ">{this.props.country}</span>
                                </div>
                            </div>
                            <div className="col-12 col-sm-12 col-md-6 form-group mobile-profile">
                                <div className="row">
                                <div className="col-12 col-sm-6 col-md-6  "><label>State :</label></div>
                                <span className="col-12 col-sm-6 col-md-6  ">{this.props.state}</span>
                                </div>
                            </div>
                            <div className="col-12 col-sm-12 col-md-6 form-group mobile-profile">
                                <div className="row">
                                <div className="col-12 col-sm-6 col-md-6"><label>City :</label></div>
                                <span className="col-12 col-sm-6 col-md-6">{this.props.city}</span>
                                </div>
                            </div>
                            <div className="col-12 col-sm-12 col-md-6 form-group">
                                <div className="row">
                                <div className="col-12 col-sm-6 col-md-6"><label>Postal Code :</label></div>
                                <span className="col-12 col-sm-6 col-md-6">{this.props.postal}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(store) {
    const {auth} = store.LoginReducer;
    const {isAuthenticated} = auth;
    const {pageLoading, message, status, registrationForm, error, goToRegistration} = store.RegisterReducer;
    const {f_name, l_name, email, contact, city, country, state, cities, countries, states, postal, password, confirm_password, updateCountry, updateState} = registrationForm;
    return {
        isAuthenticated,
        pageLoading,
        message,
        status,
        registrationForm,
        f_name,
        l_name,
        email,
        contact,
        city,
        country,
        state,
        cities,
        countries,
        states,
        postal,
        password,
        confirm_password,
        updateCountry, updateState,
        error,
        goToRegistration
    }
}

export default withRouter(connect(mapStateToProps)(PersonalInfoSection))
