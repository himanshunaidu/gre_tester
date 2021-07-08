import React, { Component } from 'react';
import { useLocation, NavLink, Route, Router, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import classes from './TestDetails.module.css';

import * as actions from '../../store/actions/index';
import * as strings from '../../strings';

import Auxiliary from '../../hoc/Auxiliary/Auxiliary';

import Button from '../../components/UI/Button/Button'
import * as ButtonClasses from '../../components/UI/Button/ButtonClasses';

//Equivalent to BurgerBuilder of the Udemy project

class TestDetails extends Component {

  state = {
    details_submit: false,
    index_start: null,
    meaning: false,
    mnemonic: false,
    sentence: false
  }

  submitDetailsHandler = () => {
    //console.log(this.props);
    this.setState({details_submit: true});
  }

  indexStartHandler = (e) => {
    //this.setState({index_start: e.target.value})
    let new_index = e.target.value;
    if (new_index> this.props.total_words) {
      alert(`Index value exceeding total number of words (${this.props.total_words})!!`)
    } else if(new_index< 1){
      alert(`Index value is too low!!`)
    }
    else {
      this.props.indexUpdate(new_index);
    }
  }

  detailsChangeHandler = (type) => {
    //console.log(this.props);
    switch (type) {
      case strings.MEANING:
        let meaning = !this.props.meaning;
        //this.setState({meaning: meaning});
        this.props.meaningUpdate(meaning);
        break;

      case strings.MNEMONIC:
        let mnemonic = !this.props.mnemonic;
        //this.setState({mnemonic: mnemonic});
        this.props.mnemonicUpdate(mnemonic);
        break;

      case strings.SENTENCE:
        let sentence = !this.props.sentence;
        //this.setState({sentence: sentence});
        this.props.sentenceUpdate(sentence);
        break;
    }
  }

  render() {

    //If Details have been submitted
    if (this.state.details_submit) {
      return <Redirect push to="/test"/>
    }

    //Sequential is the default assumption
    let label = <p>{strings.SEQUENTIAL}</p>

    let sequential = <div>Index Start:  
                        <input type="text" value={this.props.index_start} onChange={this.indexStartHandler}/>
                    </div>


    if (this.props.random) {
        label = <p>{strings.RANDOM}</p>
        sequential = null;
    }

    return (
      <Auxiliary>
          {label}
          <br></br>
          {sequential}

          <div><p>Choose Question Details: </p></div>
          <input type="checkbox" value={strings.MEANING} checked={this.props.meaning} 
          onChange={this.detailsChangeHandler.bind(this, strings.MEANING)}/>{strings.MEANING}<br></br>
          <input type="checkbox" value={strings.MNEMONIC} checked={this.props.mnemonic}
          onChange={this.detailsChangeHandler.bind(this, strings.MNEMONIC)}/>{strings.MNEMONIC}<br></br>
          <input type="checkbox" value={strings.SENTENCE} checked={this.props.sentence}
          onChange={this.detailsChangeHandler.bind(this, strings.SENTENCE)}/>{strings.SENTENCE}<br></br>
          <Button disabled={false} btnType={ButtonClasses.DEFAULT} onClick={this.submitDetailsHandler}>Submit Details</Button>
      </Auxiliary>
    );
  }
}

const mapStateToProps = state => {
  return {
    total_words: state.test.total_words,
    random: state.test.random,
    index_start: state.test.index_start,
    meaning: state.test.meaning,
    mnemonic: state.test.mnemonic,
    sentence: state.test.sentence
  }
}

const mapDispatchToProps = dispatch => {
  return {
    indexUpdate: (index_start) => {return dispatch(actions.indexUpdate(index_start))},
    meaningUpdate: (meaning) => {
      return dispatch(actions.meaningUpdate(meaning))},
    mnemonicUpdate: (mnemonic) => {
      return dispatch(actions.mnemonicUpdate(mnemonic))},
    sentenceUpdate: (sentence) => {
      return dispatch(actions.sentenceUpdate(sentence))},
    detailsSubmit: (index_start, meaning, mnemonic, sentence) => {return dispatch(actions.detailsSubmit(index_start, meaning, mnemonic, sentence))}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TestDetails));
