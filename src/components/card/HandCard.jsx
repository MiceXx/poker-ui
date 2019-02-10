import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import SelectRank from './SelectRank';
import SelectSuit from './SelectSuit';

const styles = {
    card: {
        width: 330,
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
};

function SimpleCard(props) {
    const { classes } = props;

    return (
        <Card className={classes.card}>
            <CardContent>
                <SelectRank />
                <SelectSuit />
            </CardContent>
        </Card >
    );
}

SimpleCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleCard);