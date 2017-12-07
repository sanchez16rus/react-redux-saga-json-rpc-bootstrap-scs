import Constants from '../consts';

export default {
    getHousesListAction: () => ({ type: Constants.GET_LIST_HOUSES}),
    getHousesListLazyAction: (value) => ({ type: Constants.GET_LIST_HOUSES_LAZY, payload: value }),
    getAuthorizationAction: (value) => ({ type: Constants.GET_SESSION_AUTH, payload: value })
}