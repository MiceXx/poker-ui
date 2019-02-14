import { combineReducers } from 'redux';
import holdem from './holdem/reducer.jsx';

const rootReducer = combineReducers({
  holdem,
});

export default rootReducer;
