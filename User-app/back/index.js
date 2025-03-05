import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import usersRouter from './routes/usersRouter.js';

const PORT = process.env.PORT || 3000
const app = express();

app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(cors())

app.get('/', (req, res) => {
    res.end('<h1>Welcome into the API User</h1>')
})

app.use('/api', usersRouter)

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})