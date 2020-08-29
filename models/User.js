const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        // maxlength: 4
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: {
        type: Number,
        default: 0
    },
    image: String,
    token: {
        type: String,
    },
    tokenExp: {
        type: Number,
    },
})

userSchema.pre('save', function( next )  {
    var user = this;    // userSchema 안 데이터 가져옴

    if(user.isModified('password')) {
        bcrypt.genSalt(saltRounds, function( err, salt ) {
            if (err) {
                return next(err)}   // index.js 로 이동
    
            bcrypt.hash(user.password, salt, function(err, hash) {   //  사용자가 입력한 비번 가져 올수 있음. user.password
                if(err) {
                    return next(err)}
                user.password = hash    // 암호화된 비밀번호로 변경
                next()
            }) 
        })
    }
    else {
        next()
    }
})

// 비번 비교
userSchema.methods.comparePassword = function (plainPassword, cb) {
    bcrypt.compare(plainPassword, this.password, function(err, isMatch) {
        if(err) return cb(err)
        cb(null, isMatch)
    })
}

// token 생성
userSchema.methods.generateToken = function (cb) {
    var user = this;
    // jsonwebtokend을 이용해서  token 생성

    var token = jwt.sign(user._id.toHexString(), 'secretToken')

    user.token = token
    user.save(function (err, user) {
        if(err) return cb(err)
        cb(null, user)
    })
}

// from auth : 토큰으로 사용자 찾기
userSchema.statics.findByToken = function ( token, cb ) {
    var user = this;

    // 토큰을 decode 한다.
    jwt.verify(token, 'secretToken', function(err, decoded) {
        // 유저 아이디를 이용해서 유저를 찾은 다음에
        // 클라이언트에서 가져온 토큰이 DB 일치 여부 확인
        user.findOne({"_id": decoded, "token": token}, function (err, user) {
            if (err) return cb(err);
            cb(null, user)
        })
    })
}

const User = mongoose.model('User', userSchema)

module.exports = { User }