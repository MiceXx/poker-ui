import React from 'react';
import PropTypes from 'prop-types';
import { Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { unselectCard } from '../../store/holdem/actions';

function SelectedCards(props) {
    const { selectedCards, unselectCard } = props;
    return (
        <div>
            {'Win Chance'}
            <div className="hand  active-hand">
                {selectedCards.map(card => (
                    <img
                        className='card'
                        key={card}
                        src={`/images/cards/${card}.svg`}
                        onClick={() => unselectCard(card)}
                        alt='' />
                ))}
            </div>
        </div>
    );
}

SelectedCards.propTypes = {
    selectedCards: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => {
    return {
        selectedCards: state.holdem.selectedCards
    }
};

const mapDispatchToProps = dispatch => {
    return {
        unselectCard: card => dispatch(unselectCard(card)),
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(SelectedCards);