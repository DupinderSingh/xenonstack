import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {
    changeForgotPasswordForm,
    forgotPassword,
    resetForgotPasswordForm
} from '../../../actions/account/forgot-password-actions'
import Button from '../../../components/app/button/button';

class ForgotPassword extends Component {
    componentWillMount() {
        document.title = "Forgot Password | Xenonstack Hiring Portal";
        this.props.dispatch(changeForgotPasswordForm({email: "", state: "forgot"}))
    }
        componentDidMount() {
        document.getElementById("tpt_resetPasswordEmail").focus();
        }

    handleSubmit(e) {
        e.preventDefault();
        const self = this.props;
        if (e.target.checkValidity()) {
            self.dispatch(forgotPassword(self.forgotPasswordForm));
        } else {
            const invalidElms = document.querySelectorAll(".form-group input:invalid");
            invalidElms[0].focus();
            for (let i = 0; i < invalidElms.length; i++)
                invalidElms[i].parentElement.classList.add("has-error");
        }
    }

    onChange(e) {
        const self = this.props;
        if (e.target.checkValidity()) {
            e.target.parentElement.classList.remove("has-error")
        } else {
            e.target.parentElement.classList.add("has-error")
        }
        const newState = Object.assign(self.forgotPasswordForm, {[e.target.name]: e.target.value});
        self.dispatch(changeForgotPasswordForm(newState));
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.status === 200 && nextProps.message !== "") {
            this.props.dispatch(resetForgotPasswordForm());
        }
    }

    render() {
        return (
            <div>
                <div className="wrapper autoClearer">
                    <div className="section_content autoClearer">
                        <div className="section_header">
                            <h3 className="big-heading">Having trouble logging in?</h3>
                            <p className="subtitle">Enter the email address associated with your account, then click
                                "Next". We will email you a link to reset your password.</p>
                        </div>
                        <div className="box_content">
                            <form onSubmit={this.handleSubmit.bind(this)} autoComplete="off"
                                  className="generalForm autoClearer" noValidate={true}>
                                <input type="hidden" name="resetPassword"/>
                                <div className="fieldSpec form-group">
                                    <label htmlFor="tpt_resetPasswordEmail">Email Address<span className="req">*</span></label>
                                    <input
                                        id="tpt_resetPasswordEmail"
                                        type="email"
                                        placeholder="Email Address"
                                        name="email"
                                        className="form-ctrl"
                                        value={this.props.email}
                                        required={true}
                                        aria-required="true"
                                        autoFocus=""
                                        onChange={this.onChange.bind(this)}
                                    />
                                    <p className="with-error">Please enter valid email address.</p>
                                </div>
                                {
                                    this.props.message !== "" &&
                                    (this.props.error === false) ?
                                        (
                                            <div className="bPad24px">
                                                <span className="errorText success">
                                                    {this.props.message}
                                                </span>
                                            </div>
                                        )
                                        :
                                        (
                                            <div className="bPad24px">
                                                <span className="errorText">
                                                    {this.props.message}
                                                </span>
                                            </div>
                                        )
                                }
                                <div className="row">
                                    <div className="col-12 offset-sm-5 col-sm-7 offset-md-6 col-md-6 right">
                                        <div className="btn-group">
                                            <Button type="button" className="btn signin mar-t-2"
                                                    onClick={() => this.props.history.push("/login")} text="Back"/>
                                            <Button type="submit"
                                                    disabled={this.props.pageLoading ? true : false}
                                                    value="Next" className="btn signin mar-t-2"
                                                    text="Next"/>
                                        </div>
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

function mapStateToProps(state) {
    const {forgotPasswordForm, pageLoading, message, status, error} = state.forgotPasswordReducer;
    const {email} = forgotPasswordForm;
    return {forgotPasswordForm, email, pageLoading, message, status, error}
};

export default withRouter(connect(mapStateToProps)(ForgotPassword))
