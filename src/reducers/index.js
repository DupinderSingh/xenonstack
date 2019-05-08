import {combineReducers} from 'redux';
import LoginReducer from './account/login-reducer';
import emailVerifyReducer from './account/email-verify-reducer';
import RegisterReducer from './account/register-reducer';
import feedbackReducer from './dashboard/user/feedback-reducer';
import forgotPasswordReducer from './account/forgot-password-reducer';
import resetPasswordReducer from './account/reset-password-reducer';
import UserFeedbackReducer from './dashboard/admin/users-feedback-reducer';
import poolReducer from './dashboard/admin/pool-reducer';
import userJobsReducer from './dashboard/user/jobs_reducer';
import adminJobReducer from './dashboard/admin/job-reducer';
import adminTeamReducer from './dashboard/admin/team-reducer';
import userReducer from './dashboard/admin/user-reducer';
import adminTestReducer from './dashboard/admin/test-reducer';
import adminCollegeReducer from './dashboard/admin/college-reducer';
import adminDriveReducer from './dashboard/admin/drive-reducer';
import userDrivesReducer from './dashboard/user/drives_reducer';
import testReducer from './dashboard/user/test_reducer';
import activitiesReducer from './dashboard/user/activities-reducer'

export default combineReducers({
    LoginReducer,
    RegisterReducer,
    feedbackReducer,
    forgotPasswordReducer,
    emailVerifyReducer,
    resetPasswordReducer,
    UserFeedbackReducer,
    poolReducer,
    userJobsReducer,
    adminJobReducer,
    adminTeamReducer,
    userReducer,
    adminTestReducer,
    adminCollegeReducer,
    adminDriveReducer,
    userDrivesReducer,
    testReducer,
    activitiesReducer
})