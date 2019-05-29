const express = require('express');
const router = express.Router();
const db = require('../../config/db');
const bcrypt = require('bcryptjs');
const util = require('util')


const { check, validationResult } = require('express-validator/check');

router.post(
  '/',
  [
    check('name', 'Name is required')
      .not()
      .isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more character'
    ).isLength({
      min: 6
    })
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }

    try {
      var email = req.body.email;
      let user = "SELECT * FROM tbl_User WHERE email = '" + email + "'";
      db.query(user)
        .then(result => {
          if (result != null) {
            res.status(400).json({ errors: [{ msg: 'User already existed' }] });
          }
        })

      // const salt = bcrypt.genSalt(10);
      // let sql = db.query("INSERT INTO tbl_User VALUES ");
      // sql += util.format("'%s', '%s', '%s'", data.email, data.password, data.name);
      // db.query(sql, [data])
      //   .then(results => {
      //     res.status(201);
      //     res.json({ message: 'User registered' });
      //   });

    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }

    // res.send('User route');
  }
);

module.exports = router;
