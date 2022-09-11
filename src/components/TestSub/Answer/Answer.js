import React, { Component } from "react";
import styles from "./Answer.module.css";
import PropTypes from "prop-types";
import * as strings from "../../../strings";

import Button from "../../UI/Button/Button";
import * as ButtonClasses from "../../UI/Button/ButtonClasses";

class Answer extends Component {
  state = {
    meaningSelected: false,
    mnemonicSelected: false,
    sentenceSelected: false,
  };

  allCorrect = () => {
    let meaningSelected = true;
    let mnemonicSelected = true;
    let sentenceSelected = true;
    if (
      this.state.meaningSelected &&
      this.state.mnemonicSelected &&
      this.state.sentenceSelected
    ) {
      meaningSelected = false;
      mnemonicSelected = false;
      sentenceSelected = false;
    }
    this.setState({
      meaningSelected: meaningSelected,
      mnemonicSelected: mnemonicSelected,
      sentenceSelected: sentenceSelected,
    });
    this.props.correctionHandler.call(this, meaningSelected, strings.MEANING);
    this.props.correctionHandler.call(this, mnemonicSelected, strings.MNEMONIC);
    this.props.correctionHandler.call(this, sentenceSelected, strings.SENTENCE);
  };

  render() {
    let meaning = null,
      mnemonic = null,
      sentence = null;

    if (this.props.meaning) {
      meaning = (
        <div className={styles.AnswerComponent}>
          <input
            type="checkbox"
            checked={this.state.meaningSelected}
            onChange={(e) => {
              const meaningSelected = this.state.meaningSelected;
              this.setState({
                meaningSelected: !meaningSelected,
              });
              this.props.correctionHandler.call(
                this,
                !this.state.meaningSelected,
                strings.MEANING
              );
            }}
          />
          {strings.MEANING}: {this.props.meaning_ans}
        </div>
      );
    }

    if (this.props.mnemonic) {
      mnemonic = (
        <div className={styles.AnswerComponent}>
          <input
            type="checkbox"
            checked={this.state.mnemonicSelected}
            onChange={(e) => {
              const mnemonicSelected = this.state.mnemonicSelected;
              this.setState({
                mnemonicSelected: !mnemonicSelected,
              });
              this.props.correctionHandler.call(
                this,
                !this.props.mnemonicSelected,
                strings.MNEMONIC
              );
            }}
          />
          {strings.MNEMONIC}: {this.props.mnemonic_ans}
        </div>
      );
    }

    if (this.props.sentence) {
      sentence = (
        <div className={styles.AnswerComponent}>
          <input
            type="checkbox"
            checked={this.state.sentenceSelected}
            onChange={(e) => {
              const sentenceSelected = this.state.sentenceSelected;
              this.setState({
                sentenceSelected: !sentenceSelected,
              });
              this.props.correctionHandler.call(
                this,
                !this.state.sentenceSelected,
                strings.SENTENCE
              );
            }}
          />
          {strings.SENTENCE}: {this.props.sentence_ans}
        </div>
      );
    }

    return (
      <div className={styles.AnswerContainer}>
        <div>
          <p>Answer</p>
        </div>

        <div className={styles.Answer}>
          {meaning}
          <br></br>
          {mnemonic}
          <br></br>
          {sentence}
        </div>

        <Button btnType={ButtonClasses.SUCCESS} onClick={this.allCorrect}>
          Select All as Correct (Incorrect if all Selected)
        </Button>
      </div>
    );
  }
}

/*Answer.propTypes = {
    word: PropTypes.string.isRequired,
    meaning: PropTypes.string.isRequired,
    mnemonic: PropTypes.string.isRequired,
    sentence: PropTypes.string.isRequired
}*/

export default Answer;
