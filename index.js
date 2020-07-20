
const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser');

const config = require('./config/key');

const { User } = require('./models/User');
const mongoose = require('mongoose')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect(config.mongoURI, {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify:false
}).then( () => console.log('22   MongoDB Connected..'))
.catch(err => console.log("err  " + err))

app.get('/', (req, res) => res.send('Hello World! 머스타드 냄새 조아요!!!'))
app.post('/register', (req, res) => {
    const user = new User(req.body)

    user.save((err, userInfo) => {
        if(err) return res.json({success: false, err})  // 실패할 경우
        return res.status(200).json({        // 200 == 성공했다는 의미
            success: true
        })    
    })
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))