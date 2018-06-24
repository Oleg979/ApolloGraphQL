import React, { Component } from 'react'
import {graphql} from 'react-apollo'
import {getBookQuery} from "../queries";


class BookDetails extends Component {
    displayBookDetails() {
        const {book} = this.props.data
        if (book) return (
            <div>
                <h2>{book.name}</h2>
                <h3>{book.genre} book by {book.author.name}</h3>
                <p><b>All books by this author:</b></p>
                    {book.author.books.map((book,idx) => (
                        <p key={book.id}>{idx+1}. {book.name}</p>
                    ))}
            </div>
        )
        else return (
            <p>No books selected...</p>
        )
    }
    render() {
        return (
           <div className="book-details">
               {this.displayBookDetails()}
           </div>
        )
    }
}

export default graphql(getBookQuery, {
    options: props => {
        return {
            variables: {
                id: props.bookId
            }
        }
    }
})(BookDetails)
