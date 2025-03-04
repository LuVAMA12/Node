import express from 'express';
// Import of library express 
import dogs from './data/dogs.js';
import movies from './data/movies.js';

const PORT = 3000;
const app = express();
// App take everything from express



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
    const dogsByID = dogs.find(dog => dog.id == id )
    return response.json(dogsByID)
})

app.listen(PORT, () => {
    console.log( `server is running on port ${PORT}`);
});
// the method listen is used to start our server