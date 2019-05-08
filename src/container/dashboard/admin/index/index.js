import React, {Component} from 'react';
import AdminOnPageNavigation from '../../../../components/dashboard/admin/on_page_navigation/on-page-navigation';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import TotalApplied from './total-applied';
import ShortlistedCandidates from './shortedlisted-candidates';
import PlannedInterviews from './planned-interviews';
import HiredCandidates from './hired-candidates';
import Candidates from './candidates';
import Feedbacks from './feedbacks';
import Drives from './drives';
import Interviews from './interviews';

class Dashboard extends Component {
    render() {
        return (
            <div>
                <AdminOnPageNavigation parentRoute="Dashboard" childRoute=""/>
                <div className="row">
                    <TotalApplied/>
                    <ShortlistedCandidates/>
                    <PlannedInterviews/>
                    <HiredCandidates/>
                </div>
                <div className="row">
                    <Candidates/>
                    <Feedbacks/>
                </div>
                <div className="row">
                    <Drives/>
                    <Interviews/>
                </div>
            </div>
        )
    }
}

export default withRouter(connect(null)(Dashboard))
