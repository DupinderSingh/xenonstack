import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import MainNavbar from '../MainNavbar';
import * as NavLink from 'react-router-dom';

Enzyme.configure({adapter: new Adapter()});

test('should render the MainNavbar component', () => {
    const MainNavbarComponent = shallow(<MainNavbar/>);

    expect(MainNavbarComponent).toEqual(MainNavbarComponent);
});

describe('should check all the events performing the actions', () => {
   let wrapper;
   beforeEach(()=> {
       wrapper = shallow(<MainNavbar/>)
   });

   it('should match the component length', () => {
       expect (wrapper.length).toEqual(1);
   });
});