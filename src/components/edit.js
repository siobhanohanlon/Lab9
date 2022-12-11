import React from 'react';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export function Edit(props) {
    /* The useParams returns an object of key pairs of the dynamic 
    params from the current URL that were matched by the <Route path>*/
    let { id } = useParams();

    /*  Update arrays using the React useState() and without the Array 
        object's push() method */
    const [title, setTitle] = useState("");
    const [cover, setCover] = useState("");
    const [author, setAuthor] = useState("");

    // Navigate returns a function that we can then use to navigate
    const navigate = useNavigate();

    //useEffect Hook is similar componentDidMount
    useEffect(() => {
        //axios is a promised based web client
        //make a HTTP Request with GET method and pass as part of the url.
        axios.get('http://localhost:2000/api/book/' + id).then((response) => {
            // Assign Response data to the arrays using useState.
            setTitle(response.data.title);
            setCover(response.data.cover);
            setAuthor(response.data.author);
        })
            .catch(function (error) {
                console.log(error);
            })
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();

        //New Book Data Assigned
        const newBook = {
            id: id,
            title: title,
            cover: cover,
            author: author
        };

        //Save Data
        axios.put('http://localhost:2000/api/book/' + id, newBook)
            .then((res) => {
                console.log(res.data);
                navigate('/read');
            });
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Add Book Title: </label>
                    <input type="text"
                        className="form-control"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Add Release Year: </label>
                    <input type="text"
                        className="form-control"
                        value={cover}
                        onChange={(e) => setCover(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Add Poster Url: </label>
                    <input type="text"
                        className="form-control"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <input type="submit" value="Edit Book" className="btn btn-primary" ></input>
                </div>
                </form>
        </div>
);
}

