import thunk from 'redux-thunk';
import {
    applyMiddleware,
    createStore,
    compose,
} from 'redux';
import rootReducer from './store/root-reducer';

const composeEnhancers =
    typeof window === 'object' &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        }) : compose;

const enhancer = composeEnhancers(
    applyMiddleware(thunk),
);

export const store = createStore(rootReducer, enhancer);