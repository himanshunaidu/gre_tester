import React from 'react';

import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = ( props ) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" exact>Test</NavigationItem>
        <NavigationItem link="/history">History</NavigationItem>
    </ul>
);

export default navigationItems;