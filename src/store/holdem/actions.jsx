
export const SELECT_CARD = 'SELECT_CARD';
export const UNSELECT_CARD = 'UNSELECT_CARD';
export const DEAL_CARDS = 'DEAL_CARDS';
export const SELECT_COMMUNITY_CARD = 'SELECT_COMMUNITY_CARD';
export const UNSELECT_COMMUNITY_CARD = 'UNSELECT_COMMUNITY_CARD';

export function selectCard(card, position) {
    if (position === -1) {
        return {
            type: SELECT_COMMUNITY_CARD,
            card,
        };
    }
    else {
        return {
            type: SELECT_CARD,
            card,
            position,
        };
    }
}
export function unselectCard(card, position) {
    if (position === -1) {
        return {
            type: UNSELECT_COMMUNITY_CARD,
            card,
        };
    }
    else {
        return {
            type: UNSELECT_CARD,
            card,
            position,
        };
    }
}

export function dealCards() {
    return { type: DEAL_CARDS };
}