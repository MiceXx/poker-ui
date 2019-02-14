import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';
import { Route } from 'react-router-dom';

import HoldEmCalculator from './Holdem/HoldemCalculator';

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
];

class SimpleBottomNavigation extends React.Component {
    state = {};

    handleItemClick = (e, { name }) => this.setState({ activeItem: name });

    render() {
        return (
            <div>
                <Menu fluid widths={3}>
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
            </div>
        );
    }
}

export default SimpleBottomNavigation;