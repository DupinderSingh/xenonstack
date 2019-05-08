/*eslint-disable*/
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {beginTest, clearAll} from '../../../../../actions/dashboard/user/test/xenonstack-test.js'

class TestInstruction extends Component {
    componentWillMount() {
        this.props.dispatch(clearAll());
        document.title = "Drive | Test | Instructions | Xenonstack Hiring Portal";
    }

    beginTest() {
        const url = window.location.href;
        const requiredUrl = new URL(url);
        const token = requiredUrl.searchParams.get("token");
        const drive_id = requiredUrl.searchParams.get("drive_id");
        const test_id = requiredUrl.searchParams.get("test_id");
        this.props.dispatch(beginTest(token, drive_id, test_id));
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (this.props.testToken !== nextProps.testToken) {
            nextProps.history.push("/test/started");
        }
    }

    render() {
        return (
            <section id="main-content" className="test-page">
                <div className="row">
                    <div className="col-md-12">
                        <div className="content-wrapper">
                            <section className="Question-section">
                                <div className="test-paper-heading">
                                    <h3>Online Apptitude Test</h3>
                                    <h3>Total questions : 30</h3>
                                    <h3>Test Duration : 1hr</h3>
                                </div>
                                <div className="row">
                                    <div className="col-12 col-sm-12 col-md-12 mar-xs-30">
                                        <div className="test-paper-questions">
                                            <h3 className="">Instructions to read first before the test...</h3>
                                            <h4 className="subtitle">Before starting the test, Please read the following
                                                instruction given below carefully.</h4>
                                            <div className="instructions-list">
                                                <ul className="doc-list unordered plus-list-item">
                                                    <li>You are not allowed to open or switch to other tab. In case If
                                                        you do your test window will be blocked.
                                                    </li>
                                                    <li>This Test will comprise of 10 Multiple Choice Questions of 90
                                                        minutes duration. Each question will have 4 alternatives.
                                                    </li>
                                                    <li>Only one question will be displayed on the computer screen at a
                                                        time.
                                                    </li>
                                                    <li> You can navigate between questions either by clicking on
                                                        'Previous'/ 'Next' or by directly clicking on the question
                                                        numbers which are displayed in the left side question list.
                                                    </li>
                                                    <li> You can 'Bookmark' questions to review before submitting by
                                                        clicking review button.
                                                    </li>
                                                    <li>The answered question will be marked green and the unanswered /
                                                        skipped question numbers will remain in grey.
                                                    </li>
                                                    <li>Total time to finish the test is 90 minutes. Your test window is
                                                        automatically logout when time finish.
                                                    </li>
                                                    <li> There is no negative marking.</li>
                                                </ul>
                                            </div>
                                            <div className="col-12 col-sm-12 col-md-8 form-group">
                                                <label className="cstm-checkbox"> I have read and understood the
                                                    instructions. I agree that in case of not adhering to the
                                                    instructions, I shall be liable to be debarred from this Test and/or
                                                    to disciplinary action, which may include ban from future Tests.
                                                    <input type="checkbox"/> <span className="checkmark"></span>
                                                </label>
                                            </div>

                                            <div className="col-12 col-sm-12 col-md-8 form-group btn-group">
                                                <a onClick={this.beginTest.bind(this)} className="btn mar-t-6">Ready to
                                                    begin</a>
                                            </div>
                                            {
                                                this.props.beginTestError &&
                                                <div>
                                                    <span style={{color: "red"}}>{this.props.beginTestMessage}</span>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

function mapStateToProps(state) {
    const {beginTestError, beginTestMessage, beginTestStatus, beginTestPageLoading, testToken, testExpire} = state.testReducer;
    return {beginTestError, beginTestMessage, beginTestStatus, beginTestPageLoading, testToken, testExpire}
}

export default connect(mapStateToProps)(TestInstruction)