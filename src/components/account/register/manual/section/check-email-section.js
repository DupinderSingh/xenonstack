import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import BarLoaderSpinner from '../../../../app/spinner/barloader';
import Input from '../../../../../components/app/input/input';
import NextBackSection from './next-back';
import {
    changeRegistrationForm, checkEmail,
    clearApiErrorMessage
} from "../../../../../actions/account/registration-action";
import {defaultRegistrationForm} from "../../../../../reducers/account/register-reducer";
import {checkValidation} from "../../../../../actions/app/app";

class CheckEmailSection extends Component {
    componentWillMount() {
        document.title = "Registration | Check Email Address | Xenonstack Hiring Portal";
        this.props.dispatch(clearApiErrorMessage());
        const registrationForm = defaultRegistrationForm;
        this.props.dispatch(changeRegistrationForm(Object.assign(registrationForm, {email: ""})))
    }
    componentDidMount() {
        document.getElementsByName("email")[0].focus();
    }

    onChange(e) {
        const self = this.props;
        checkValidation(e);
        const newState = Object.assign(self.registrationForm, {
            [e.target.name]: e.target.value
        });
        self.dispatch(changeRegistrationForm(newState))
    }

    submitCheckEmailForm(e) {
        e.preventDefault();
        const self = this.props;
        if (e.target.checkValidity()) {
            const body = {
                email: self.email
            };
            self.dispatch(checkEmail(body));
        } else {
            const invalidElms = document.querySelectorAll(".check-email-form .form-group input:invalid");
            invalidElms[0].focus();
            for (let i = 0; i < invalidElms.length; i++)
                invalidElms[i].parentElement.classList.add("has-error")
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.status === 200 && !nextProps.error) {
            nextProps.history.push("/verify-email");
        }
    }

    render() {
        return (
            <div>
                {
                    this.props.location.pathname.match("apply-linkedIn") &&
                    <div className="coming-soon-page">
                        <div>
                        <img src={require("../../../../../static/images/coming-soon-1.png")}
                             alt={"coming-soon"}/>
                        <div>
                            {/*<h3>Apply with Linkedin</h3>*/}
                            <h2>Coming Soon</h2>
                            <p>We are currently working on this page. Thanks for checking out and we'll launch soon.</p>
                        </div>
                        <div>
                            <a className="btn mar-t-2 " href="/login">Back to Sign In Page</a>
                        </div>
                        </div>
                    </div>
                }
                {
                    !this.props.location.pathname.match("apply-linkedIn") &&
                    <form onSubmit={this.submitCheckEmailForm.bind(this)} noValidate={true}
                          className="check-email-form">
                        <section id="emailVerification">
                            <div className="wrapper">
                                <div className="section_header">
                                    <h3 className="big-heading">Verify your email address to continue with Us</h3>
                                    <h4 className="subtitle">It is recommended you apply using the email address
                                        associated with your account so we can inform you details related to your
                                        account.</h4>
                                </div>
                                <div className="row">
                                    <div className="col-12 col-sm-12 col-md-12 mar-xs-30">
                                        <div className="section_content">
                                            <div className="form-group">
                                                <label>Email address<span className="req">*</span></label>
                                                <Input
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
                                    </div>
                                </div>
                                {
                                    this.props.error &&
                                    <div>
                                        <div className="form-group">
                                            <div className="bPad24px">
                                                <span className="errorText">
                                                    {this.props.message}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                }
                                <NextBackSection>
                                    {this.props.children}
                                </NextBackSection>
                            </div>
                        </section>
                        <BarLoaderSpinner pageLoading={this.props.pageLoading}/>
                    </form>
                }
            </div>
        )
    }
}

function mapStateToProps(state) {
    const {registrationForm, pageLoading, status, error, message} = state.RegisterReducer;
    const {email} = registrationForm;
    return {email, registrationForm, pageLoading, status, error, message}
}

export default withRouter(connect(mapStateToProps)(CheckEmailSection))
