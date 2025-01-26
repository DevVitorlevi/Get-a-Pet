const express = require('express')
const cors = require('cors')
const conn = require('./db/conn')
const app = express()

// JSON
app.use(express.json())

//CORS

app.use(cors({credentials:true, origin:'http://localhost:3000'}))

// Public

app.use(express.static('public'))

// Routes
const UserRoutes = require('./routes/UserRoutes')
const PetRoutes = require('./routes/PetRoutes')

app.use('/users', UserRoutes)
app.use('/pets', PetRoutes)

app.listen(5000)