import React from "react";
import {
  Container,
  Header,
  Menu,
  Button,
  List,
  Image
} from "semantic-ui-react";
import BookList from './BookList.js'

class App extends React.Component{

  state = {
    books: [],
    book: {
      users: []
    }
  }
  
  componentDidMount() {
    fetch('http://localhost:3000/books')
    .then(res => res.json())
    .then(books => this.setState({
      books: books
    }))
  }

  handleClick = (book) => {
    this.setState({
      book: book
    })
  }

  updateLikes = (book) => {
    fetch(`http://localhost:3000/books/${book.id}`, {
      method: 'PATCH',
      headers: {'Content-Type' : 'application/json'},
      body: JSON.stringify({
        users: [...book.users, {id: 1, username: "pouros"}]
      })
    })
    .then(res => res.json())
    .then(data => this.setState({
      book: data
    })
  )}

  render(){
    return (
    <div>
      <Menu inverted>
        <Menu.Item header>Bookliker</Menu.Item>
      </Menu>
      <main>
        <Menu vertical inverted>
          <Menu.Item as={"a"} onClick={e => console.log("book clicked!")}>
            Book title
            <BookList handleClick={this.handleClick} books={this.state.books}/>
          </Menu.Item>
        </Menu>
        <Container text>
          <Header>{this.state.book.title}</Header>
          <Image
            src={this.state.book.img_url}
            size="small"
          />
          <p>{this.state.book.description}</p>
          <Button onClick={() => this.updateLikes(this.state.book)}
            color="red"
            content="Like"
            icon="heart"
            label={{
              basic: true,
              color: "red",
              pointing: "left",
              content: "2,048"
            }}
          />
          <Header>Liked by</Header>
          <List>
            <List.Item icon="user" content={this.state.book.users.map(user => <li>{user.username}</li>)}/>
          </List>
        </Container>
      </main>
    </div>
  );
  }
}

export default App;
