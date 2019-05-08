import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {
    changeEmailRegisterForm,
    changeLoginForm,
    clearApiErrorMessage,
    login
} from "../../../actions/account/login-actions";
import Button from '../../../components/app/button/button';
import Input from '../../../components/app/input/input';
import BarLoaderSpinner from '../../../components/app/spinner/barloader';

class Login extends Component {
    componentWillMount() {
        document.title = "Login | Xenonstack Hiring Portal";
        this.props.dispatch(clearApiErrorMessage());
        this.props.dispatch(changeLoginForm({email: "", password: ""}));
    }

    componentDidMount() {
        document.getElementById("tpt_loginUsername").focus();
    }

    submitLoginForm(e) {
        e.preventDefault();
        const self = this.props;
        if (e.target.checkValidity()) {
            const body = {
                username: self.email,
                password: self.password
            };
            self.dispatch(login(body));
        } else {
            const invalidElms = document.querySelectorAll(".login-form .form-group input:invalid");
            invalidElms[0].focus();
            for (let i = 0; i < invalidElms.length; i++)
                invalidElms[i].parentElement.classList.add("has-error")
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.status === 200) {
            this.props.history.push("/admin");
        }
    }

    onChange(e) {
        // alert("on change called..");
        console.log("on focus called..");
        const self = this.props;
        self.dispatch(clearApiErrorMessage());
        console.log(e.target.value, "current value......")
        if (e.target.checkValidity()) {
            e.target.parentElement.classList.remove("has-error");
        } else {
            e.target.parentElement.classList.add("has-error");
        }
        if (e.target.id === "checkEmail") {
            const newState = Object.assign(self.emailRegisterForm, {
                [e.target.name]: e.target.value
            });
            self.dispatch(changeEmailRegisterForm(newState))
        } else {
            const newState = Object.assign(self.loginForm, {
                [e.target.name]: e.target.value
            });
            self.dispatch(changeLoginForm(newState))
        }
    }

    render() {
        return (
            <div className="wrapper">
                <div className="section_header">
                    <h2 className="big-heading">Sign In or Register for a new user account</h2>
                    <h4 className="subtitle">Already working at Xenonstack? Use Xenonstack Jobs - Internal</h4>
                </div>
                <div className="row">
                    <div className="col-12 col-sm-6 col-md-6 mar-xs-30">
                        <div className="section_content login-div existing-user">
                            <h3 className="title_head">Existing user</h3>
                            <form onSubmit={this.submitLoginForm.bind(this)} id="loginForm" className="login-form"
                                  autoComplete="off"
                                  noValidate={true}>
                                <div className="row">
                                    <div className="col-12 col-sm-10 col-md-8">
                                        <div className="form-group">
                                            <label>Email Address<span className="req">*</span></label>
                                            <Input
                                                id="tpt_loginUsername"
                                                type="email"
                                                name="email"
                                                className="form-ctrl"
                                                autoComplete="off"
                                                pattern={"([A-Za-z0-9._%+-])+@([a-zA-Z0-9.-]{2,})\\.+[a-zA-Z]{2,}"}
                                                required={true}
                                                placeholder="Email Address"
                                                value={this.props.email}
                                                onChange={this.onChange.bind(this)}/>
                                            <p className="with-error">Please enter valid email address.</p>

                                        </div>
                                    </div>
                                    <div className="col-12 col-sm-10 col-md-8">
                                        <div className="form-group">
                                            <label>Password<span className="req">*</span></label>
                                            <Input
                                                id="tpt_loginPassword"
                                                type="password"
                                                autoComplete="off"
                                                name="password"
                                                className="form-ctrl"
                                                value={this.props.password}
                                                required={true}
                                                placeholder="Password"
                                                onChange={this.onChange.bind(this)}
                                            />
                                            <p className="with-error">Password is required.</p>
                                            <Link to="/forgot-password" className="forgot_pw"> Forgot password? </Link>
                                        </div>
                                    </div>
                                    {
                                        this.props.message !== "" &&
                                        <div className="col-12 col-sm-12 col-md-12">
                                            <div className="form-group">
                                                <div className="bPad24px">
                                                            <span className="errorText">
                                                                {this.props.message}
                                                            </span>
                                                </div>
                                            </div>
                                        </div>
                                    }
                                    <div className="col-12 col-sm-10 col-md-8">
                                        <div className="form-group btn-group">
                                            <Button type="submit" id="loginButton"
                                                    disabled={this.props.loginPageLoading ? true : false}
                                                    className="btn sign-in mar-t-2"
                                                    text="Sign In"/>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="col-12 col-sm-6 col-md-6 mar-xs-30">
                        <div className="section_content login-div">
                            <h3 className="title_head">New user</h3>
                            <form id="loginForm" noValidate={true}>
                                <div className="row">
                                    <div className="col-12 col-sm-10 col-md-8">
                                        <div className="form-group">
                                            <label>If you are not registered yet, get an account in a few easy
                                                steps</label>
                                        </div>
                                    </div>
                                    <div className="col-12 col-sm-10 col-md-8">
                                        <div className="form-group btn-group">
                                            <Button
                                                onClick={() => this.props.history.push("/apply-linkedIn/check-email")}
                                                type="button" id="loginwithLinkedin" className="btn linkedin_btn"
                                                text="Apply with Linkedin"/>
                                        </div>
                                    </div>
                                    <div className="col-sm-10 col-md-8">
                                        <div className="form-group">
                                            <label className="or_label">OR</label>
                                        </div>
                                    </div>
                                    <div className="col-12 col-sm-10 col-md-8">
                                        <div className="form-group btn-group">
                                            <Button type="Button"
                                                    onClick={() => this.props.history.push("/apply-manual/check-email")}
                                                    id="loginManually" className="btn manually_btn"
                                                    text="Sign Up Manually"/>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <BarLoaderSpinner pageLoading={this.props.loginPageLoading}/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const {loginForm, emailRegisterForm, loginPageLoading, message, status} = state.LoginReducer;
    const {email, password} = loginForm;
    const {emailAddress} = emailRegisterForm;
    return {loginForm, emailRegisterForm, email, password, emailAddress, loginPageLoading, message, status};
}

export default withRouter(connect(mapStateToProps)(Login))
