import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import AdminOnPageNavigation from '../../../../../components/dashboard/admin/on_page_navigation/on-page-navigation';
import {
    changeCreateTeamForm,
    clearAll,
    clearEditTeamDetailsResponse,
    createTeam,
    editTeamDetails,
    getTeamDetails
} from '../../../../../actions/dashboard/admin/team/team';
import {checkValidation} from "../../../../../actions/app/app";
import BarLoaderSpinner from "../../../../../components/app/spinner/barloader";
import createNotification from "../../../../../components/app/notification/notification";
import {NotificationContainer} from 'react-notifications';

class CreateTeam extends Component {
    componentWillMount() {
        this.props.dispatch(clearEditTeamDetailsResponse());
        this.props.dispatch(clearAll());
        this.forceUpdate()
        if (this.props.location.pathname.match("/edit")) {
            this.props.dispatch(getTeamDetails(this.props.match.params.team));
        }
    }

    submitCreateTeamForm(e) {
        e.preventDefault();
        const self = this.props;
        let descriptionError = false;
        const pattern = /^([a-zA-Z.!-”$%&’()*\+,\/;\[\\\]\^_`{|}~]+\s)*[a-zA-Z.!-”$%&’()*\+,\/;\[\\\]\^_`{|}~]+$/;
        if (pattern.test(self.state.adminTeamReducer.createTeam.description)) {
            descriptionError = false;
            document.getElementsByName("description")[0].parentElement.classList.remove("has-error");
        } else {
            descriptionError = true;
            document.getElementsByName("description")[0].parentElement.classList.add("has-error");
        }
        if (e.target.checkValidity() && descriptionError === false) {
            const body = {
                name: self.state.adminTeamReducer.createTeam.name,
                description: self.state.adminTeamReducer.createTeam.description
            };
            if (self.location.pathname.match("/edit")) {

                self.dispatch(editTeamDetails(self.match.params.team, body))
            } else {
                self.dispatch(createTeam(body));
            }
        } else {
            const invalidElmsInput = document.querySelectorAll(".create-team-form .form-group input:invalid");
            for (let i = 0; i < invalidElmsInput.length; i++) {
                invalidElmsInput[i].parentElement.classList.add("has-error")
            }
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.location.pathname !== nextProps.location.pathname) {
            nextProps.dispatch(clearEditTeamDetailsResponse());
            nextProps.dispatch(clearAll());
            if (nextProps.location.pathname.match("/edit")) {
                nextProps.dispatch(getTeamDetails(nextProps.match.params.team));
            }
        }
        if (nextProps.edit_team_details_message !== "") {
            if (nextProps.edit_team_details_error) {
                createNotification('error', nextProps.edit_team_details_message);
                nextProps.dispatch(clearEditTeamDetailsResponse());
            } else {
                createNotification('success', nextProps.edit_team_details_message);
                nextProps.history.push("/dashboard/team/list");
            }
        }

        if (nextProps.message !== "") {
            if (nextProps.error) {
                createNotification('error', nextProps.message);
                nextProps.dispatch(clearEditTeamDetailsResponse());
            } else {
                createNotification('success', nextProps.message);
                nextProps.history.push("/dashboard/team/list");
            }
        }
    }

    onChange(e) {
        const self = this.props;
        checkValidation(e);
        if (e.target.name === "description") {
            const pattern = /^([a-zA-Z.!-”$%&’()*\+,\/;\[\\\]\^_`{|}~]+\s)*[a-zA-Z.!-”$%&’()*\+,\/;\[\\\]\^_`{|}~]+$/;
            console.log(e.target.parentElement, "parent elm..")
            if (pattern.test(e.target.value)) {
                e.target.parentElement.classList.remove("has-error");
            } else {
                e.target.parentElement.classList.add("has-error");
            }
        }
        const newState = Object.assign(self.state.adminTeamReducer.createTeam, {
            [e.target.name]: e.target.value
        });
        self.dispatch(changeCreateTeamForm(newState))
    }

    render() {
        return (
            <div>
                <AdminOnPageNavigation parentRoute="Dashboard"
                                       childRoute={this.props.location.pathname.match("/edit") ? "Edit Team" : "Add Team"}/>
                <BarLoaderSpinner pageLoading={this.props.state.adminTeamReducer.pageLoading}/>
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                        <div className="pool-form-wrapper">
                            <h4 className="content-heading">{this.props.location.pathname.match("/edit") ? "Edit Team" : "Add Team"}</h4>
                            <div className="divider"></div>
                            <div className="row">
                                <div className="col-lg-6 col-md-8 col-sm-12">
                                    <div className="">
                                        {
                                            this.props.team_details_message !== "" &&
                                            <div style={{textAlign: "center"}}>{this.props.team_details_message}</div>
                                        }
                                        <form className="create-team-form"
                                              onSubmit={this.submitCreateTeamForm.bind(this)} noValidate={true}>
                                            <div className="form-body">
                                                <div className="form-group">
                                                    <label className="control-label mb-5">Team Name<span className="req">*</span></label>
                                                    <input type="text"
                                                           name="name"
                                                           minLength={3}
                                                           maxLength={50}
                                                           pattern={"([a-zA-Z.!-”$%&’()*\\+,\\/;\\[\\\\\\]\\^_`{|}~]+\\s)*[a-zA-Z.!-”$%&’()*\\+,\\/;\\[\\\\\\]\\^_`{|}~]+$"}
                                                           autoComplete={"off"}
                                                           onChange={this.onChange.bind(this)}
                                                           required={true}
                                                           value={this.props.state.adminTeamReducer.createTeam.name}
                                                           className="form-control"
                                                           placeholder="Team Name"/>
                                                    <p className="with-error">Please enter team name
                                                        (Min 3 characters required. Only characters,
                                                        numbers and special symbols are allowed).</p>
                                                </div>
                                                <div className="form-group">
                                                    <label className="control-label mb-5">Description<span className="req">*</span></label>
                                                    <textarea type="text"
                                                              name="description"
                                                              value={this.props.state.adminTeamReducer.createTeam.description}
                                                              minLength={3}
                                                              pattern={"([a-zA-Z.!-”$%&’()*\\+,\\/;\\[\\\\\\]\\^_`{|}~]+\\s)*[a-zA-Z.!-”$%&’()*\\+,\\/;\\[\\\\\\]\\^_`{|}~]+$"}
                                                              autoComplete={"off"}
                                                              onChange={this.onChange.bind(this)}
                                                              required={true}
                                                              className="form-control"
                                                              placeholder="Description"/>
                                                    <p className="with-error"><p
                                                        className="with-error">Please enter description (Min 3
                                                        characters required. Only
                                                        characters, numbers and special symbols are
                                                        allowed).</p></p>
                                                </div>
                                                <div className="form-group">
                                                    <button type="submit"
                                                            disabled={this.props.pageLoading ? true : false}
                                                            className="btn mt-30">{this.props.location.pathname.match("/edit") ? "Edit Team" : "Create Team"}</button>
                                                </div>
                                            </div>

                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <NotificationContainer/>
            </div>

        )
    }
}

function mapStateToProps(state) {
    const {
        createTeam, pageLoading, error, message, status,
        team_details_status, team_details_error, team_details_message,
        edit_team_details_status, edit_team_details_error, edit_team_details_message
    } = state.adminTeamReducer;
    return {
        createTeam, pageLoading, error, message, status, state,
        team_details_status, team_details_error, team_details_message,
        edit_team_details_status, edit_team_details_error, edit_team_details_message
    }
}

export default withRouter(connect(mapStateToProps)(CreateTeam))
