import React from 'react';
import styles from './Layout.module.css';

import '../../hoc/Auxiliary/Auxiliary';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Toolbar from '../Navigation/Toolbar/Toolbar';

const layout = (props) => {
    return (
        <Auxiliary>
            <Toolbar></Toolbar>
            <main className={styles.Main}>
                {props.children}
            </main>
        </Auxiliary>
      );
}

export default layout;
