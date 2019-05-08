import React, {Component} from 'react';
import {NavLink, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

class AdminSidebar extends Component {
    componentWillReceiveProps(nextProps, nextContext) {
        const allRoutes = document.querySelectorAll("a");
        for (let i = 0; i < allRoutes.length; i++) {
            allRoutes[i].classList.remove("collapsed");
            allRoutes[i].classList.add("collapsed");
            allRoutes[i].setAttribute("aria-expanded", "false");

            allRoutes[i].classList.remove("active");
            allRoutes[i].removeAttribute("aria-current");
        }

        const allRoutesUl = document.querySelectorAll("ul");
        for (let i = 0; i < allRoutesUl.length; i++) {
            allRoutesUl[i].setAttribute("aria-expanded", "false");
            allRoutesUl[i].classList.remove("in")
        }

        switch (nextProps.location.pathname) {
            case "/dashboard":
                document.querySelector("li a[href='/dashboard']").setAttribute("aria-expanded", "true");
                return 0
            case "/dashboard/candidate/list":
                document.querySelector("li a[href='/dashboard/candidate/list']").setAttribute("aria-expanded", "true");
                return 0
            case "/dashboard/pool/list":
                document.querySelector("li a[href='/dashboard/pool/list']").setAttribute("aria-expanded", "true");
                return 0
            case "/dashboard/college/add":
                document.querySelector("li a[href='/dashboard/college/add']").setAttribute("aria-expanded", "true");
                return 0
            case "/dashboard/test/create":
                document.querySelector("a[data-target='#test_dr']").setAttribute("aria-expanded", "true");
                document.querySelector("ul#test_dr").classList.add("in");
                document.querySelector("ul#test_dr").setAttribute("aria-expanded", "true");
                document.querySelector("li a[href='/dashboard/test/create']").classList.add("active")
                document.querySelector("li a[href='/dashboard/test/create']").setAttribute("aria-current", "page");
                document.querySelector("li a[href='/dashboard/test/create']").setAttribute("aria-expanded", "true");
                return 0
            case "/dashboard/test/list" :
                document.querySelector("a[data-target='#test_dr']").setAttribute("aria-expanded", "true");
                document.querySelector("ul#test_dr").classList.add("in");
                document.querySelector("ul#test_dr").setAttribute("aria-expanded", "true");
                document.querySelector("li a[href='/dashboard/test/list']").classList.add("active")
                document.querySelector("li a[href='/dashboard/test/list']").setAttribute("aria-current", "page");
                document.querySelector("li a[href='/dashboard/test/list']").setAttribute("aria-expanded", "true");
                return 0

            case "/dashboard/drive/create" :
                document.querySelector("a[data-target='#drive_dr']").setAttribute("aria-expanded", "true");
                document.querySelector("ul#drive_dr").classList.add("in");
                document.querySelector("ul#drive_dr").setAttribute("aria-expanded", "true");
                document.querySelector("li a[href='/dashboard/drive/create']").classList.add("active")
                document.querySelector("li a[href='/dashboard/drive/create']").setAttribute("aria-current", "page");
                document.querySelector("li a[href='/dashboard/drive/create']").setAttribute("aria-expanded", "true");
                return 0

            case "/dashboard/drive/view" :
                document.querySelector("a[data-target='#drive_dr']").setAttribute("aria-expanded", "true");
                document.querySelector("ul#drive_dr").classList.add("in");
                document.querySelector("ul#drive_dr").setAttribute("aria-expanded", "true");
                document.querySelector("li a[href='/dashboard/drive/view']").classList.add("active")
                document.querySelector("li a[href='/dashboard/drive/view']").setAttribute("aria-current", "page");
                document.querySelector("li a[href='/dashboard/drive/view']").setAttribute("aria-expanded", "true");
                return 0

            case "/dashboard/team/list" :
                document.querySelector("a[data-target='#test_dr_new']").setAttribute("aria-expanded", "true");
                document.querySelector("ul#test_dr_new").classList.add("in");
                document.querySelector("ul#test_dr_new").setAttribute("aria-expanded", "true");
                document.querySelector("li a[href='/dashboard/test/list']").classList.add("active")
                document.querySelector("li a[href='/dashboard/test/list']").setAttribute("aria-current", "page");
                document.querySelector("li a[href='/dashboard/test/list']").setAttribute("aria-expanded", "true");
                return 0

            case "/dashboard/team/create" :
                document.querySelector("a[data-target='#test_dr_new']").setAttribute("aria-expanded", "true");
                document.querySelector("ul#test_dr_new").classList.add("in");
                document.querySelector("ul#test_dr_new").setAttribute("aria-expanded", "true");
                document.querySelector("li a[href='/dashboard/team/create']").classList.add("active")
                document.querySelector("li a[href='/dashboard/team/create']").setAttribute("aria-current", "page");
                document.querySelector("li a[href='/dashboard/team/create']").setAttribute("aria-expanded", "true");
                return 0

            case "/dashboard/job/list" :
                document.querySelector("a[data-target='#test_dr_new']").setAttribute("aria-expanded", "true");
                document.querySelector("ul#test_dr_new").classList.add("in");
                document.querySelector("ul#test_dr_new").setAttribute("aria-expanded", "true");
                document.querySelector("li a[href='/dashboard/job/list']").classList.add("active")
                document.querySelector("li a[href='/dashboard/job/list']").setAttribute("aria-current", "page");
                document.querySelector("li a[href='/dashboard/job/list']").setAttribute("aria-expanded", "true");
                return 0

            case "/dashboard/job/create" :
                document.querySelector("a[data-target='#test_dr_new']").setAttribute("aria-expanded", "true");
                document.querySelector("ul#test_dr_new").classList.add("in");
                document.querySelector("ul#test_dr_new").setAttribute("aria-expanded", "true");
                document.querySelector("li a[href='/dashboard/job/create']").classList.add("active")
                document.querySelector("li a[href='/dashboard/job/create']").setAttribute("aria-current", "page");
                document.querySelector("li a[href='/dashboard/job/create']").setAttribute("aria-expanded", "true");
                return 0


            case "/dashboard/feedback/unarchived" :
                document.querySelector("a[data-target='#feedback_dr']").setAttribute("aria-expanded", "true");
                document.querySelector("ul#feedback_dr").classList.add("in");
                document.querySelector("ul#feedback_dr").setAttribute("aria-expanded", "true");
                document.querySelector("li a[href='/dashboard/feedback/unarchived']").classList.add("active")
                document.querySelector("li a[href='/dashboard/feedback/unarchived']").setAttribute("aria-current", "page");
                document.querySelector("li a[href='/dashboard/feedback/unarchived']").setAttribute("aria-expanded", "true");
                return 0

            case "/dashboard/feedback/archived" :
                document.querySelector("a[data-target='#feedback_dr']").setAttribute("aria-expanded", "true");
                document.querySelector("ul#feedback_dr").classList.add("in");
                document.querySelector("ul#feedback_dr").setAttribute("aria-expanded", "true");
                document.querySelector("li a[href='/dashboard/feedback/archived']").classList.add("active")
                document.querySelector("li a[href='/dashboard/feedback/archived']").setAttribute("aria-current", "page");
                document.querySelector("li a[href='/dashboard/feedback/archived']").setAttribute("aria-expanded", "true");
                return 0


        }

    }

    render() {
        return (
            <div className="fixed-sidebar-left custom-sidebar-left">
                <ul className="nav navbar-nav side-nav nicescroll-bar">
                    <li className="navigation-header"><span>Navigation</span> <i
                        className="material-icons">more_horiz</i></li>
                    <li>
                        <NavLink to="/dashboard">
                            <div className="pull-left"><i className="material-icons">dashboard</i><span
                                className="right-nav-text">Dashboard</span></div>
                            <div className="clearfix"></div>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/candidate/list">
                            <div className="pull-left"><i className="material-icons">people</i><span
                                className="right-nav-text">Candidates</span></div>
                            <div className="clearfix"></div>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/pool/list">
                            <div className="pull-left"><i className="material-icons">insert_drive_file</i><span
                                className="right-nav-text">Manage Pool</span></div>
                            <div className="clearfix"></div>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/college/add">
                            <div className="pull-left"><i className="material-icons">people</i><span
                                className="right-nav-text">Manage College</span></div>
                            <div className="clearfix"></div>
                        </NavLink>
                    </li>
                    <li>
                        <a href="javascript:void(0);" data-toggle="collapse" data-target="#test_dr">
                            <div className="pull-left"><i className="material-icons">content_paste</i><span
                                className="right-nav-text">Manage Test</span>
                            </div>
                            <div className="pull-right"><i className="zmdi zmdi-caret-down"></i></div>
                            <div className="clearfix"></div>
                        </a>
                        <ul id="test_dr" className="collapse collapse-level-1">
                            <li><NavLink to="/dashboard/test/create">Create Test</NavLink></li>
                            <li><NavLink to="/dashboard/test/list">List Test</NavLink></li>

                        </ul>
                    </li>
                    <li>
                        <a href="javascript:void(0);" data-toggle="collapse" data-target="#drive_dr">
                            <div className="pull-left"><i className="material-icons">chrome_reader_mode</i><span
                                className="right-nav-text">Manage Drive</span>
                            </div>
                            <div className="pull-right"><i className="zmdi zmdi-caret-down"></i></div>
                            <div className="clearfix"></div>
                        </a>
                        <ul id="drive_dr" className="collapse collapse-level-1">
                            <li><NavLink to="/dashboard/drive/create">Create Drive</NavLink></li>
                            <li><NavLink to="/dashboard/drive/view">View Drive</NavLink></li>
                        </ul>
                    </li>
                    <li>
                        <a href="javascript:void(0);" data-toggle="collapse" data-target="#test_dr_new">
                            <div className="pull-left"><i className="material-icons">business_center</i><span
                                className="right-nav-text">Manage Job</span>
                            </div>
                            <div className="pull-right"><i className="zmdi zmdi-caret-down"></i></div>
                            <div className="clearfix"></div>
                        </a>
                        <ul id="test_dr_new" className="collapse collapse-level-1">
                            <li><NavLink to="/dashboard/team/list">View Team</NavLink></li>
                            <li><NavLink to="/dashboard/team/create">Create Team</NavLink></li>
                            <li><NavLink to="/dashboard/job/list">View Job</NavLink></li>
                            <li><NavLink to="/dashboard/job/create">Create Job</NavLink></li>
                        </ul>
                    </li>
                    <li>
                        <a href="javascript:void(0);" data-toggle="collapse" data-target="#feedback_dr">
                            <div className="pull-left"><i className="material-icons">chrome_reader_mode</i><span
                                className="right-nav-text">Feedback</span>
                            </div>
                            <div className="pull-right"><i className="zmdi zmdi-caret-down"></i></div>
                            <div className="clearfix"></div>
                        </a>
                        <ul id="feedback_dr" className="collapse collapse-level-1">
                            <li><NavLink to="/dashboard/feedback/unarchived">Unarchived Feedbacks</NavLink></li>
                            <li><NavLink to="/dashboard/feedback/archived">Archived Feedbacks</NavLink></li>
                        </ul>
                    </li>
                </ul>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return state
}

export default withRouter(connect(mapStateToProps)(AdminSidebar))
