import express from 'express';
// Import of library express 
import 'dotenv/config';
import dogRouter from './routes/dogsRouter.js';
import movieRouter from './routes/moviesRouter.js';


console.log(process.env.PORT)
const PORT = process.env.PORT || 3000;
const app = express();
// App take everything from express

app.use(express.json())
app.use(express.urlencoded({extended : true}))

app.get('/', (request, response) => {
    return response.end(`Hello World`);
});
// Our first route that takes the path as first parameters, request and response and return a response

app.use('/api', movieRouter)
app.use('/api', dogRouter)

app.listen(PORT, () => {
    console.log( `server is running on port ${PORT}`);
});
// the method listen is used to start our server