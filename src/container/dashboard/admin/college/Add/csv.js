import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {
    changeCreateCollegeCsvForm,
    clearStatus,
    getCollege,
    uploadCollegeCsv
} from "../../../../../actions/dashboard/admin/college/college";
import createNotification from "../../../../../components/app/notification/notification";

class AddCollegeCsv extends Component {
    handleSubmit(e) {
        e.preventDefault();
        const self = this.props;
        const thi = this;

        let isValidResume = true;

        if (self.createCollegeCsv.csv === "") {
            isValidResume = false
        } else {
            // console.log(self.createQuestionCsv.csv.files[0]["name"], "file..")
            switch ((self.createCollegeCsv.csv.files[0]["name"].match(/\.([^\.]+)$/i)[1]).toLowerCase()) {
                case 'csv':
                    // e.target.parentElement.classList.remove("has-error");
                    isValidResume = true;
                    break;
                default:
                    // e.target.parentElement.classList.add("has-error");
                    isValidResume = false;
                    break;
            }
        }


        if (e.target.checkValidity() && isValidResume) {
            const fileInput = document.getElementById("uploadCollegesCsv");
            const file = fileInput.files[0];
            self.dispatch(uploadCollegeCsv(file))
        } else {
            if (!isValidResume) {
                if (self.createCollegeCsv.csv === "") {
                    document.getElementsByName("csv")[0].parentElement.classList.add("has-error");
                } else {
                    switch ((self.createCollegeCsv.csv.files[0]["name"].match(/\.([^\.]+)$/i)[1]).toLowerCase()) {
                        case 'csv':
                            document.getElementsByName("csv")[0].parentElement.classList.remove("has-error");
                            break;
                        default:
                            document.getElementsByName("csv")[0].parentElement.classList.add("has-error");
                            return 0
                    }
                }
            }

            const invalidElmsInput = document.querySelectorAll(".create-college-csv-form .form-group input:invalid");
            for (let i = 0; i < invalidElmsInput.length; i++) {
                invalidElmsInput[i].parentElement.classList.add("has-error")
            }
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.createCollegeCsvMessage !== "") {
            if (nextProps.createCollegeCsvError) {
                createNotification('error', nextProps.createCollegeCsvMessage);
                nextProps.dispatch(clearStatus());
            } else {
                createNotification('success', nextProps.createCollegeCsvMessage);
                nextProps.dispatch(changeCreateCollegeCsvForm({csv: ""}))
                nextProps.dispatch(clearStatus());
                nextProps.dispatch(getCollege());
            }
        }
    }

    handleChange(e) {
        // checkValidation(e);
        // const newState = Object.assign(this.props.createCollegeCsv, {
        //     [e.target.name]: e.target.value
        // });
        // this.props.dispatch(changeCreateCollegeCsvForm(newState))


        if (e.target.value === "") {
            e.target.parentElement.classList.add("has-error");
            const newRegistrationForm = Object.assign(this.props.createCollegeCsv, {
                csv: ""
            });
            this.props.dispatch(changeCreateCollegeCsvForm(newRegistrationForm));
        } else {
            switch ((e.target.value.match(/\.([^\.]+)$/i)[1]).toLowerCase()) {
                case 'csv':
                    e.target.parentElement.classList.remove("has-error");
                    this.props.dispatch(changeCreateCollegeCsvForm(Object.assign(this.props.createCollegeCsv, {csv: document.getElementById('uploadCollegesCsv')})));
                    break;
                default:
                    e.target.parentElement.classList.add("has-error");
                    this.props.dispatch(changeCreateCollegeCsvForm(Object.assign(this.props.createCollegeCsv, {resume: ""})));
                    break
            }

        }
    }

    render() {
        return (
            <form className="assign-user-form create-college-csv-form" onSubmit={this.handleSubmit.bind(this)}
                  noValidate={true}>
                <div className="form-body">
                    <div class="form-group">
                        <label className="subtitle">Upload CSV File<span className="req">*</span></label>
                        <div className="form-group csv-upload-container">
                            <input type="file" name="csv"
                                   id="uploadCollegesCsv"
                                   accept="csv"
                                   required={true}
                                   onChange={this.handleChange.bind(this)}
                                   className="csv-upload-input"/>
                            {
                                !!this.props.createCollegeCsv.csv &&
                                <p style={{padding: "30px", textAlign: "center"}}>{this.props.createCollegeCsv.csv.files[0]["name"]}</p>
                            }
                            <p style={{textAlign: "center"}} className="with-error">Please upload valid csv file.</p>
                            <div className="csv-upload-box" style={{left: "35%"}}>
                                <i className="material-icons">file_upload</i><span>Upload File</span>
                            </div>
                        </div>
                        <button className="btn mt-30" type="submit">SUBMIT</button>
                    </div>
                </div>
            </form>
        )
    }
}

function mapStateToProps(state) {
    const {createCollegeCsvPageLoading, createCollegeCsvStatus, createCollegeCsvError, createCollegeCsvMessage, createCollegeCsv} = state.adminCollegeReducer;
    return {
        createCollegeCsvPageLoading,
        createCollegeCsvStatus,
        createCollegeCsvError,
        createCollegeCsvMessage,
        createCollegeCsv
    }
}

export default withRouter(connect(mapStateToProps)(AddCollegeCsv))
