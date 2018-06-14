import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import ListBooks from './ListBooks'
import AddBooks from './AddBooks'

class BooksApp extends Component {
    state = {
      books:[],
      search: [],
      myBooks: []
    }

  componentDidMount() {
    // fetch books from API
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  updateShelf(shelfTo, book) {
    BooksAPI.update(book, shelfTo).then(() => {
      book.shelf = shelfTo
      this.setState(state => ({
        books: state.books
      }))
    })
  }

  searchBooks = (terms) => {
     BooksAPI.search(terms).then((books) => {
       if(books){
         if(books.length>0){
           const search = books.map((book) => {
             const myBooks = this.state.books.find((b) => b.id === book.id)
             book.shelf = myBooks ? myBooks.shelf : 'none'
             return book
           });
           this.setState({ search })
         }else{
           this.setState({search:[]})
         }
       }else{
         this.setState({search:[]})
       }
     })
   }


  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
           <ListBooks
            books={this.state.books}
            onUpdateShelf={(shelf, book) =>
              this.updateShelf(shelf, book)
            }
          />
        )}/>
        <Route path='/search' render={( { history }) => (
          <AddBooks
            books = {this.state.books}
            search={this.state.search}
            onUpdateSearch={(terms) =>
              this.searchBooks(terms)
            }
            onUpdateShelf={(shelf, book) =>
              this.updateShelf(shelf, book)
            }
           />
        )}/>
      </div>
    )
  }
}

export default BooksApp
