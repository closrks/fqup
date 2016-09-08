import ActionTypes from '../constants';
import _ from 'lodash';

export default function folders(state, action) {
    state = state || {
        isFetching: false,
        items: {}
    };
    switch (action.type) {
        case ActionTypes.FETCH_FOLDERS_REQUEST:
            return Object.assign({}, state, { isFetching: true });
        case ActionTypes.FETCH_FOLDERS_ERROR:
            return Object.assign({}, state, { isFetching: false });
        case ActionTypes.FETCH_FOLDERS_SUCCESS:
            var items = _.reduce(action.payload.folders, function(acc, procedure) {
                acc[procedure._id] = procedure;
                return acc;
            }, {});
            return Object.assign({}, state, { items: Object.assign({}, state.items, items), isFetching: false });
        default:
            return state;
    }
}
