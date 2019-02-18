import React from 'react';
import PropTypes from 'prop-types';
import { Segment, Icon, Label, Header } from 'semantic-ui-react';
import { selectPlayerSeat, selectDealerPosition } from '../../store/table/actions';
import { connect } from 'react-redux';
import SelectedCards from '../Holdem/SelectedCards';

const headerStyle = {
    cursor: 'pointer',
}

const labelStyle = {
    left: '80%',
    top: '-0.5em',
}

class PokerTable extends React.Component {

    getRibbon() {
        const { dealerPosition, position, numberPlayers } = this.props;
        if (dealerPosition % numberPlayers === position) {
            return <Label
                floating
                style={labelStyle}
                size='mini'
                content='Dealer'
                color='blue'
            />
        }
        if ((dealerPosition + 1) % numberPlayers === position) {
            return <Label
                floating
                style={labelStyle}
                size='mini'
                content='SB'
                color='teal'
            />
        }
        if ((dealerPosition + 2) % numberPlayers === position) {
            return <Label
                floating
                style={labelStyle}
                size='mini'
                content='BB'
                color='green'
            />
        }
        return null;
    }

    render() {
        const { selectedSeat, position, selectPlayerSeat, numberPlayers } = this.props;
        return (
            <Segment circular disabled={position >= numberPlayers}>
                <Header as='h6'
                    style={headerStyle}
                    onClick={() => selectPlayerSeat(position)}>
                    <Icon
                        size='mini'
                        name={selectedSeat === position ? 'user' : 'circle outline'} />
                    <Header.Content style={{ padding: '3px' }}>{`Seat ${position}`}</Header.Content>
                </Header>
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