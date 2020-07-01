const isLogout = (req,res,next)=>{
    if(req.isAuthenticated()){
        return res.redirect('/user/index')
    }
    else{
        return next()
    }
}

const isLoggedIn = (req,res,next)=>{
    if(req.isAuthenticated()){
        return next()
    }
    else{
        return res.redirect('/user/login')
    }
}

module.exports = { isLoggedIn, isLogout }