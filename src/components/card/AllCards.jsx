import React from 'react';
import PropTypes from 'prop-types';
import { ALL_CARDS } from '../../constants';

function AllCards() {
    return (
        <div style={{ margin: 15 }}>
            <div className="hand hhand-compact active-hand">
                {ALL_CARDS.map(card => (
                    <img className='card' key={card} src={`/images/cards/${card}.svg`} />
                ))}
            </div>
        </div >
    );
}

AllCards.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default AllCards;