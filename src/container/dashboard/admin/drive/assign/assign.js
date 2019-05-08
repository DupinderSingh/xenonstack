import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import AdminOnPageNavigation from '../../../../../components/dashboard/admin/on_page_navigation/on-page-navigation';
import {checkValidation} from "../../../../../actions/app/app";
import {
    assignUserCsv,
    assignUserManually,
    changeAssignUserCsvForm,
    changeAssignUserManuallyForm,
    clear,
    clearAll
} from "../../../../../actions/dashboard/admin/drive/drive";
import createNotification from "../../../../../components/app/notification/notification";

class AssignDrive extends Component {
    componentWillMount() {
        this.props.dispatch(clear());
        this.props.dispatch(clearAll());
    }

    constructor(props) {
        super(props);
        this.state = {
            addUserManually: true
        }
    }

    onSubmit(e) {
        e.preventDefault();
        const self = this.props;
        const thi = this;


        let isValidResume = true;
        if (thi.state.addUserManually) {
            isValidResume = true;
        } else {
            if (self.state.adminDriveReducer.assignUserCsv.csv === "") {
                isValidResume = false
            } else {
                // console.log(self.createQuestionCsv.csv.files[0]["name"], "file..");
                switch ((self.state.adminDriveReducer.assignUserCsv.csv.files[0]["name"].match(/\.([^\.]+)$/i)[1]).toLowerCase()) {
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
        }


        if (e.target.checkValidity() && isValidResume) {
            console.log("everything ok");
            if (thi.state.addUserManually) {
                console.log("assignuser manually")
                const body = self.assignUserManually;
                console.log(body, "body")
                self.dispatch(assignUserManually(self.match.params.drive, body))
            } else {
                const fileInput = document.getElementById("uploadUserCsv");
                const file = fileInput.files[0];
                self.dispatch(assignUserCsv(file, self.match.params.drive))
            }
        } else {
            const invalidElmsInput = document.querySelectorAll(".assign-drive-form .form-group input:invalid");
            for (let i = 0; i < invalidElmsInput.length; i++) {
                invalidElmsInput[i].parentElement.classList.add("has-error")
            }
            if (!thi.state.addUserManually) {
                if (!isValidResume) {
                    if (self.state.adminDriveReducer.assignUserCsv.csv === "") {
                        document.getElementsByName("csv")[0].parentElement.classList.add("has-error");
                    } else {
                        switch ((self.state.adminDriveReducer.assignUserCsv.csv.files[0]["name"].match(/\.([^\.]+)$/i)[1]).toLowerCase()) {
                            case 'csv':
                                document.getElementsByName("csv")[0].parentElement.classList.remove("has-error");
                                break;
                            default:
                                document.getElementsByName("csv")[0].parentElement.classList.add("has-error");
                                return 0
                        }
                    }
                }
            }
        }
    }

    changeAssignUserManually(e) {
        const self = this.props;
        checkValidation(e);
        let newState = Object.assign(self.assignUserManually, {
            [e.target.name]: e.target.value
        });
        console.log(newState, "new state......")
        self.dispatch(changeAssignUserManuallyForm(newState));
    }

    changeAssignUserCsv(e) {
        // const self = this.props;
        // checkValidation(e);
        // let newState = Object.assign(self.assignUserCsv, {
        //     [e.target.name]: e.target.value
        // });
        // self.dispatch(changeAssignUserCsvForm(newState));


        if (e.target.value === "") {
            e.target.parentElement.classList.add("has-error");
            const newRegistrationForm = Object.assign(this.props.state.adminDriveReducer.assignUserCsv, {
                csv: ""
            });
            this.props.dispatch(changeAssignUserCsvForm(newRegistrationForm));
        } else {
            switch ((e.target.value.match(/\.([^\.]+)$/i)[1]).toLowerCase()) {
                case 'csv':
                    e.target.parentElement.classList.remove("has-error");
                    this.props.dispatch(changeAssignUserCsvForm(Object.assign(this.props.state.adminDriveReducer.assignUserCsv, {csv: document.getElementById('uploadUserCsv')})));
                    break;
                default:
                    e.target.parentElement.classList.add("has-error");
                    this.props.dispatch(changeAssignUserCsvForm(Object.assign(this.props.state.adminDriveReducer.assignUserCsv, {resume: ""})));
                    break
            }

        }


    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.assignUserManuallyMessage !== "") {
            if (nextProps.createDriveError) {
                createNotification('error', nextProps.assignUserManuallyMessage);
                nextProps.dispatch(clear());
            } else {
                createNotification('success', nextProps.assignUserManuallyMessage);
                nextProps.history.push("/dashboard/drive/" + this.props.match.params.drive + "/assign/list");
            }
        }

        if (nextProps.assignUserCsvMessage !== "") {
            if (nextProps.assignUserCsvError) {
                createNotification('error', nextProps.assignUserCsvMessage);
                nextProps.dispatch(clear());
            } else {
                createNotification('success', nextProps.assignUserCsvMessage);
                nextProps.history.push("/dashboard/drive/" + this.props.match.params.drive + "/assign/list");
            }
        }
    }

    changeAssignType(assign) {
        const self = this.props;
        const thi = this;
        if (assign === "manually") {
            console.log("manually")
            thi.setState({
                addUserManually: true
            });
            self.dispatch(changeAssignUserManuallyForm(self.assignUserManually, {email: ""}))
            console.log("add user manually true")
        } else {
            console.log("csv")
            thi.setState({
                addUserManually: false
            });
            self.dispatch(changeAssignUserCsvForm(self.assignUserCsv, {csv: ""}));
            console.log("add user manually false")
        }
    }

    render() {
        return (
            <div>
                <AdminOnPageNavigation parentRoute="Dashboard" childRoute="Assign User"/>
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                        <div className="pool-form-wrapper">
                            <h4 className="content-heading">Assign User</h4>
                            <div className="divider"></div>
                            <div className="row">
                                <div className="col-lg-6 col-md-8 col-sm-12">
                                    <div className="form-group">
                                        <div className="row">
                                            <div className="col-md-6 col-xs-12 col-sm-12">
                                                <label className="cstm-radio">Manually
                                                    <input type="radio" name="radio"
                                                           checked={this.state.addUserManually ? true : false}
                                                           onChange={() => this.changeAssignType("manually")}/>
                                                    <span
                                                        className="checkmark"></span>
                                                </label>
                                            </div>
                                            <div className="col-md-6 col-xs-12 col-sm-12">
                                                <label className="cstm-radio">CSV
                                                    <input type="radio" name="radio"
                                                           checked={!this.state.addUserManually ? true : false}
                                                           onChange={() => this.changeAssignType("csv")}/>
                                                    <span
                                                        className="checkmark"></span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="">
                                        <form className="assign-drive-form" noValidate={true}
                                              onSubmit={this.onSubmit.bind(this)}>
                                            <div className="form-body">
                                                {
                                                    this.state.addUserManually &&
                                                    <div className="form-group mar-t-3">
                                                        <label className="subtitle">Add User Manually<span className="req">*</span></label>
                                                        <input type="email" name="email" autoComplete="off"
                                                               onChange={this.changeAssignUserManually.bind(this)}
                                                               required={true}
                                                               className="form-control" placeholder="Add User"
                                                               value={this.props.state.adminDriveReducer.assignUserManually.email}/>
                                                    </div>
                                                }
                                                {
                                                    !this.state.addUserManually &&
                                                    <div className="form-group">
                                                        <label className="subtitle">Upload CSV File<span className="req">*</span></label>
                                                        <div className="csv-upload-container">
                                                            <input type="file" name="csv"
                                                                   id="uploadUserCsv"
                                                                   accept="csv"
                                                                   onChange={this.changeAssignUserCsv.bind(this)}
                                                                   required={true}
                                                                   className="csv-upload-input"/>
                                                            {
                                                                !!this.props.state.adminDriveReducer.assignUserCsv.csv &&
                                                                <p style={{padding: "30px", textAlign: "center"}}>{this.props.state.adminDriveReducer.assignUserCsv.csv.files[0]["name"]}</p>
                                                            }
                                                            <p style={{textAlign: "center"}} className="with-error">Please upload valid csv file.</p>
                                                            <div className="csv-upload-box"><i
                                                                className="material-icons">file_upload</i>
                                                                <span>Upload File</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                }
                                                <div className="form-group">
                                                    <button
                                                        disabled={((this.props.assignUserManuallyPageLoading || this.props.assignUserCsvPageLoading) ? true : false)}
                                                        type="submit" className="btn mt-30">Submit
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    const {
        assignUserManually, assignUserCsv,
        assignUserManuallyPageLoading, assignUserManuallyError, assignUserManuallyMessage, assignUserManuallyStatus,
        assignUserCsvPageLoading, assignUserCsvError, assignUserCsvMessage, assignUserCsvStatus
    } = state.adminDriveReducer;
    return {
        state,
        assignUserManually, assignUserCsv,
        assignUserManuallyPageLoading, assignUserManuallyError, assignUserManuallyMessage, assignUserManuallyStatus,
        assignUserCsvPageLoading, assignUserCsvError, assignUserCsvMessage, assignUserCsvStatus
    }
};

export default withRouter(connect(mapStateToProps)(AssignDrive))
