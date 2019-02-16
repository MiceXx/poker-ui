import React from 'react';
import PropTypes from 'prop-types';
import { Segment, Button, Divider } from 'semantic-ui-react';
import { selectNextDealer } from '../../store/table/actions';
import { connect } from 'react-redux';

function TableMenu(props) {
    const { selectNextDealer } = props;
    return (
        <Segment>
            <Button
                onClick={selectNextDealer}
                color='olive'
                icon='share'
                content='Move Dealer Button' />
            <Button
                onClick={selectNextDealer}
                color='pink'
                icon='play'
                content='Deal' />
        </Segment>
    );
}

TableMenu.propTypes = {
    seats: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => {
    return {
        seats: state.table.seats
    }
};

const mapDispatchToProps = dispatch => {
    return {
        selectNextDealer: position => dispatch(selectNextDealer(position)),
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(TableMenu);