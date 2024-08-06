import { Request, Response } from 'express'
import { Pool } from 'pg'

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'test-express',
    password: 'admin',
    port: 5432,
})

export const getUsers = (request: Request, response: Response) => {
    pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
        if (error) {
            response.status(500).json({ error: error.message })
            return
        }
        response.status(200).json(results.rows)
    })
}

export const getUserById = (request: Request, response: Response) => {
    const id = parseInt(request.params.id)

    pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
        if (error) {
            response.status(500).json({ error: error.message })
            return
        }
        response.status(200).json(results.rows)
    })
}

export const createUser = (request: Request, response: Response) => {
    const { name, email } = request.body

    pool.query(
        'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
        [name, email],
        (error, results) => {
            if (error) {
                response.status(500).json({ error: error.message })
                return
            }
            response.status(201).json(results.rows[0])
        }
    )
}

export const updateUser = (request: Request, response: Response) => {
    const id = parseInt(request.params.id)
    const { name, email } = request.body

    pool.query(
        'UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *',
        [name, email, id],
        (error, results) => {
            if (error) {
                response.status(500).json({ error: error.message })
                return
            }
            response.status(200).json(results.rows[0])
        }
    )
}

export const deleteUser = (request: Request, response: Response) => {
    const id = parseInt(request.params.id)

    pool.query(
        'DELETE FROM users WHERE id = $1 RETURNING *',
        [id],
        (error, results) => {
            if (error) {
                response.status(500).json({ error: error.message })
                return
            }
            response
                .status(200)
                .json({ message: `User deleted with ID: ${id}` })
        }
    )
}
