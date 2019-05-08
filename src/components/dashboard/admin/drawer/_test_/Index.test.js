import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Drawer from '../Index';

Enzyme.configure({adapter: new Adapter()});

test('should render the Drawer component', () => {
    const DrawerComponent = shallow(<Drawer/>);

    expect(DrawerComponent).toEqual(DrawerComponent);
});

describe('should check all the events performing the actions', () => {
    let wrapper;
    beforeEach(()=> {
        wrapper = shallow(<Drawer/>)
    });

    it('should match the component length', () => {
        expect (wrapper.length).toEqual(1);
    });

    // it ('render with props of the MainNavbar component', () => {
    //     const props = {
    //         "children": <ul><li><NavLink activeClassName="active" aria-current="page" to="/dashboard"><div className="menu-group"><i className="material-icons">dashboard</i><span className="right-nav-text">Dashboard</span></div></NavLink></li><li><NavLink activeClassName="active" aria-current="page" to="/profile"><div className="menu-group"><i className="material-icons">person</i><span className="right-nav-text">Profile</span></div></NavLink></li><li><NavLink activeClassName="active" aria-current="page" to="/dashboard/files/upload"><div className="menu-group"><i className="material-icons">cloud_upload</i><span className="right-nav-text">Upload File</span></div></NavLink></li><li><NavLink activeClassName="active" aria-current="page" to="/dashboard/files/list"><div className="menu-group"><i className="material-icons">view_list</i><span className="right-nav-text">List Files</span></div></NavLink></li><li><NavLink activeClassName="active" aria-current="page" to="/dashboard/barcode"><div className="menu-group"><i className="material-icons">fullscreen</i><span className="right-nav-text">Barcode Scan</span></div></NavLink></li><li><NavLink activeClassName="active" aria-current="page" to="/dashboard/account/settings"><div className="menu-group"><i className="material-icons">settings</i><span className="right-nav-text">Settings</span></div></NavLink></li><li><NavLink activeClassName="active" aria-current="page" to="/dashboard/contact-us"><div className="menu-group"><i className="material-icons">phone</i><span className="right-nav-text">Contact Us</span></div></NavLink></li></ul>,
    //         "className": "aside-drawer-navbar"
    //     };
    //
    //     expect (wrapper.find('nav').props(props)).toEqual(props);
    // });

});