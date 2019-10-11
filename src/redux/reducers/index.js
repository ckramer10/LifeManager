import { combineReducers } from 'redux';

import modal from "./modalReducer";
import themeSwitch from './themeSwitch';
import toDoList from "./toDoListReducer";

const rootReducer = combineReducers({
    modal,
    themeSwitch,
    toDoList
});

export default rootReducer;