
export const SELECT_CARD = 'SELECT_CARD';
export const UNSELECT_CARD = 'UNSELECT_CARD';

export function selectCard(card) {
    return {
        type: SELECT_CARD,
        data: card
    };
}
export function unselectCard(card) {
    return {
        type: UNSELECT_CARD,
        data: card
    };
}