import React, {Component} from 'react';
import styles from './Answer.module.css';
import PropTypes from 'prop-types';
import * as strings from '../../../strings';

class Answer extends Component {
    render() {

        let meaning = null, mnemonic = null, sentence = null;
        if (this.props.meaning) {
            meaning = <div>{strings.MEANING}: {this.props.meaning_ans} 
                        <input type="checkbox" onChange={this.props.correctionHandler.bind(this, this.props.meaning_cor, strings.MEANING)}/>
                    </div>;
        }
        if (this.props.mnemonic) {
            mnemonic = <div>{strings.MNEMONIC}: {this.props.mnemonic_ans}
                        <input type="checkbox" onChange={this.props.correctionHandler.bind(this, this.props.mnemonic_cor, strings.MNEMONIC)}/>
                    </div>;
        }
        if (this.props.sentence) {
            sentence = <div>{strings.SENTENCE}: {this.props.sentence_ans}
                        <input type="checkbox" onChange={this.props.correctionHandler.bind(this, this.props.sentence_cor, strings.SENTENCE)}/>
                    </div>;
        }


        return (
            <div className={styles.Answer}>
                <div><p>Answer</p></div>
                
                {meaning}
                <br></br>
                {mnemonic}
                <br></br>
                {sentence}
            </div>
        )
    }
}

/*Answer.propTypes = {
    word: PropTypes.string.isRequired,
    meaning: PropTypes.string.isRequired,
    mnemonic: PropTypes.string.isRequired,
    sentence: PropTypes.string.isRequired
}*/

export default Answer;