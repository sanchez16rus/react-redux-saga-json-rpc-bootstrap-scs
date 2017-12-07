import Constants from '../consts';

/*Reducers for dispatch actions for Counter Info*/
const initState = {
  page: 1,
  rows: 6,
  count: 0
}

const counterInfo = (state = initState, action = {}) => {
    switch (action.type) {
      case Constants.SET_COUNTER_INFO:
      {
        return action.payload;
      }
      default:
        return state;
    }       
  };

export default counterInfo