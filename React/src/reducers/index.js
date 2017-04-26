import { combineReducers } from 'redux';
import keyEventsReducer from './keyEvents_reducer';
import vocalInputReducer from './vocalInputResults_reducer';
import recordingStatusReducer from './recordingStatus_reducer';


const rootReducer = combineReducers({
  keyEventsReducer,
  vocalInputReducer,
  recordingStatusReducer
});

export default rootReducer;
