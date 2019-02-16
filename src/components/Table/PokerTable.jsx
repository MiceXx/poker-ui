import React from 'react';
import PropTypes from 'prop-types';
import { Segment, Grid, Image, Container } from 'semantic-ui-react';
import { connect } from 'react-redux';
import PokerSeat from './PokerSeat';
import TableMenu from './TableMenu';

const containerRowStyle = {
    display: 'flex',
    justifyContent: 'center'
}

const containerMiddleStyle = {
    display: 'flex',
    justifyContent: 'space-between'
}

const containerDivStyle = {
    display: 'inline-block',
    padding: '5px',
}

function PokerTable(props) {
    return (
        <React.Fragment>
            <TableMenu />
            <Segment style={{ maxWidth: '900px', minWidth: '620' }}>
                <div style={containerRowStyle}>
                    {[0, 1, 2, 3].map(seat => (
                        <div
                            key={`seat${seat}`}
                            style={containerDivStyle}>
                            <PokerSeat
                                position={seat} />
                        </div>
                    )
                    )}
                </div>
                <div style={containerMiddleStyle}>
                    <div key={'seat8'} style={containerDivStyle}>
                        <PokerSeat
                            position={8} />
                    </div>
                    <div key={'seat4'} style={containerDivStyle}>
                        <PokerSeat
                            position={4} />
                    </div>
                </div>
                <div style={containerRowStyle}>
                    {[7, 6, 5].map(seat => (
                        <div key={`seat${seat}`} style={containerDivStyle}>
                            <PokerSeat
                                position={seat} />
                        </div>
                    )
                    )}
                </div>
            </Segment>
        </React.Fragment>
    );
}

PokerTable.propTypes = {
    seats: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => {
    return {
        seats: state.table.seats
    }
};

const mapDispatchToProps = dispatch => {
    return {
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(PokerTable);