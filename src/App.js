import React, { useState } from 'react';
import { connect } from "react-redux";
import classnames from 'classnames';

//Components
import ToDoList from "./components/ToDoList";
import ThemeSwitch from './components/ThemeSwitch'
import ListModal from './components/ListModal';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button,
    CardTitle, CardText, Row, Col } from 'reactstrap';

//Styles
import styles from './app.module.scss';

//Redux
import { isDarkMode } from "./redux/reducers/themeSwitch";
import {isModalOpen} from "./redux/reducers/modalReducer";

const App = ({ isDarkMode, dispatch}) => {
  const [activeTab, setActiveTab] = useState('1');

  const toggleTabs = tab => {
    if (activeTab !== tab) {
        setActiveTab(tab);
    }
  };

  return (
    <div className={classnames(styles.appWrapper, { [styles.darkMode] : isDarkMode})}>
        <ListModal />
        <ThemeSwitch />
        <h1 className={styles.appHeader} >Life Manager</h1>
        <Nav className={styles.tabNav} tabs>
            <NavItem className={styles.navItem}>
                <NavLink
                    className={classnames(styles.navLink, { active: activeTab === '1' })}
                    onClick={() => toggleTabs('1')}
                >
                    ToDo List
                </NavLink>
            </NavItem>
            <NavItem className={styles.navItem}>
                <NavLink
                    className={classnames( styles.navLink, { active: activeTab === '2' })}
                    onClick={() => toggleTabs('2')}
                >
                    Grocery List
                </NavLink>
            </NavItem>
        </Nav>
        <TabContent activeTab={activeTab}>
            <TabPane tabId="1">
                <ToDoList />
            </TabPane>
            <TabPane tabId="2">

            </TabPane>
        </TabContent>
    </div>
  );
};

const mapStateToProps = (state) => {
  return({
      isDarkMode: isDarkMode(state)
  })
};

export default connect(mapStateToProps)(App);
