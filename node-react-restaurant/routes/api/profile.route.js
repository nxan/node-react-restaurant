const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth.middleware');

const Profile = require('../../model/Profile');
const User = require('../../model/User');

router.get('/me', auth, async (req, res) => {
    try {
        console.log(req)
        const profile = await Profile.findOne({ 
            where: {
                user_id: 1
              },
         });                                
        if(!profile) {
            return res.status(400).json({ message: 'There is no profile for this user' });
        }
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;