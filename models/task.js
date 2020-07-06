const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    taskTitle:{
        type: String,
        required: true,
        trim: true
    },
    dateOfCompletion:{
        type: Date
    },
    description:{
        type: String,
        trim: true
    },
    labels:{
        type: Number,
        default: 0
    },
    status:{
        type: String,
        default: "New"
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    }
},{
    timestamps: true
})


const task = new mongoose.model('task',taskSchema)

module.exports = task