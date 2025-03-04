import express from 'express';
// Import of library express 
import dogs from './data/dogs.js';
import movies from './data/movies.js';

const PORT = 3000
const app = express()
// App take everything from express



app.get('/', (request, response) => {
    return response.end(`Hello World`)
})
// Our first route that takes the path as first parameters, request and response and return a response

app.get('/movies', (request, response) => {
    return response.json(movies)
})

app.get('/dogs', (request, response) => {
    return response.json(dogs)
})

app.listen(PORT, () => {
    console.log( `server is running on port ${PORT}`)
})
// the method listen is used to start our server