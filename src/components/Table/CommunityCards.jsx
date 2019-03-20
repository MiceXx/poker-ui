import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { unselectCard } from '../../store/holdem/actions';
import { selectDealingPosition } from '../../store/table/actions';

const CommunityCards_style = {
    main: {
        position: 'relative',
        top: '40px',
    },
    smallButton: {
        fontSize: '8px',
    },
};

function CommunityCards(props) {
    const { unselectCard,
        communityCards,
        selectDealingPosition,
        dealingPosition } = props;
    return (
        <div style={CommunityCards_style.main}>
            <div className="hand  active-hand">
                {communityCards.map((card, i) => (
                    <img
                        className='card'
                        key={`${card}${i}`}
                        src={require(`../../images/cards/${card}.svg`)}
                        onClick={() => unselectCard(card, -1)}
                        alt='' />
                ))}
            </div>

            <Button
                circular
                size="mini"
                icon="star"
                style={CommunityCards_style.smallButton}
                color={dealingPosition === -1 ? "yellow" : null}
                onClick={() => selectDealingPosition(-1)} />
        </div>
    );
}

CommunityCards.propTypes = {
    communityCards: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => {
    return {
        dealingPosition: state.table.dealingPosition,
        communityCards: state.holdem.communityCards,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        unselectCard: (card, position) => dispatch(unselectCard(card, position)),
        selectDealingPosition: position => dispatch(selectDealingPosition(position)),
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(CommunityCards);