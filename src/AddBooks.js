import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'

class AddBooks extends Component {
  static propTypes = {
    onUpdateSearch: PropTypes.func.isRequired
  }
  state = {
        query:''
    }
    updateQuery = (query) => {
      const { onUpdateSearch } = this.props

        this.setState({ query: query })

        onUpdateSearch(query)

    }


  render() {
    const { search, books, onUpdateShelf } = this.props
    const { query } = this.state

    let myBooks

    if(query) {

      const match = new RegExp(escapeRegExp(query), 'i')

      myBooks = books.filter(
        (book) => {
          if( (match.test(book.title) || match.test(book.authors)) && book.shelf !== 'none'  ) {
            return true
          }
        })
    }


    return (
       <div className="search-books">
        <div className="search-books-bar">
          <Link className='close-search' to='/'>Close</Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={ query }
              onChange={(event) => this.updateQuery(event.target.value)}
              />
          </div>
        </div>
        <div className="search-books-results">
        { myBooks ?
          <div className="bookshelf">
            <h2 className="bookshelf-title">My Books</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
              { myBooks.map((book) => (
                <li key={book.id}>
                  <div className="book">
                    <div className="book-top">
                    { book.imageLinks &&
                      ( <div className="book-cover"
                        style={{
                          width: 128,
                          height: 188,
                          backgroundImage: `url(${book.imageLinks.thumbnail})` }}>
                      </div> )
                    }
                    {!book.imageLinks && (
                      <div className="book-cover"
                        style={{
                          width: 128,
                          height: 188,
                          backgroundImage: 'url(https://picsum.photos/128/188?image=1073)' }}>
                      </div>)
                    }
                      <div className={`book-shelf-changer ${book.shelf}`}>
                        <select value={book.shelf ? book.shelf : "none" }
                          onChange={(event) =>
                            {
                            onUpdateShelf(event.target.value, book)
                            }
                          }>
                          <option value="move" disabled>Move to...</option>
                          <option value="currentlyReading">Currently Reading</option>
                          <option value="wantToRead">Want to Read</option>
                          <option value="read">Read</option>
                          <option value="none">None</option>
                        </select>
                      </div>
                    </div>
                    <div className="book-title">{book.title}</div>
                    { book.authors && (
                      <div className="book-authors">{book.authors.join(', ')}</div>
                    )}
                  </div>
                </li>

                ))}
              </ol>
            </div>
          </div>
        : <div> </div> }
          <div className="bookshelf">
            <h2 className="bookshelf-title">Search Results</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                { // if the book is already in mybooks, don't list it
                  search.length > 0 && query.length > 0 ? search.map((book) => (
                  <li key={book.id}>
                    <div className="book">
                      <div className="book-top">
                      { book.imageLinks &&
                        ( <div className="book-cover"
                          style={{
                            width: 128,
                            height: 188,
                            backgroundImage: `url(${book.imageLinks.thumbnail})` }}>
                        </div> )
                      }
                      {!book.imageLinks && (
                        <div className="book-cover"
                          style={{
                            width: 128,
                            height: 188,
                            backgroundImage: 'url(https://picsum.photos/128/188?image=1073)' }}>
                        </div>)
                      }
                        <div className={`book-shelf-changer ${book.shelf}`}>
                          <select value={book.shelf ? book.shelf : "none" } onChange={(event) =>
                            {
                            onUpdateShelf(event.target.value, book)
                            books.push(book)
                            }
                          }>
                            <option value="move" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                          </select>
                        </div>
                      </div>
                      <div className="book-title">{book.title}</div>
                      { book.authors && (
                        <div className="book-authors">{book.authors.join(', ')}</div>
                        )}
                    </div>
                  </li>
                )) : <li>No Results</li> }
              </ol>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default AddBooks
