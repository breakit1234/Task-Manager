const express = require('express')
const path = require('path')
// var favicon = require('serve-favicon')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const exphbs = require('express-handlebars')
const session = require('express-session')
const flash = require('connect-flash')
const passport = require('passport')

const taskRouter = require('./routers/Task')
const userRouter = require('./routers/User')

const app = express()
require('./db/mongoose_connect')

app.engine('handlebars',exphbs())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))

app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

require('./config/passport-auth')(passport);

app.use(express.static(path.join(__dirname, 'public/')))
app.set('views', path.join(__dirname, 'views/'))
app.set('view engine','handlebars')
app.use(taskRouter)
app.use(userRouter)
app.use(function(req,res,next){
    if(req.isAuthenticated()){
        res.redirect('/user/index')
    }
    else{
        res.redirect('/user/login')
    }
})

app.listen(3000,()=>{
    console.log("Server is running on Port",)
})