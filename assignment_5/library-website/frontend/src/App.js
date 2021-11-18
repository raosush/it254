import React, { Component } from "react";
import { a } from "react-router-bootstrap";
import { Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import BooksList from "./components/ListBooks";
import AddBook from "./components/AddBook";
import Book from "./components/EditBook";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href={"/books"} className="navbar-brand">
            Library
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <a href={"/books"} className="nav-link">
                Books
              </a>
            </li>
            <li className="nav-item">
              <a href={"/add"} className="nav-link">
                Add
              </a>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/books"]} component={BooksList} />
            <Route exact path="/add" component={AddBook} />
            <Route path="/books/:id" component={Book} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
