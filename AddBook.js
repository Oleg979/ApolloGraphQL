import React, { Component } from 'react'
import {graphql, compose} from 'react-apollo'
import {getAuthorsQuery, addBookMutation, getBooksQuery} from "../queries";

class AddBook extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            genre: '',
            authorId: ''
        }
    }

    renderAuthors() {
        let {getAuthorsQuery: data} = this.props
        if(data.loading)
            return <option disabled>Loading...</option>
        return data.authors.map(author => (
            <option key={author.id} value={author.id}>{author.name}</option>
        ))
    }
    submitForm(e) {
        e.preventDefault()
        this.props.addBookMutation({
            variables:{
                name: this.state.name,
                genre: this.state.genre,
                authorId: this.state.authorId
            },
            refetchQueries: [{
                query: getBooksQuery
            }]
        })
    }
    render() {
        return (
            <form className="add-form" onSubmit={(e) => this.submitForm(e)}>
                <div className="add-field">
                    <label>Name:</label>
                    <input type="text" onChange={(e) => this.setState({name: e.target.value})}/>
                </div>
                <div className="add-field">
                    <label>Genre:</label>
                    <input type="text" onChange={(e) => this.setState({genre: e.target.value})}/>
                </div>
                <div className="add-field">
                    <label>Author:</label>
                    <select onChange={(e) => this.setState({authorId: e.target.value})}>
                        <option disabled>Select author</option>
                        {this.renderAuthors()}
                    </select>
                </div>
                <button>+</button>
            </form>
        )
    }
}

export default compose(
    graphql(getAuthorsQuery, {name: "getAuthorsQuery"}),
    graphql(addBookMutation, {name: "addBookMutation"})
)(AddBook)
