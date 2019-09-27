import React, { useState } from 'react';
import styles from './app.module.scss';
import { connect } from "react-redux";
import { FaMoon } from 'react-icons/fa';
import { FaSun } from 'react-icons/fa';

import ListItem from './components/ListItem';
import ThemeSwitch from './components/ThemeSwitch'
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import { isDarkMode } from "./redux/reducers/themeSwitch";


const App = ({ isDarkMode, dispatch}) => {
  const [activeTab, setActiveTab] = useState('1');

  const toggleTabs = tab => {
    if (activeTab !== tab) {
        setActiveTab(tab);
    }
  };

  return (
    <div className={classnames(styles.appWrapper, { [styles.darkMode] : isDarkMode})}>
        <ThemeSwitch />
        <h1 className={styles.appHeader} >Get Yo Shit Together</h1>
        <Nav className={styles.tabNav} tabs>
            <NavItem>
                <NavLink
                    className={classnames({ active: activeTab === '1' })}
                    onClick={() => toggleTabs('1')}
                >
                    ToDo List
                </NavLink>
            </NavItem>
            <NavItem>
                <NavLink
                    className={classnames({ active: activeTab === '2' })}
                    onClick={() => toggleTabs('2')}
                >
                    Grocery List
                </NavLink>
            </NavItem>
        </Nav>
        <TabContent activeTab={activeTab}>
            <TabPane tabId="1">
                <Row>
                    <Col sm="12">
                        <h4>Tab 1 Contents</h4>
                    </Col>
                </Row>
            </TabPane>
            <TabPane tabId="2">
                <Row>
                    <Col sm="6">
                        <Card body>
                            <CardTitle>Special Title Treatment</CardTitle>
                            <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                            <Button>Go somewhere</Button>
                        </Card>
                    </Col>
                    <Col sm="6">
                        <Card body>
                            <CardTitle>Special Title Treatment</CardTitle>
                            <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                            <Button>Go somewhere</Button>
                        </Card>
                    </Col>
                </Row>
            </TabPane>
        </TabContent>
    </div>
  );
}

const mapStateToProps = (state) => {
  return({
      isDarkMode: isDarkMode(state)
  })
};

export default connect(mapStateToProps)(App);
