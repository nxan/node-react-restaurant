const express = require('express');
const router = express.Router();

const { check, validationResult } = require('express-validator/check');

const Order = require('../../model/Order');
const Desk = require('../../model/Desk');

Order.hasOne(Desk, { foreignKey: 'MaBan', sourceKey: 'MaBan' });

var today = new Date();
var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

/* ----- 
  @route  GET api/order
  @desc   Get all order
-----*/
router.get('/', async (req, res) => {
    try {
        const order = await Order.findAll({
            include: [{
                model: Desk
            }]
        });
        res.json(order)
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server error');
    }
});

/* ----- 
  @route  GET api/order/:order_id
  @desc   Get order by id
-----*/
router.get('/:order_id', async (req, res) => {
    try {
        const order = await Order.findOne({
            where: { SOHOADON: req.params.order_id },
            include: [{
                model: Desk
            }]
        });
        if (!order) {
            return res.status(400).json({ message: 'Order not found' });
        }
        res.json(order)
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server error');
    }
});

/* ----- 
  @route  POST api/order
  @desc   Create order
-----*/

router.post('/', [
    check("MaBan", "Mã bàn is required").not().isEmpty(),
    check("GIOVAO", "Giờ vào is required").not().isEmpty(),
    check("TongMon", "Tổng món bán is required").not().isEmpty()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { MaBan, GIOVAO, TongMon } = req.body;
    var orderFields = {};
    if (MaBan) orderFields.MaBan = MaBan;
    if (GIOVAO) orderFields.GIOVAO = GIOVAO;
    if (TongMon) orderFields.TongMon = TongMon;
    orderFields.NGAYHOADON = date;
    orderFields.NgayCr = date;
    orderFields.INHOADON = "0";
    orderFields.GIORA = "";
    orderFields.KETTHUC = "0";
    orderFields.TRANGTHAI = "Sử dụng";
    orderFields.MaNhanVienBan = "Nguyễn Xuân An";
    orderFields.HostName = "NXAN";
    orderFields.MaGiam = 0;
    orderFields.Huy = 0;
    console.log(orderFields);
    try {
        order = new Order(orderFields);
        await order.save();
        res.json(order);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});

/* ----- 
  @route  PUT api/order
  @desc   Update order
-----*/

router.put('/', [
    check("MaBan", "Mã bàn is required").not().isEmpty(),
    check("TongMon", "Tổng món bán is required").not().isEmpty()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { SOHOADON, MaBan, GIOVAO, TongMon } = req.body;
    var orderFields = {};
    if (SOHOADON) orderFields.SOHOADON = SOHOADON;
    if (MaBan) orderFields.MaBan = MaBan;
    if (TongMon) orderFields.TongMon = TongMon;
    try {
        var order = await Order.findOne({
            where: { SOHOADON: orderFields.SOHOADON }
        });
        if (order) {
            order.update({
                attributes: ['SOHOADON', 'MaBan', 'TongMon'],
                SOHOADON: orderFields.SOHOADON,
                MaBan: orderFields.MaBan,
                TongMon: orderFields.TongMon
            });
            return res.json(order);
        }
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});


/* ----- 
  @route  DELETE api/order/:order_id
  @desc   Delete order
-----*/

router.delete('/:order_id', async (req, res) => {
    try {
        const order = await Order.findOne({
            where: { SOHOADON: req.params.order_id }
        });
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        await order.destroy();
        res.json({ message: 'Order removed' })
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;