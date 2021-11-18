import React, { Component } from "react";
import { searchBooks } from "../services/books";

export default class BooksList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.onChangeAuthorName = this.onChangeAuthorName.bind(this);
    this.retrieveBooks = this.retrieveBooks.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.searchTitle = this.searchTitle.bind(this);

    this.state = {
      books: [],
      searchTitle: "",
      authorName: "",
      showToast: false,
      toastMessage: ""
    };
  }

  componentDidMount() {
    this.retrieveBooks();
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle
    });
  }

  onChangeAuthorName(e) {
    const authorName = e.target.value;

    this.setState({
      authorName: authorName
    });
  }

  async retrieveBooks() {
    try {
      const response = await searchBooks("", "");
      this.setState({
        books: response
      });
    } catch (e) {
      let message;
      if (e.response) {
        message = e.response.data.error;
      } else {
        message = "Something went wrong!";
      }
      this.setState({
        showToast: true,
        toastMessage: message
      });
    }
  }

  refreshList() {
    this.retrieveBooks();
    this.setState({
      authorName: "",
      searchTitle: ""
    });
  }

  async searchTitle() {
    try {
      const response = await searchBooks(this.state.searchTitle, this.state.authorName);
      this.setState({
        books: response
      });
    } catch (e) {
      let message;
      if (e.response) {
        message = e.response.data.error;
      } else {
        message = "Something went wrong!";
      }
      this.setState({
        showToast: true,
        toastMessage: message
      });
    }
  }

  render() {
    const { searchTitle, authorName, books } = this.state;

    return (
      <div className="row">
        <div className="col-xs-12 col-md-12 col-sm-12">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by title"
              value={searchTitle}
              onChange={this.onChangeSearchTitle}
            />
            <input
              type="text"
              className="form-control"
              placeholder="Search by author name"
              value={authorName}
              onChange={this.onChangeAuthorName}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchTitle}
              >
                Search
              </button>
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.refreshList}
              >
                Refresh
              </button>
            </div>
          </div>
        </div>
        <div className="col-sm-12 col-md-12 col-xs-12">
          <div className="cards-wrapper">
            {books &&
              books.map((book, index) => (
                <div className="card-grid-space" key={index}>
                  <div className="num">{index + 1}</div>
                  <a className="a-card" href={"/books/" + book.id} style={{ backgroundImage: `url(https://images1-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&resize_w=1500&url=https://codetheweb.blog/assets/img/posts/html-syntax/cover.jpg)` }}>
                    <div>
                      <h1>{book.title}</h1>
                      <p>{book.subject}</p>
                      <div className="date">{book.author}</div>
                      <div className="tags">
                        <div className="tag">{book.edition}</div>
                        <div className="tag">{book.numberOfCopies}</div>
                      </div>
                    </div>
                  </a>
                </div>
              ))}
          </div>
        </div>
      </div>
    );
  }
}
