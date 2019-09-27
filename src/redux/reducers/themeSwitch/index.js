import { createSelector } from 'reselect';

const initialState = {
    isDarkMode: true
};

const themeSwitch = (state = initialState, action) => {
    switch (action.type) {
        case 'TOGGLE_DARK_MODE':
            return ({
                ...state,
                isDarkMode: !state.isDarkMode
            });
        default:
            return state;
    }
};

const darkModeSelector = state => state.themeSwitch;

export const isDarkMode = createSelector(
    darkModeSelector,
    themeSwitch => themeSwitch.isDarkMode
);

export default themeSwitch;