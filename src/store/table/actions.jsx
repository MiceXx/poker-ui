
export const SELECT_PLAYER_SEAT = 'SELECT_PLAYER_SEAT';
export const SELECT_DEALER_POSITION = 'SELECT_DEALER_POSITION';

export function selectPlayerSeat(position) {
    return { type: SELECT_PLAYER_SEAT, position };
}

export function selectDealerPosition(position) {
    return { type: SELECT_DEALER_POSITION, position };
}