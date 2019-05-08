import React, {Component} from 'react';
import {Route, Switch, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import RegistrationProgress from '../../../../components/account/register/manual/section/progress';
import CheckEmailSection from "../../../../components/account/register/manual/section/check-email-section";
import PersonalInfoSection from "../../../../components/account/register/manual/section/personal-info-section";
import EducationSection from '../../../../components/account/register/manual/section/education-section';
import ExpereienceSection from '../../../../components/account/register/manual/section/experience-section';
import InformationSection from '../../../../components/account/register/manual/section/information-section';
import CreatePasswordSection from '../../../../components/account/register/manual/section/create-password-section';
import PreviewSection from '../../../../components/account/register/manual/section/preview/index';
import RegisterThroughLinkedIn from "../linkedin/register-through-linkedin";

class Register extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route exact path="/apply-manual/check-email" component={CheckEmailSection}/>
                    <Route exact path="/apply-manual/review" component={RegisterThroughLinkedIn}/>
                    <div>
                        <RegistrationProgress/>
                        <Route exact path="/apply-manual/personal-information" component={PersonalInfoSection}/>
                        <Route exact path="/apply-manual/education" component={EducationSection}/>
                        <Route exact path="/apply-manual/experience" component={ExpereienceSection}/>
                        <Route exact path="/apply-manual/information" component={InformationSection}/>
                        <Route exact path="/apply-manual/create-password" component={CreatePasswordSection}/>
                        <Route exact path="/apply-manual/preview" component={PreviewSection}/>
                    </div>
                </Switch>
            </div>
        )
    }
}

function mapStateToProps(state) {
    console.log(state.RegisterReducer.registrationForm, "latest registration form....");
    return {state}
}
export default withRouter(connect(mapStateToProps)(Register))