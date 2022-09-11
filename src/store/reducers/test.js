import * as actionTypes from "../actions/actionTypes";
import * as strings from "../../strings";

const initialState = {
  total_words: 0,
  random: false,
  index_start: 1,
  meaning: false,
  mnemonic: false,
  sentence: false,
  failed_words: [],
  random_remaining_words: [],
  rrw_len: 0,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_TOTAL_WORDS:
      return {
        ...state,
        total_words: action.total_words,
      };
    case actionTypes.SUBMIT_TYPE:
      return {
        ...state,
        random: action.random,
      };
    case actionTypes.SUBMIT_DETAILS:
      return {
        ...state,
        index_start: action.index_start,
        meaning: action.meaning,
        mnemonic: action.mnemonic,
        sentence: action.sentence,
      };
    case actionTypes.UPDATE_INDEX:
      return {
        ...state,
        index_start: action.index_start,
      };
    case actionTypes.UPDATE_MEANING:
      return {
        ...state,
        meaning: action.meaning,
      };
    case actionTypes.UPDATE_MNEMONIC:
      return {
        ...state,
        mnemonic: action.mnemonic,
      };
    case actionTypes.UPDATE_SENTENCE:
      return {
        ...state,
        sentence: action.sentence,
      };
    case actionTypes.FAILED_WORDS:
      let failed_words = [...state.failed_words];
      failed_words.push(action.failed_word);
      return {
        ...state,
        failed_words: failed_words,
      };
    case actionTypes.RANDOM_WORD:
      let random_remaining_words = [...state.random_remaining_words];
      console.log(random_remaining_words);
      if (random_remaining_words.length === 0) {
        for (let i = 1; i < 1033; i++) {
          random_remaining_words.push(i);
        }
      }
      let index_index = random_remaining_words.indexOf(action.index);
      if (index_index != -1) {
        random_remaining_words.splice(index_index, 1);
      }
      return {
        ...state,
        random_remaining_words: random_remaining_words,
        rrw_len: random_remaining_words.length,
      };

    default:
      return state;
  }
};

export default reducer;
