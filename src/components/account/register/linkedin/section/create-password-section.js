import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import Input from '../../../../../components/app/input/input';
import {changeRegistrationForm} from "../../../../../actions/account/registration-action";

class CreatePasswordSection extends Component {
    onChange(e) {
        const self = this.props;
        if (e.target.checkValidity()) {
            e.target.parentElement.classList.remove("has-error");
        }
        else {
            e.target.parentElement.classList.add("has-error");
        }
        if (e.target.name === "confirm_password") {
            const password = document.getElementsByName("password")[0].value;
            if (e.target.value !== password) {
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

    render() {
        return (
            <section id="password">
                <div className="wrapper">
                    <div className="section_header">
                        <h3 className="big-heading">Create Password </h3>
                        <h4 className="subtitle">Speed up other applications by creating an account. We'll prefill your
                            application using the information that you previously submitted.</h4>
                    </div>
                    <div className="row create-password-form">
                        <div className="col-12 col-sm-12 col-md-12 mar-xs-30">
                            <div className="section_content">
                                <div className="row">
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label>Password<span className="req">*</span></label>
                                            <Input
                                                type="password"
                                                name="password"
                                                id="password"
                                                className="form-ctrl"
                                                placeholder="Password"
                                                pattern={"^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"}
                                                required={true}
                                                onChange={this.onChange.bind(this)}
                                                value={this.props.password}/>
                                            <p className="with-error" style={{color: "unset"}}>Enter your password (<span style={{color: `${this.props.password.length >= 8 ? "green" : "red"}`}}>Min 8 characters</span>, <span style={{color: `${this.props.password.match("(?=.*?[A-Z])") ? "green" : "red"}`}}>at least one uppercase letter</span>, <span style={{color: `${this.props.password.match("(?=.*?[a-z])") ? "green" : "red"}`}}>one lowercase letter</span>, <span style={{color: `${this.props.password.match("(?=.*?[0-9])") ? "green" : "red"}`}}>one number and</span> <span style={{color: `${this.props.password.match("(?=.*?[#?!@$%^&*-])") ? "green" : "red"}`}}>one special character required</span>).</p>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label>Confirm Password<span className="req">*</span></label>
                                            <Input
                                                type="password"
                                                name="confirm_password"
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
                </div>
            </section>
        )
    }
}

function mapStateToProps(state) {
    const {registrationForm} = state.RegisterReducer;
    const {password, confirm_password} = registrationForm;
    return {password, confirm_password, registrationForm}
}

export default withRouter(connect(mapStateToProps)(CreatePasswordSection))