import ActionTypes from '../constants';
import _ from 'lodash';

export default function bootstrap(state, action) {
    state = state || { status: false };
    switch (action.type) {
        case ActionTypes.LOAD_EMBEDDED_DATA_REQUEST:
        case ActionTypes.ROUTE_TO_LOCATION_REQUEST:
            return _.assign({}, state, { status: true });
        case ActionTypes.LOAD_EMBEDDED_DATA_SUCCESS:
        case ActionTypes.ROUTE_TO_LOCATION_SUCCESS:
            return _.assign({}, state, { status: false });
        default:
            return state;
    }
}
