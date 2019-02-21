import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';
import { selectNextDealer, addPlayer, removePlayer } from '../../store/table/actions';
import { connect } from 'react-redux';

const TableMenu_style = {
    table: {
        backgroundColor: 'white',
        borderRadius: '5px',
        position: 'absolute',
        top: '5px',
        left: '5px',
        width: '135px',
    }
}

function TableMenu(props) {
    const { selectNextDealer, addPlayer, removePlayer, numberPlayers } = props;
    return (
        <Button.Group vertical labeled icon size='mini' style={TableMenu_style.table}>
            <Button
                onClick={selectNextDealer}
                primary
                icon='redo'
                content='Move Button' />
            <Button
                onClick={selectNextDealer}
                color='pink'
                icon='play'
                disabled
                content='Deal' />
            <Button
                onClick={addPlayer}
                positive
                disabled={numberPlayers >= 9}
                icon='plus'
                content='Add Player' />
            <Button
                onClick={removePlayer}
                disabled={numberPlayers <= 2}
                color='red'
                icon='minus'
                content='Remove Player' />
        </Button.Group>
    );
}

TableMenu.propTypes = {
    seats: PropTypes.array.isRequired,
    numberPlayers: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => {
    return {
        seats: state.table.seats,
        numberPlayers: state.table.numberPlayers,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        selectNextDealer: () => dispatch(selectNextDealer()),
        addPlayer: () => dispatch(addPlayer()),
        removePlayer: () => dispatch(removePlayer()),
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(TableMenu);