import React from 'react';
import AllCards from './AllCards';
import PokerTable from '../Table/PokerTable';


function HoldemCalculator() {
    return (
        <div>
            <PokerTable />
            <AllCards />
        </div>
    );
}

export default HoldemCalculator;