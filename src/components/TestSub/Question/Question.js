import React, {Component} from 'react';
import styles from './Question.module.css';
import PropTypes from 'prop-types';
import * as strings from '../../../strings';

import Button from '../../UI/Button/Button';
import * as ButtonClasses from '../../UI/Button/ButtonClasses';

class Question extends Component {
    render() {

        let meaning = null, mnemonic = null, sentence = null;
        if (this.props.meaning) {
            meaning = <div>{strings.MEANING}: <textarea></textarea></div>;
        }
        if (this.props.mnemonic) {
            mnemonic = <div>{strings.MNEMONIC}: <textarea></textarea></div>;
        }
        if (this.props.sentence) {
            sentence = <div>{strings.SENTENCE}: <textarea></textarea></div>;
        }


        return (
            <div className={styles.Question}>
                <div><p>Question</p></div>
                <div><p>Word: {this.props.word}</p></div>
                
                {meaning}
                <br></br>
                {mnemonic}
                <br></br>
                {sentence}

                {/*<Button disabled={false} btnType={ButtonClasses.DEFAULT}>Submit</Button>*/}
            </div>
        )
    }
}

Question.propTypes = {
    word: PropTypes.string.isRequired,
    meaning: PropTypes.bool.isRequired,
    mnemonic: PropTypes.bool.isRequired,
    sentence: PropTypes.bool.isRequired
}

export default Question;