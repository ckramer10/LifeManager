import { createSelector } from 'reselect';

const initialState = {
    listItems: [],
    dataDidArrive: false
};

const toDoList = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return {
                ...state,
                listItems: [...state.listItems, action.payload]
            };
        case 'SET_TODOS':
            return {
                ...state,
                dataDidArrive: true,
                listItems: action.payload
            };
        case 'UPDATE_TODOS':
            return {
                ...state,
                listItems: [...action.payload]
            };
        default:
            return state;
    }
};

const toDoListSelector = state => state.toDoList;

export const getToDoList = createSelector(
    toDoListSelector,
    toDoList => toDoList.listItems
);

export const didToDoListLoad = createSelector(
  toDoListSelector,
  toDoList => toDoList.dataDidArrive
);

export default toDoList;