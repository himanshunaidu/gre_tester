import React, { Component } from "react";
import "./Test.css";

import { connect } from "react-redux";
import {
  useLocation,
  NavLink,
  Route,
  Router,
  withRouter,
  Redirect,
} from "react-router-dom";
import axios from "../../axios";

import * as actions from "../../store/actions/index";
import * as strings from "../../strings";
import * as word_meanings_col from "../../store/dbDetails/word_meanings";
import * as history_col from "../../store/dbDetails/history";

import Auxiliary from "../../hoc/Auxiliary/Auxiliary";
import Question from "../../components/TestSub/Question/Question";
import Answer from "../../components/TestSub/Answer/Answer";
import TestHistory from "../../components/HistorySub/TestHistory/TestHistory";
import Score from "../../components/TestSub/Score/Score";

import Button from "../../components/UI/Button/Button";
import * as ButtonClasses from "../../components/UI/Button/ButtonClasses";
import Modal from "../../components/UI/Modal/Modal";
import EndTest from "../../components/EndTest/EndTest";

//Equivalent to BurgerBuilder of the Udemy project

class Test extends Component {
  state = {
    submitted: false,
    submitting_test: false,
    submitted_test: false,

    //Starting Index (Not useful to this page)
    index: this.props.index_start,

    //Correction
    meaning_cor: false,
    mnemonic_cor: false,
    sentence_cor: false,

    //Score
    meaning_sc: 0,
    mnemonic_sc: 0,
    sentence_sc: 0,
    total: 0,
  };

  getWord = (meaning_sc, mnemonic_sc, sentence_sc, total, index) => {
    const wordparams = {
      params: {
        index: index,
      },
    };

    console.log(index);

    //Set all the state variables for the word being extracted
    axios.get("/test/word", wordparams).then((result) => {
      console.log(result);
      if (!result.data.success) {
        this.submitSuccessHandler();
        return;
      } else {
        let word_meaning = result.data.word_meaning;
        //console.log(word_meaning);

        let meaning =
          word_meaning[word_meanings_col.VERB] +
          "\n" +
          word_meaning[word_meanings_col.ADJECTIVE] +
          "\n" +
          word_meaning[word_meanings_col.ADVERB] +
          "\n" +
          word_meaning[word_meanings_col.NOUN] +
          "\n" +
          word_meaning[word_meanings_col.OTHERS];

        /*this.setState({meaning_sc: meaning_sc, mnemonic_sc: mnemonic_sc, sentence_sc: sentence_sc, total: total,
          meaning_cor: false, mnemonic_cor: false, sentence_cor: false,
          submitted: false, submitting_test: false, index: index})*/

        this.setState({
          //New Word and its Details
          index: index,
          word: word_meaning[word_meanings_col.WORD],
          wid: word_meaning[word_meanings_col.MAIN_ID],
          meaning_ans: meaning,
          mnemonic_ans: word_meaning[word_meanings_col.MNEMONIC],
          sentence_ans: word_meaning[word_meanings_col.EXAMPLE],

          //Updated Scores
          meaning_sc: meaning_sc,
          mnemonic_sc: mnemonic_sc,
          sentence_sc: sentence_sc,
          total: total,

          //Others Reset to Default
          meaning_cor: false,
          mnemonic_cor: false,
          sentence_cor: false,
          submitted: false,
          submitting_test: false,
        });
      }
    });
  };

  //When Submit Button is Pressed (of Question)
  submitHandler = () => {
    let submitted = !this.state.submitted;
    this.setState({ submitted: submitted });
  };

  //When Submit Result is Pressed  (of Answer)
  submitResultHandler = () => {
    //Update Scores
    let meaning_sc = this.state.meaning_sc;
    if (this.state.meaning_cor) {
      console.log("Meaning is Right");
      meaning_sc = meaning_sc + 1;
    }
    let mnemonic_sc = this.state.mnemonic_sc;
    if (this.state.mnemonic_cor) {
      console.log("Mnemonic is Right");
      mnemonic_sc = mnemonic_sc + 1;
    }
    let sentence_sc = this.state.sentence_sc;
    if (this.state.sentence_cor) {
      console.log("Sentence is Right");
      sentence_sc = sentence_sc + 1;
    }
    let total = this.state.total + 1;

    //Check if a word has failed, if so append the failed_words Redux list
    if (
      meaning_sc -
        this.state.meaning_sc +
        (mnemonic_sc - this.state.mnemonic_sc) +
        (sentence_sc - this.state.sentence_sc) ===
      0
    ) {
      console.log(this.state.word, "Failed");
      this.props.appendFailedWord(this.state.word);
    }

    //Update the word index
    let index;
    if (this.props.random) {
      this.props.removeRandomWordIndex(this.state.index);
      let index_index = Math.floor(
        Math.random() * this.props.random_remaining_words.length
      );
      index = this.props.random_remaining_words[index_index];
    } else {
      index = parseInt(this.state.index) + 1;
    }

    //Reset the Corrections
    //Reset the Submit
    //Reset the Submit Test
    this.getWord(meaning_sc, mnemonic_sc, sentence_sc, total, index);

    /*this.setState({meaning_sc: meaning_sc, mnemonic_sc: mnemonic_sc, sentence_sc: sentence_sc, total: total,
      meaning_cor: false, mnemonic_cor: false, sentence_cor: false,
      submitted: false, submitting_test: false, index: index})*/
  };

  //For the Answer class
  correctionHandler = (cur_result, result_type) => {
    //result_type = !result_type;
    console.log(cur_result, result_type);
    console.log(this.state);
    switch (result_type) {
      case strings.MEANING:
        this.setState({ meaning_cor: cur_result });
        break;
      case strings.MNEMONIC:
        this.setState({ mnemonic_cor: cur_result });
        break;
      case strings.SENTENCE:
        this.setState({ sentence_cor: cur_result });
        break;
    }
    //console.log(this.state);
  };

  //When the Submit Test is Pressed
  submitTestHandler = () => {
    this.setState({ submitting_test: true });
  };

  //When the Submit Test Confirmation is Cancelled
  submitCancelHandler = () => {
    this.setState({ submitting_test: false });
  };

  //When the Submit Test Confirmation is Confirmed
  submitSuccessHandler = () => {
    console.log("Getting you back to homepage");
    //this.props.history.replace('/');

    let history = {
      meaning: this.props.meaning,
      meaning_sc: this.state.meaning_sc,
      mnemonic: this.props.mnemonic,
      mnemonic_sc: this.state.mnemonic_sc,
      sentence: this.props.sentence,
      sentence_sc: this.state.sentence_sc,
      random: this.props.random,
      index_start: this.props.index_start,
      total: this.state.total,
    };

    console.log(this.props.failed_words);

    axios.post("/test/failed_words", this.props.failed_words).then((result) => {
      console.log(result);
    });

    //Update history in the database
    axios.post("/history/submit", history).then((result) => {
      console.log(result);
      this.setState({ submitted_test: true });
    });
  };

  render() {
    //console.log(this.state.index);
    //console.log(this.props);

    //If End Test has been clicked
    if (this.state.submitted_test) {
      return <Redirect to="/" />;
    }

    let answer = null;
    if (this.state.submitted) {
      answer = (
        <div>
          <Answer
            meaning={this.props.meaning}
            mnemonic={this.props.mnemonic}
            sentence={this.props.sentence}
            meaning_ans={this.state.meaning_ans}
            mnemonic_ans={this.state.mnemonic_ans}
            sentence_ans={this.state.sentence_ans}
            meaning_cor={this.state.meaning_cor}
            mnemonic_cor={this.state.mnemonic_cor}
            sentence_cor={this.state.sentence_cor}
            correctionHandler={this.correctionHandler}
          />
          <Button
            disabled={false}
            btnType={ButtonClasses.DEFAULT}
            onClick={this.submitResultHandler}
          >
            Submit Result
          </Button>
          <br></br>
        </div>
      );
    }

    let score = (
      <Score
        meaning={this.props.meaning}
        mnemonic={this.props.mnemonic}
        sentence={this.props.sentence}
        meaning_sc={this.state.meaning_sc}
        mnemonic_sc={this.state.mnemonic_sc}
        sentence_sc={this.state.sentence_sc}
        total={this.state.total}
      ></Score>
    );

    return (
      <Auxiliary>
        {score}
        <hr></hr>
        <Modal
          show={this.state.submitting_test}
          modalClosed={this.submitCancelHandler}
        >
          <EndTest
            cancel={this.submitCancelHandler}
            submit={this.submitSuccessHandler}
          ></EndTest>
        </Modal>
        <Question
          word={this.state.word}
          meaning={this.props.meaning}
          mnemonic={this.props.mnemonic}
          sentence={this.props.sentence}
        />
        <Button
          disabled={false}
          btnType={ButtonClasses.DEFAULT}
          onClick={this.submitHandler}
        >
          Submit
        </Button>
        <hr></hr>
        {answer}
        <Button
          disabled={false}
          btnType={ButtonClasses.SUCCESS}
          onClick={this.submitTestHandler}
        >
          End Test
        </Button>
      </Auxiliary>
    );
  }

  componentDidMount() {
    if (this.state.index) {
      this.getWord(0, 0, 0, 0, this.state.index);
    }
  }

  /*componentDidUpdate() {
    console.log(this.state.wid);
    if (this.state.index !== this.state.wid) {
      this.getWord();
    }
  }*/
}

const mapStateToProps = (state) => {
  return {
    total_words: state.test.total_words,
    random: state.test.random,
    index_start: state.test.index_start,
    meaning: state.test.meaning,
    mnemonic: state.test.mnemonic,
    sentence: state.test.sentence,
    failed_words: state.test.failed_words,
    random_remaining_words: state.test.random_remaining_words,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    appendFailedWord: (word) => {
      return dispatch(actions.appendFailedWord(word));
    },
    removeRandomWordIndex: (index) => {
      return dispatch(actions.removeFromRandomList(index));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Test));
