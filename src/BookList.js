import React, {Component, Fragment} from 'react'
import { Menu} from 'semantic-ui-react'


function BookList(props) {

  return (
    <div>
      {props.books.map((book) => <Menu.Item onClick={() => props.handleClick(book)}> {book.title} </Menu.Item>)}
    </div>
  )
  }

export default BookList