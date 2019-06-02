const express = require('express');
const router = express.Router();

const { check, validationResult } = require('express-validator/check');


const GroupFood = require('../../model/GroupFood');

/* ----- 
  @route  GET api/groupfood
  @desc   Get all group food
-----*/

router.get('/', async (req, res) => {
    try {
        const groupfood = await GroupFood.findAll();
        res.json(groupfood)
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server error');
    }
});

/* ----- 
  @route  GET api/groupfood/:groupfood_id
  @desc   Get groupfood by id
-----*/
router.get('/:groupfood_id', async (req, res) => {
    try {
        const groupfood = await GroupFood.findOne({
            where: { IDNhom: req.params.groupfood_id }
        });
        res.json(groupfood)
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server error');
    }
});

/* ----- 
  @route  POST api/groupfood
  @desc   Create group food
-----*/

router.post('/', [
    check('TenNhom', 'Tên Nhóm is required').not().isEmpty()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { TenNhom } = req.body;
    var groupfoodFields = {};
    if (TenNhom) groupfoodFields.TenNhom = TenNhom;
    groupfoodFields.HienThi = "1";
    try {
        groupfood = new GroupFood(groupfoodFields);
        await groupfood.save();
        res.json(groupfood);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});

/* ----- 
  @route  PUT api/groupfood
  @desc   Update group food
-----*/

router.put('/', [
    check('TenNhom', 'Tên Nhóm is required').not().isEmpty()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    var { IDNhom, TenNhom, HienThi } = req.body;
    var groupfoodFields = {};
    if (IDNhom) groupfoodFields.IDNhom = IDNhom;
    if (TenNhom) groupfoodFields.TenNhom = TenNhom;
    if (HienThi) groupfoodFields.HienThi = HienThi;
    try {
        var groupfood = await GroupFood.findOne({
            where: { IDNhom: groupfoodFields.IDNhom }
        });
        if (groupfood) {
            groupfood.update({
                attributes: ['IDNhom', 'TenNhom', 'HienThi'],
                IDNhom: groupfoodFields.IDNhom,
                TenNhom: groupfoodFields.TenNhom,
                HienThi: groupfoodFields.HienThi
            });
            return res.json(groupfood);
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

router.delete('/:groupfood_id', async (req, res) => {
    try {
        const groupfood = await GroupFood.findOne({
            where: { IDNhom: req.params.groupfood_id }
        });
        if (!groupfood) {
            return res.status(404).json({ message: 'Group Food not found' });
        }
        await groupfood.destroy();
        res.json({ message: 'Group Food removed' })
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});



module.exports = router;
