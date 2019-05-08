import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import BarLoaderSpinner from '../../../components/app/spinner/barloader';
import {changeEmailVerificationForm, verifyEmail} from '../../../actions/account/email-verification-actions';
import Input from '../../../components/app/input/input';
import Button from '../../../components/app/button/button';
import {
    changeRegistrationForm,
    checkEmail,
    clearApiErrorMessage,
    registerNow
} from "../../../actions/account/registration-action";

let self = null;

class EmailVerification extends Component {
    constructor(props) {
        super(props);
        this.state = {
            validationError: false
        }
    }

    componentWillMount() {
        self = this.props;
        document.title = "Email Verification | Xenonstack Hiring Portal";
        this.props.dispatch(clearApiErrorMessage());
        this.props.dispatch(changeEmailVerificationForm({
            verification_code_1: "",
            verification_code_2: "",
            verification_code_3: "",
            verification_code_4: "",
            verification_code_5: "",
            verification_code_6: ""
        }))
    }

    componentDidMount() {
        document.getElementsByName("verification_code_1")[0].focus();
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.dispatch(changeEmailVerificationForm(this.props.state.emailVerifyReducer.emailVerificationForm));
        this.props.dispatch(changeRegistrationForm(this.props.state.RegisterReducer.registrationForm));
        const self = this.props;
        const thi = this;
        const form = document.getElementById("email-verification-form");
        if (form.checkValidity()) {
            thi.setState({
                validationError: false
            });
            self.dispatch(verifyEmail(Object.assign(self.state.emailVerifyReducer.emailVerificationForm, {
                email: sessionStorage.getItem("email"),
                verification_code: self.state.emailVerifyReducer.emailVerificationForm.verification_code_1 + self.state.emailVerifyReducer.emailVerificationForm.verification_code_2 + self.state.emailVerifyReducer.emailVerificationForm.verification_code_3 + self.state.emailVerifyReducer.emailVerificationForm.verification_code_4 + self.state.emailVerifyReducer.emailVerificationForm.verification_code_5 + self.state.emailVerifyReducer.emailVerificationForm.verification_code_6
            })));
        } else {
            thi.setState({
                validationError: true
            });
            const invalidElms = document.querySelectorAll(".form-group input:invalid");
            invalidElms[0].focus();
            for (let i = 0; i < invalidElms.length; i++)
                invalidElms[i].parentElement.parentElement.classList.add("has-error");
        }
    }

    onChange(e) {
        const self = this.props;
        const thi = this;
        console.log(e.target.value, "value");
        if (!isNaN(e.target.value)) {
            this.props.dispatch(clearApiErrorMessage());
            thi.setState({
                validationError: false
            });
            if (e.target.value !== " ") {
                let newState = Object.assign(self.state.emailVerifyReducer.emailVerificationForm, {[e.target.name]: e.target.value});
                self.dispatch(changeEmailVerificationForm(newState));
            }
            if (e.target.value.length === 1 && e.target.value !== " ") {
                switch (e.target.id) {
                    case "verification_code_1":
                        return document.getElementById("verification_code_2").focus();
                    case "verification_code_2":
                        return document.getElementById("verification_code_3").focus();
                    case "verification_code_3":
                        return document.getElementById("verification_code_4").focus();
                    case "verification_code_4":
                        return document.getElementById("verification_code_5").focus();
                    case "verification_code_5":
                        return document.getElementById("verification_code_6").focus();
                    case "verification_code_6":
                        return thi.handleSubmit(e);
                    default:
                        return 0
                }
            }
        }
    }

    keyDownCalled(event) {
        console.log("keyDownCalled ");
        let key = event.keyCode || event.charCode;
        if (key !== 32 && key !== 9) {
            let newState = Object.assign(self.state.emailVerifyReducer.emailVerificationForm, {[event.target.name]: ""});
            self.dispatch(changeEmailVerificationForm(newState));
        }
        if (key == 8 || key == 46) {
            switch (event.target.id) {
                case "verification_code_2":
                    return document.getElementById("verification_code_1").focus();
                case "verification_code_3":
                    return document.getElementById("verification_code_2").focus();
                case "verification_code_4":
                    return document.getElementById("verification_code_3").focus();
                case "verification_code_5":
                    return document.getElementById("verification_code_4").focus();
                case "verification_code_6":
                    return document.getElementById("verification_code_5").focus();
                default:
                    return 0

            }
        }
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.state.emailVerifyReducer.status === 200 && !nextProps.state.emailVerifyReducer.error) {
            nextProps.dispatch(registerNow());
            nextProps.history.push("/apply-manual/personal-information");
        }
    }

    componentWillUnmount() {
        sessionStorage.removeItem("email");
    }

    resendOtp() {
        this.props.dispatch(changeEmailVerificationForm({
            verification_code_1: "",
            verification_code_2: "",
            verification_code_3: "",
            verification_code_4: "",
            verification_code_5: "",
            verification_code_6: ""
        }));
        this.props.dispatch(changeRegistrationForm(self.state.RegisterReducer.registrationForm));
        this.props.dispatch(checkEmail({email: sessionStorage.getItem("email")}));
        document.getElementsByName("verification_code_1")[0].focus();
    }

    render() {
        return (
            <div>
                <div className="wrapper autoClearer">
                    <div className="section_content autoClearer">
                        <div className="section_header text-center">
                            <h3 className="big-heading">Email Verification</h3>
                            <p className="subtitle">We have sent verification code(OTP) to <b style={{
                                fontSize: "18px",
                                fontFamily: "sans-serif",
                                fontWeight: "normal",
                                wordWrap: "break-word"
                            }}>{sessionStorage.getItem("email")}</b></p>
                        </div>
                        <div className="box_content">
                            <form id="email-verification-form" onSubmit={this.handleSubmit.bind(this)}
                                  autocomplete="false"
                                  className="generalForm autoClearer" noValidate={true}>
                                <input type="hidden" name="resetPassword"/>
                                <div className="row">
                                    <div className="form-group col-12 col-sm-12 col-md-12">
                                        <div className="otp-ul">
                                            <Input
                                                className="form-ctrl"
                                                id="verification_code_1"
                                                name="verification_code_1"
                                                tabIndex={1}
                                                maxLength={1}
                                                onKeyDown={this.keyDownCalled.bind(this)}
                                                type="password"
                                                required={true}
                                                value={this.props.state.emailVerifyReducer.emailVerificationForm.verification_code_1}
                                                onPaste={(e) => e.preventDefault()}
                                                onChange={this.onChange.bind(this)}
                                                autocomplete="false"
                                            />
                                            <Input
                                                className="form-ctrl"
                                                id="verification_code_2"
                                                name="verification_code_2"
                                                tabIndex={2}
                                                onKeyDown={this.keyDownCalled.bind(this)}
                                                type="password"
                                                maxLength={1}
                                                required={true}
                                                value={this.props.state.emailVerifyReducer.emailVerificationForm.verification_code_2}
                                                onPaste={(e) => e.preventDefault()}
                                                onChange={this.onChange.bind(this)}
                                                autocomplete="false"
                                            />
                                            <Input
                                                className="form-ctrl"
                                                id="verification_code_3"
                                                name="verification_code_3"
                                                tabIndex={3}
                                                onKeyDown={this.keyDownCalled.bind(this)}
                                                maxLength={1}
                                                type="password"
                                                required={true}
                                                value={this.props.state.emailVerifyReducer.emailVerificationForm.verification_code_3}
                                                onPaste={(e) => e.preventDefault()}
                                                onChange={this.onChange.bind(this)}
                                                autocomplete="false"
                                            />
                                            <Input
                                                className="form-ctrl"
                                                id="verification_code_4"
                                                name="verification_code_4"
                                                onKeyDown={this.keyDownCalled.bind(this)}
                                                tabIndex={4}
                                                maxLength={1}
                                                type="password"
                                                required={true}
                                                value={this.props.state.emailVerifyReducer.emailVerificationForm.verification_code_4}
                                                onPaste={(e) => e.preventDefault()}
                                                onChange={this.onChange.bind(this)}
                                                autocomplete="false"
                                            />
                                            <Input
                                                className="form-ctrl"
                                                id="verification_code_5"
                                                name="verification_code_5"
                                                onKeyDown={this.keyDownCalled.bind(this)}
                                                tabIndex={5}
                                                maxLength={1}
                                                type="password"
                                                required={true}
                                                value={this.props.state.emailVerifyReducer.emailVerificationForm.verification_code_5}
                                                onPaste={(e) => e.preventDefault()}
                                                onChange={this.onChange.bind(this)}
                                                autocomplete="false"
                                            />
                                            <Input
                                                className="form-ctrl"
                                                id="verification_code_6"
                                                name="verification_code_6"
                                                onKeyDown={this.keyDownCalled.bind(this)}
                                                tabIndex={6}
                                                maxLength={1}
                                                type="password"
                                                required={true}
                                                value={this.props.state.emailVerifyReducer.emailVerificationForm.verification_code_6}
                                                onPaste={(e) => e.preventDefault()}
                                                onChange={this.onChange.bind(this)}
                                                autocomplete="false"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12 col-sm-12 col-md-12 text-center">
                                        <div className="resend-otp">
                                            <a style={{
                                                background: `${((this.props.state.emailVerifyReducer.pageLoading || this.props.state.RegisterReducer.pageLoading) ? "#999898" : "none")}`,
                                                cursor: "pointer"
                                            }} onClick={this.resendOtp.bind(this)}>Resend OTP</a></div>
                                    </div>
                                </div>
                                {
                                    this.state.validationError &&
                                    <div className="bPad24px error-responsive text-center">
                                        <span className="errorText">
                                            Invalid or expired Verification Code.
                                        </span>

                                    </div>

                                }
                                {
                                    this.props.state.emailVerifyReducer.error &&
                                    <div className="bPad24px error-responsive text-center">
                                        <span className="errorText">
                                            {this.props.state.emailVerifyReducer.message}
                                        </span>
                                    </div>

                                }

                                {
                                    (this.props.state.RegisterReducer.message !== "") &&
                                    this.props.state.RegisterReducer.error ?

                                        <div>
                                            <div className="form-group">
                                                <div className="bPad24px error-responsive text-center">
                                                <span className="errorText">
                                                    {this.props.state.RegisterReducer.message}
                                                </span>
                                                </div>
                                            </div>
                                        </div>
                                        :

                                        <div>
                                            <div className="form-group">
                                                <div className="bPad24px error-responsive text-center">
                                                <span className="errorText success">
                                                    {this.props.state.RegisterReducer.message}
                                                </span>
                                                </div>
                                            </div>
                                        </div>

                                }

                                <div className="row">
                                    <div className=" col-12 col-sm-12 col-md-12 ">
                                        <div className="text-center">
                                            <Button type="submit" id="submitOtp" name="submitOtp"
                                                    disabled={((this.props.state.emailVerifyReducer.pageLoading || this.props.state.RegisterReducer.pageLoading) ? true : false)}
                                                    className="btn mar-t-2" text="Next"/>
                                        </div>
                                    </div>
                                </div>
                                <BarLoaderSpinner
                                    pageLoading={this.props.state.emailVerifyReducer.pageLoading || this.props.state.RegisterReducer.pageLoading}/>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {state}
};

export default withRouter(connect(mapStateToProps)(EmailVerification))
