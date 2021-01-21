import React, { Component } from 'react'
import { connect } from 'react-redux'

import {add} from '../../redux/actions/bookshelf'

class BookShelf extends Component {
  render() {
    return (
      <div>
        <ul>
          {
            this.props.books.map((book) => {
              return <li key={book.id}>{book.name} --- {book.auther}</li>
            })
          }
        </ul>
      </div>
    )
  }
}

export default connect(
  state => ({books: state.books}),
  {
    add
  }
)(BookShelf)