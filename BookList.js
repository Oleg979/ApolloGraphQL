import React, { Component, Fragment } from 'react'
import {graphql} from 'react-apollo'
import {getBooksQuery} from "../queries";
import BookDetails from "./BookDetails";


class BookList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selected: null
        }
    }
    renderBooks() {
        let {data} = this.props
        if(data.loading)
            return <div>Loading...</div>
        return data.books.map(book => (
            <li
                className="book-item"
                key={book.id}
                onClick={(e) => this.setState({selected: book.id})}
            >
                {book.name}
            </li>
        ))
    }
    render() {
        return (
            <Fragment>
                <ul className="book-list">
                    {this.renderBooks()}
                </ul>
                <hr/>
                <BookDetails bookId={this.state.selected}/>
            </Fragment>
        )
    }
}

export default graphql(getBooksQuery)(BookList)
