import Constants from '../consts';
import Helpers from '../helpers';

/*Reducers for dispatch actions for Houses*/

const houses = (state = [], action = {}) => {
    switch (action.type) {
      case Constants.GET_LIST_HOUSES_SUCCEEDED:
      {
        return Helpers.joinArrays(state, action.payload);
      }
      case Constants.GET_LIST_HOUSES_FAILED:
        return { error: action.payload };
      case Constants.GET_LIST_HOUSES_LAZY_SUCCEEDED:
        {
          return Helpers.joinArrays(state, action.payload);
        }
        case Constants.GET_LIST_HOUSES_LAZY_FAILED:
          return { error: action.payload };
      default:
        return state;
    }       
  };

export default houses