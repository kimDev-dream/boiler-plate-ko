const express = require('express')
const app = express()
const port = 7100

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { User } = require("./models/User");
const { auth } = require("./middleware/auth");

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());

const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://kmkim:1234@boilerp.iyf18.mongodb.net/<dbname>?retryWrites=true&w=majority', {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log("몽구스 연결"))
.catch(err => console.log("ERR :: ", err))


app.get('/', (req, res) => res.send('Hello World '))

app.post('/api/users/register', (req, res) => {

    const user = new User(req.body);
    user.save((err, userInfo) => {
        if (err) return res.json({sucess: false, err})
        return res.status(200).json({
            sucess: true
        })
    })
})

app.post('/api/users//login', (req, res) => {
    // 1. 요청된 이메일, DB 존재여부 확인
    User.findOne({ email: req.body.email }, (err, user) => {

        if(!user) {
            return res.json({
                loginSuccess: false,
                message: "제공된 이메일에 해당하는 유저가 없습니다."
            })
        }
        
        // 2. 요청 이메일 DB 존재시, 비밀번호 비교
        user.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch) return res.json({ loginSuccess: false, message: "비밀번호가 틀렸습니다."})

            // 3. 비밀번호가 맞다면, 토큰 생성성
           user.generateToken((err, user) => {
               if(err) return res.status(400).send(err);

               // 토큰을 저장한다. to. 쿠키, 로컬스토리지
               res.cookie("x_auth", user.token)
                   .status(200)
                   .json({ loginSuccess: true, userId: user._id })
          })
        })
    })
})

// role == 1 : admin     role == 2 : 특정부서 admin    
// role == 0 : 일반유저    role != 0 : 관리자
app.post('/api/users/auth', auth, (req, res) => {
    // 여기까지 미들웨어를 통과해 왔다면, Authentication == true
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        image: req.user.image
    })
})

app.listen(port, () => console.log(`~~~${port}`) )