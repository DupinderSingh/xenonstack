import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import Input from '../../../../app/input/input';
import Select from '../../../../.././components/app/select/select';
import {changeRegistrationForm} from "../../../../../actions/account/registration-action";
import ReactTelInput from 'react-telephone-input'
import 'react-telephone-input/lib/withStyles'
import {checkValidation} from "../../../../../actions/app/app";

const yourhandle = require('countrycitystatejson');
let phone = null;

// will decide wheater to forward to apply-manual sections or apply-linkedin sections

class PersonalInfoSection extends Component {
    componentDidMount() {
        window.scrollTo(0, 0);
        phone = document.querySelector('input[type=tel]');
    }

    componentWillReceiveProps(nextProps, nextContext) {
        const self = this.props;
        if (nextProps.isAuthenticated) {
            if (nextProps.updateCountry !== "" && nextProps.updateState !== "") {
                const states = yourhandle.getStatesByShort(nextProps.updateCountry);
                const cities = yourhandle.getCities(nextProps.updateCountry, nextProps.updateState);
                self.dispatch(changeRegistrationForm(Object.assign(nextProps.registrationForm,
                    {states: states === null ? [] : states},
                    {cities: cities === null ? [] : cities},
                    {updateCountry: ""},
                    {updateState: ""}
                )))
            }
            if (nextProps.country !== self.country) {
                console.log("update country not same........");
                const states = yourhandle.getStatesByShort(nextProps.country);
                const state = "", cities = [], city = "";
                console.log(states, "states..");
                self.dispatch(changeRegistrationForm(Object.assign(self.registrationForm,
                    {states: states === null ? [] : states},
                    {state},
                    {cities},
                    {city})))
            }
            if (nextProps.state !== self.state) {
                const cities = yourhandle.getCities(self.country, nextProps.state);
                const city = "";
                self.dispatch(changeRegistrationForm(Object.assign(self.registrationForm,
                    {cities: cities === null ? [] : cities},
                    {city})))
            }
        } else {
            if (nextProps.country !== self.country) {
                const states = yourhandle.getStatesByShort(nextProps.country);
                const state = "", cities = [], city = "";
                self.dispatch(changeRegistrationForm(Object.assign(self.registrationForm,
                    {states: states === null ? [] : states},
                    {state},
                    {cities},
                    {city})))
            }
            if (nextProps.state !== self.state) {
                const cities = yourhandle.getCities(self.country, nextProps.state);
                const city = "";
                self.dispatch(changeRegistrationForm(Object.assign(self.registrationForm,
                    {cities: cities === null ? [] : cities},
                    {city})))
            }
        }
    }

    handleInputChange(telNumber, selectedCountry, e) {
        const newState = Object.assign(this.props.registrationForm, {
            country: (selectedCountry.iso2).toUpperCase(),
            contact: telNumber
        });
        this.props.dispatch(changeRegistrationForm(newState));
        if (telNumber.length !== selectedCountry.format.length) {
            phone.setCustomValidity('Enter valid phone number.');
            phone.parentElement.parentElement.parentElement.classList.add('has-error')
        } else {
            phone.setCustomValidity('');
            phone.parentElement.parentElement.parentElement.classList.remove('has-error')
        }
    }

    handleInputBlur(telNumber, selectedCountry) {
        if (telNumber.length === selectedCountry.format.length) {
            phone.setCustomValidity('')
        }
    }

    SetCaretAtEnd(elem) {
        const elemLen = elem.value.length;
        if (document.selection) {
            elem.focus();
            const oSel = document.selection.createRange();
            oSel.moveStart('character', -elemLen);
            oSel.moveStart('character', elemLen);
            oSel.moveEnd('character', 0);
            oSel.select();
        } else if (elem.selectionStart || elem.selectionStart === 0) {
            elem.selectionStart = elemLen;
            elem.selectionEnd = elemLen;
            elem.focus();
        }
    }

    handleFocus(e) {
        this.SetCaretAtEnd(phone)
    }

    onChange(e) {
        if (e.target.name === "postal") {
            if (e.target.value === "") {
                e.target.required = false
            } else {
                e.target.required = true
            }
        }
        const self = this.props;
        checkValidation(e);
        if (e.target.name === "state") {
            const cities = yourhandle.getCities(self.country, e.target.value);
            const city = "";
            self.dispatch(changeRegistrationForm(Object.assign(self.registrationForm,
                {cities: cities === null ? [] : cities},
                {city})))
        }
        const newState = Object.assign(self.registrationForm, {
            [e.target.name]: e.target.value
        });
        self.dispatch(changeRegistrationForm(newState))
    }

    render() {
        return (
            <div>
                <section id="personal">
                    <div className="wrapper">
                        <div className="section_header">
                            <h3 className="big-heading">Personal Information</h3>
                            {/*<h4 className="subtitle">Enter your personal detail below</h4>*/}
                        </div>
                        <div className="row">
                            <div className="col-12 col-sm-12 col-md-12 mar-xs-30">
                                <div className="section_content">
                                    <div className="row personal-info-form">
                                        <div className="col-sm-6">
                                            <div className="form-group">
                                                <label>First Name<span className="req">*</span></label>
                                                <Input
                                                    type="text"
                                                    name="f_name"
                                                    className="form-ctrl"
                                                    placeholder="First Name"
                                                    required={true}
                                                    minLength={3}
                                                    maxLength={50}
                                                    pattern={"[a-zA-Z][a-zA-Z.\\s]{2,}$"}
                                                    autoComplete={"off"}
                                                    onChange={this.onChange.bind(this)}
                                                    value={this.props.f_name}/>
                                                <p className="with-error">Please enter first name (Min 3 characters
                                                    required).</p>
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="form-group">
                                                <label>Last Name<span className="req">*</span></label>
                                                <Input type="text"
                                                       name="l_name"
                                                       className="form-ctrl"
                                                       placeholder="Last Name"
                                                       required={true}
                                                       minLength={3}
                                                       maxLength={50}
                                                       pattern={"^[a-zA-Z]{3,}$"}
                                                       autoComplete={"off"}
                                                       onChange={this.onChange.bind(this)}
                                                       value={this.props.l_name}/>
                                                <p className="with-error">Please enter last name (Min 3 characters
                                                    required, no white space allowed).</p>
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="form-group">
                                            <label>Email Address<span className="req">*</span></label>
                                                <Input
                                                    type="email"
                                                    name="email"
                                                    placeholder="Email Address"
                                                    disabled={true}
                                                    className="form-ctrl"
                                                    required={false}
                                                    value={this.props.email}/>
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="form-group">
                                                <label>Contact Number<span className="req">*</span></label>
                                                <div className={"telephone-outer"}>
                                                    <ReactTelInput
                                                        defaultCountry="in"
                                                        flagsImagePath={require('../../../../../static/images/flags.png')}
                                                        preferredCountries={['us', 'in', 'gb']}
                                                        value={this.props.contact}
                                                        placeholder="Contact Number"
                                                        className="react-tel-input form-ctrl"
                                                        name="contact"
                                                        onChange={this.handleInputChange.bind(this)}
                                                        onFocus={this.handleFocus.bind(this)}
                                                        onBlur={this.handleInputBlur.bind(this)}
                                                    />
                                                </div>
                                                <p className="with-error">Please enter a valid contact number.</p>
                                            </div>
                                        </div>
                                        <div className="col-sm-6 ">
                                            <div className="form-group">
                                                <label>Country<span className="req">*</span></label>
                                                <div className="form-group">
                                                    <Input
                                                        type="text"
                                                        name="country"
                                                        placeholder="Country"
                                                        disabled={true}
                                                        className="form-ctrl"
                                                        required={false}
                                                        value={this.props.country}/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="form-group select-wrapper personal-select-without-error ">
                                                <label>State<span className="req">*</span></label>
                                                <Select id="select" name="state"
                                                        required={true} onChange={this.onChange.bind(this)}
                                                        value={this.props.state}
                                                        placeholder="State"
                                                        className="form-ctrl">
                                                    <option disabled="" value="">State</option>
                                                    {
                                                        this.props.states.map((d, i) => (
                                                            <option key={i} value={d}>{d}</option>
                                                        ))
                                                    }
                                                    <option value="others">Others</option>
                                                </Select>
                                                <p className="with-error">This field is required.</p>
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="form-group select-wrapper personal-select-without-error">
                                                <label>City<span className="req">*</span></label>
                                                <Select id="select" name="city"
                                                        required={true} onChange={this.onChange.bind(this)}
                                                        placeholder="City"
                                                        value={this.props.city}
                                                        className="form-ctrl">
                                                    <option disabled="" value="">City</option>
                                                    {
                                                        this.props.cities.map((d, i) => (
                                                            <option key={i} value={d}>{d}</option>
                                                        ))
                                                    }
                                                    <option value="others">Others</option>
                                                </Select>
                                                <p className="with-error">This field is required.</p>
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="form-group">
                                                <label>Postal Code</label>
                                                <Input type="text"
                                                       name="postal"
                                                       value={this.props.postal}
                                                       onChange={this.onChange.bind(this)}
                                                       minLength={6}
                                                       maxLength={10}
                                                       pattern={"[0-9]+$"}
                                                       className="form-ctrl"
                                                       placeholder="Postal Code" required={false}/>
                                                <p className="with-error">Please enter valid postal code (No alphabets
                                                    allowed. Only numbers (0-9. Maximum length 10)).</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
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
