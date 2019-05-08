/*eslint-disable*/
import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {changeFeedbackForm, sendFeedback} from '../../../../actions/dashboard/user/feedback/send-feedback-actions';
import BarLoaderSpinner from "../../../../components/app/spinner/barloader";

class Feedback extends Component {
    componentWillMount() {
        document.title = "Feedback | Xenonstack Hiring Portal";
    }

    componentWillMount() {
        this.props.dispatch(changeFeedbackForm({comment: ""}))
    }

    handleSubmit(e) {
        const self = this.props;
        e.preventDefault();
        if (e.target.checkValidity()) {
            self.dispatch(sendFeedback({comment: self.state.feedbackReducer.feedback.comment}));
        } else {
            const invalidInput = document.querySelectorAll(".send-feedback-form .form-group textarea:invalid");
            for (let i = 0; i < invalidInput.length; i++) {
                console.log(invalidInput[i].parentElement, "parent element....");
                invalidInput[i].parentElement.classList.add("has-error");
            }
        }
    }

    handleChange(e) {
        if (e.target.checkValidity()) {
            e.target.parentElement.classList.remove("has-error");
        } else {
            e.target.parentElement.classList.add("has-error");
        }
        const newFeedBackForm = Object.assign(this.props.state.feedbackReducer.feedback, {comment: e.target.value});
        this.props.dispatch(changeFeedbackForm(newFeedBackForm))
    }

    render() {
        return (
            <section>
                <BarLoaderSpinner pageLoading={this.props.state.feedbackReducer.pageLoading}/>
                <div className="container">
                    <div className="content-detail">
                        <div className="text-center">
                            <h1 className="main-heading-h1">Give Us Feedback</h1>
                        </div>
                        <div className="row">
                            <div className="col-12 col-sm-12 col-md-12 mar-xs-30">

                                    <form className="send-feedback-form" onSubmit={this.handleSubmit.bind(this)}
                                          noValidate={true}>
                                        <div className="row">
                                            <div className="col-12 col-sm-12 col-md-6 form-group text-center">
                                                <figure>
                                                    <img className="coming-soon" src={require("../../../../static/images/feedback.jpg")}
                                                         alt={"coming-soon"}/>
                                                </figure>
                                            </div>
                                            <div className="col-12 col-sm-12  col-md-6">
                                                <div className="form-group mar-t-3">
                                                    <label>Your feedback<span className="req">*</span></label>
                                                    <textarea rows="12"
                                                              name="feedback" className="form-ctrl"
                                                              onChange={this.handleChange.bind(this)}
                                                              required={true}
                                                              minLength={3}
                                                              pattern={"[a-zA-Z][a-zA-Z.\\s]{2,}$"}
                                                              autoComplete={"off"}
                                                              value={this.props.state.feedbackReducer.feedback.comment}
                                                              placeholder="Share your feedback here"></textarea>
                                                    <p className="with-error">Please enter feedback (Min 3 characters
                                                        required).</p>
                                                </div>

                                                {
                                                    this.props.state.feedbackReducer.error &&
                                                    (
                                                        <div className="bPad24px" style={{textAlign: "right"}}>
                                                        <span className="errorText">
                                                            {this.props.state.feedbackReducer.message}
                                                        </span>
                                                        </div>
                                                    )
                                                }
                                                {
                                                    !this.props.state.feedbackReducer.error &&
                                                    (
                                                        <div className="bPad24px" style={{textAlign: "left"}}>
                                                        <span className="errorText success">
                                                            {this.props.state.feedbackReducer.message}
                                                        </span>
                                                        </div>
                                                    )
                                                }
                                                <div className=" mar-b-3">
                                                    <button type="submit" className="btn mar-t-2">Submit</button>
                                                </div>
                                            </div>

                                        </div>

                                    </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

function mapStateToProps(state) {
    return {state}
}

export default withRouter(connect(mapStateToProps)(Feedback))
