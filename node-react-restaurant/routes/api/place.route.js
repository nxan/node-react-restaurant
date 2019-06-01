const express = require('express');
const router = express.Router();

const { check, validationResult } = require('express-validator/check');


const Place = require('../../model/Place');

/* ----- 
  @route  GET api/place
  @desc   Get all place
-----*/

router.get('/', async (req, res) => {
    try {
        const places = await Place.findAll();
        res.json(places)
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server error');
    }
});

/* ----- 
  @route  GET api/place/:place_id
  @desc   Get place by id
-----*/
router.get('/:place_id', async (req, res) => {
    try {
        const place = await Place.findOne({
            where: { MaKhu: req.params.place_id }
        });
        res.json(place)
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server error');
    }
});

/* ----- 
  @route  POST api/place
  @desc   Create place
-----*/

router.post('/', [
    check('TenKhu', 'Tên Khu is required').not().isEmpty()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { TenKhu } = req.body;
    var placeFields = {};
    if (TenKhu) placeFields.TenKhu = TenKhu;
    try {
        place = new Place(placeFields);
        await place.save();
        res.json(place);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});

/* ----- 
  @route  PUT api/place
  @desc   Update place
-----*/

router.put('/', [
    check('TenKhu', 'Tên Khu is required').not().isEmpty()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { MaKhu, TenKhu } = req.body;
    var placeFields = {};
    if (TenKhu) placeFields.TenKhu = TenKhu;
    if (MaKhu) placeFields.MaKhu = MaKhu;

    try {
        var place = await Place.findOne({
            where: { MaKhu: placeFields.MaKhu }
        });
        if (place) {
            place.update({
                attributes: ['MaKhu', 'TenKhu'],
                TenKhu: placeFields.TenKhu
            });
            return res.json(place);
        }
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});

/* ----- 
  @route  DELETE api/place/:place_id
  @desc   Delete place
-----*/

router.delete('/:place_id', async (req, res) => {
    try {
        const place = await Place.findOne({
            where: { MaKhu: req.params.place_id }
        });
        if (!place) {
            return res.status(404).json({ message: 'Place not found' });
        }
        await place.destroy();
        res.json({ message: 'Place removed' })
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});



module.exports = router;