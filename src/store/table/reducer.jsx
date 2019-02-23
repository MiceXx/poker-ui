
import { ALL_SEATS } from '../../constants';

import {
    SELECT_PLAYER_SEAT,
    SELECT_DEALER_POSITION,
    SELECT_NEXT_DEALER,
    ADD_PLAYER,
    REMOVE_PLAYER,
    SELECT_DEALING_POSITION,
} from './actions';

const initialState = {
    seats: ALL_SEATS,
    numberPlayers: 9,
    selectedSeat: 6,
    dealerPosition: 6,
    dealingPosition: 6,
}

export default function table(state = Object.assign({}, initialState), action) {
    switch (action.type) {
        case SELECT_PLAYER_SEAT:
            return Object.assign({}, state, { selectedSeat: action.position });
        case SELECT_DEALER_POSITION:
            return Object.assign({}, state, { dealerPosition: action.dealerPosition });
        case SELECT_NEXT_DEALER:
            return Object.assign({}, state, { dealerPosition: (state.dealerPosition + 1) % state.numberPlayers });
        case ADD_PLAYER:
            if (state.numberPlayers < 9) {
                return Object.assign({}, state, { numberPlayers: state.numberPlayers + 1 });
            }
            return state;
        case REMOVE_PLAYER:
            if (state.numberPlayers > 2) {
                return Object.assign({}, state, { numberPlayers: state.numberPlayers - 1 });
            }
            return state;
        case SELECT_DEALING_POSITION:
            return Object.assign({}, state, { dealingPosition: action.position });
        default:
            return state;
    }
}