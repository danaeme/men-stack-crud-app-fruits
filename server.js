const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const mongoose = require('mongoose')

const app = express()

//Connect to MongoDB 
mongoose.connect(process.env.MONGODB_URI)
// Log connection status to terminal on start 
mongoose.connection.on('connected', () => {
    console.log(`Connected to MONGODB ${mongoose.connection.name}`)
})

//Import the Fruit model
const Fruit = require('./models/fruit.js')
const e = require('express')

//middleware
app.use(express.urlencoded({extended: false}))

// GET '/'
app.get('/', async (req, res) => {
    res.render('index.ejs')
})

//GET '/fruits'
app.get('/fruits', (req, res) => {
    res.send('Welcome to the index page')
})

// GET '/fruits/new
app.get('/fruits/new', (req, res) => {
    res.render('fruits/new.ejs')
})

//POST '/fruits'
app.post('/fruits', async (req, res) => {
    if (req.body.isReadyToEat === 'on') {
        req.body.isReadyToEat = true
    }
    else {
        req.body.isReadyToEat = false
    }
    console.log(req.body)
    res.redirect('/fruits/new')

    await Fruit.create(req.body)

})

app.listen(3000, () => {
    console.log('Listening on port 3000')
})

