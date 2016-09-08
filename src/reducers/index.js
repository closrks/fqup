import { combineReducers } from 'redux';
import bootstrap from './bootstrap';
import procedures from './procedures';
import folders from './folders';

export default combineReducers({
    bootstrap,
    procedures,
    folders
});
