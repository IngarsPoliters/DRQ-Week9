const express = require('express')
const app = express()
const port = 4000
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');



app.use(cors());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// my connection string from mongodb
const ConnectionString = 'mongodb+srv://admin:admin@cluster1.5lmjq.mongodb.net/movies?retryWrites=true&w=majority';
mongoose.connect(ConnectionString, { useNewUrlParser: true });

const Schema = mongoose.Schema;
// movie schema
var movieSchema = new Schema({
    title: String,
    year: String,
    poster: String
});
// movie model
var MovieModel = mongoose.model("movie", movieSchema);


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/api/movies', (req, res) => {
    // const movies = [
    //     {
    //         "Title": "Avengers: Infinity War",
    //         "Year": "2018",
    //         "imdbID": "tt4154756",
    //         "Type": "movie",
    //         "Poster": "https://m.media-amazon.com/images/M/MV5BMjMxNjY2MDU1OV5BMl5BanBnXkFtZTgwNzY1MTUwNTM@._V1_SX300.jpg"
    //     },
    //     {
    //         "Title": "Captain America: Civil War",
    //         "Year": "2016",
    //         "imdbID": "tt3498820",
    //         "Type": "movie",
    //         "Poster": "https://m.media-amazon.com/images/M/MV5BMjQ0MTgyNjAxMV5BMl5BanBnXkFtZTgwNjUzMDkyODE@._V1_SX300.jpg"
    //     },
    //     {
    //         "Title": "World War Z",
    //         "Year": "2013",
    //         "imdbID": "tt0816711",
    //         "Type": "movie",
    //         "Poster": "https://m.media-amazon.com/images/M/MV5BNDQ4YzFmNzktMmM5ZC00MDZjLTk1OTktNDE2ODE4YjM2MjJjXkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_SX300.jpg"
    //     },
    //     {
    //         "Title": "War of the Worlds",
    //         "Year": "2005",
    //         "imdbID": "tt0407304",
    //         "Type": "movie",
    //         "Poster": "https://m.media-amazon.com/images/M/MV5BNDUyODAzNDI1Nl5BMl5BanBnXkFtZTcwMDA2NDAzMw@@._V1_SX300.jpg"
    //     }
    // ]

    MovieModel.find((err, data) => {
        res.json(data);
    })
    // res.status(200).json({
    //     mymovies: movies
    // })
})

//get request
app.get('/api/movies/:id', (req, res) => {
    console.log(req.params.id);
    //callback function, returns movies of that id 
    MovieModel.findById(req.params.id, (err, data) => {
        res.json(data);
    })
})

app.put('/api/movies/:id', (req, res) => {
    console.log("Update movie: " + req.params.id);// pulls the id out of the url
    console.log(req.body);
    // find and update movie with the movie id, updates the existing movie with the new movie information
    MovieModel.findByIdAndUpdate(req.params.id, req.body, { new: true },
        (err, data) => {
            res.send(data);
        })
})

app.post('/api/movies', (req, res) => {
    console.log(req.body);
    res.send('Data Recieved!');

    //takes data from create.js, and sends them to the mongodb collections
    MovieModel.create({
        title: req.body.title,
        year: req.body.year,
        poster: req.body.poster
    });
    res.send('Item Added');
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})