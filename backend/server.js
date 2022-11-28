import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import morgan from 'morgan'
import fileupload from 'express-fileupload'
import cors from 'cors'

import { notFound, errorHandler } from './middleware/error.js'
import connectDB from './configs/database.js'

dotenv.config()

connectDB()

const app = express()

app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
} else {
    /**
     * @TODO create a file log
     */

    app.use(morgan('combined'))
}

app.use(fileupload({ useTempFiles: true }));
app.use(express.json())

import projects from './routes/project.js'
import users from './routes/user.js'

app.use('/api/v1/project', projects);
app.use('/api/v1/user', users);

const __dirname = path.resolve()

app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/build')))

    app.get('*', (req, res) =>
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    )
} else {
    app.get('/', (req, res) => {
        res.send('API is running....')
    })
}

app.use(notFound)
app.use(errorHandler)


const PORT = process.env.PORT || 3002

app.listen(
    PORT,
    console.log(
        `> Server running in ${process.env.NODE_ENV} mode on: http://localhost:${PORT}`.yellow.bold
    )
)