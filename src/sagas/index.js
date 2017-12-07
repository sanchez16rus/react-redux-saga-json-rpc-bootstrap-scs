import axios from 'axios';
import createBrowserHistory from 'history/createBrowserHistory';
import { takeEvery, call, put } from 'redux-saga/effects';
import Constants from '../consts';
import LocalStorageApi from '../api';
import Helpers from '../helpers';

const history = createBrowserHistory({forceRefresh:true});

const urlConfig = () => ({
    apiUrl: 'https://spn24.ru/api/v1',
});

const axiosSessionSignin = (info = {}) => {
  
  const config = {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data: {
      'id': Helpers.createGuid(),
      'jsonrpc':'2.0',
      'method': 'Session.signin',
      'params' : {
        'username': info.login,
        'password': info.password,
        'is_subagent':true
      }
    },
    url: urlConfig().apiUrl
  }
  return axios(config)
}

const axiosGetLastComplexesPages = (counterInfo = {}) => {
  
  const token = 'WWWToken '+LocalStorageApi.getStorage();
  const config = {
    method: 'post',
    headers: {
      'Authorization': token,
      'Content-Type': 'application/json'
    },
    data: {
      'id': Helpers.createGuid(),
      'jsonrpc':'2.0',
      'method': 'Search.get_last_complexes_pages',
      'params' : {
        'page': counterInfo.page,
        'rows': counterInfo.rows
      }
    },
    url: urlConfig().apiUrl
  }
  return axios(config)
}

/*GET_LIST_HOUSES*/
export function* getHousesListAsync() {
  try {

    // default params
    const counterInfo = {
      page: 1,
      rows: 6,
      count: 0
    }

    // Set isLoaded = true
    yield put({ type: Constants.SET_LOADED, payload: false });

    // Query
    const response = yield call(axiosGetLastComplexesPages, counterInfo);
    
    // Set query Succeeded
    yield put({ type: Constants.GET_LIST_HOUSES_SUCCEEDED, payload: response.data.result.rows });

    counterInfo.count = response.data.result.count;

    // Set counter info
    yield put({ type: Constants.SET_COUNTER_INFO, payload: counterInfo });
    // Set isLoader = fale
    yield put({ type: Constants.SET_LOADED, payload: true });
  } catch (e) {
    
    yield put({ type: Constants.GET_LIST_HOUSES_FAILED, payload: e.message });
    history.push("/login");
  }
}

export function* watchGetHousesList() {
  yield takeEvery(Constants.GET_LIST_HOUSES, getHousesListAsync);
}

/*GET_LIST_HOUSES_LAZY*/
export function* getHousesListLazyAsync(action) {
  try {

    const counterInfo = action.payload;
    counterInfo.page = counterInfo.page + 1;

    yield put({ type: Constants.SET_LOADED, payload: false });

    const response = yield call(axiosGetLastComplexesPages, counterInfo);

    yield put({ type: Constants.GET_LIST_HOUSES_LAZY_SUCCEEDED, payload: response.data.result.rows });

    counterInfo.count = response.data.result.count;

    yield put({ type: Constants.SET_COUNTER_INFO, payload: counterInfo });

    yield put({ type: Constants.SET_LOADED, payload: true });
  } catch (e) {
    yield put({ type: Constants.GET_LIST_HOUSES_LAZY_FAILED, payload: e.message });
  }
}

export function* watchGetHousesListLazy() {
  yield takeEvery(Constants.GET_LIST_HOUSES_LAZY, getHousesListLazyAsync);
}

/*SET_SESSION_AUTH*/
export function* getAuthorizationAsync(action) {
  try {

    const response = yield call(axiosSessionSignin, action.payload);
    if(response.data.error)
    {
      yield put({ type: Constants.GET_SESSION_AUTH_FAILED, payload: response.data.error.data.clear_message });
    }
    else{
      yield put({ type: Constants.GET_SESSION_AUTH_SUCCEEDED, payload: response.data.result.session_id });
      
      history.push("/");
    }
    
  } catch (e) {
    yield put({ type: Constants.GET_SESSION_AUTH_FAILED, payload: e.message });
  }
}

export function* watchAuthorization() {
  yield takeEvery(Constants.GET_SESSION_AUTH, getAuthorizationAsync);
}

/*ROOT SAGA*/
export default function* rootSaga() {
    yield [
        watchAuthorization(),
        watchGetHousesList(),
        watchGetHousesListLazy()
    ];
  }
  