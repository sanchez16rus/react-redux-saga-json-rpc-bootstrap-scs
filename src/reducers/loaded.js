import Constants from '../consts';

/*Reducers for dispatch actions for SET_LOADER*/

const isLoaded = (state = false, action = {}) => {
    switch (action.type) {
        case Constants.SET_LOADED:
        {
            return action.payload;
        }
      default:
        return state;
    }       
  };

export default isLoaded