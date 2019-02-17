
import { ALL_CARDS } from '../../constants';

import {
    SELECT_CARD,
    UNSELECT_CARD
} from './actions';

import { sortCards } from '../../helpers';

const initialState = {
    availableCards: ALL_CARDS,
    selectedCards: [],
}

export default function holdem(state = Object.assign({}, initialState), action) {
    switch (action.type) {
        case SELECT_CARD:
            if (state.selectedCards.length < 2) {
                return Object.assign({}, state, {
                    availableCards: state.availableCards.filter(item => item !== action.data),
                    selectedCards: [...state.selectedCards, action.data]
                });
            }
            return state;
        case UNSELECT_CARD:
            return Object.assign({}, state, {
                availableCards: [...state.availableCards, action.data].sort(sortCards),
                selectedCards: state.selectedCards.filter(item => item !== action.data),
            });
        default:
            return state;
    }
}
