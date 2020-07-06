const express = require('express')
const router = express.Router()
const taskModel = require('../models/task')
const auth = require('../config/auth')

router.get('/task',(req,res)=>{
    res.send({"Fine":"Done"})
})

router.post('/task/create', auth.isLoggedIn, async (req,res)=>{
    console.log(req.body)
    const { taskTitle, description } = req.body
    const task = new taskModel({taskTitle, description, owner: req.user._id })
    try{
        await task.save()
        return res.redirect('/index')
    } catch(error){
        res.status(500).send(error)
    }
})

module.exports = router