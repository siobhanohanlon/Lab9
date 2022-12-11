//Express Variables
const express = require('express')
const app = express()
const port = 2000 //Localhost:*port* to view

const cors = require('cors');

//Mongoose- To connect to my database
const mongoose = require('mongoose');

//will make the connection with the database
main().catch(err => console.log(err));

//Giving database address
async function main() {
    await mongoose.connect('mongodb+srv://admin:<pass>@cluster0.uacixmd.mongodb.net/Cluster0');
    //Username: admin Password: pass
}

//Convert to String
const bookSchema = new mongoose.Schema({
    title: String,
    cover: String,
    author: String
});

//Model to interact with database
const bookModel = mongoose.model('Books', bookSchema);

//Body Parser to pass info from post form
const bodyParser = require("body-parser");
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse/application/json
app.use(bodyParser.json());

//To allow connection from host to other
app.use(cors());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//To View localhost:4000
//Main Page
//req- request, res- response
app.get('/', (req, res) => {
    res.send('Hello World!')
})

//HTTP is handled by req & res
app.get('/api/books', (req, res) => {
    //To interact to database
    bookModel.find((error, data) => {
        res.json(data);
    })
})

//Put data embedded body- wont display a url
app.post('/api/books', (req, res) => {
    //Write data to page
    bookModel.create({
        title: req.body.title,
        cover: req.body.cover,
        author: req.body.author
    })

    res.send('Data received');
})

//Pass ID to URL
// ' : ' is to say variable
app.get('/api/books/:id', (req, res) => {
    //console.log(req.params.id);

    //Find Book Details
    bookModel.findById(req.params.id, (error, data) => {
        res.json(data);
    })
})

//Update by Id
app.put('/api/book/:id',(req,res) =>{
    //console.log("Update: " + req.params.id);

    //Update bookModel
    bookModel.findByIdAndUpdate(req.params.id, req.body, {new:true},
        (error,data)=>{
            res.send(data);
        })
})

//Delete by ID
app.delete('/api/book/:id', (req,res) => {
    //console.log('Deleting: ' + req.params.id); 

    //Find book by ID and Delete
    bookModel.findByIdAndDelete({_id:req.params.id}, (error,data)=>{ 
        res.send(data);
    }) 

})

//Listen
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})