const User = require('../models/user')
const localStrategy = require('passport-local').Strategy

module.exports = function(passport) {
    passport.use(new localStrategy({ usernameField: 'email' }, async function(email, password, done){
        console.log('Passport auth me hai....')
        const user = await User.findOne({email: email})
        if(!user){
            return done(null, false, { message: 'Incorrect Username'})
        }
        else if(user.password !== password){
            return done(null, false, { message: 'Incorrect Password'})
        }
        else{
            return done(null, user)
        }
    }))

    passport.serializeUser(function(user, done) {
        done(null, user.id)
    })
    
    passport.deserializeUser(async function(id, done) {
        // console.log(id)
        try{
            const user = await User.findById(id)
            // console.log(user)
            if(user){
                done(null, user)
            }
            else{
                done(null, false, {message: 'No User'})
            }
        } catch(error){
            console.log(error)
            done(error)
        }
    })
}