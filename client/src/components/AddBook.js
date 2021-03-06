import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import { getAuthorsQuery, addBookMutation, getBooksQuery } from '../queries/queries'

class AddBook extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      genre: '',
      authorId: '',
    }
  }

  displayAuthors() {
    var data = this.props.getAuthorsQuery
    if (data.loading) {
      return <option disabled>Loading authors</option>
    } else {
      return data.authors.map(author => {
        return (
          <option key={author.id} value={author.id}>
            {author.name}
          </option>
        )
      })
    }
  }

  submitForm(e) {
    e.preventDefault()
    // use the addBookMutation
    this.props.addBookMutation({
      variables: {
        name: this.state.name,
        genre: this.state.genre,
        authorId: this.state.authorId,
      },
      refetchQueries: [{ query: getBooksQuery }],
    })
  }

  render() {
    return (
      <form id="add-book" className="form" onSubmit={this.submitForm.bind(this)}>
        <div className="form__field">
          <label className="form__label">Book name:</label>
          <input className="form__input" type="text" onChange={e => this.setState({ name: e.target.value })} />
        </div>
        <div className="form__field">
          <label className="form__label">Genre:</label>
          <input className="form__input" type="text" onChange={e => this.setState({ genre: e.target.value })} />
        </div>
        <div className="form__field">
          <label className="form__label">Author:</label>
          <select className="form__select" onChange={e => this.setState({ authorId: e.target.value })}>
            <option>Select author</option>
            {this.displayAuthors()}
          </select>
        </div>
        <button className="form__button">+</button>
      </form>
    )
  }
}

export default compose(
  graphql(getAuthorsQuery, { name: 'getAuthorsQuery' }),
  graphql(addBookMutation, { name: 'addBookMutation' })
)(AddBook)
