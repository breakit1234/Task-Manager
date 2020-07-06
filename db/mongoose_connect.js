const mongoose = require('mongoose')

const mongo = mongoose.connect('mongodb://localhost:27017/task-db-hack', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }).then(()=>{
    console.log('Connected to database!!!')
}).catch(()=>{
    console.log('Error in connection.....')
})

module.exports = mongo