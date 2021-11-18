import React, { Component } from "react";
import { Toast } from "react-bootstrap";
import { postNewBook } from "../services/books";

export default class AddBook extends Component {
    constructor(props) {
        super(props);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeSubject = this.onChangeSubject.bind(this);
        this.onChangeEdition = this.onChangeEdition.bind(this);
        this.onChangeAuthor = this.onChangeAuthor.bind(this);
        this.onChangeNumberOfCopies = this.onChangeNumberOfCopies.bind(this);
        this.saveBook = this.saveBook.bind(this);
        this.newBook = this.newBook.bind(this);

        this.state = {
            id: null,
            title: "",
            subject: "",
            edition: "",
            author: "",
            numberOfCopies: "",
            showToast: false,
            toastMessage: "",

            submitted: false
        };
    }

    onChangeTitle(e) {
        this.setState({
            title: e.target.value
        });
    }

    onChangeSubject(e) {
        this.setState({
            subject: e.target.value
        });
    }

    onChangeEdition(e) {
        this.setState({
            edition: e.target.value
        });
    }

    onChangeAuthor(e) {
        this.setState({
            author: e.target.value
        });
    }

    onChangeNumberOfCopies(e) {
        this.setState({
            numberOfCopies: e.target.value
        });
    }

    async saveBook() {
        var data = {
            title: this.state.title,
            subject: this.state.subject,
            edition: this.state.edition,
            author: this.state.author,
            numberOfCopies: this.state.numberOfCopies
        };

        try {
            const response = await postNewBook(data);
            this.setState({
                id: response.id,
                title: response.title,
                subject: response.subject,
                edition: response.edition,
                author: response.author,
                numberOfCopies: response.numberOfCopies,

                submitted: true
            });
        } catch (e) {
            let message;
            if (e.response) {
                message = e.response.data.error;
            } else {
                message = "Something went wrong!"
            }
            this.setState({
                toastMessage: message,
                showToast: true
            })
        }
    }

    newBook() {
        this.setState({
            id: null,
            title: "",
            subject: "",
            edition: "",
            author: "",
            numberOfCopies: "",

            submitted: false
        });
    }

    setShowToast(val) {
        this.setState({
            showToast: val
        });
    }

    render() {
        return (
            <div className="submit-form">
                {this.state.submitted ? (
                    <div className="text-center row">
                        <div className="col-sm-3 col-md-3 col-xs-3">
                            <div className="card-grid-space">
                                <a className="a-card" href={"/books/" + this.state.id} style={{ backgroundImage: `url(https://images1-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&resize_w=1500&url=https://codetheweb.blog/assets/img/posts/html-syntax/cover.jpg)` }}>
                                    <div>
                                        <h1>{this.state.title}</h1>
                                        <p>{this.state.subject}</p>
                                        <div className="date">{this.state.author}</div>
                                        <div className="tags">
                                            <div className="tag">{this.state.edition}</div>
                                            <div className="tag">{this.state.numberOfCopies}</div>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        </div>
                        <div className="col-sm-3 col-md-3 col-xs-3" style={{alignItems: "center", justifyContent: "center"}}>
                            <button className="btn btn-success text-center" onClick={this.newBook}>
                                Add
                            </button>
                        </div>
                    </div>
                ) : (
                    <div>
                        <Toast onClose={() => this.setShowToast(false)} show={this.state.showToast} delay={5000} autohide>
                            <Toast.Header>
                                <strong className="mr-auto">Info</strong>
                            </Toast.Header>
                            <Toast.Body>{this.state.toastMessage}</Toast.Body>
                        </Toast>
                        <h4>Add a new book</h4>
                        <div className="form-group" style={{ padding: "20px" }}>
                            <label htmlFor="title">Title</label>
                            <input
                                type="text"
                                className="form-control"
                                id="title"
                                required
                                value={this.state.title}
                                placeholder="Enter title of the book"
                                onChange={this.onChangeTitle}
                                name="title"
                            />
                        </div>

                        <div className="form-group" style={{ padding: "20px" }}>
                            <label htmlFor="subject">Subject</label>
                            <input
                                type="text"
                                className="form-control"
                                id="subject"
                                required
                                value={this.state.subject}
                                placeholder="Enter the subject of the book"
                                onChange={this.onChangeSubject}
                                name="subject"
                            />
                        </div>

                        <div className="form-group" style={{ padding: "20px" }}>
                            <label htmlFor="edition">Edition</label>
                            <input
                                type="text"
                                className="form-control"
                                id="edition"
                                required
                                value={this.state.edition}
                                placeholder="Enter the edition of the book"
                                onChange={this.onChangeEdition}
                                name="edition"
                            />
                        </div>

                        <div className="form-group" style={{ padding: "20px" }}>
                            <label htmlFor="author">Author</label>
                            <input
                                type="text"
                                className="form-control"
                                id="author"
                                required
                                value={this.state.author}
                                placeholder="Enter the author of the book"
                                onChange={this.onChangeAuthor}
                                name="author"
                            />
                        </div>

                        <div className="form-group" style={{ padding: "20px" }}>
                            <label htmlFor="numberOfCopies">Number of copies available</label>
                            <input
                                type="text"
                                className="form-control"
                                id="numberOfCopies"
                                required
                                value={this.state.numberOfCopies}
                                placeholder="Enter number of copies currently available in the library"
                                onChange={this.onChangeNumberOfCopies}
                                name="numberOfCopies"
                            />
                        </div>

                        <div style={{ padding: "20px" }} className="text-center">
                            <button onClick={this.saveBook} style={{ padding: "10px" }} className="btn btn-success text-center">
                                Submit
                            </button>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}
