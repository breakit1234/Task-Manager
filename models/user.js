const mongoose = require('mongoose')
const validator = require('validator')

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        trim: true,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate(val){
            if(validator.isEmail(val)){
                return true
            }
            else{
                throw new Error('Email not valid')
            }
        }
    },
    password:{
        type: String,
        trim: true,
        required: true
    }
},
{
    'toJSON':{
        'virtuals': true
    },
    'toObject':{
        'virtuals': true
    }
})

userSchema.virtual('task',{
    ref: 'task',
    localField: '_id',
    foreignField: 'owner'
})

const user = new mongoose.model('user', userSchema)

module.exports = user