import { Router } from "express";
import users from '../data/users.js';

const usersRouter = Router()

usersRouter.get('/users', (req, res ) => {
    return res.json(users)
})

usersRouter.get('/users/:id', (req, res) => {
    const {id} = req.params;
    
    const userByID = users.find(user => user.id === parseInt(id))

    if(!userByID) {
        console.log('user not found')
        return res.status(404).json({message : 'user not found'})
    }
   
    return res.status(200).json(userByID)
})

usersRouter.post('/users', (req, res) => {
    const { firstName, lastName, telephone, address, hobbies} = req.body
    
    if (!firstName, !lastName, !telephone, !address, !hobbies) {
        return res.status(400).json({message: 'All fields are required'})
    }
    
    const newUser = {
        id : users.length + 1,
        firstName,
        lastName,
        telephone,
        address,
        hobbies: [ hobbies]
    }

    users.push(newUser)
    return res.status(201).json(newUser)

})

usersRouter.put('/users/:id', (req, res) => {
    const {id} = req.params
    const { firstName, lastName, telephone, address, hobbies } = req.body

    try {
    if (!id) {
        return res.status(404).json({message: 'User not found'})
    }

    let userByID = users.find( user => user.id === parseInt(id))

     userByID = {
        id : userByID.id,
        firstName :firstName || userByID.firstName,
        lastName : lastName || userByID.lastName,
        telephone : telephone || userByID.telephone,
        address : address || userByID.address,
        hobbies : hobbies|| userByID.hobbies,

    }

    return res.status(201).json(userByID)
}catch(err) {
    return res.status(500).json({message: `Internal server error`})
}
})

usersRouter.delete('/users/:id', (req, res) => {
    const {id} = req.params
    try {
        let userByID = users.find( user => user.id === parseInt(id))
        if (!id) {
            return res.status(404).json({message: 'User not found'})
        }

        const userIdx = users.indexOf(userByID)
        users.splice(userIdx, 1)
        return res.status(202).json({message : 'User has been deleted'})
    }catch(err) {
        return res.status(500).json({message: `Internal server error`})
    }
})
export default usersRouter