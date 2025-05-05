import { combineReducers } from 'redux';
import appReducer from './appReducer';
import bidangReducer from './bidangReducer';

const rootReducer = combineReducers({
  app: appReducer,
  bidang: bidangReducer,
});

export default rootReducer;
