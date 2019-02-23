
export const SELECT_PLAYER_SEAT = 'SELECT_PLAYER_SEAT';
export const SELECT_DEALER_POSITION = 'SELECT_DEALER_POSITION';
export const SELECT_NEXT_DEALER = 'SELECT_NEXT_DEALER';
export const ADD_PLAYER = 'ADD_PLAYER';
export const REMOVE_PLAYER = 'REMOVE_PLAYER';
export const SELECT_DEALING_POSITION = 'SELECT_DEALING_POSITION';

export function selectPlayerSeat(position) {
    return { type: SELECT_PLAYER_SEAT, position };
}

export function selectDealerPosition(position) {
    return { type: SELECT_DEALER_POSITION, position };
}

export function selectNextDealer() {
    return { type: SELECT_NEXT_DEALER };
}

export function addPlayer() {
    return { type: ADD_PLAYER };
}

export function removePlayer() {
    return { type: REMOVE_PLAYER };
}

export function selectDealingPosition(position) {
    return { type: SELECT_DEALING_POSITION, position };
}