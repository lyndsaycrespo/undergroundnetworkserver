const router = require('express').Router();
const User = require('../db').import('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

router.post('/create', function(req, res){
    User.create({
        username: req.body.user.username, 
        email: req.body.user.email,
        password: bcrypt.hashSync(req.body.user.password, 13), 
        zip: req.body.user.zip
    })
    .then(
        function createSuccess(user) {
            let token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24});
           
            res.json({ 
                user: user, 
                message: 'User successfully created!', 
                sessionToken: token 
            });
        }
    )
    .catch(err => res.status(500).json({error: err})) 
});

router.post('/login', function(req, res) {
    User.findOne({
        where: {
            email: req.body.user.email
        }
    })
    .then(function loginSuccess(user) {
        if (user) {
            bcrypt.compare(req.body.user.password, user.password, function(err, matches) {
                
                    if (matches) {
                        let token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24}); 
    
                        res.status(200).json({
                            user: user,
                            message: 'User successfully logged in!', 
                            sessionToken: token 
                        });
                    } else {
                        res.status(502).send({error: "Login Failed"}); 
                    }
                });
            } else {
                res.status(500).json({error: "User does not exist."}); 
            }
        })
        .catch(err => res.status(500).json({error: err + "Something's Not Right. Please Try Again Later."}))
    });

//Get user by ID to view its details
router.get('/:id', validateSession, (req, res) => {
    User
      .findAll({
        where: { owner_id: req.user.id}, 
      })
      .then((user) => res.status(200).json(user))
      .catch((err) => res.status(500).json({ error: err }));
});

//Update a user profile
router.put("/edit/:id", validateSession, function (req, res) {
  const user = {
    username: req.body.user.username, 
    email: req.body.user.email,
    password: bcrypt.hashSync(req.body.user.password, 13), 
    zip: req.body.user.zip
  };

  const query = { where: { owner_id: req.user.id, id: req.params.id } }; 
User 
    .update(user, query)
    .then((user) =>
      res
        .status(200)
        .json({ message: "Your profile has been edited successfully" })
    ) 
    .catch((err) => res.status(500).json({ error: err }));
});

//Delete user
router.delete("/delete/:id", validateSession, (req, res) => {
  User 
    .destroy({ where: { owner_id: req.user.id, id: req.params.id } })
    .then((user) => res.status(200).json({ message: "Your profile has been deleted" }))
    .catch((err) => res.status(500).json({ error: err }));
});
    
module.exports = router;
    