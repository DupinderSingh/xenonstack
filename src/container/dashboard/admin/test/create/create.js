import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import AdminOnPageNavigation from '../../../../../components/dashboard/admin/on_page_navigation/on-page-navigation';
import {getAllPool} from "../../../../../actions/dashboard/admin/pool/pool";
import {
    changeCreateTestForm,
    clearAll,
    clearStatus,
    createTest,
    editTestDetails,
    getTestDetails
} from '../../../../../actions/dashboard/admin/test/test';
import {checkValidation} from "../../../../../actions/app/app";
import createNotification from "../../../../../components/app/notification/notification";
import {NotificationContainer} from 'react-notifications';

class CreateTest extends Component {
    componentWillMount() {
        this.props.dispatch(clearStatus());
        this.props.dispatch(clearAll());
        this.props.dispatch(getAllPool());
        if (this.props.location.pathname.match("/edit")) {
            this.props.dispatch(getTestDetails(this.props.match.params.test_id));
        }
    }

    submitCreateTestForm(e) {
        e.preventDefault();
        const self = this.props;
        const pools = self.createTest.pools;
        let minutesError = false;
        let noOfQuestionsError = false;
        if (self.createTest.duration.match("-") || Number(self.createTest.duration) > 120) {
            minutesError = true
        }
        for (let i in pools) {
            if (pools[i].totalQuestions === "") {
                noOfQuestionsError = true
            } else {
                if (pools[i]["noOfQuestions"] === "" || (pools[i]["noOfQuestions"]).toString().match("-")) {
                    noOfQuestionsError = true
                } else {
                    if (!(Number(pools[i]["noOfQuestions"]) <= Number(pools[i].totalQuestions))) {
                        noOfQuestionsError = true
                    }
                }
            }
        }
        if (e.target.checkValidity() && !minutesError && !noOfQuestionsError) {
            let body = {};
            body.name = self.createTest.name;
            body.duration = self.createTest.duration.toString();
            let newPools = self.createTest.pools;
            for (let i in newPools) {
                newPools[i].noOfQuestions = parseInt(newPools[i]["noOfQuestions"], 10);
            }
            body.pools = newPools;
            if (self.location.pathname.match("/edit")) {
                self.dispatch(editTestDetails(self.match.params.test_id, body));
            } else {
                self.dispatch(createTest(body));
            }
        } else {
            const invalidElmsInput = document.querySelectorAll(".create-test-form .form-group input:invalid");
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
            if (minutesError) {
                document.getElementsByClassName("duration")[0].parentElement.classList.add("has-error");
            }
            if (noOfQuestionsError) {
                const noOfQuestions = document.querySelectorAll(".noOfQuestions");
                for (let i in pools) {
                    if (pools[i].totalQuestions === "") {
                        noOfQuestions[i].parentElement.classList.add("has-error")
                    } else {
                        if (pools[i]["noOfQuestions"] === "" || pools[i]["noOfQuestions"].toString().match("-")) {
                            noOfQuestions[i].parentElement.classList.add("has-error")
                        } else {
                            if (!(Number(pools[i]["noOfQuestions"]) <= Number(pools[i].totalQuestions))) {
                                noOfQuestions[i].parentElement.classList.add("has-error")
                            }
                        }
                    }
                }
            }
        }
    }


    componentWillReceiveProps(nextProps) {
        if (nextProps.location.pathname.match("/edit")) {
            if (this.props.createTest !== nextProps.createTest || this.props.pools !== nextProps.pools) {
                const createTestPools = nextProps.createTest.pools;
                const pools = nextProps.pools;
                const noOfQuestions = document.querySelectorAll(".noOfQuestions");
                for (let i in createTestPools) {
                    if (!!noOfQuestions[i]) {
                        noOfQuestions[i].parentElement.classList.remove("has-error");
                        if (createTestPools[i]["poolId"] === "") {
                            noOfQuestions[i].parentElement.classList.add("has-error");
                            const createTest = nextProps.createTest;
                            createTest.pools[i]["totalQuestions"] = "";
                            nextProps.dispatch(changeCreateTestForm(createTest))
                        } else {
                            for (let index in pools) {
                                if (createTestPools[i]["poolId"] === pools[index]["id"]) {
                                    const createTest = nextProps.createTest;
                                    if (nextProps.createTest.pools[i]["noOfQuestions"] === "" || nextProps.createTest.pools[i]["noOfQuestions"].toString().match("-")) {
                                        noOfQuestions[i].parentElement.classList.add("has-error")
                                    } else {
                                        if (!(Number(nextProps.createTest.pools[i]["noOfQuestions"]) <= Number(pools[index].totalQuestion))) {
                                            noOfQuestions[i].parentElement.classList.add("has-error")
                                        }
                                    }
                                    createTest.pools[i]["totalQuestions"] = pools[index]["totalQuestion"];
                                    nextProps.dispatch(changeCreateTestForm(createTest))
                                }
                            }
                        }
                    }

                }

            }
        }

        if (nextProps.createTestMessage !== "") {
            if (nextProps.error) {
                createNotification('error', nextProps.createTestMessage);
                nextProps.dispatch(clearStatus());
            } else {
                createNotification('success', nextProps.createTestMessage);
                nextProps.history.push("/dashboard/test/list");
            }
        }

        if (nextProps.editTestDetailsMessage !== "") {
            if (nextProps.editTestDetailsError) {
                createNotification('error', nextProps.editTestDetailsMessage);
                nextProps.dispatch(clearStatus());
            } else {
                createNotification('success', nextProps.editTestDetailsMessage);
                nextProps.history.push("/dashboard/test/list");
            }
        }


    }

    addPool() {
        const createTest = this.props.createTest;
        createTest.pools.push({
            totalQuestions: "",
            poolId: "",
            noOfQuestions: ""
        });
        this.props.dispatch(changeCreateTestForm(createTest))
    }

    onChange(e, i) {
        const self = this.props;
        checkValidation(e);
        if (e.target.name === "poolId") {
            const pools = self.pools;
            const noOfQuestions = document.querySelectorAll(".noOfQuestions");
            (noOfQuestions[i].parentElement).classList.remove("has-error");
            if (e.target.value === "") {
                noOfQuestions[i].parentElement.classList.add("has-error");
                const createTest = self.createTest;
                createTest.pools[i]["totalQuestions"] = "";
                self.dispatch(changeCreateTestForm(createTest))
            } else {
                for (let index in pools) {
                    if (e.target.value === pools[index]["id"]) {
                        const createTest = self.createTest;
                        if (self.createTest.pools[i]["noOfQuestions"] === "" || self.createTest.pools[i]["noOfQuestions"].toString().match("-")) {
                            noOfQuestions[i].parentElement.classList.add("has-error")
                        } else {
                            if (!(Number(self.createTest.pools[i]["noOfQuestions"]) <= Number(pools[index].totalQuestion))) {
                                noOfQuestions[i].parentElement.classList.add("has-error")
                            }
                        }
                        createTest.pools[i]["totalQuestions"] = pools[index]["totalQuestion"];
                        self.dispatch(changeCreateTestForm(createTest))
                    }
                }
            }
        }
        if (e.target.name === "noOfQuestions") {
            const totalQuestions = self.createTest.pools[i]["totalQuestions"];
            if (totalQuestions !== "") {
                if (e.target.value !== "" && !e.target.value.toString().match("-")) {
                    if (!(Number(e.target.value) <= Number(totalQuestions))) {
                        e.target.parentElement.classList.add("has-error")
                    }
                } else {
                    e.target.parentElement.classList.add("has-error")
                }
            } else {
                e.target.parentElement.classList.add("has-error")
            }
        }
        const createTest = self.createTest;
        createTest.pools[i][e.target.name] = e.target.value;
        self.dispatch(changeCreateTestForm(createTest))
    }

    handleChange(e) {
        const self = this.props;
        checkValidation(e);
        if (e.target.name === "duration") {
            if (e.target.value.match("-") || Number(e.target.value > 120)) {
                e.target.parentElement.classList.add("has-error");
            }
        }
        const newState = Object.assign(self.createTest, {
            [e.target.name]: e.target.value
        });
        self.dispatch(changeCreateTestForm(newState))
    }

    removeTest(e, index) {
        const createTest = this.props.createTest;
        createTest.pools.splice(index, 1);
        // let newState = createTest;
        this.props.dispatch(changeCreateTestForm(createTest))
    }

    render() {
        return (
            <div>
                <AdminOnPageNavigation parentRoute="Dashboard"
                                       childRoute={this.props.location.pathname.match("/edit") ? "Edit Test" : "Create Test"}/>
                <div className="row">
                    <div className="col-lg-12 col-sm-12 col-xs-12">
                        {
                            (!this.props.pageLoading && this.props.pools.length === 0 && this.props.message === "") &&
                            <span style={{color: "red"}}>No Pool found</span>
                        }
                        {
                            !this.props.pageLoading && this.props.message !== "" &&
                            <span style={{color: "red"}}>{this.props.message}</span>
                        }
                        {
                            !this.props.getTestDetailsPageLoading && this.props.getTestDetailsMessage !== "" &&
                            <span style={{color: "red"}}>{this.props.getTestDetailsMessage}</span>
                        }
                        <div className="pool-form-wrapper">
                            <h4 className="content-heading">{this.props.location.pathname.match("/edit") ? "Edit Test" : "Create Test"}</h4>
                            <div className="divider"></div>
                            <div className="row">
                                <div className="col-lg-6 col-md-8 col-sm-12">
                                    <form onSubmit={this.submitCreateTestForm.bind(this)} noValidate={true}
                                          className="create-test-form">
                                        <div className="form-group">
                                            <label className="control-label mb-5">Test Name <span className="req">*</span></label>
                                            <input type="text" name="name" className="form-control"
                                                   onChange={this.handleChange.bind(this)}
                                                   pattern={"[a-zA-Z][a-zA-Z.\\s]{2,}$"}
                                                   value={this.props.createTest.name}
                                                   placeholder="Test Name"
                                                   required={true}/>
                                            <p className="with-error">Please enter test name (Min 3 characters
                                                required).</p>
                                        </div>
                                        <div className="form-group">
                                            <label className="control-label mb-5">Test Duration <span className="req">*</span></label>
                                            <input type="number" name="duration" className="form-control duration"
                                                   onChange={this.handleChange.bind(this)}
                                                   value={this.props.createTest.duration}
                                                   placeholder="Test Duration in minutes"
                                                   required={true}/>
                                            <p className="with-error">Please enter valid minutes. You can add upto 120 minutes.</p>
                                        </div>
                                        {
                                            this.props.createTest.pools.map((d, i) => (
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <div className="form-group">
                                                            <label className="control-label mb-5">Total
                                                                Questions</label>
                                                            <input type="text"
                                                                   disabled={true}
                                                                   value={d.totalQuestions}
                                                                   name="totalQuestions"
                                                                   className="form-control form-group totalQuestions"
                                                                   placeholder="Total Questions"/>
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-5 col-md-5">
                                                        <div className="form-group personal-select-without-error">
                                                            <label className="control-label mb-5">Select Pool<span className="req">*</span></label>
                                                            <select className="form-control" name="poolId"
                                                                    onChange={(e) => this.onChange(e, i)}
                                                                    value={d.poolId}>
                                                                <option value="">Select Pool</option>
                                                                {
                                                                    d.poolId !== "" &&
                                                                    <option value={d.poolId}>{d.poolId}</option>
                                                                }
                                                                {
                                                                    !this.props.pageLoading &&
                                                                    this.props.pools.map((p, i) => (
                                                                        this.props.createTest.pools.every((pool) => p.id !== pool.poolId) === true &&
                                                                        <option value={p.id}>{p.id}</option>
                                                                    ))

                                                                }
                                                            </select>
                                                            <p className="with-error">This field is required.</p>
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-5 col-md-5">
                                                        <div className="form-group">
                                                            <label className="control-label mb-5">Select
                                                                Questions<span className="req">*</span></label>
                                                            <input type="number" name="noOfQuestions"
                                                                   className="form-control noOfQuestions"
                                                                   value={d.noOfQuestions}
                                                                   onChange={(e) => this.onChange(e, i)}

                                                                   placeholder="Questions" required={true}/>
                                                            <p className="with-error">Please enter valid number of
                                                                questions.</p>
                                                            {
                                                                (d.totalQuestions !== "" &&
                                                                    d.noOfQuestions !== "" && !d.noOfQuestions.toString().match("-") && (Number(d.noOfQuestions) <= Number(d.totalQuestions))) &&
                                                                <p style={{
                                                                    display: "block",
                                                                    color: "green",
                                                                    fontSize: "13px",
                                                                    padding: "5px 0 0 0"
                                                                }}>You can add {d.totalQuestions - d.noOfQuestions} more
                                                                    questions</p>
                                                            }
                                                        </div>
                                                    </div>
                                                    {
                                                        i !== 0 &&
                                                        <div className="col-md-2 col-sm-2 col-3">
                                                            <div className="form-group">
                                                                <div className="add-div"
                                                                     onClick={(e) => this.removeTest(e, i)}>
                                                                    <span><i class="material-icons"
                                                                             style={{top: "8px"}}>close</i></span></div>
                                                            </div>
                                                        </div>
                                                    }
                                                </div>
                                            ))
                                        }

                                        <div className="row">
                                            <div className="col-md-6 col-sm-12 col-lg-6">
                                                <div className="form-group">
                                                    <button type="button" onClick={this.addPool.bind(this)}
                                                            className="btn"> + new pool
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="col-md-12 col-sm-12 col-lg-12">
                                                <div className="form-group">
                                                    <button type="submit"
                                                            disabled={((this.props.createTestPageLoading || this.props.editTestDetailsPageLoading) ? true : false)}
                                                            className="btn mt-30">{this.props.location.pathname.match("/edit") ? "Edit Test" : "Create Test"}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
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
    const {pools, pageLoading, error, message, status} = state.poolReducer;
    const {
        editTestDetailsPageLoading, editTestDetailsStatus, editTestDetailsError, editTestDetailsMessage,
        getTestDetailsPageLoading, getTestDetailsStatus, getTestDetailsError, getTestDetailsMessage,
        createTestPageLoading, createTest, createTestError, createTestMessage, createTestStatus
    } = state.adminTestReducer;
    const existingPools = createTest.pools;
    return {
        pools, pageLoading, error, message, status,
        editTestDetailsPageLoading, editTestDetailsStatus, editTestDetailsError, editTestDetailsMessage,
        getTestDetailsPageLoading, getTestDetailsStatus, getTestDetailsError, getTestDetailsMessage,
        existingPools, createTestPageLoading, createTest, createTestError, createTestMessage, createTestStatus, state
    }
}

export default withRouter(connect(mapStateToProps)(CreateTest))
