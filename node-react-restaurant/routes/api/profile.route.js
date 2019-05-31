const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth.middleware');
const { check, validationResult } = require('express-validator/check');


const Profile = require('../../model/Profile');
const User = require('../../model/User');

Profile.hasOne(User, { foreignKey: 'id', sourceKey: 'user_id' });

router.get('/me', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({
            include: [{
                model: User,
                where: { id: req.user.id }
            }]
        });
        if (!profile) {
            return res.status(400).json({ message: 'There is no profile for this user' });
        }
        res.status(200).json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.post('/', [auth, [
    check('shop_url', 'Shop URL is required').not().isEmpty()
]], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { shop_url, shop_name } = req.body;

});

module.exports = router;