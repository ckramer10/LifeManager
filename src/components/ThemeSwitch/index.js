import React from 'react';
import Switch from "react-switch";
import { FaMoon } from 'react-icons/fa';
import { FaSun } from 'react-icons/fa';
import './__styles__/themeSwitch.scss';
import { connect } from 'react-redux';
import { isDarkMode } from '../../redux/reducers/themeSwitch';

const ThemeSwitch = ({ isDarkMode, dispatch }) => {
    const switchProps = {
        className: 'themeSwitch',
        onChange: () => toggleDM(),
        checked: isDarkMode,
        checkedIcon: <FaMoon />,
        uncheckedIcon: <FaSun />
    };

    const toggleDM = () => {
        dispatch({ type: 'TOGGLE_DARK_MODE' });
    };

    return <Switch {...switchProps}/>
};

const mapStateToProps = (state) => {
    return({
        isDarkMode: isDarkMode(state)
    })
};

export default connect(mapStateToProps)(React.memo(ThemeSwitch));