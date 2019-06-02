const express = require('express');
const router = express.Router();

const { check, validationResult } = require('express-validator/check');

const Order = require('../../model/Order');
const OrderDetail = require('../../model/OrderDetail');
const Food = require('../../model/Food');

Order.hasMany(OrderDetail, { foreignKey: 'SOHOADON', sourceKey: 'SOHOADON' });
OrderDetail.belongsTo(Order, { foreignKey: 'SOHOADON', targetKey: 'SOHOADON' });

OrderDetail.hasOne(Food, { as: 'MonAn', foreignKey: 'MaMon', sourceKey: 'MaMon' });


/* ----- 
  @route  GET api/orderdetail
  @desc   Get all order detail
-----*/
router.get('/', async (req, res) => {
    try {
        const orderdetail = await OrderDetail.findAll({
            include: [
                { model: Order },
                { model: Food, as: 'MonAn' }
            ]
        });
        res.json(orderdetail)
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server error');
    }
});

/* ----- 
  @route  GET api/order/:order_id
  @desc   Get order by orderId
-----*/
router.get('/:order_id', async (req, res) => {
    try {
        const order = await OrderDetail.findAll({
            where: { SOHOADON: req.params.order_id },
            include: [
                { model: Order },
                { model: Food, as: 'MonAn' }
            ]
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
  @route  POST api/orderdetail
  @desc   Create order detail
-----*/

router.post('/', [
    check('SOHOADON', 'Số Hóa Đơn is required').not().isEmpty(),
    check("MaMon", "Mã Món is required").not().isEmpty(),
    check("SoLuong", "Số lượng bán is required").not().isEmpty()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { SOHOADON, MaMon, SoLuong } = req.body;
    var orderField = {};
    if (SOHOADON) orderField.SOHOADON = SOHOADON;
    if (MaMon) orderField.MaMon = MaMon;
    if (SoLuong) orderField.SoLuong = SoLuong;
    orderField.SoLuongTra = 0;
    try {
        orderdetail = new OrderDetail(orderField);
        await orderdetail.save();
        res.json(orderdetail);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});


/* ----- 
  @route  PUT api/orderdetail
  @desc   Update order detail
-----*/

router.put('/', [
    check("IDBanChiTiet", "Số hóa đơn chi tiết is required").not().isEmpty(),
    check("SOHOADON", "Số hóa đơn bán is required").not().isEmpty(),
    check("MaMon", "Mã món is required").not().isEmpty(),
    check("SoLuong", "Số lượng is required").not().isEmpty()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { IDBanChiTiet, SOHOADON, MaMon, SoLuong } = req.body;
    var orderFields = {};
    if (IDBanChiTiet) orderFields.IDBanChiTiet = IDBanChiTiet;
    if (SOHOADON) orderFields.SOHOADON = SOHOADON;
    if (MaMon) orderFields.MaMon = MaMon;
    if (SoLuong) orderFields.SoLuong = SoLuong;
    try {
        var orderdetail = await OrderDetail.findOne({
            where: { IDBanChiTiet: orderFields.IDBanChiTiet }
        });
        if (orderdetail) {
            orderdetail.update({
                attributes: ['IDBanChiTiet', 'SOHOADON', 'MaMon', 'SoLuong'],
                IDBanChiTiet: orderFields.IDBanChiTiet,
                SOHOADON: orderFields.SOHOADON,
                MaMon: orderFields.MaMon,
                SoLuong: orderFields.SoLuong
            });
            return res.json(orderdetail);
        }
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});

/* ----- 
  @route  DELETE api/orderdetail/:orderdetail_id
  @desc   Delete order detail
-----*/

router.delete('/:orderdetail_id', async (req, res) => {
    try {
        const orderdetail = await OrderDetail.findOne({
            where: { IDBanChiTiet: req.params.orderdetail_id }
        });
        if (!orderdetail) {
            return res.status(404).json({ message: 'Order Detail not found' });
        }
        await orderdetail.destroy();
        res.json({ message: 'Order Detail removed' })
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;