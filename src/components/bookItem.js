//Imports
import React from "react";
import Card from 'react-bootstrap/Card';
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import axios from "axios";

export class BookItem extends React.Component {
    //Constructor
    constructor() {
        super();
        //Delete Book Binds
        this.DeleteBook = this.DeleteBook.bind(this);
    }

    //Delete Book
    DeleteBook(e) {
        e.preventDefault();
        axios.delete('http://localhost:2000/api/book/' + this.props.book._id) 
            .then((res) => { this.props.Reload(); }) 
            .catch();
    }

    //Render Page
    render() {
        return (
            <div className="bookItem">
                {/* Print out info from Array as Cards */}
                <Card>
                    {/* Book Title */}
                    <Card.Header>{this.props.book.title}</Card.Header>
                    {/* Displaying bootstrap book cards by using props */}
                    <Card.Body>
                        <Card.Title>{this.props.book.cover}</Card.Title>
                        <Card.Title>{this.props.book.author}</Card.Title>
                    </Card.Body>
                    <Link to={'/edit/' + this.props.book._id} className="btn btn-primary">Edit</Link>
                    {/* Deletes Book and reloads page */}
                    <Button variant="danger" onClick={this.DeleteBook}>Delete</Button>
                </Card>
            </div>
        )
    }
}