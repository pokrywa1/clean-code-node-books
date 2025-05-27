import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    createBook,
    deleteBook,
    getBookById,
    getBooks,
    updateBook,
} from './queries'

const app = express()
const port = 8080

app.use(
    cors({
        origin: 'http://localhost:3000',
        optionsSuccessStatus: 200,
    })
)
app.use(bodyParser.json())

app.get('/users', getUsers)
app.get('/users/:id', getUserById)
app.post('/users', createUser)
app.put('/users/:id', updateUser)
app.delete('/users/:id', deleteUser)

app.get('/books', getBooks)
app.get('/books/:id', getBookById)
app.post('/books', createBook)
app.put('/books/:id', updateBook)
app.delete('/books/:id', deleteBook)

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`)
})
