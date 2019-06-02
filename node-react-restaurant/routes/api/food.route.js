const express = require('express');
const router = express.Router();

const { check, validationResult } = require('express-validator/check');

const GroupFood = require('../../model/GroupFood');
const Food = require('../../model/Food');

GroupFood.hasMany(Food, { foreignKey: 'IDNhom', sourceKey: 'IDNhom' });
Food.belongsTo(GroupFood, { foreignKey: 'IDNhom', targetKey: 'IDNhom' });

/* ----- 
  @route  GET api/food
  @desc   Get all food
-----*/
router.get('/', async (req, res) => {
    try {
        const food = await Food.findAll({
            include: [{
                model: GroupFood
            }]
        });
        res.json(food)
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server error');
    }
});

/* ----- 
  @route  GET api/food/:food_id
  @desc   Get food by id
-----*/
router.get('/:food_id', async (req, res) => {
    try {
        const food = await Food.findOne({
            where: { MaMon: req.params.food_id },
            include: [{
                model: GroupFood
            }]
        });
        if (!food) {
            return res.status(400).json({ message: 'Food not found' });
        }
        res.json(food)
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server error');
    }
});

/* ----- 
  @route  POST api/food
  @desc   Create food
-----*/

router.post('/', [
    check('TenMon', 'Tên Bàn is required').not().isEmpty(),
    check("IDNhom", "Khu is required").not().isEmpty(),
    check("DonVi", "Đơn vị is required").not().isEmpty(),
    check("DonGiaBan", "Đơn giá bán is required").not().isEmpty()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { TenMon, IDNhom, DonVi, DonGiaBan } = req.body;
    var foodFields = {};
    if (TenMon) foodFields.TenMon = TenMon;
    if (IDNhom) foodFields.IDNhom = IDNhom;
    if (DonVi) foodFields.DonVi = DonVi;
    if (DonGiaBan) foodFields.DonGiaBan = DonGiaBan;
    foodFields.HienThi = "1";
    try {
        food = new Food(foodFields);
        await food.save();
        res.json(food);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});

/* ----- 
  @route  PUT api/food
  @desc   Update food
-----*/

router.put('/', [
    check('TenMon', 'Tên Bàn is required').not().isEmpty(),
    check("IDNhom", "Khu is required").not().isEmpty(),
    check("DonVi", "Đơn vị is required").not().isEmpty(),
    check("DonGiaBan", "Đơn giá bán is required").not().isEmpty()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    var { MaMon, TenMon, IDNhom, DonVi, DonGiaBan, HienThi } = req.body;
    var foodFields = {};
    if (MaMon) foodFields.MaMon = MaMon;
    if (TenMon) foodFields.TenMon = TenMon;
    if (IDNhom) foodFields.IDNhom = IDNhom;
    if (DonVi) foodFields.DonVi = DonVi;
    if (DonGiaBan) foodFields.DonGiaBan = DonGiaBan;
    if (HienThi) foodFields.HienThi = HienThi;
    try {
        var food = await Food.findOne({
            where: { MaMon: foodFields.MaMon }
        });
        if (food) {
            food.update({
                attributes: ['MaMon', 'TenMon', 'IDNhom', 'HienThi', 'DonVi', 'DonGiaBan'],
                MaMon: foodFields.MaMon,
                TenMon: foodFields.TenMon,
                IDNhom: foodFields.IDNhom,
                HienThi: foodFields.HienThi,
                DonGiaBan: foodFields.DonGiaBan,
                DonGiaBan: foodFields.DonGiaBan,
            });
            return res.json(food);
        }
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});

/* ----- 
  @route  DELETE api/food/:food_id
  @desc   Delete food
-----*/

router.delete('/:food_id', async (req, res) => {
    try {
        const food = await Food.findOne({
            where: { MaMon: req.params.food_id }
        });
        if (!food) {
            return res.status(404).json({ message: 'Food not found' });
        }
        await food.destroy();
        res.json({ message: 'Food removed' })
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});




module.exports = router;