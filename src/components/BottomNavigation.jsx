import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
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

const styles = {
    root: {
        width: "100%",
        position: "fixed",
        bottom: "0"
    },
};

class SimpleBottomNavigation extends React.Component {
    state = {
        value: 0,
    };

    render() {
        const { classes } = this.props;
        const { value } = this.state;

        return (
            <BottomNavigation
                value={value}
                showLabels
                className={classes.root}
            >
                {buttons.map(button => (
                    <BottomNavigationAction
                        component={Link}
                        {...button}
                    />
                )
                )}
            </BottomNavigation>
        );
    }
}

SimpleBottomNavigation.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleBottomNavigation);