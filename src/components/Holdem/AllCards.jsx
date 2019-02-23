// @ts-check

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Segment } from 'semantic-ui-react';
import { selectCard } from '../../store/holdem/actions';

const AllCards_style = {
    color: {
        backgroundColor: 'rgb(169, 236, 248)'
    },
}

function AllCards(props) {
    const { availableCards, selectCard, dealingPosition } = props;

    return (
        <Segment textAlign='center' style={AllCards_style.color}>
            <div className="hand hhand-compact active-hand">
                {availableCards.map(card => (
                    <img
                        key={card}
                        alt=''
                        src={`/images/cards/${card}.svg`}
                        className='card'
                        onClick={() => selectCard(card, dealingPosition)} />
                ))}
            </div>
        </Segment >
    );
}

AllCards.propTypes = {
    availableCards: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => {
    return {
        availableCards: state.holdem.availableCards,
        dealingPosition: state.table.dealingPosition,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        selectCard: (card, position) => dispatch(selectCard(card, position)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AllCards);