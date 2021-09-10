const router = require('express').Router();
let User = require('../models/user.model');
let jwt = require('jswonwebtoken');
const bcrypt = require('bcrypt');

router.route('/').get((req, res) => {
    User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Errors: ' + err));
})

router.route('/signup').post((req, res) => {
    //inputting bcrypt to hash passwords for security. The 10 is how many digits will hash.
    bcrypt.hash(req.body.password, 10, function (err, hash) {
        //make sure there is no other email in the database that matches the one being created
        User.findOne({ email: req.body.email })
            .then((user) => {
                //if email is already found, user gets an error
                if (user) return res.status(400).send("Email already exists");
                else {
                    //user is given a text field where they need to input all requirements to create a user
                    return User.create({
                        email: req.body.email,
                        firstname: req.body.firstname,
                        lastname: req.body.lastname,
                        //stores hash in our password DB
                        password: hash,
                        //once user is succesfully created they're assinged a special token
                    }).then((user) => {
                        let token = jwt.sign({ id: user._id }, 'shhhh')
                        //once token is given, I would see the user email, token and usertype on my terminal and database
                        res.status(200).json({
                            token,
                            user: {
                                email: user.email,
                                userType: user.userType
                            }
                        })
                    })
                }
            })
            //This occurs when the user has an error on their end.
            .catch((err) => {
                res.status(500).send('Whoops!')
            })
    });
})