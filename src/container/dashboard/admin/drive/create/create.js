import React, {Component} from 'react';
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux';
import AdminOnPageNavigation from '../../../../../components/dashboard/admin/on_page_navigation/on-page-navigation';
import {checkValidation} from "../../../../../actions/app/app";
import {
    changeCreateDriveForm,
    clear,
    clearAll,
    createDrive,
    editDriveDetails,
    getDriveDetails
} from "../../../../../actions/dashboard/admin/drive/drive";
import {getTest} from "../../../../../actions/dashboard/admin/test/test";
import {getCollege} from "../../../../../actions/dashboard/admin/college/college";
import createNotification from "../../../../../components/app/notification/notification";
import 'react-datepicker/dist/react-datepicker.min.css';
import DatePicker from 'react-datepicker';
import moment from "moment";

class CreateDrive extends Component {
    componentWillMount() {
        this.props.dispatch(clear());
        this.props.dispatch(clearAll());
        if (this.props.location.pathname.match("/edit")) {
            this.props.dispatch(getDriveDetails(this.props.match.params.drive));
        }
        this.props.dispatch(getTest());
        this.props.dispatch(getCollege())
    }

    onSubmit(e) {
        e.preventDefault();
        const self = this.props;
        let validDateTime = false;
        let currentDateTime = new Date().getTime();
        console.log(self.createDrive.startDateUnderstandable, self.createDrive.endDateUnderstandable, "start, end")
        let startDateTime = Date.parse(self.createDrive.startDateUnderstandable);
        let endDateTime = Date.parse(self.createDrive.endDateUnderstandable);
        console.log(startDateTime, endDateTime, "startDateTime, endDateTime")
        console.log(isNaN(startDateTime), "isNaN(startDateTime)");
        console.log(isNaN(endDateTime), "isNaN(endDateTime) ")
        if (isNaN(startDateTime) || isNaN(endDateTime)) {
            validDateTime = false
        } else {
            console.log(currentDateTime, "currentDateTime");
            console.log(startDateTime, "startDateTime");
            console.log(endDateTime, "endDateTime");
            currentDateTime = (Math.floor((currentDateTime / 1000) * 100) / 100).toFixed(0);
            startDateTime = (Math.floor((startDateTime / 1000) * 100) / 100).toFixed(0);
            endDateTime = (Math.floor((endDateTime / 1000) * 100) / 100).toFixed(0);
            console.log(currentDateTime, startDateTime, endDateTime, "currentDateTime, startDateTime, endDateTime")
            if ((startDateTime > currentDateTime) && (endDateTime > startDateTime)) {
                validDateTime = true
            }
        }
        if (e.target.checkValidity() && validDateTime) {
            let body = {};
            if (self.createDrive.type === "open") {
                body = {
                    type: "open",
                    name: self.createDrive.name,
                    start: startDateTime.toString(),
                    end: endDateTime.toString(),
                    startStr: self.createDrive.startDate,
                    endStr: self.createDrive.endDate,
                    test_id: self.createDrive.test_id
                }
            } else {
                body = {
                    type: "college",
                    name: self.createDrive.name,
                    start: startDateTime.toString(),
                    end: endDateTime.toString(),
                    startDateUnderstandable: self.createDrive.startDateUnderstandable,
                    endDateUnderstandable: self.createDrive.endDateUnderstandable,
                    test_id: self.createDrive.test_id,
                    college_id: self.createDrive.college_id
                }
            }
            if (self.location.pathname.match("/edit")) {
                self.dispatch(editDriveDetails(self.match.params.drive, body));
            } else {
                self.dispatch(createDrive(body));
            }
        } else {
            if (!validDateTime) {
                self.dispatch(changeCreateDriveForm(Object.assign(self.createDrive, {invalidDateTimeError: "Invalid start time and end time"})))
            }
            const invalidElmsInput = document.querySelectorAll(".create-drive-form .form-group input:invalid");
            for (let i = 0; i < invalidElmsInput.length; i++) {
                invalidElmsInput[i].parentElement.classList.add("has-error")
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
        if (nextProps.createDriveMessage !== "") {
            if (nextProps.createDriveError) {
                createNotification('error', nextProps.createDriveMessage);
                nextProps.dispatch(clear());
            } else {
                createNotification('success', nextProps.createDriveMessage);
                nextProps.history.push("/dashboard/drive/view")
            }
        }

        if (nextProps.editDriveDetailsMessage !== "") {
            if (nextProps.editDriveDetailsError) {
                createNotification('error', nextProps.editDriveDetailsMessage);
                nextProps.dispatch(clear());
            } else {
                createNotification('success', nextProps.editDriveDetailsMessage);
                nextProps.history.push("/dashboard/drive/view")
            }
        }
    }

    onChange(e) {
        const self = this.props;
        checkValidation(e);
        let newState = Object.assign(self.createDrive, {
            [e.target.id]: e.target.value
        });
        self.dispatch(changeCreateDriveForm(newState));
        if (e.target.id === "type") {
            newState = {
                type: e.target.value,
                name: "",
                startDate: "",
                startDateUnderstandable: "",
                endDate: "",
                endDateUnderstandable: "",
                invalidDateTimeError: "",
                test_id: "",
                tests: self.createDrive.tests,
                college_id: "",
                colleges: self.createDrive.colleges
            };
            self.dispatch(changeCreateDriveForm(newState));
        }
    }

    datePicker_1(startDate) {
        console.log(startDate, "startDate......");
        this.props.dispatch(changeCreateDriveForm(Object.assign(this.props.createDrive, {
            startDate,
            invalidDateTimeError: ""
        })));
    }

    handleOnBlur(event) {
        console.log(event.target.value, "focus out", "old");
        this.props.dispatch(changeCreateDriveForm(Object.assign(this.props.createDrive, {startDateUnderstandable: event.target.value})));

    }

    datePicker_2(endDate) {
        this.props.dispatch(changeCreateDriveForm(Object.assign(this.props.createDrive, {
            endDate,
            invalidDateTimeError: ""
        })));
    }

    endDateFocusOut(event) {
        this.props.dispatch(changeCreateDriveForm(Object.assign(this.props.createDrive, {endDateUnderstandable: event.target.value})));
    }

    render() {
        return (
            <div>
                <AdminOnPageNavigation parentRoute="Dashboard"
                                       childRoute={this.props.location.pathname.match("/edit") ? "Edit Drive" : "Create Drive"}/>
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                        <div className="pool-form-wrapper">
                            <h4 className="content-heading">{this.props.location.pathname.match("/edit") ? "Edit Drive" : "Create Drive"}</h4>
                            <div className="divider"></div>
                            <div className="row">
                                <div className="col-lg-6 col-md-8 col-sm-12">
                                    <div className="">
                                        <form className="create-drive-form" onSubmit={this.onSubmit.bind(this)}
                                              noValidate={true}>
                                            <div className="form-body">
                                                <div className="form-group">
                                                    <label className="control-label mb-10">Drive Type</label>
                                                    <div className="row">
                                                        <div className="col-md-6 col-xs-12 col-sm-12">
                                                            <label className="cstm-radio">Open Drive
                                                                <input type="radio" name="radio"
                                                                       id="type"
                                                                       value="open"
                                                                       disabled={this.props.location.pathname.match("/edit") ? true : false}
                                                                       checked={this.props.createDrive.type === "open" ? true : false}
                                                                       onChange={this.onChange.bind(this)}/>
                                                                <span
                                                                    className="checkmark"></span>
                                                            </label>
                                                        </div>
                                                        <div className="col-md-6 col-xs-12 col-sm-12">
                                                            <label className="cstm-radio">Campus Drive
                                                                <input type="radio" name="radio"
                                                                       id="type"
                                                                       value="college"
                                                                       disabled={this.props.location.pathname.match("/edit") ? true : false}
                                                                       checked={this.props.createDrive.type === "college" ? true : false}
                                                                       onChange={this.onChange.bind(this)}/>
                                                                <span
                                                                    className="checkmark"></span>
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="form-group">
                                                    <label className="control-label mb-5">Drive Name<span className="req">*</span></label>
                                                    <input type="text" name="name"
                                                           id="name"
                                                           onChange={this.onChange.bind(this)}
                                                           pattern="[a-zA-Z][a-zA-Z.\s]{2,}$"
                                                           autoComplete="off"
                                                           required={true}
                                                           className="form-control" placeholder="Enter Drive Name"
                                                           value={this.props.createDrive.name}/>
                                                    <p className="with-error">Please enter drive name (Min 3 characters
                                                        required).</p>

                                                </div>

                                                {
                                                    this.props.createDrive.type === "college" &&
                                                    <div id=""
                                                         className="form-group personal-select-without-error">
                                                        <label className="control-label mb-5">Select College<span className="req">*</span> </label>
                                                        <select className="form-control"
                                                                id="college_id"
                                                                required={true}
                                                                onChange={this.onChange.bind(this)}
                                                                data-placeholder="Choose a College"
                                                                value={this.props.createDrive.college_id}
                                                                tabIndex="1">
                                                            <option value="">Select College</option>
                                                            {
                                                                this.props.colleges.map((c, i) => (
                                                                    <option value={c.id}>{c.name}</option>
                                                                ))
                                                            }
                                                            <option value="others">Others</option>
                                                        </select>
                                                        <p className="with-error">This field is required</p>
                                                    </div>
                                                }


                                                <div id=""
                                                     className="form-group personal-select-without-error">
                                                    <label className="control-label mb-5">Select Test <span className="req">*</span></label>
                                                    <select className="form-control"
                                                            id="test_id"
                                                            required={true}
                                                            onChange={this.onChange.bind(this)}
                                                            data-placeholder="Choose a College"
                                                            value={this.props.createDrive.test_id}
                                                            tabIndex="1">
                                                        <option value="">Select Test</option>
                                                        {
                                                            this.props.tests.map((t, i) => (
                                                                <option value={t.id}>{t.name}</option>
                                                            ))
                                                        }
                                                        <option value="others">Others</option>
                                                    </select>
                                                    <p className="with-error">This field is required</p>
                                                </div>
                                                <div className="form-group">
                                                    <div className="row">
                                                        <div className="col-md-6 col-xs-12 col-sm-12">
                                                            <label className="control-label mb-5">Start Date<span className="req">*</span></label>
                                                            <DatePicker
                                                                selected={this.props.createDrive.startDate}
                                                                onChange={this.datePicker_1.bind(this)}
                                                                onBlur={this.handleOnBlur.bind(this)}
                                                                showTimeSelect
                                                                placeholderText="Start Date"
                                                                timeFormat="HH:mm"
                                                                timeIntervals={60}
                                                                dateFormat="MMMM d, yyyy h:mm aa"
                                                                timeCaption="time"
                                                            />
                                                        </div>
                                                        <div className="col-md-6 col-xs-12 col-sm-12">
                                                            <label className="control-label mb-5">End Date<span className="req">*</span></label>
                                                            <DatePicker
                                                                selected={this.props.createDrive.endDate}
                                                                onBlur={this.endDateFocusOut.bind(this)}
                                                                onChange={this.datePicker_2.bind(this)}
                                                                showTimeSelect
                                                                placeholderText="End Date"
                                                                timeFormat="HH:mm"
                                                                timeIntervals={60}
                                                                dateFormat="MMMM d, yyyy h:mm aa"
                                                                timeCaption="time"
                                                            />

                                                        </div>
                                                    </div>
                                                    <div style={{
                                                        textAlign: "center",
                                                        display: "block",
                                                        color: "#d50000",
                                                        fontSize: "13px",
                                                        padding: "5px 0 0 0"
                                                    }}>{this.props.createDrive.invalidDateTimeError}</div>
                                                </div>
                                                <div className="form-group">
                                                    <button type="submit"
                                                            disabled={((this.props.editDriveDetailsPageLoading || this.props.createDrivePageLoading) ? true : false)}
                                                            className="btn mt-30">{this.props.location.pathname.match("/edit") ? "Edit Drive" : "Create Drive"}</button>
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

const mapStateToProps = state => {
    const {tests} = state.adminTestReducer;
    const {colleges} = state.adminCollegeReducer;
    const {
        getDriveDetailsPageLoading, getDriveDetailsStatus, getDriveDetailsError, getDriveDetailsMessage,
        editDriveDetailsPageLoading, editDriveDetailsStatus, editDriveDetailsError, editDriveDetailsMessage,
        createDrivePageLoading, createDriveError, createDriveMessage, createDriveStatus, createDrive
    } = state.adminDriveReducer;
    console.log(createDrive, "create drive..");
    return {
        tests, colleges,
        getDriveDetailsPageLoading, getDriveDetailsStatus, getDriveDetailsError, getDriveDetailsMessage,
        editDriveDetailsPageLoading, editDriveDetailsStatus, editDriveDetailsError, editDriveDetailsMessage,
        createDrivePageLoading, createDriveError, createDriveMessage, createDriveStatus, createDrive, state
    }
};

export default withRouter(connect(mapStateToProps)(CreateDrive))
