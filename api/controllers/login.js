const jwt = require('jsonwebtoken');
const { mysecret } = require('../../config');
const User = require('../models/userModels');

const login = (req, res) => {
  const { username, password } = req.body;
  const lowercaseUsername = username.toLowerCase();
  User.findOne({ username: lowercaseUsername }, (err, user) => { 
    if (err) {
      res.status(403).json({ error: 'Invalid Username/Password' });
      return;
    }
    if (user === null) {
      res.status(422).json({ error: 'No user with that username in our DataBase'});
      return;
    }
  user
    .checkPassword(password)
    .then(verified => {
      if (verified) {
        const payload = { username: user.username };
        const token = jwt.sign(payload, mysecret);
        res.json({ token });
      } else res.status(422).json({ error: "passwords don't match" });
    })
    .catch(err => {
      res.json({ errorCheckingPassword: err });
    });
    
    // user.checkPassword(password, (nonMatch, hashMatch) => {
    //   // This is an example of using our User.method from our model.
    //   if (nonMatch !== null) {
    //     res.status(422).json({ error: 'passwords dont match' });
    //     return;
    //   }
    //   if (hashMatch) {
    //     const payload = {
    //       username: user.username
    //     }; // what will determine our payload.
    //     const token = jwt.sign(payload, mysecret); // creates our JWT with a secret and a payload and a hash.
    //     res.json({ token }); // sends the token back to the client
    //   }
    // });
  });
};

module.exports = {
  login
};
