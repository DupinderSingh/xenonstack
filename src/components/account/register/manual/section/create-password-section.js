import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import Input from '../../../../../components/app/input/input';
import NextBackSection from './next-back';
import {changeRegistrationForm, checkSignupStatus} from "../../../../../actions/account/registration-action";
import {checkValidation} from "../../../../../actions/app/app";

class CreatePasswordSection extends Component {
    componentWillMount() {
        window.scrollTo(0, 0);
        document.title = "Registration | Create Password | Xenonstack Hiring Portal";
        checkSignupStatus(this.props.goToRegistration, window.location.href);
    }

    onChange(e) {
        const self = this.props;
        checkValidation(e);
        if (e.target.name === "confirm_password") {
            if (e.target.value !== self.password) {
                e.target.parentElement.classList.add("has-error")
            }
            else {
                e.target.parentElement.classList.remove("has-error")
            }
        }
        const newState = Object.assign(self.registrationForm, {
            [e.target.name]: e.target.value
        });
        self.dispatch(changeRegistrationForm(newState))
    }

    submitCreatePasswordForm(e) {
        e.preventDefault();
        const self = this.props;
        let passwordMatch = true;
        if (self.password !== self.confirm_password) {
            passwordMatch = false
        }
        if (e.target.checkValidity() && passwordMatch) {
            self.history.push("/apply-manual/preview");
        }
        else {
            if (!passwordMatch) {
                document.getElementsByName("confirm_password")[0].parentElement.classList.add("has-error")
            }
            const invalidElms = document.querySelectorAll(".create-password-form .form-group input:invalid");
            for (let i = 0; i < invalidElms.length; i++)
                invalidElms[i].parentElement.classList.add("has-error")
        }
    }

    render() {
        // console.log((this.props.state.RegisterReducer.registrationForm.interestOne.concat(this.props.state.RegisterReducer.registrationForm.interestTwo)).concat(this.props.state.RegisterReducer.registrationForm.interestThree), "concat...")
        window.onbeforeunload = function () {
            return "Do you really want to leave our brilliant application?";
        };
        return (
            <div>
                <form onSubmit={this.submitCreatePasswordForm.bind(this)} noValidate={true}
                      className="create-password-form">
                    <section id="password">
                        <div className="wrapper">
                            <div className="section_header">
                                <h3 className="big-heading">Create Password </h3>
                                <h4 className="subtitle">Speed up other applications by creating an account. We'll
                                    prefill your application using the information that you previously submitted.</h4>
                            </div>
                            <div className="row">
                                <div className="col-12 col-sm-12 col-md-12 mar-xs-30">
                                    <div className="section_content">
                                        <div className="row">
                                            <div className="col-sm-6">
                                                <div className="form-group">
                                                    <label>Password<span className="req">*</span></label>
                                                    <Input
                                                        type="password"
                                                        name="password"
                                                        id="oldPassword"
                                                        autoComplete="off"
                                                        className="form-ctrl"
                                                        placeholder="Password"
                                                        pattern={"^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"}
                                                        required={true}
                                                        onChange={this.onChange.bind(this)}
                                                        value={this.props.password}/>
                                                    <p className="with-error" style={{color: "unset"}}>Enter your
                                                        password (<span
                                                            style={{color: `${this.props.password.length >= 8 ? "green" : "red"}`}}>Min 8 characters</span>, <span
                                                            style={{color: `${this.props.password.match("(?=.*?[A-Z])") ? "green" : "red"}`}}>at least one uppercase letter</span>, <span
                                                            style={{color: `${this.props.password.match("(?=.*?[a-z])") ? "green" : "red"}`}}>one lowercase letter</span>, <span
                                                            style={{color: `${this.props.password.match("(?=.*?[0-9])") ? "green" : "red"}`}}>one number and </span>
                                                        <span
                                                            style={{color: `${this.props.password.match("(?=.*?[#?!@$%^&*-])") ? "green" : "red"}`}}>one special character required</span>).
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className="form-group">
                                                    <label>Confirm Password<span className="req">*</span></label>
                                                    <Input
                                                        type="password"
                                                        name="confirm_password"
                                                        autoComplete="off"
                                                        className="form-ctrl"
                                                        placeholder="Confirm Password"
                                                        pattern={"^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"}
                                                        required={true}
                                                        onChange={this.onChange.bind(this)}
                                                        value={this.props.confirm_password}/>
                                                    <p className="with-error">Both password should match.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <NextBackSection>
                                {this.props.children}
                            </NextBackSection>
                        </div>
                    </section>
                </form>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const {registrationForm, goToRegistration} = state.RegisterReducer;
    const {password, confirm_password} = registrationForm;
    return {password, confirm_password, goToRegistration, registrationForm, state}
}

export default withRouter(connect(mapStateToProps)(CreatePasswordSection))
