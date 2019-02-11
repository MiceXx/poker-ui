import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { ALL_CARDS } from '../../constants';
import CardContent from '@material-ui/core/CardContent';

const styles = {
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
                <div className="hand hhand-compact active-hand">
                    {ALL_CARDS.map(card => (
                        <img className='card' key={card} src={`/images/cards/${card}.svg`} />
                    ))}
                </div>
            </CardContent>
        </Card >
    );
}

SimpleCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleCard);