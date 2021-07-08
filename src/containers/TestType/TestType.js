import React, { Component } from 'react';
import { useLocation, NavLink, Route, Router, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import classes from './TestType.module.css';
//import axios from 'axios';
import axios from '../../axios';

import * as strings from '../../strings';
import * as actions from '../../store/actions/index';

import Auxiliary from '../../hoc/Auxiliary/Auxiliary';

import Button from '../../components/UI/Button/Button'
import * as ButtonClasses from '../../components/UI/Button/ButtonClasses';
import TestHistory from '../../components/HistorySub/TestHistory/TestHistory';

//Equivalent to BurgerBuilder of the Udemy project

class TestType extends Component {

  state = {
    type_submit: false,
    random: false
  }

  componentDidMount() {
    /*axios.get('/test/total_words')
      .then(result => {
        console.log(result);
      })*/
    this.props.getTotalWords();
  }

  submitTypeHandler = () => {
    //console.log(this.props.history);
    /*this.props.history.push({
      pathname: '/test_details'
    });*/
    this.setState({type_submit: true})
  }

  typeChangeHandler = (random) => {
    //this.setState({type: type})
    this.props.typeSubmit(random);
  }


  render() {

    //If Type has been submitted
    if (this.state.type_submit) {
      return <Redirect push to="/test_details"/>
    }

    return (
      <Auxiliary>
          <div><p>SELECT TYPE OF TEST</p></div>
          <br></br><br></br>
          <input type="radio" name={strings.RANDOM} value={strings.RANDOM}
            checked={this.props.random} 
            onChange={this.typeChangeHandler.bind(this, true)}/>{strings.RANDOM}  <br></br> <br></br>
          <input type="radio" name={strings.SEQUENTIAL} value={strings.SEQUENTIAL} 
            checked={!this.props.random}
            onChange={this.typeChangeHandler.bind(this, false)}/>{strings.SEQUENTIAL}  <br></br>
          <Button disabled={false} btnType={ButtonClasses.DEFAULT} onClick={this.submitTypeHandler}>Submit Type</Button>
      </Auxiliary>
    );
  }
}

const mapStateToProps = state => {
  return {
    total_words: state.test.total_words,
    random: state.test.random
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getTotalWords: () => {return dispatch(actions.getTotalWords())},
    typeSubmit: (random) => {return dispatch(actions.typeSubmit(random))}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TestType));
