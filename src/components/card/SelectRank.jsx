
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import { CARD_RANKS } from '../../constants';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
});

class OutlinedTextFields extends React.Component {
    state = {
        multiline: 'Controlled',
        rank: 'x',
    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    render() {
        const { classes } = this.props;

        return (
            <form className={classes.container} noValidate autoComplete="off">
                <TextField
                    select
                    label="Rank"
                    value={this.state.rank}
                    onChange={this.handleChange('rank')}
                    variant="outlined"
                >
                    {CARD_RANKS.map(rank => <MenuItem value={rank} key={rank}>{rank}</MenuItem>)}
                </TextField>
            </form>
        );
    }
}

OutlinedTextFields.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(OutlinedTextFields);