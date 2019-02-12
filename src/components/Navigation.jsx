import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Menu } from 'semantic-ui-react'
import { ReactComponent as PokerChipIcon } from '../icons/poker-chip.svg';
import { ReactComponent as PlayingCardsIcon } from '../icons/playing-cards.svg';
import { ReactComponent as Dice } from '../icons/dice.svg';

const buttons = [
    {
        label: 'Holdem',
        key: 'holdem',
        to: '/holdem',
        name: 'Holdem',
        icon: <PokerChipIcon />,
    },
    {
        label: 'Omaha',
        key: 'omaha',
        to: '/omaha',
        name: 'Omaha',
        icon: <Dice />,
    },
    {
        label: 'Stud',
        key: 'stud',
        to: '/stud',
        name: 'Stud',
        icon: <PlayingCardsIcon />,
    },
];

class SimpleBottomNavigation extends React.Component {
    state = {};

    handleItemClick = (e, { name }) => this.setState({ activeItem: name });

    render() {
        const { classes } = this.props;
        const { value } = this.state;

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

SimpleBottomNavigation.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default SimpleBottomNavigation;