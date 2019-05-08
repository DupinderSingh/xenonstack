import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {
    changeResetPasswordForm, resetPassword,
    resetResetPasswordForm
} from '../../../../actions/account/reset-password-actions'
import Input from "../../../../components/app/input/input";
import Button from "../../../../components/app/button/button";

class UpdatePassword extends Component {
    componentWillMount() {
        document.title = "Profile | Update Password | Xenonstack Hiring Portal";
        this.props.dispatch(changeResetPasswordForm({password: "", confirmPassword: "", state: "reset"}))
    }
    componentDidMount() {
    document.getElementById("password").focus();
    }

    handleSubmit(e) {
        e.preventDefault();
        const self = this.props;
        let passwordMatch = true;
        if (self.password !== self.confirmPassword) {
            passwordMatch = false
        }
        if (e.target.checkValidity() && passwordMatch) {
            const body = {
                password: self.password
            };
            self.dispatch(resetPassword(body, "update"));
        }
        else {
            const invalidElms = document.querySelectorAll(".form-group input:invalid");
            if (!passwordMatch) {
                document.getElementsByName("confirmPassword")[0].parentElement.classList.add("has-error")
            }
            for (let i = 0; i < invalidElms.length; i++)
                invalidElms[i].parentElement.classList.add("has-error");
        }
    }

    onChange(e) {
        const self = this.props;
        if (e.target.checkValidity()) {
            e.target.parentElement.classList.remove("has-error")
        }
        else {
            e.target.parentElement.classList.add("has-error");
        }
        if (e.target.name === "confirmPassword") {
            if (e.target.value !== self.password) {
                e.target.parentElement.classList.add("has-error")
            }
            else {
                e.target.parentElement.classList.remove("has-error")
            }
        }
        const newState = Object.assign(self.resetPasswordForm, {[e.target.name]: e.target.value});
        self.dispatch(changeResetPasswordForm(newState));
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.status === 200 && !nextProps.error) {
            // redirect to profile page..
            nextProps.history.push("/profile")
        }
    }

    render() {
        return (
            <div>
                <div className="wrapper autoClearer">
                    <div className="section_content col-grid col-grid_2-cols autoClearer">
                        <div className="section_header">
                            <h3 className="big-heading">Want to reset password?</h3>
                            <p className="subtitle">Enter new password you want to reset, then click "Change Password".</p>
                        </div>
                        <div className="box_content">
                            <form onSubmit={this.handleSubmit.bind(this)} autoComplete="off"
                                  className="generalForm autoClearer" noValidate={true}>
                                <input type="hidden" name="resetPassword"/>
                                <div className="row">
                                    <div className="col-12 col-sm-6 col-md-6">
                                        <div className="fieldSpec form-group">
                                            <label htmlFor="tpt_resetPasswordEmail">New Password<span
                                                className="req">*</span></label>
                                            <Input
                                                id="password"
                                                type="password"
                                                name="password"
                                                className="form-ctrl"
                                                placeholder="New Password"
                                                pattern={"^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"}
                                                maxLength={32}
                                                value={this.props.password}
                                                required={true}
                                                aria-required="true"
                                                autoFocus="autoFocus"
                                                onChange={this.onChange.bind(this)}
                                            />
                                            <p className="with-error" style={{color: "unset"}}>Enter your password (<span style={{color: `${this.props.password.length >= 8 ? "green" : "red"}`}}>Min 8 characters</span>, <span style={{color: `${this.props.password.match("(?=.*?[A-Z])") ? "green" : "red"}`}}>at least one uppercase letter</span>, <span style={{color: `${this.props.password.match("(?=.*?[a-z])") ? "green" : "red"}`}}>one lowercase letter</span>, <span style={{color: `${this.props.password.match("(?=.*?[0-9])") ? "green" : "red"}`}}>one number and </span> <span style={{color: `${this.props.password.match("(?=.*?[#?!@$%^&*-])") ? "green" : "red"}`}}>one special character required</span>).</p>
                                        </div>
                                    </div>
                                    <div className="col-12 col-sm-6 col-md-6">
                                        <div className="fieldSpec form-group">
                                            <label htmlFor="tpt_resetPasswordEmail">Confirm Password<span
                                                className="req">*</span></label>
                                            <input
                                                id="tpt_resetPasswordEmail"
                                                type="password"
                                                placeholder="Confirm Password"
                                                name="confirmPassword"
                                                className="form-ctrl"
                                                pattern={"^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"}
                                                maxLength={32}
                                                value={this.props.confirmPassword}
                                                required={true}
                                                aria-required="true"
                                                onChange={this.onChange.bind(this)}
                                            />
                                            <p className="with-error">Both password should match.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    {
                                        (this.props.message !== "" && this.props.error === false) &&
                                        (
                                            <div className="bPad24px">
                                                <span className="errorText success">
                                                    {this.props.message}
                                                </span>
                                            </div>
                                        )
                                    }
                                    {

                                        this.props.error === true &&
                                        (
                                            <div className="bPad24px">
                                                <span className="errorText">
                                                    {this.props.message}
                                                </span>
                                            </div>
                                        )
                                    }

                                </div>
                                <div className="row">
                                    <div className="col-12 col-sm-5 col-md-7"></div>
                                    <div className="col-12 col-sm-7 col-md-5 right">
                                        <Button type="submit" className="btn mar-t-2" text="Change Password"/>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(store) {
    const {resetPasswordForm, pageLoading, message, status, error} = store.resetPasswordReducer;
    const {password, confirmPassword, state} = resetPasswordForm;
    return {resetPasswordForm, password, confirmPassword, state, pageLoading, message, status, error}
}

export default withRouter(connect(mapStateToProps)(UpdatePassword))
