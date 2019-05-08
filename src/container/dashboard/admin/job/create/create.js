import React, {Component} from 'react';
import AdminOnPageNavigation from '../../../../../components/dashboard/admin/on_page_navigation/on-page-navigation';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {
    changeCreateJobForm,
    clearAll,
    clearCreateJobResponse,
    clearStatus as clearJobs,
    createJob,
    getJobDetails
} from '../../../../../actions/dashboard/admin/job/job';
import {clear_get_teams, getTeams} from "../../../../../actions/dashboard/admin/team/team"
import {checkValidation} from "../../../../../actions/app/app";
import BarLoaderSpinner from "../../../../../components/app/spinner/barloader";
// import ReactQuill from 'react-quill'; // ES6
// import 'react-quill/dist/quill.snow.css';
import createNotification from "../../../../../components/app/notification/notification";
import {clearStatus as clearStatus, editJob} from "../../../../../actions/dashboard/user/jobs/jobs"; // E
import {NotificationContainer} from 'react-notifications'; // S6
import CKEditor from 'ckeditor4-react';
// import ReactMde from "react-mde";
// import * as Showdown from "showdown";
// import "react-mde/lib/styles/css/react-mde-all.css";

// import CKEditor from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

class EditorPreview extends Component {
    render() {
        return (
            <div className="editor-preview">
                <h2>Rendered content:</h2>
                <div dangerouslySetInnerHTML={{__html: this.props.value}}></div>
            </div>
        );
    }
}

EditorPreview.defaultProps = {
    value: ''
};

class CreateJob extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: '',
            bodyError: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.onEditorChange = this.onEditorChange.bind(this);
    }

    onEditorChange(evt) {
        console.log("onEditorChange.....");
        this.setState({
            value: evt.editor.getData()
        });

        window.setTimeout(() => {
            if (this.state.value === "") {
                this.setState({
                    bodyError: true
                });
            } else {
                this.setState({
                    bodyError: false
                });
            }
        }, 250)
    }

    handleChange(changeEvent) {
        this.setState({
            value: changeEvent.target.value,
            bodyError: false
        });
    }

    componentWillMount() {
        this.setState({value: "", bodyError: false});
        this.props.dispatch(clearJobs());
        this.props.dispatch(clearStatus());
        this.props.dispatch(clearAll());
        this.props.dispatch(getTeams());
        if (this.props.location.pathname.match("/edit")) {
            this.props.dispatch(getJobDetails(this.props.match.params.team, this.props.match.params.job))
        }
    }

    handleChange(value) {
        this.setState({text: value, bodyError: false})
    }

    submitCreateJobForm(e) {
        e.preventDefault();
        const self = this.props;
        const thi = this;
        let summaryError = false;
        const pattern = /^([a-zA-Z.!-”$%&’()*\+,\/;\[\\\]\^_`{|}~]+\s)*[a-zA-Z.!-”$%&’()*\+,\/;\[\\\]\^_`{|}~]+$/;
        if (!pattern.test(self.state.adminJobReducer.createJob.summary)) {
            summaryError = true
        }
        if (e.target.checkValidity() && thi.state.value !== "" && !summaryError) {
            const body = {
                name: self.state.adminJobReducer.createJob.name,
                summary: self.state.adminJobReducer.createJob.summary,
                location: self.state.adminJobReducer.createJob.location,
                skills: self.state.adminJobReducer.createJob.skills,
                body: thi.state.value,
                teamId: self.state.adminJobReducer.createJob.team,
                teamName: self.state.adminJobReducer.createJob.team
            };
            if (self.location.pathname.match("/edit")) {
                self.dispatch(editJob(self.match.params.team, self.match.params.job, body));
            } else {
                self.dispatch(createJob(body));
            }
        } else {
            if (summaryError) {
                document.getElementsByName("summary")[0].parentElement.classList.add("has-error");
            }
            if (thi.state.value === "") {
                thi.setState({bodyError: true})
            }
            const invalidElmsInput = document.querySelectorAll(".job-form .form-group input:invalid");
            console.log(invalidElmsInput, "invalid inputs......");
            for (let i = 0; i < invalidElmsInput.length; i++) {
                invalidElmsInput[i].parentElement.classList.add("has-error")
            }

            const invalidTextArea = document.querySelectorAll(".job-form .form-group textarea:invalid");
            for (let i = 0; i < invalidTextArea.length; i++) {
                console.log(invalidTextArea[i].parentElement, "parent element....");
                invalidTextArea[i].parentElement.classList.add("has-error");
            }

            const invalidSelect = document.querySelectorAll("select");
            for (let i = 0; i < invalidSelect.length; i++) {
                if (invalidSelect[i].value === "") {
                    invalidSelect[i].parentElement.classList.add("has-error");
                    invalidSelect[i].parentElement.classList.add("personal-select-with-error");
                    invalidSelect[i].parentElement.classList.remove("personal-select-without-error");
                }
            }
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.location.pathname !== nextProps.location.pathname) {
            nextProps.dispatch(clearJobs());
            nextProps.dispatch(clearStatus());
            nextProps.dispatch(clearAll());
            nextProps.dispatch(getTeams());
            this.setState({value: "", bodyError: false});
            if (nextProps.location.pathname.match("/edit")) {
                nextProps.dispatch(getJobDetails(nextProps.match.params.team, nextProps.match.params.job))
            }
        }
        const self = this;
        if (nextProps.state.adminJobReducer.status === 200 && !nextProps.state.adminJobReducer.error) {
            self.setState({
                value: "",
                bodyError: false
            });
            nextProps.dispatch(clearCreateJobResponse())
        }
        ;
        if (nextProps.state.adminTeamReducer.get_teams.length > 0) {
            const newTeams = nextProps.state.adminTeamReducer.get_teams;
            console.log(newTeams, "new teams....");
            nextProps.dispatch(clear_get_teams());
            nextProps.dispatch(changeCreateJobForm(Object.assign(nextProps.state.adminJobReducer.createJob, {all_teams: newTeams})))
        }
        if (nextProps.state.adminJobReducer.edit_job_message !== "") {
            if (nextProps.state.adminJobReducer.edit_job_error) {
                createNotification('error', nextProps.state.adminJobReducer.edit_job_message);
                nextProps.dispatch(clearJobs());
            } else {
                createNotification('success', nextProps.state.adminJobReducer.edit_job_message);
                nextProps.history.push("/dashboard/job/list")
            }
        }

        if (nextProps.state.adminJobReducer.message !== "") {
            if (nextProps.state.adminJobReducer.error) {
                createNotification('error', nextProps.state.adminJobReducer.message);
                nextProps.dispatch(clearJobs());
            } else {
                createNotification('success', nextProps.state.adminJobReducer.message);
                nextProps.history.push("/dashboard/job/list")
            }
        }
        if (nextProps.state.adminJobReducer.body !== "") {
            self.setState({
                value: nextProps.state.adminJobReducer.body,
                bodyError: false
            });
            nextProps.dispatch(changeCreateJobForm(Object.assign(nextProps.state.adminJobReducer.createJob, {body: nextProps.state.adminJobReducer.body})))
        }
    }

    onChange(e, i) {
        const self = this.props;
        console.log(e.target, "target");
        this.setState({bodyError: false});
        checkValidation(e);
        let newState = {};
        if (e.target.name === "summary") {
            const pattern = /^([a-zA-Z.!-”$%&’()*\+,\/;\[\\\]\^_`{|}~]+\s)*[a-zA-Z.!-”$%&’()*\+,\/;\[\\\]\^_`{|}~]+$/;
            if (pattern.test(e.target.value)) {
                e.target.parentElement.classList.remove("has-error");
            } else {
                e.target.parentElement.classList.add("has-error");
            }
        }
        if (e.target.name === "skills") {
            newState = self.state.adminJobReducer.createJob;
            newState.skills[i] = e.target.value;

        } else {
            newState = Object.assign(self.state.adminJobReducer.createJob, {[e.target.name]: e.target.value});
        }
        self.dispatch(changeCreateJobForm(newState))
    }

    addSkill() {
        const newState = this.props.state.adminJobReducer.createJob;
        newState.skills.push("")
        this.props.dispatch(changeCreateJobForm(newState))
    }

    removeSkill(index) {
        const newState = this.props.state.adminJobReducer.createJob;
        newState.skills.splice(index, 1)
        this.props.dispatch(changeCreateJobForm(newState));
    }

    render() {
        const {value} = this.state;
        return (
            <div>
                <AdminOnPageNavigation parentRoute="Dashboard"
                                       childRoute={this.props.location.pathname.match("/edit") ? "Edit Job" : "Add Job"}/>
                <BarLoaderSpinner pageLoading={this.props.state.adminJobReducer.pageLoading}/>
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                        <div className="pool-form-wrapper">
                            <h4 className="content-heading">{this.props.location.pathname.match("/edit") ? "Edit Job" : "Add Job"}</h4>
                            <div className="divider"></div>
                            <div className="row">
                                <div className="col-lg-6 col-md-8 col-sm-12">
                                    <div className="form-group">
                                        {
                                            (!this.props.state.pageLoading && this.props.state.adminJobReducer.createJob.all_teams.length === 0) &&
                                            <div>No teams found...</div>
                                        }
                                        <form className="create-job-form job-form"
                                              onSubmit={this.submitCreateJobForm.bind(this)}
                                              noValidate={true}>
                                            <div className="form-body">
                                                <div className="form-group">
                                                    <label className="control-label">Job Name<span className="req">*</span></label>
                                                    <input type="text"
                                                           value={this.props.state.adminJobReducer.createJob.name}
                                                           className="form-control"
                                                           name="name"
                                                           minLength={3}
                                                           maxLength={50}
                                                           pattern={"([a-zA-Z.!-”$%&’()*\\+,\\/;\\[\\\\\\]\\^_`{|}~]+\\s)*[a-zA-Z.!-”$%&’()*\\+,\\/;\\[\\\\\\]\\^_`{|}~]+$"}
                                                           autoComplete={"off"}
                                                           required={true}
                                                           onChange={this.onChange.bind(this)}
                                                           placeholder="Enter Job Name"/>
                                                    <p className="with-error">Please enter job name
                                                        (Min 3 characters required. Only characters,
                                                        numbers and special symbols are allowed).</p>

                                                </div>
                                                <div className="form-group">
                                                    <label className="control-label">Location<span className="req">*</span></label>
                                                    <input type="text"
                                                           value={this.props.state.adminJobReducer.createJob.location}
                                                           minLength={3}
                                                           maxLength={50}
                                                           pattern={"([a-zA-Z.!-”$%&’()*\\+,\\/;\\[\\\\\\]\\^_`{|}~]+\\s)*[a-zA-Z.!-”$%&’()*\\+,\\/;\\[\\\\\\]\\^_`{|}~]+$"}
                                                           autoComplete={"off"}
                                                           required={true}
                                                           name="location"
                                                           onChange={this.onChange.bind(this)}
                                                           className="form-control"
                                                           placeholder="Enter Location"/>
                                                    <p className="with-error">Please enter location
                                                        (Min 3 characters required. Only characters,
                                                        numbers and special symbols are allowed).</p>

                                                </div>


                                                {
                                                    this.props.state.adminJobReducer.createJob.skills.map((d, i) => (

                                                        <div className="row">
                                                            <div className="col-sm-10 col-md-10 col-lg-10">
                                                                <div className="form-group">
                                                                    <label
                                                                        className="control-label mb-5">Skill {i+1}<span className="req">*</span></label>
                                                                    <input className="form-control"
                                                                           name="skills"
                                                                           placeholder={"Skill "+i + 1}
                                                                           minLength={3}
                                                                           maxLength={50}
                                                                           pattern={"([a-zA-Z.!-”$%&’()*\\+,\\/;\\[\\\\\\]\\^_`{|}~]+\\s)*[a-zA-Z.!-”$%&’()*\\+,\\/;\\[\\\\\\]\\^_`{|}~]+$"}
                                                                           autoComplete={"off"}
                                                                           required={true}
                                                                           onChange={(e) => this.onChange(e, i)}
                                                                           value={d}
                                                                           data-placeholder="Add Skill"/>
                                                                    <p className="with-error">Please enter skill
                                                                        (Min 3 characters required. Only characters,
                                                                        numbers and special symbols are
                                                                        allowed).</p>
                                                                </div>
                                                            </div>
                                                            {
                                                                this.props.state.adminJobReducer.createJob.skills.length > 1 &&
                                                                <div className="col-md-2 col-3 col-lg-2 col-sm-2">
                                                                    <div className="form-group">
                                                                        <div className="add-div"><span
                                                                            onClick={() => this.removeSkill(i)}><i
                                                                            className="material-icons"
                                                                            style={{top: "8px"}}>close</i></span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            }
                                                        </div>
                                                    ))
                                                }
                                                <button type="button"
                                                        className="btn form-group"
                                                        onClick={this.addSkill.bind(this)}>Add Skill
                                                </button>


                                                <div className="form-group">
                                                    <label className="control-label mb-5">Summary <span className="req">*</span></label>
                                                    <textarea cols="5"
                                                              rows="4"
                                                              name="summary"
                                                              value={this.props.state.adminJobReducer.createJob.summary}
                                                              minLength={3}
                                                              pattern={"([a-zA-Z.!-”$%&’()*\\+,\\/;\\[\\\\\\]\\^_`{|}~]+\\s)*[a-zA-Z.!-”$%&’()*\\+,\\/;\\[\\\\\\]\\^_`{|}~]+$"}
                                                              autoComplete={"off"}
                                                              required={true}
                                                              placeholder="Enter Summary"
                                                              onChange={this.onChange.bind(this)}
                                                              style={{width: "100%"}}
                                                              className="form-control"></textarea>
                                                    <p
                                                        className="with-error">Please enter summary (Min 3
                                                        characters required. Only
                                                        characters, numbers and special symbols are
                                                        allowed).</p>
                                                </div>

                                                <div className="form-group personal-select-without-error">
                                                    <label className="control-label">Team <span className="req">*</span></label>
                                                    <select className="form-control"
                                                            name="team"
                                                            value={this.props.state.adminJobReducer.createJob.team}
                                                            required={true}
                                                            onChange={this.onChange.bind(this)}
                                                            data-placeholder="Choose a Category"
                                                            tabindex="1">
                                                        <option value="">Choose a Team</option>
                                                        {
                                                            this.props.state.adminJobReducer.createJob.all_teams.map((d) => (
                                                                <option value={d.Id}>{d.Name}</option>
                                                            ))
                                                        }
                                                    </select>
                                                    <p className="with-error">This field is required</p>

                                                </div>

                                                <div className="form-group">
                                                    <label className="control-label mb-5">Body <span className="req">*</span></label>
                                                    <div className="App">
                                                        <CKEditor
                                                            data={value}
                                                            onChange={this.onEditorChange}
                                                        />
                                                        {
                                                            this.state.bodyError &&
                                                            <p style={{color: "red"}}>This field is
                                                                required.</p>
                                                        }
                                                    </div>

                                                </div>

                                                <div className="form-group">
                                                    <button type="submit"
                                                            disabled={this.props.state.adminJobReducer.pageLoading ? true : false}
                                                            className="btn mt-30">{this.props.location.pathname.match("/edit") ? "Edit Job" : "Create Job"}</button>
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

function

mapStateToProps(state) {
    return {state}
}

export default withRouter(connect

(
    mapStateToProps
)(
    CreateJob
))
