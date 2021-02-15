import React from 'react';
import enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

React.useLayoutEffect = React.useEffect;
enzyme.configure({ adapter: new Adapter() });
