import React from 'react';
import PropTypes from 'prop-types';
import { Segment, Label, Button } from 'semantic-ui-react';
import { selectPlayerSeat, selectDealerPosition, selectDealingPosition } from '../../store/table/actions';
import { connect } from 'react-redux';
import SelectedCards from '../Holdem/SelectedCards';

const PokerSeat_style = {
    segment: {
        minWidth: '170px',
        maxWidth: '170px',
        minHeight: '180px',
        maxHeight: '168px',
    },
    label: {
        left: '95%',
        top: '-0.5em',
    },
    smallButton: {
        fontSize: '8px',
    },
}

class PokerTable extends React.Component {
    getRibbon() {
        const { dealerPosition, position, numberPlayers } = this.props;
        if (dealerPosition % numberPlayers === position) {
            return <Label
                floating
                style={PokerSeat_style.label}
                size='mini'
                content='Dealer'
                color='blue'
            />
        }
        if ((dealerPosition + 1) % numberPlayers === position) {
            return <Label
                floating
                style={PokerSeat_style.label}
                size='mini'
                content='SB'
                color='teal'
            />
        }
        if ((dealerPosition + 2) % numberPlayers === position) {
            return <Label
                floating
                style={PokerSeat_style.label}
                size='mini'
                content='BB'
                color='green'
            />
        }
        return null;
    }
    render() {
        const {
            selectedSeat,
            position,
            numberPlayers,
            selectPlayerSeat,
            selectedCards,
            dealingPosition,
            selectDealingPosition, } = this.props;
        return (
            <Segment disabled={position >= numberPlayers} style={PokerSeat_style.segment}>
                <Button
                    circular
                    size='mini'
                    icon={selectedSeat === position ? 'user' : null}
                    disabled={position > numberPlayers - 1}
                    basic={selectedSeat !== position}
                    color={selectedSeat === position ? 'green' : 'grey'}
                    content={`Seat ${position}`}
                    onClick={() => selectPlayerSeat(position)} />
                {this.getRibbon()}
                <SelectedCards cards={selectedCards[position]} position={position} />
                <Button
                    circular
                    size="mini"
                    icon="star"
                    style={PokerSeat_style.smallButton}
                    color={dealingPosition === position ? "yellow" : null}
                    onClick={() => selectDealingPosition(position)} />
            </Segment>
        );
    }
}

PokerTable.propTypes = {
    position: PropTypes.number.isRequired,
    selectedSeat: PropTypes.number.isRequired,
    dealerPosition: PropTypes.number.isRequired,
    numberPlayers: PropTypes.number.isRequired,
    selectedCards: PropTypes.array.isRequired,
    dealingPosition: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => {
    return {
        selectedSeat: state.table.selectedSeat,
        dealerPosition: state.table.dealerPosition,
        dealingPosition: state.table.dealingPosition,
        numberPlayers: state.table.numberPlayers,
        selectedCards: state.holdem.selectedCards,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        selectPlayerSeat: position => dispatch(selectPlayerSeat(position)),
        selectDealerPosition: position => dispatch(selectDealerPosition(position)),
        selectDealingPosition: position => dispatch(selectDealingPosition(position)),
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(PokerTable);