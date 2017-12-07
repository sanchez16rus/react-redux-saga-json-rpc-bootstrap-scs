import Constants from '../consts';
import LocalStorageApi from '../api';

/*Reducers for dispatch actions for sessionId*/

const stateInit = {
  sessionId: LocalStorageApi.getStorage(),
  errorMessage: ''
};

const sessionInfo = (state = stateInit, action = {}) => {
    switch (action.type) {
      case Constants.GET_SESSION_AUTH_SUCCEEDED:
      {
        LocalStorageApi.updateStorage(action.payload);

        return {
          sessionId: LocalStorageApi.getStorage(),
          errorMessage: ''
        };
      }
      break;

      case Constants.GET_SESSION_AUTH_FAILED:
      {
        LocalStorageApi.updateStorage('');

        return {
          sessionId:'',
          errorMessage: action.payload
        };
      }
      break;

      default:
        return state;
    }       
  };

export default sessionInfo