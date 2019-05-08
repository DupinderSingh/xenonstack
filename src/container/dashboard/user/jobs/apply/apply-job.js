import React, {Component} from 'react';
import {connect} from 'react-redux';
import Button from '../../../../../components/app/button/button';
import TestList from "../../../../../components/dashboard/user/jobs/apply/test-list";
import TestInstruction from "../../../../../components/dashboard/user/jobs/apply/test-instructions";

class ApplyJob extends Component{
    render() {
        return (
            <section className="user-dashboard-section">
                <div className="wrapper">
                    <div className="section_header">
                        <h2 className="big-heading">Thanks for Applying job for <i>{this.props.match.params.job}</i> with Xenonstack</h2>
                        <h4 className="subtitle">Before starting the test, Please read the following instruction given below carefully.</h4>
                        <div className="instructions-list">
                          <TestInstruction/>
                        </div>
                    </div>
                    <div className="user-dashboard-content">
                        <h2 className="page-heading text-center">Test Series</h2>
                        <TestList/>
                        <div><p><span style={{color: "red"}}>NOTE:</span> Wating mail sent to your registered email address. Please wait for 2-3 business days, you will get a call or message if you cleared first round.</p></div>
                    </div>
                    <div className="form-group btn-group">
                        <Button type="submit" disabled={true} className="btn" text="Start Test"/>
                    </div>
                </div>
            </section>            
        )
    }
}

function mapStateToProps(state) {
    return state
}
export default connect(mapStateToProps)(ApplyJob)