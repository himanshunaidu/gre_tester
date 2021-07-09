import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import logo from './logo.svg';
import styles from './App.module.css';

import Layout from './components/Layout/Layout';
import Test from './containers/Test/Test';
import TestType from './containers/TestType/TestType';
import TestDetails from './containers/TestDetails/TestDetails';
import History from './containers/History/History';

class App extends Component {
  render() {

    let routes = <Switch>
          <Route path="/history" exact component={History} />
          <Route path="/test_details" exact component={TestDetails} />
          <Route path="/test" component={Test} />
          <Route path="/" exact component={TestType} />
          <Redirect to="/" />
        </Switch>

    return (
      <div className={styles.App}>
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}

export default App;
