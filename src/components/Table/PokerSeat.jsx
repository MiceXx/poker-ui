import React from 'react';
import PropTypes from 'prop-types';
import { Card, Icon, Button, Label } from 'semantic-ui-react';
import { selectPlayerSeat, selectDealerPosition } from '../../store/table/actions';
import { connect } from 'react-redux';
function PokerTable(props) {
    const { selectedSeat, dealerPosition, position, selectPlayerSeat, selectDealerPosition } = props;
    return (
        <Card>
            <Icon
                as={Button}
                circular
                basic
                icon={selectedSeat === position ? 'user' : 'circle outline'}
                onClick={() => selectPlayerSeat(position)}
                floated='right' />
            <Card.Content>
            {dealerPosition === position && <Label
                attached='bottom'
                content='Dealer'
                color='blue'
            />}
                <Card.Header>{`Seat ${position}`}</Card.Header>
                <Card.Meta>Subheader</Card.Meta>
                <Card.Description>
                    Placeholder
                    </Card.Description>
            </Card.Content>
        </Card>
    );
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