import React from 'react';
import PropTypes from 'prop-types';

function SimpleCard() {
    return (
        <div className={{ margin: 20 }}>
            {'Win Chance'}
        </div>
    );
}

SimpleCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default SimpleCard;