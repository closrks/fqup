import ActionTypes from '../constants';
import _ from 'lodash';

export function loadEmbeddedDataRequest() {
    return {
        type: ActionTypes.LOAD_EMBEDDED_DATA_REQUEST,
        payload: {},
        error: false,
        meta: {
            timestamp: new Date()
        }
    }
};

export function loadEmbeddedDataSuccess() {
    return {
        type: ActionTypes.LOAD_EMBEDDED_DATA_SUCCESS,
        payload: {},
        error: false,
        meta: {
            timestamp: new Date()
        }
    }
};

export function loadEmbeddedData(data) {
    return function(dispatch) {
        dispatch(loadEmbeddedDataRequest());
        return setTimeout(() => {
            if (data.procedures) {
                dispatch(fetchProceduresSuccess(data.procedures));
            }
            if (data.folders) {
                dispatch(fetchFoldersSuccess(data.folders));
            }
            return setTimeout(() => {
                return dispatch(loadEmbeddedDataSuccess());
            }, 1000)
        }, 1000)
    };
};

export function routeToLocationRequest() {
    return {
        type: ActionTypes.ROUTE_TO_LOCATION_REQUEST,
        payload: {},
        error: false,
        meta: {
            timestamp: new Date()
        }
    }
};

export function routeToLocationSuccess() {
    return {
        type: ActionTypes.ROUTE_TO_LOCATION_SUCCESS,
        payload: {},
        error: false,
        meta: {
            timestamp: new Date()
        }
    }
};

// need to basically bootstrap if fresh route
export function routeToLocation() {
    return function(dispatch) {
        dispatch(routeToLocationRequest());
        return setTimeout(() => {
            Promise.all([
                dispatch(fetchProcedures()),
                dispatch(fetchFolders())
            ]).then(() => {
                dispatch(routeToLocationSuccess());
            });
        }, 1000)
    };
};

export function fetchProceduresRequest() {
    return {
        type: ActionTypes.FETCH_PROCEDURES_REQUEST,
        payload: {},
        error: false,
        meta: {
            timestamp: new Date()
        }
    }
};

export function fetchProceduresError(error) {
    return {
        type: ActionTypes.FETCH_PROCEDURES_ERROR,
        payload: error,
        error: true,
        meta: {
            timestamp: new Date()
        }
    }
};

export function fetchProceduresSuccess(procedures) {
    return {
        type: ActionTypes.FETCH_PROCEDURES_SUCCESS,
        payload: {
            procedures: procedures
        },
        error: true,
        meta: {
            timestamp: new Date()
        }
    }
};

export function fetchProcedures(data) {
    return function(dispatch) {
        return new Promise(
            function(resolve, reject) {
                dispatch(fetchProceduresRequest());
                setTimeout(() => {
                    // dispatch(fetchProceduresError());
                    var procedures = _.map(_.range(1, 6), function(r) {
                        return { _id: r, name: 'Procedure Name ' + r, ts: new Date().getTime() }
                    });
                    dispatch(fetchProceduresSuccess(procedures));
                    return resolve();
                }, 1000)
            }
        );
    };
};

export function fetchFoldersRequest() {
    return {
        type: ActionTypes.FETCH_FOLDERS_REQUEST,
        payload: {},
        error: false,
        meta: {
            timestamp: new Date()
        }
    }
};

export function fetchFoldersError(error) {
    return {
        type: ActionTypes.FETCH_FOLDERS_ERROR,
        payload: error,
        error: true,
        meta: {
            timestamp: new Date()
        }
    }
};

export function fetchFoldersSuccess(folders) {
    return {
        type: ActionTypes.FETCH_FOLDERS_SUCCESS,
        payload: {
            folders: folders
        },
        error: true,
        meta: {
            timestamp: new Date()
        }
    }
};

export function fetchFolders() {
    return function(dispatch) {
        return new Promise(
            function(resolve, reject) {
                dispatch(fetchFoldersRequest());
                return setTimeout(() => {
                    // dispatch(fetchFoldersError());
                    var folders = [
                        { _id: '1', name: 'company 1', parentId: null, childIds: ['3'], ts: new Date().getTime() },
                        { _id: '2', name: 'company 2', parentId: null, childIds: ['4'], ts: new Date().getTime() },
                        { _id: '3', name: 'year', parentId: '1', childIds: ['5'], ts: new Date().getTime() },
                        { _id: '4', name: 'year', parentId: '2', childIds: ['6'], ts: new Date().getTime() },
                        { _id: '5', name: 'month', parentId: '3', childIds: ['7'], ts: new Date().getTime() },
                        { _id: '6', name: 'month', parentId: '4', childIds: ['8'], ts: new Date().getTime() },
                        { _id: '7', name: 'folder 1', parentId: '5', childIds: [], ts: new Date().getTime() },
                        { _id: '8', name: 'folder 1', parentId: '6', childIds: [], ts: new Date().getTime() }
                    ];
                    dispatch(fetchFoldersSuccess(folders));
                    return resolve();
                }, 1000)
            }
        );
    };
};

