import React from 'react';
import PropTypes from 'prop-types';
import { Segment,  Label,Button } from 'semantic-ui-react';
import { selectPlayerSeat, selectDealerPosition } from '../../store/table/actions';
import { connect } from 'react-redux';
import SelectedCards from '../Holdem/SelectedCards';

const PokerSeat_styles = {
    segment: {
        minWidth: '170px',
        maxWidth: '170px',
        minHeight: '180px',
        maxHeight: '168px',
    },
    label: {
        left: '95%',
        top: '-0.5em',
    }
}

class PokerTable extends React.Component {
    constructor(props) {
        super(props);
    }

    getRibbon() {
        const { dealerPosition, position, numberPlayers } = this.props;
        if (dealerPosition % numberPlayers === position) {
            return <Label
                floating
                style={PokerSeat_styles.label}
                size='mini'
                content='Dealer'
                color='blue'
            />
        }
        if ((dealerPosition + 1) % numberPlayers === position) {
            return <Label
                floating
                style={PokerSeat_styles.label}
                size='mini'
                content='SB'
                color='teal'
            />
        }
        if ((dealerPosition + 2) % numberPlayers === position) {
            return <Label
                floating
                style={PokerSeat_styles.label}
                size='mini'
                content='BB'
                color='green'
            />
        }
        return null;
    }
    render() {
        const { selectedSeat, position, numberPlayers, selectPlayerSeat } = this.props;
        return (
            <Segment disabled={position >= numberPlayers} style={PokerSeat_styles.segment}>
                <Button
                    circular
                    size='mini'
                    icon='user'
                    disabled = {position > numberPlayers - 1}
                    basic={selectedSeat !== position}
                    color={selectedSeat === position ? 'green' : 'grey'}
                    content={`Seat ${position}`}
                    onClick={()=>selectPlayerSeat(position)} />
                {this.getRibbon()}
                {selectedSeat === position && <SelectedCards />}
            </Segment>
        );
    }
}

PokerTable.propTypes = {
    position: PropTypes.number.isRequired,
    selectedSeat: PropTypes.number.isRequired,
    dealerPosition: PropTypes.number.isRequired,
    numberPlayers: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => {
    return {
        selectedSeat: state.table.selectedSeat,
        dealerPosition: state.table.dealerPosition,
        numberPlayers: state.table.numberPlayers,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        selectPlayerSeat: position => dispatch(selectPlayerSeat(position)),
        selectDealerPosition: position => dispatch(selectDealerPosition(position)),
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(PokerTable);