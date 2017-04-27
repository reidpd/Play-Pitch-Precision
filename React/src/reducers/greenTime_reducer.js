import initialState from './initialState';

const greenTimeReducer = (state = initialState.greenTime, action) => {
  console.log('React/src/reducers/vocalInputResults_reducer.js/vocalInputReducer()');
  switch (action.type) {
    case 'INCREMENT_GREEN_TIME':
      return state.greenTime + 1;
      console.log(state);
    case 'RESET_GREEN_TIME':
      return 0;
    default:
      return state;
  }
};

export default greenTimeReducer;
