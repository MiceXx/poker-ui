
import { ALL_SEATS } from '../../constants';

import {
    SELECT_PLAYER_SEAT,
    SELECT_DEALER_POSITION,
} from './actions';

const initialState = {
    seats: ALL_SEATS,
    selectedSeat: 4,
    dealerPosition: 4,
}

export default function holdem(state = Object.assign({}, initialState), action) {
    switch (action.type) {
        case SELECT_PLAYER_SEAT:
        return Object.assign({}, state, {selectedSeat: action.position})
        case SELECT_DEALER_POSITION:
        return Object.assign({}, state, {dealerPosition: action.dealerPosition})
        default:
            return state;
    }
}