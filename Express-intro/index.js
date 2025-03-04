import express from 'express';
// Import of library express 
import dogs from './data/dogs.js';
import movies from './data/movies.js';

const PORT = 3000;
const app = express();
// App take everything from express

app.use(express.json())
app.use(express.urlencoded({extended : true}))

app.get('/', (request, response) => {
    return response.end(`Hello World`);
});
// Our first route that takes the path as first parameters, request and response and return a response

app.get('/movies', (request, response) => {
    return response.json(movies);
});

app.get('/movies/:id', (request, response) => {
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

app.get('/dogs', (request, response) => {
    return response.json(dogs);
});

app.get('/dogs/:id', (request, response) => {
    const {id} = request.params;
    const dogByID = dogs.find(dog => dog.id == id )
    if(!dogByID) {
        return response.status(404).json({message: `Dog not found`})
    }
    return response.status(200).json(dogByID)
})

app.post('/movies', (request, response) => {
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

app.post('/dogs', (request, response) => {
    const {name, age, race} = request.body;
    
    if (!name, !age, !race) {
        return response.status(400).json({message : 'All fields are required'});
    };
    const newDog = {
        id : dogs.length + 1,
        name,
        age,
        race
    };

    dogs.push(newDog);
    return response.status(201).json(newDog)
});

app.listen(PORT, () => {
    console.log( `server is running on port ${PORT}`);
});
// the method listen is used to start our server