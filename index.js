const express = require('express')
const app = express()
const port = 7100

const bodyParser = require("body-parser");
const { User } = require("./models/User");

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://kmkim:1234@boilerp.iyf18.mongodb.net/<dbname>?retryWrites=true&w=majority', {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log("몽구스 연결"))
.catch(err => console.log("ERR :: ", err))





app.get('/', (req, res) => res.send('Hello World '))

app.post('/register', (req, res) => {

    const user = new User(req.body);
    user.save((err, userInfo) => {
        if (err) return res.json({sucess: false, err})
        return res.status(200).json({
            sucess: true
        })
    });
})

app.listen(port, () => console.log(`~~~${port}`) )