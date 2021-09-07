const router = require('express').Router();
let User = require('../models/user.model');
let jwt = require('jswonwebtoken');
const bcrypt = require('bcrypt');

router.route('/').get((req, res) => {
    User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Errors: ' + err));
})