import React from 'react';

import classes from './Score.module.css';
import * as strings from '../../../strings';
import Button from '../../UI/Button/Button';
import * as ButtonClasses from '../../UI/Button/ButtonClasses';

const endTest = (props) => {
    return (
        <div className={classes.Score}>
            Scores: {'  '}
            {props.meaning ? <div>{strings.MEANING}: {props.meaning_sc}/{props.total}</div> : null} {'    '}
            {props.mnemonic ? <div>{strings.MNEMONIC}: {props.mnemonic_sc}/{props.total}</div> : null} {'    '}
            {props.sentence ? <div>{strings.SENTENCE}: {props.sentence_sc}/{props.total}</div> : null} {'    '}
        </div>
    )
}

export default endTest;