import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class ListBooks extends Component {
  // static propTypes = {
  //   books: PropTypes.array.isRequired,
  // }


  render() {

     const { books, onUpdateShelf } = this.props

     //books.concat(search)

     let currentlyReadingList = books.filter((book) => book.shelf === 'currentlyReading')
     let wantToReadList = books.filter((book) => book.shelf === 'wantToRead')
     let readList = books.filter((book) => book.shelf === 'read')

     const shelves = [{
        'title': 'Currently Reading',
        'bookList': currentlyReadingList
      },
      {
        'title': 'Want To Read',
        'bookList': wantToReadList
      },
      {
        'title': 'Read',
        'bookList': readList
      }
     ]
     console.log()
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          { shelves.map((shelf) => (
            <div>
            { shelf.bookList && (
              <div className="bookshelf" key={shelf.bookList}>
                <h2 className="bookshelf-title">{shelf.title}</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">

                    { shelf.bookList.map((book) => (
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
                            <select value={book.shelf} onChange={(event) => onUpdateShelf(event.target.value, book)}>
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
            )}
            </div>
          ))}
        </div>
        <div className="open-search">
          <Link
              to='/search'
              onClick={this.props.onNavigate}
          >Add Contact</Link>
        </div>
      </div>
    )
  }
}

export default ListBooks
