
const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://kmkim:1234@boilerplate.iyf18.mongodb.net/boilerplate?retryWrites=true&w=majority', {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify:false
}).then( () => console.log('22   MongoDB Connected..'))
.catch(err => console.log("33  "+err))

app.get('/', (req, res) => res.send('Hello World! 머스타드 냄새 시러요'))

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))