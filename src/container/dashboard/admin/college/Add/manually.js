import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {
    changeCreateCollegeForm, clearStatus, createCollege, editCollegeDetails, getCollege,
    getCollegeDetails, clearAll
} from '../../../../../actions/dashboard/admin/college/college'
import {checkValidation} from "../../../../../actions/app/app";
import createNotification from "../../../../../components/app/notification/notification";

class AddCollegeManually extends Component {
  componentWillMount() {
    if (this.props.location.pathname.match("/edit")) {
      this.props.dispatch(getCollegeDetails(this.props.match.params.college));
    }
  }
    handleSubmit(e) {
        e.preventDefault();
        const self = this.props;
        if (e.target.checkValidity()) {
            const body = self.createCollege;
            if (self.location.pathname.match("/edit")) {
                self.dispatch(editCollegeDetails(self.match.params.college, body))
            }
            else {
                self.dispatch(createCollege(body))
            }
        }
        else {
            const invalidElmsInput = document.querySelectorAll(".create-college-form .form-group input:invalid");
            for (let i = 0; i < invalidElmsInput.length; i++) {
                invalidElmsInput[i].parentElement.classList.add("has-error")
            }
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.createCollegeMessage !== "") {
            if (nextProps.createCollegeError) {
                createNotification('error', nextProps.createCollegeMessage);
                nextProps.dispatch(clearStatus());
            } else {
                createNotification('success', nextProps.createCollegeMessage);
                nextProps.dispatch(changeCreateCollegeForm({name: "", location: ""}))
                nextProps.dispatch(getCollege());
            }
        }
        if (nextProps.editCollegeDetailsMessage !== "") {
            if (nextProps.editCollegeDetailsError) {
                createNotification('error', nextProps.editCollegeDetailsMessage);
                nextProps.dispatch(clearStatus());
            } else {
                createNotification('success', nextProps.editCollegeDetailsMessage);
                nextProps.dispatch(changeCreateCollegeForm({name: "", location: ""}))
                nextProps.dispatch(getCollege());
                nextProps.dispatch(clearStatus());
                nextProps.history.push("/dashboard/college/add")
            }
        }
    }

    handleChange(e) {
        checkValidation(e);
        const newState = Object.assign(this.props.createCollege, {
            [e.target.name]: e.target.value
        });
        this.props.dispatch(changeCreateCollegeForm(newState))
    }
    addCollegeManually() {
      this.props.dispatch(clearAll());
      this.props.dispatch(getCollege());
      this.props.history.push("/dashboard/college/add")
    }
    render() {
        return (
            <div>
                <div className="form-group mar-t-3">
                    <h3 className="subtitle">{this.props.location.pathname.match("/edit") ? "Edit College" : "Add College Manually :"}</h3>
                    {
                      this.props.location.pathname.match("/edit") &&
                      <a style={{cursor: "pointer"}} onClick={this.addCollegeManually.bind(this)}>Add college manually</a>
                    }

                </div>
                <form onSubmit={this.handleSubmit.bind(this)} className="create-college-form" noValidate={true}>
                    <div className="form-body">
                    <div class="row">
                        <div className="col-lg-12 col-md-6 col-sm-6 form-group">
                            <label className="control-label mb-5">College Name<span className="req">*</span></label>
                            <input type="text" className="form-control"
                                   name="name"
                                   onChange={this.handleChange.bind(this)}
                                   pattern={"[a-zA-Z][a-zA-Z.\\s]{2,}$"}
                                   value={this.props.createCollege.name}
                                   required={true}
                                   placeholder="Enter College Name"/>
                            <p className="with-error">Please enter college name (Min 3 characters required, no special
                                characters allowed).</p>
                        </div>
                        <div className="col-lg-12 col-md-6 col-sm-6 form-group">
                            <label className="control-label mb-5">Location<span className="req">*</span></label>
                            <input type="text" className="form-control"
                                   name="location"
                                   onChange={this.handleChange.bind(this)}
                                   pattern={"[a-zA-Z][a-zA-Z.\\s]{2,}$"}
                                   value={this.props.createCollege.location}
                                   required={true}
                                   placeholder="Enter Location"/>
                            <p className="with-error">Please enter college location (Min 3 characters required, no
                                special
                                characters allowed).</p>
                        </div>
                        </div>
                        <div className="form-group">
                            <button type="submit"
                                    className="btn mt-30">{this.props.location.pathname.match("/edit") ? "Edit College" : "Add College"}</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}


function mapStateToProps(state) {
    const {
        editCollegeDetailsPageLoading, editCollegeDetailsStatus, editCollegeDetailsError, editCollegeDetailsMessage,
        createCollege, createCollegePageLoading, createCollegeStatus, createCollegeError, createCollegeMessage
    } = state.adminCollegeReducer;
    return {
        editCollegeDetailsPageLoading, editCollegeDetailsStatus, editCollegeDetailsError, editCollegeDetailsMessage,
        createCollege, createCollegePageLoading, createCollegeStatus, createCollegeError, createCollegeMessage
    }
}

export default withRouter(connect(mapStateToProps)(AddCollegeManually))
