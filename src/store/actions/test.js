import axios from '../../axios';

import * as actionTypes from './actionTypes';

export const getTotalWords = () => {
    return function(dispatch) {
        axios.get('/test/total_words')
        .then(result => {
            console.log(result);
            dispatch(passTotalWords(result.data.total_words));
      })
    }
}

export const passTotalWords = (total_words) => {
    return {
        type: actionTypes.GET_TOTAL_WORDS,
        total_words: total_words
    }
}

export const typeSubmit = (random) => {
    return {
        type: actionTypes.SUBMIT_TYPE,
        random: random
    }
}

export const detailsSubmit = (index_start, meaning, mnemonic, sentence) => {
    return {
        type: actionTypes.SUBMIT_DETAILS,
        index_start: index_start,
        meaning: meaning,
        mnemonic: mnemonic,
        sentence: sentence
    }
}

export const indexUpdate = (index_start) => {
    return {
        type: actionTypes.UPDATE_INDEX,
        index_start: index_start
    }
}

export const meaningUpdate = (meaning) => {
    return {
        type: actionTypes.UPDATE_MEANING,
        meaning: meaning
    }
}

export const mnemonicUpdate = (mnemonic) => {
    return {
        type: actionTypes.UPDATE_MNEMONIC,
        mnemonic: mnemonic
    }
}

export const sentenceUpdate = (sentence) => {
    return {
        type: actionTypes.UPDATE_SENTENCE,
        sentence: sentence
    }
}

export const appendFailedWord = (word) => {
    return {
        type: actionTypes.FAILED_WORDS,
        failed_word: word
    }
}

export const removeFromRandomList = (index) => {
    return {
        type: actionTypes.RANDOM_WORD,
        index: index
    }
}