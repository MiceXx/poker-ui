import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';
import red from '@material-ui/core/colors/red';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { ReactComponent as SpadesIcon } from '../../icons/spades.svg';
import { ReactComponent as HeartsIcon } from '../../icons/hearts.svg';
import { ReactComponent as DiamondsIcon } from '../../icons/diamonds.svg';
import { ReactComponent as ClubsIcon } from '../../icons/clubs.svg';

const styles = {
    black: {
        color: grey[900],
        '&$checked': {
            color: grey[900],
        },
    },
    red: {
        color: red[500],
        '&$checked': {
            color: red[500],
        },
    },
    checked: {},
};

class RadioButtons extends React.Component {
    state = {
        selectedValue: '',
    };

    handleChange = event => {
        this.setState({ selectedValue: event.target.value });
    };

    render() {
        const { classes } = this.props;

        return (
            <FormControl component="fieldset">
                <RadioGroup
                    row
                    name="avatar"
                >
                    <FormControlLabel
                        checked={this.state.selectedValue === 'spade'}
                        onChange={this.handleChange}
                        control={<Radio />}
                        value="spade"
                        label={<SpadesIcon />}
                        labelPlacement="end"
                        classes={{
                            root: classes.black,
                            checked: classes.checked,
                        }}
                    />
                    <FormControlLabel
                        checked={this.state.selectedValue === 'heart'}
                        onChange={this.handleChange}
                        control={<Radio />}
                        value="heart"
                        label={<HeartsIcon />}
                        labelPlacement="end"
                        classes={{
                            root: classes.red,
                            checked: classes.checked,
                        }}
                    />
                    <FormControlLabel
                        checked={this.state.selectedValue === 'diamond'}
                        onChange={this.handleChange}
                        control={<Radio />}
                        value="diamond"
                        label={<DiamondsIcon />}
                        classes={{
                            root: classes.red,
                            checked: classes.checked,
                        }}
                    />
                    <FormControlLabel
                        checked={this.state.selectedValue === 'club'}
                        onChange={this.handleChange}
                        control={<Radio />}
                        value="club"
                        label={<ClubsIcon />}
                        classes={{
                            root: classes.black,
                            checked: classes.checked,
                        }}
                    />
                </RadioGroup>
            </FormControl>
        );
    }
}

RadioButtons.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RadioButtons);