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

/* ----- 
  @route  GET api/desk/:desk_id
  @desc   Get desk by id
-----*/
router.get('/:desk_id', async (req, res) => {
    try {
        const desk = await Desk.findOne({
            where: { MaBan: req.params.desk_id },
            include: [{
                model: Place
            }]
        });
        if (!desk) {
            return res.status(400).json({ message: 'Desk not found' });
        }
        res.json(desk)
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server error');
    }
});

/* ----- 
  @route  POST api/desk
  @desc   Create desk
-----*/

router.post('/', [
    check('TenBan', 'Tên Bàn is required').not().isEmpty(),
    check("Khu", "Khu is required").not().isEmpty()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { TenBan, Khu, HienThi } = req.body;
    var deskFields = {};
    if (TenBan) deskFields.TenBan = TenBan;
    if (Khu) deskFields.Khu = Khu;
    if (HienThi) deskFields.HienThi = HienThi;
    try {
        desk = new Desk(deskFields);
        await desk.save();
        res.json(desk);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});

/* ----- 
  @route  PUT api/desk
  @desc   Update desk
-----*/

router.put('/', [
    check('TenBan', 'Tên Bàn is required').not().isEmpty(),
    check("Khu", "Khu is required").not().isEmpty()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { MaBan, TenBan, Khu, HienThi, TongMon, GIOVAO } = req.body;
    var deskFields = {};
    if (MaBan) deskFields.MaBan = MaBan;
    if (TenBan) deskFields.TenBan = TenBan;
    if (Khu) deskFields.Khu = Khu;
    if (HienThi) deskFields.HienThi = HienThi;
    if (TongMon) deskFields.TongMon = TongMon;
    if (GIOVAO) deskFields.GIOVAO = GIOVAO;

    try {
        var desk = await Desk.findOne({
            where: { MaBan: deskFields.MaBan }
        });
        if (desk) {
            desk.update({
                attributes: ['MaBan', 'TenBan', 'Khu', 'HienThi', 'TongMon', 'GIOVAO'],
                TenBan: deskFields.TenBan,
                Khu: deskFields.Khu,
                HienThi: deskFields.HienThi,
                TongMon: deskFields.TongMon,
                GIOVAO: deskFields.GIOVAO
            });
            return res.json(desk);
        }
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});

/* ----- 
  @route  DELETE api/desk/:desk_id
  @desc   Delete desk
-----*/

router.delete('/:desk_id', async (req, res) => {
    try {
        const desk = await Desk.findOne({
            where: { MaBan: req.params.desk_id }
        });
        if (!desk) {
            return res.status(404).json({ message: 'Desk not found' });
        }
        await desk.destroy();
        res.json({ message: 'Desk removed' })
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});




module.exports = router;