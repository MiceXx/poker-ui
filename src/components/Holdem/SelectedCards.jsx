import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Header } from 'semantic-ui-react';
import { unselectCard } from '../../store/holdem/actions';

const SelectedCards_style = {
    header: {
        marginTop: '2px',
        marginBottom: '2px',
    }
};

function SelectedCards(props) {
    const { unselectCard, winPercent, cards, position } = props;
    return (
        <div>
            <Header as="h3" content={`Win: ${winPercent}`} style={SelectedCards_style.header} />
            <div className="hand active-hand">
                {cards.map((card, i) => (
                    <img
                        className='card'
                        key={`${card}${i}`}
                        src={`/images/cards/${card}.svg`}
                        onClick={() => unselectCard(card, position)}
                        alt='' />
                ))}
            </div>
        </div>
    );
}

SelectedCards.propTypes = {
    selectedCards: PropTypes.array.isRequired,
    winPercent: PropTypes.string.isRequired,
    cards: PropTypes.array.isRequired,
    position: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => {
    return {
        selectedCards: state.holdem.selectedCards,
        winPercent: state.holdem.winPercent,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        unselectCard: (card, position) => dispatch(unselectCard(card, position)),
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(SelectedCards);