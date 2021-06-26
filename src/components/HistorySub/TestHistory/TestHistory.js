import React, { Component } from 'react';
import classes from './TestHistory.module.css';
import * as strings from '../../../strings';

import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';

import Button from '../../UI/Button/Button'
import * as ButtonClasses from '../../UI/Button/ButtonClasses';

//Equivalent to BurgerBuilder of the Udemy project

class TestHistory extends Component {
  render() {

    let type = this.props.random ? strings.RANDOM : strings.SEQUENTIAL
    let name = this.props.name!=null ? '  '+this.props.name : null;

    //False if null
    let meaning = this.props.meaning ? 
                  <div>{strings.MEANING}: {this.props.meaning_sc}/{this.props.total} <br></br></div> :
                  null;
    
    let mnemonic = this.props.mnemonic ? 
                  <div>{strings.MNEMONIC}: {this.props.mnemonic_sc}/{this.props.total} <br></br></div> :
                  null;

    let sentence = this.props.sentence ? 
                  <div>{strings.SENTENCE}: {this.props.sentence_sc}/{this.props.total} <br></br></div> :
                  null;

    return (
      <Auxiliary>
          <br></br>
          <p>Test Number {this.props.id}: <b>{name}</b></p>
          <p>Type: {type}</p>
          {!this.props.random ? <p>Index Start: {this.props.index}</p> : null}
          
          {/*Meaning*/}
          {meaning}
          {/*Mnemonic*/}
          {mnemonic}
          {/*Sentence*/}
          {sentence}
          <br></br><hr></hr>
      </Auxiliary>
    );
  }
}

export default TestHistory;
