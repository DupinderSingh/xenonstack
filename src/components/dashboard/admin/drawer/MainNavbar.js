import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';

class MainNavbar extends Component {
    render() {
        return (
            <nav className="aside-drawer-navbar">
                <ul>
                    <li>
                        <NavLink to="/dashboard">
                            <div className="menu-group">
                                <i className="material-icons">dashboard</i>
                                <span className="right-nav-text">Dashboard</span>
                            </div>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/profile">
                            <div className="menu-group">
                                <i className="material-icons">person</i>
                                <span className="right-nav-text">Profile</span>
                            </div>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/account/settings">
                            <div className="menu-group">
                                <i className="material-icons">local_mall</i>
                                <span className="right-nav-text">Carrer</span>
                            </div>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/account/settings">
                            <div className="menu-group">
                                <i className="material-icons">assignment</i>
                                <span className="right-nav-text">Test</span>
                            </div>
                        </NavLink>
                    </li>
                </ul>
            </nav>
        );
    }
}

export default MainNavbar;
