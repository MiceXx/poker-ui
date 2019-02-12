import React from 'react';
import AllCards from '../card/AllCards';
import SelectedCards from './SelectedCards';


function HoldemCalculator() {
    return (
        <div>
            <SelectedCards />
            <AllCards />
        </div>
    );
}

export default HoldemCalculator;