import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import './dist/style.css';
import MainNavbar from './MainNavbar';

class Drawer extends Component {

  handleSidebarHover(){
    if(window.innerWidth > 1025){
      let sidebarWrapper = document.querySelector('.main-body-wrapper.sidebar-toggled');
      if(sidebarWrapper !== null){
         sidebarWrapper.classList.add('sidebar-hovered');
      }
    }
  }
  handleSidebarUnHover(){
    if(window.innerWidth > 1025){
      let sidebarWrapper = document.querySelector('.main-body-wrapper.sidebar-toggled');
      if(sidebarWrapper !== null){
         sidebarWrapper.classList.remove('sidebar-hovered');
      }
    }
  }

  render() {
    return (
      <aside id="sidebarWrapper" className="left-aside-drawer fixed-sidebar" onMouseEnter={this.handleSidebarHover.bind(this)}  onMouseLeave={this.handleSidebarUnHover.bind(this)} >
        <MainNavbar />
      </aside>
    );
  }
}

function mapStateToProps(state) {
    const  {drawerToggle, dashboardType} = state.layoutReducer;
    return {drawerToggle, dashboardType}
  }
export default withRouter(connect(mapStateToProps)(Drawer));
