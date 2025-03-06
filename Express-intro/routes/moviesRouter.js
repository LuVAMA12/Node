import { Router } from "express";
import movies from "../data/movies.js";

const movieRouter = Router()

const middleware = (req, res, next) => {
    console.log('This is my middleware')
    next()
}
// a middleware have 3 options => request, response and next

movieRouter.get('/movies', middleware, (request, response) => {
    return response.json(movies);
});

movieRouter.get('/movies/:id', (request, response) => {
     const {id} = request.params;
     // I save into a variable the value of the params
     const movieByID = movies.find(movie => movie.id == id)
     //I search in the array where i do have an object with his ID matching the request.params.id
     if (!movieByID) {
        return response.status(404).json({message :`Movie not found`})
     }
     // If I do not find a movie I send an error
     return response.status(200).json(movieByID)
     // I return the movieByID
});


movieRouter.post('/movies', (request, response) => {
    const {title, genre} = request.body;
    if(!title, !genre) {
        return response.status(400).json({message: `all fields are required`});
    };
    const newMovie = {
        id : movies.length + 1,
        title,
        genre
    };
    movies.push(newMovie);
    return response.status(201).json(newMovie);
});

movieRouter.put('/movies/:id', (req, res) => {
    const {id} = req.params
    const {title, genre} = req.body;
    if(!id) {
        return response.status(404).json({message : `Movie not found`})
    }
    let movieByID = movies.find(movie => movie.id  === parseInt(id))
    movieByID = {
        id: movieByID.id,
        title: title || movieByID.title,
        genre : genre || movieByID.genre
    }
    return res.status(201).json(movieByID)
})

movieRouter.delete('/movies/:id', (req, res) => {
    const {id} = req.params
    try {
        let movieByID = movies.find(movie => movie.id  === parseInt(id))
        if(!id) {
            return res.status(404).json({message : `Movie not found`})
        }
        const  movieIndex = movies.indexOf(movieByID)
        movies.splice(movieIndex, 1)
        return res.status(202).json('Movie has been deleted')

    }catch(err){
        return res.status(500).json({message: `Internal server error`})
    }
})

movieRouter.get('/movies', (req, res) => {
    console.log(req.query)
})

export default movieRouter