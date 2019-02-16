import { combineReducers } from 'redux';
import holdem from './holdem/reducer.jsx';
import table from './table/reducer.jsx';

const rootReducer = combineReducers({
  holdem,
  table,
});

export default rootReducer;
