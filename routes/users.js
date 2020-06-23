var express = require('express');
const User = require('../models/User')
var router = express.Router();
var userController = require('../controllers/user.controller.js')
const auth = require("../middleware/auth")
//  Register users.
router.post('/', userController.register)

router.get('/login', function(request, response) {
  response.render('login')
})

router.post('/login', userController.login)

router.get('/me', auth, async(req, res) => {
    // View logged in user profile
    res.render('profile', { user: req.user })
})

router.post('/logout', auth, async (req, res) => {
    // Log user out of the application
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token != req.token
        })
        await req.user.save()
        res.redirect('/')
    } catch (error) {
        res.status(500).send(error)
    }
})

router.post('/logoutall', auth, async(req, res) => {
    // Log user out of all devices
    try {
        req.user.tokens.splice(0, req.user.tokens.length)
        await req.user.save()
        res.redirect('/')
    } catch (error) {
        res.status(500).send(error)
    }
})

/* GET users listing. */
router.get('/', function(req, res, next) {
  User.find({}, function(err, users){
    res.render('users-list', { users: users });
  })

});

module.exports = router;
