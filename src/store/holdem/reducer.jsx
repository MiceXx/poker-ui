
import { ALL_CARDS } from '../../constants';

import {
    SELECT_CARD,
    UNSELECT_CARD,
    DEAL_CARDS,
    SELECT_COMMUNITY_CARD,
    UNSELECT_COMMUNITY_CARD,
} from './actions';

import { sortAndFilter } from '../../helpers';

const initialState = {
    availableCards: ['Red_Back', ...ALL_CARDS],
    selectedCards: [['Red_Back', 'Red_Back'],
    ['Red_Back', 'Red_Back'],
    ['Red_Back', 'Red_Back'],
    ['Red_Back', 'Red_Back'],
    ['Red_Back', 'Red_Back'],
    ['Red_Back', 'Red_Back'],
    [],
    ['Red_Back', 'Red_Back'],
    ['Red_Back', 'Red_Back']],
    communityCards: [],
    winPercent: '',
}

export default function holdem(state = Object.assign({}, initialState), action) {
    const { position, card } = action;
    const { selectedCards, availableCards, communityCards } = state;
    let newArr = [];
    let newArrCom = communityCards.slice();
    selectedCards.forEach((c, i) => newArr[i] = c.slice());
    switch (action.type) {
        case SELECT_CARD:
            newArr[position].push(card);
            if (selectedCards[position].length < 2) {
                if (card.includes('Back')) return Object.assign({}, state, { selectedCards: newArr });
                return Object.assign({}, state, {
                    availableCards: availableCards.filter(item => item !== card),
                    selectedCards: newArr
                });
            }
            return state;
        case UNSELECT_CARD:
            newArr[position].splice(newArr[position].indexOf(card), 1);
            if (card.includes('Back')) {
                return Object.assign({}, state, {
                    selectedCards: newArr
                });
            }
            return Object.assign({}, state, {
                availableCards: sortAndFilter([...availableCards, card]),
                selectedCards: newArr
            });
        case SELECT_COMMUNITY_CARD:
            newArrCom.push(card);
            if (card.includes('Back')) return Object.assign({}, state, { communityCards: newArrCom });
            if (communityCards.length < 5) {
                return Object.assign({}, state, {
                    availableCards: availableCards.filter(item => item !== card),
                    communityCards: newArrCom
                });
            }
            return state;
        case UNSELECT_COMMUNITY_CARD:
            newArrCom.splice(newArrCom.indexOf(card), 1);
            return Object.assign({}, state, {
                availableCards: sortAndFilter([...availableCards, card]),
                communityCards: newArrCom,
            });
        case DEAL_CARDS:
            return state;
        default:
            return state;
    }
}
