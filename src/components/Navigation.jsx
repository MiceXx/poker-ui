import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';
import { Route } from 'react-router-dom';

import HoldEmCalculator from './Holdem/HoldemCalculator';
import TestComponent from './TestComponent/TestComponent';

const navOptions = [
    {
        key: 'holdem',
        to: '/holdem',
        name: 'Holdem',
    },
    {
        key: 'omaha',
        to: '/omaha',
        name: 'Omaha',
    },
    {
        key: 'stud',
        to: '/stud',
        name: 'Stud',
    },
    {
        key: 'test',
        to: '/test',
        name: 'Test',
    },
];

class SimpleBottomNavigation extends React.Component {
    state = {};

    handleItemClick = (e, { name }) => this.setState({ activeItem: name });

    render() {
        return (
            <div>
                <Menu fluid widths={4} inverted>
                    {navOptions.map(item => <Menu.Item
                        as={Link}
                        {...item}
                        onClick={this.handleItemClick} />
                    )}
                </Menu>
                <Route exact path="/" component={HoldEmCalculator} />
                <Route path="/holdem" component={HoldEmCalculator} />
                <Route path="/omaha" component={HoldEmCalculator} />
                <Route path="/stud" component={HoldEmCalculator} />
                <Route path="/test" component={TestComponent} />
            </div>
        );
    }
}

export default SimpleBottomNavigation;