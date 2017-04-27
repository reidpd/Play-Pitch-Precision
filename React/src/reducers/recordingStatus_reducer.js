import initialState from './initialState';

const recordingStatusReducer = (state = initialState.recordingStatus, action) => {
  console.log('React/src/reducers/recordingStatus_reducer.js/recordingStatusReducer()');
  switch (action.type) {
    case 'START_AUDIO_CAPTURE':
      return action.payload;
    case 'STOP_AUDIO_CAPTURE':
      return action.payload;
    case 'TOGGLE_AUDIO_CAPTURE':
        return !state;
    default:
      return state;
  }
};

export default recordingStatusReducer;
