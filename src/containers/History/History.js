import React, { Component } from 'react';
import classes from './History.module.css';
import axios from '../../axios';
import ReactPaginate from 'react-paginate'

import Auxiliary from '../../hoc/Auxiliary/Auxiliary';

import Button from '../../components/UI/Button/Button'
import * as ButtonClasses from '../../components/UI/Button/ButtonClasses';
import * as strings from '../../strings';
import * as history_col from '../../store/dbDetails/history';

import TestHistory from '../../components/HistorySub/TestHistory/TestHistory';

//Equivalent to BurgerBuilder of the Udemy project

class History extends Component {

  state = {
    history: [],
    perPage: 5,
    offset: 0
  }

  handlePageClick = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * this.state.perPage;

    this.setState({offset: offset})
  }

  render() {
    console.log(this.state.history);

    let history = this.state.history.slice(this.state.offset, this.state.offset+this.state.perPage).map(test_history => {
      //console.log(test_history.random);
      return (
        <TestHistory id={test_history.history_id} random={test_history.random} index={test_history.index_start} name={test_history.name}
        meaning={test_history.meaning} mnemonic={test_history.mnemonic} sentence={test_history.sentence}
        meaning_sc={test_history.meaning_sc} mnemonic_sc={test_history.mnemonic_sc} sentence_sc={test_history.sentence_sc}
        total={test_history.total}>

        </TestHistory>
      )
    })

    return (
      <Auxiliary>
        <ReactPaginate
                    previousLabel={"prev"}
                    nextLabel={"next"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={this.state.history.length/this.state.perPage}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={this.state.perPage}
                    onPageChange={this.handlePageClick}
                    containerClassName={classes.pagination}
                    subContainerClassName={[classes.pagination, 'pages'].join(' ')}
                    activeClassName={"active"}/>
        {history}
      </Auxiliary>
    );
  }

  componentDidMount() {
    axios.get('/history/tests')
      .then(result => {
        console.log(result);
        this.setState({
          history: result.data.history
        })
      })
  }
}

export default History;
