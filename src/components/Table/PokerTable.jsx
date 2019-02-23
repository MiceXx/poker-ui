import React from 'react';
import PropTypes from 'prop-types';
import { Segment, Container } from 'semantic-ui-react';
import { connect } from 'react-redux';
import PokerSeat from './PokerSeat';
import TableMenu from './TableMenu';
import CommunityCards from './CommunityCards';

const PokerTable_style = {
    container: {
        backgroundColor: 'grey',
        minWidth: '1030px',
    },
    segment: {
        background: `url(${require('./table.png')}) center no-repeat`,
        backgroundSize: '90%',
    },
    containerRow: {
        display: 'flex',
        justifyContent: 'center'
    },
    containerMiddle: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    containerDiv: {
        display: 'inline-block',
        padding: '5px',
    },
    smallButton: {
        fontSize: '8px',
    },
}

function PokerTable(props) {
    return (
        <Container textAlign='center' style={PokerTable_style.container}>
            <Segment style={PokerTable_style.segment}>
                <div style={PokerTable_style.containerRow}>
                    {[0, 1, 2, 3].map(seat => (
                        <div
                            key={`seat${seat}`}
                            style={PokerTable_style.containerDiv}>
                            <PokerSeat
                                position={seat} />
                        </div>
                    )
                    )}
                </div>
                <div style={PokerTable_style.containerMiddle}>
                    <div key={'seat8'} style={PokerTable_style.containerDiv}>
                        <PokerSeat
                            position={8} />
                    </div>
                    <CommunityCards />
                    <div key={'seat4'} style={PokerTable_style.containerDiv}>
                        <PokerSeat
                            position={4} />
                    </div>
                </div>
                <div style={PokerTable_style.containerRow}>
                    {[7, 6, 5].map(seat => (
                        <div key={`seat${seat}`} style={PokerTable_style.containerDiv}>
                            <PokerSeat
                                position={seat} />
                        </div>
                    ))}
                </div>

                <TableMenu />
            </Segment>
        </Container>
    );
}

PokerTable.propTypes = {
    seats: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => {
    return {
        seats: state.table.seats,
    }
};

const mapDispatchToProps = dispatch => {
    return {
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(PokerTable);