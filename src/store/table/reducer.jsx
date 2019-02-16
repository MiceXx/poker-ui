
import { ALL_SEATS } from '../../constants';

import {
    SELECT_PLAYER_SEAT,
    SELECT_DEALER_POSITION,
    SELECT_NEXT_DEALER,
} from './actions';

const initialState = {
    seats: ALL_SEATS,
    numberPlayers: 9,
    selectedSeat: 4,
    dealerPosition: 4,
}

export default function holdem(state = Object.assign({}, initialState), action) {
    switch (action.type) {
        case SELECT_PLAYER_SEAT:
        return Object.assign({}, state, {selectedSeat: action.position})
        case SELECT_DEALER_POSITION:
        return Object.assign({}, state, {dealerPosition: action.dealerPosition})
        case SELECT_NEXT_DEALER:
        return Object.assign({}, state, {dealerPosition: (state.dealerPosition + 1) % state.numberPlayers})
        default:
            return state;
    }
}