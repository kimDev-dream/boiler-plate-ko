const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

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
        maxlength: 5
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
                console.log("///1");
                return next(err)}   // index.js 로 이동
    
            bcrypt.hash(user.password, salt, function(err, hash) {   //  사용자가 입력한 비번 가져 올수 있음. user.password
                if(err) {
                    
                console.log("///2");
                    return next(err)}
                user.password = hash    // 암호화된 비밀번호로 변경
                next()
            }) 
        })
    }
})

const User = mongoose.model('User', userSchema)

module.exports = { User }