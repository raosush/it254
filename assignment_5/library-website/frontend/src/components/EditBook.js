import React, { Component } from "react";
import { Toast } from "react-bootstrap";
import { deleteBook, getBook, putUpdateBook } from "../services/books";

export default class Book extends Component {
    constructor(props) {
        super(props);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeSubject = this.onChangeSubject.bind(this);
        this.onChangeEdition = this.onChangeEdition.bind(this);
        this.onChangeAuthor = this.onChangeAuthor.bind(this);
        this.onChangeNumberOfCopies = this.onChangeNumberOfCopies.bind(this);
        this.updateBook = this.updateBook.bind(this);
        this.deleteBook = this.deleteBook.bind(this);

        this.state = {
            currentBook: {
                id: null,
                title: "",
                subject: "",
                edition: "",
                author: "",
                numberOfCopies: "",
            },
            showToast: false,
            toastMessage: "",
        };
    }

    componentDidMount() {
        this.getBook(this.props.match.params.id);
    }

    onChangeTitle(e) {
        const title = e.target.value;

        this.setState(function (prevState) {
            return {
                currentBook: {
                    ...prevState.currentBook,
                    title: title
                }
            };
        });
    }

    onChangeSubject(e) {
        const subject = e.target.value;

        this.setState(prevState => ({
            currentBook: {
                ...prevState.currentBook,
                subject: subject
            }
        }));
    }

    onChangeEdition(e) {
        const edition = e.target.value;

        this.setState(prevState => ({
            currentBook: {
                ...prevState.currentBook,
                edition: edition
            }
        }));
    }

    onChangeAuthor(e) {
        const author = e.target.value;

        this.setState(prevState => ({
            currentBook: {
                ...prevState.currentBook,
                author: author
            }
        }));
    }

    onChangeNumberOfCopies(e) {
        const numberOfCopies = e.target.value;

        this.setState(prevState => ({
            currentBook: {
                ...prevState.currentBook,
                numberOfCopies: numberOfCopies
            }
        }));
    }

    async getBook(id) {
        try {
            const response = await getBook(id);
            this.setState({
                currentBook: response
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

    async updateBook() {
        try {
            await putUpdateBook(this.state.currentBook.id, this.state.currentBook);
            this.setState({
                showToast: true,
                toastMessage: "Book updated!"
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

    async deleteBook() {
        await deleteBook(this.state.currentBook.id);
        this.props.history.push('/books');
    }

    setShowToast(val) {
        this.setState({
            showToast: val
        });
    }

    render() {
        const { currentBook } = this.state;

        return (
            <div>
                {currentBook.id !== null ? (
                    <div className="edit-form">
                        <Toast onClose={() => this.setShowToast(false)} show={this.state.showToast} delay={5000} autohide>
                            <Toast.Header>
                                <strong className="mr-auto">Info</strong>
                            </Toast.Header>
                            <Toast.Body>{this.state.toastMessage}</Toast.Body>
                        </Toast>
                        <h4>Edit book details</h4>
                        <form>
                            <div className="form-group" style={{ padding: "20px" }}>
                                <label htmlFor="title">Title</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="title"
                                    required
                                    value={currentBook.title}
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
                                    value={currentBook.subject}
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
                                    value={currentBook.edition}
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
                                    value={currentBook.author}
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
                                    value={currentBook.numberOfCopies}
                                    placeholder="Enter number of copies currently available in the library"
                                    onChange={this.onChangeNumberOfCopies}
                                    name="numberOfCopies"
                                />
                            </div>
                        </form>

                        <div style={{ padding: "20px" }} className="text-center">
                            <button
                                className="btn btn-danger" style={{ padding: "10px", marginRight: "10px" }}
                                onClick={this.deleteBook}
                            >
                                Delete
                            </button>

                            <button
                                type="submit"
                                className="btn btn-success" style={{ padding: "10px" }}
                                onClick={this.updateBook}
                            >
                                Update
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
                        <br />
                        <p className="text-center">Unable to find book!</p>
                    </div>
                )}
            </div>
        );
    }
}
