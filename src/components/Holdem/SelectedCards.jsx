import React from 'react';
import PropTypes from 'prop-types';
import { Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { selectCard } from '../../store/holdem/actions';

function SelectedCards(props) {
    const { selectedCards } = props;
    return (
        <Segment>
            {'Win Chance'}
            {selectedCards.map(card => (
                <img className='card' key={card} src={`/images/cards/${card}.svg`} alt='' />
            ))}
        </Segment>
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
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(SelectedCards);