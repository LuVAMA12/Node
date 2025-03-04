import { Router } from "express";
import dogs from "../data/dogs.js";


const dogRouter = Router()

dogRouter.get('/dogs', (request, response) => {
    return response.json(dogs);
});

dogRouter.get('/dogs/:id', (request, response) => {
    const {id} = request.params;
    const dogByID = dogs.find(dog => dog.id == id )
    if(!dogByID) {
        return response.status(404).json({message: `Dog not found`})
    }
    return response.status(200).json(dogByID)
})


dogRouter.post('/dogs', (request, response) => {
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


export default dogRouter;