
import { ALL_CARDS } from '../../constants';

import {
    SELECT_CARD,
    UNSELECT_CARD
} from './actions';

const initialState = {
    availableCards: ALL_CARDS,
    selectedCards: [],
}

export default function holdem(state = Object.assign({}, initialState), action) {
    switch (action.type) {
        case SELECT_CARD:
            return Object.assign({}, state, {
                availableCards: state.availableCards.filter(item => item !== action.data),
                selectedCards: [...state.selectedCards, action.data]
            });
        case UNSELECT_CARD:
            return Object.assign({}, state, {
                availableCards: [...state.availableCards, action.data],
                selectedCards: state.selectedCards.filter(item => item !== action.data),
            });
        default:
            return state;
    }
}