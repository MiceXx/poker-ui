
import { ALL_CARDS } from '../../constants';

import {
    SELECT_CARD,
    UNSELECT_CARD,
    DEAL_CARDS,
    SELECT_COMMUNITY_CARD,
    UNSELECT_COMMUNITY_CARD,
} from './actions';

import { sortCards } from '../../helpers';

const initialState = {
    availableCards: ALL_CARDS,
    selectedCards: [[], [], [], [], [], [], [], [], []],
    communityCards: [],
    winPercent: '',
}

export default function holdem(state = Object.assign({}, initialState), action) {
    const { position, card } = action;
    const { selectedCards, availableCards, communityCards } = state;
    let newArr;
    switch (action.type) {
        case SELECT_CARD:
            if (selectedCards[position].length < 2) {
                newArr = selectedCards.slice();
                newArr[position].push(card);
                return Object.assign({}, state, {
                    availableCards: availableCards.filter(item => item !== card),
                    selectedCards: newArr
                });
            }
            return state;
        case UNSELECT_CARD:
            newArr = selectedCards.slice();
            newArr[position] = newArr[position].filter(item => item !== card);
            return Object.assign({}, state, {
                availableCards: [...availableCards, card].sort(sortCards),
                selectedCards: newArr
            });
        case SELECT_COMMUNITY_CARD:
            if (communityCards.length < 5) {
                newArr = communityCards.slice();
                newArr.push(card);
                return Object.assign({}, state, {
                    availableCards: availableCards.filter(item => item !== card),
                    communityCards: newArr
                });
            }
            return state;
        case UNSELECT_COMMUNITY_CARD:
            newArr = communityCards.slice();
            return Object.assign({}, state, {
                availableCards: [...availableCards, card].sort(sortCards),
                communityCards: newArr.filter(item => item !== card),
            });
        case DEAL_CARDS:
            return state;
        default:
            return state;
    }
}
