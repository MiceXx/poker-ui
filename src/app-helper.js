import thunk from 'redux-thunk';
import {
    applyMiddleware,
    createStore
} from 'redux';
import rootReducer from './store/root-reducer';

const getMiddleware = () => {
    return applyMiddleware(thunk);
}

export const store = createStore(rootReducer, getMiddleware());