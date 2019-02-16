import React from 'react';
import PropTypes from 'prop-types';
import { Segment, Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import PokerSeat from './PokerSeat';
function PokerTable(props) {
    const { seats } = props;
    return (
        <Segment>
            <Grid columns={3}>
                <Grid.Row>
                    {seats.map(seat => {
                        if (seat % 3 === 0) {
                            return (
                                <Grid.Column>
                                    <PokerSeat
                                        key={seat}
                                        position={seat} />
                                </Grid.Column>
                            )
                        }
                        return (
                            <Grid.Row>
                                <PokerSeat
                                    key={seat}
                                    position={seat} />
                            </Grid.Row>
                        )
                    }
                    )}
                </Grid.Row>
            </Grid>
        </Segment>
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