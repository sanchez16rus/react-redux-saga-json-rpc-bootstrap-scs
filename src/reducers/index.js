import {combineReducers} from 'redux';
import houses from './houses';
import counterInfo from './counter';
import isLoaded from './loaded';
import sessionInfo from './session';


/*All Reducers for dispatch actions in the combined*/
const rootReducer = combineReducers({
    houses,
    counterInfo,
    isLoaded,
    sessionInfo
  });
    
 export default rootReducer;