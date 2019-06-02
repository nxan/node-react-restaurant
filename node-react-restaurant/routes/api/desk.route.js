const express = require('express');
const router = express.Router();

const { check, validationResult } = require('express-validator/check');

const Place = require('../../model/Place');
const Desk = require('../../model/Desk');

Place.hasMany(Desk, { foreignKey: 'Khu', sourceKey: 'MaKhu' });
Desk.belongsTo(Place, { foreignKey: 'Khu', targetKey: 'MaKhu' });

/* ----- 
  @route  GET api/desk
  @desc   Get all desk
-----*/
router.get('/', async (req, res) => {
    try {
        const desks = await Desk.findAll({
            include: [{
                model: Place
            }]
        });
        res.json(desks)
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server error');
    }
});



module.exports = router;