const express = require('express')
const passport = require('passport')
const router = express.Router()
const userModel = require('../models/user')
const auth = require('../config/auth')

router.get('/user/index', auth.isLoggedIn, async (req,res)=>{
    await req.user.populate('task').execPopulate()
    const user = await req.user.toJSON()
    res.render('index', {layout :false, tasks: user.task})
})

router.get('/user/login', auth.isLogout , (req,res)=>{
    res.render('login',{ layout: false })
})

router.get('/user/register',auth.isLogout, (req,res)=>{
    res.render('signup',{layout: false})
})

router.post('/user/register', async (req,res)=>{
    try {
        const { name, email, password, confirm_password } = req.body
        const user_model = { name, email, password }
        const user = new userModel(user_model)
        await user.save()
        console.log(user_model)
    } catch(error) {
        req.flash('info', 'black')
        return res.render( 'signup', { layout:false, messages: req.flash('info') })
    }
	req.flash('success', 'You are now registered and can log in')
	res.redirect('/login')
})

router.post('/user/login',(req, res, next)=> {
    passport.authenticate('local',{
        failureRedirect: '/login',
        successRedirect: '/index'
    })(req, res, next)
})

router.get('/user/logout',(req, res, next)=>{
    req.logout()
    return res.redirect('/login')
})

module.exports = router