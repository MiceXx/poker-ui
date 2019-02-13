import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';
import { ReactComponent as PokerChipIcon } from '../icons/poker-chip.svg';
import { ReactComponent as PlayingCardsIcon } from '../icons/playing-cards.svg';
import { ReactComponent as Dice } from '../icons/dice.svg';

const buttons = [
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
            <Menu>
                {buttons.map(button => (
                    <Menu.Item
                        as={Link}
                        {...button}
                        onClick={this.handleItemClick}
                    />
                )
                )}
            </Menu>
        );
    }
}

export default SimpleBottomNavigation;