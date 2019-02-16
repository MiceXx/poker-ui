import React from 'react';
import PropTypes from 'prop-types';
import { Card, Icon, Button, Label } from 'semantic-ui-react';
import { selectPlayerSeat, selectDealerPosition } from '../../store/table/actions';
import { connect } from 'react-redux';
import SelectedCards from '../Holdem/SelectedCards';

class PokerTable extends React.Component {

    getRibbon() {
        const { dealerPosition, position } = this.props;
        if (dealerPosition === position) {
            return <Label
                attached='bottom'
                content='Dealer'
                color='blue'
            />
        }
        if ((dealerPosition + 1) % 9 === position) {
            return <Label
                attached='bottom'
                content='Small Blind'
                color='teal'
            />
        }
        if ((dealerPosition + 2) % 9 === position) {
            return <Label
                attached='bottom'
                content='Big Blind'
                color='green'
            />
        }
        return null;
    }

    render() {
        const { selectedSeat, position, selectPlayerSeat } = this.props;

        return (
            <Card raised style={{ maxWidth: '170px' }} >
                <Icon
                    as={Button}
                    circular
                    basic
                    icon={selectedSeat === position ? 'user' : 'circle outline'}
                    onClick={() => selectPlayerSeat(position)}
                    floated='right' />
                <Card.Content>
                    {this.getRibbon()}
                    <Card.Header>{`Seat ${position}`}</Card.Header>
                    <Card.Description>
                        {selectedSeat === position && <SelectedCards />}
                    </Card.Description>
                </Card.Content>
            </Card>
        );
    }
}

PokerTable.propTypes = {
    position: PropTypes.number.isRequired,
    selectedSeat: PropTypes.number.isRequired,
    dealerPosition: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => {
    return {
        selectedSeat: state.table.selectedSeat,
        dealerPosition: state.table.dealerPosition,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        selectPlayerSeat: position => dispatch(selectPlayerSeat(position)),
        selectDealerPosition: position => dispatch(selectDealerPosition(position)),
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(PokerTable);