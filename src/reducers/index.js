import { combineReducers } from 'redux';
import appReducer from './appReducer';
import bidangReducer from './bidangReducer';
import subBidangReducer from './subBidangReducer';
import materiReducer from './materiReducer';
import pesertaSlice from './pesertaSlice';
import ujianSlice from './ujianSlice';

const rootReducer = combineReducers({
  app: appReducer,
  bidang: bidangReducer,
  subBidang: subBidangReducer,
  materi: materiReducer,
  peserta: pesertaSlice,
  ujian: ujianSlice,
});

export default rootReducer;
