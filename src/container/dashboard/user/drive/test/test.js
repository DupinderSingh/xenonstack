/*eslint-disable*/
import React, {Component} from 'react';
import {connect} from 'react-redux';

class AptitudeTest extends Component {
    componentWillMount() {
        document.title = "Drive | Test | Aptitude Test | Xenonstack Hiring Portal";
    }

    render() {
        return (
            <div>
                <aside>
                    <div id="left-sidebar" className="sidebar testbar">
                        <nav className="sidebar-menu">
                            <h3 className="sidebar-head">Section 1</h3>
                            <ul className="sidebar-list question-list">
                                <li className="completed"><a href="user-dashboard.html"> 1</a></li>
                                <li className="review"><a href="user-dashboard.html"> 2</a></li>
                                <li><a href="user-dashboard.html"> 3</a></li>
                                <li className="active"><a href="user-dashboard.html"> 4</a></li>
                                <li><a href="user-dashboard.html"> 5</a></li>
                                <li><a href="user-dashboard.html"> 6</a></li>
                                <li><a href="user-dashboard.html"> 7</a></li>
                                <li><a href="user-dashboard.html"> 8</a></li>
                                <li><a href="user-dashboard.html"> 9</a></li>
                                <li><a href="user-dashboard.html"> 10</a></li>
                                <li><a href="user-dashboard.html"> 11</a></li>
                                <li><a href="user-dashboard.html"> 12</a></li>
                                <li><a href="user-dashboard.html"> 13</a></li>
                                <li><a href="user-dashboard.html"> 14</a></li>
                                <li><a href="user-dashboard.html"> 15</a></li>
                                <li><a href="user-dashboard.html"> 16</a></li>
                                <li><a href="user-dashboard.html"> 17</a></li>
                                <li><a href="user-dashboard.html"> 18</a></li>
                                <li><a href="user-dashboard.html"> 19</a></li>
                                <li><a href="user-dashboard.html"> 20</a></li>
                            </ul>
                        </nav>
                    </div>
                </aside>
                <aside>
                    <div id="right-sidebar" className="sidebar right-sidebar testbar">
                        <nav className="sidebar-menu">
                            <div className="sidebar-inst">
                                <h3 className="sidebar-head">Legends</h3>
                                <ul className="sidebar-list">
                                    <li>
                                        <div className="legends review"></div>
                                        Marked Review
                                    </li>
                                    <li>
                                        <div className="legends completed"></div>
                                        Answered
                                    </li>
                                    <li>
                                        <div className="legends Unanswered"></div>
                                        Unanswered
                                    </li>
                                    <li>
                                        <div className="legends active"></div>
                                        Active
                                    </li>
                                </ul>
                            </div>
                            <div className="sidebar-inst">
                                <h3 className="sidebar-head">Summary</h3>
                                <ul className="sidebar-list">
                                    <li>All Questions : <span>15</span></li>
                                    <li>Marked Review : <span>1</span></li>
                                    <li>Unanswered : <span>1</span></li>
                                    <li>Answered : <span>1</span></li>
                                </ul>
                            </div>
                        </nav>
                    </div>
                </aside>
                <section id="main-content" className="">
                    <div className="content-wrapper">
                        <section className="Question-section">
                            <div className="test-paper-heading">
                                <h3>Online Apptitude Test</h3>
                                <h3>Time Remaining : 00:10:00 </h3>
                            </div>
                            <div className="row">
                                <div className="col-12 col-sm-12 col-md-12 mar-xs-30">
                                    <div className="test-paper-questions">
                                        <h3>Question 1</h3>
                                        <p className="question">Who was the first English President of the Indian
                                            National
                                            Congress ?</p>
                                        <div className="Answer-div">
                                            <ul>
                                                <li>
                                                    <div className="list-number">A</div>
                                                    <span> 6hhjghjgjhg </span></li>
                                                <li>
                                                    <div className="list-number">B</div>
                                                    <span> ghgjhgg </span></li>
                                                <li className="active">
                                                    <div className="list-number">C</div>
                                                    <span> ghgjhgg </span></li>
                                                <li>
                                                    <div className="list-number">D</div>
                                                    <span> ghgjhgg </span></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12 col-sm-4 col-md-4 mar-xs-30">
                                    <div className="form-group btn-group">
                                        <button type="submit" className="btn">Mark Review</button>
                                    </div>
                                </div>
                                <div className="col-12 col-sm-8 offset-md-2 col-md-6 mar-xs-30">
                                    <div className="row">
                                        <div className="col-6 col-sm-6 col-md-6 mar-xs-30">
                                            <div className="form-group btn-group right">
                                                <button type="submit" className="btn">Previous</button>
                                            </div>
                                        </div>
                                        <div className="col-6 col-sm-6 col-md-6 mar-xs-30">
                                            <div className="form-group btn-group right">
                                                <button type="submit" className="btn">Next</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </section>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return state
}

export default connect(mapStateToProps)(AptitudeTest)