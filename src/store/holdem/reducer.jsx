
import { ALL_CARDS } from '../../constants';

import { SELECT_CARD } from './actions';

const initialState = {
    availableCards: ALL_CARDS,
    selectedCards: [],
}

export default function holdem(state = Object.assign({}, initialState), action) {
    switch (action.type) {
        case SELECT_CARD:
            return Object.assign({}, state, { selectedCards: [...state.selectedCards, action.data] });
        default:
            return state;
    }
}