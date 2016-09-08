import ActionTypes from '../constants';
import _ from 'lodash';

export default function procedures(state, action) {
    state = state || {
        isFetching: false,
        items: {}
    };
    switch (action.type) {
        case ActionTypes.FETCH_PROCEDURES_REQUEST:
            return Object.assign({}, state, { isFetching: true });
        case ActionTypes.FETCH_PROCEDURES_ERROR:
            return Object.assign({}, state, { isFetching: false });
        case ActionTypes.FETCH_PROCEDURES_SUCCESS:
            var items = _.reduce(action.payload.procedures, function(acc, procedure) {
                acc[procedure._id] = procedure;
                return acc;
            }, {});
            return Object.assign({}, state, { items: Object.assign({}, state.items, items), isFetching: false });
        default:
            return state;
    }
}
