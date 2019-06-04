import React, { useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createFood } from '../../actions/food';

const CreateFood = ({ createFood, history }) => {
    const [formData, setFormData] = useState({
        TenMon: '',
        IDNhom: '',
        DonVi: '',
        DonGiaBan: ''
    });

    const {
        TenMon, IDNhom, DonVi, DonGiaBan
    } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        createFood(formData, history);
    }

    return (
        <Fragment>
            <h1 className="large text-primary">
                Tạo thực đơn mới
            </h1>
            <form className="form" onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                    <input type="text" placeholder="Tên món ăn" name="TenMon" value={TenMon} onChange={e => onChange(e)} />

                </div>
                <div className="form-group">
                    <input type="text" placeholder="Chọn nhóm" name="IDNhom" value={IDNhom} onChange={e => onChange(e)} />

                </div>
                <div className="form-group">
                    <input type="text" placeholder="Số lượng" name="DonVi" value={DonVi} onChange={e => onChange(e)} />

                </div>
                <div className="form-group">
                    <input type="text" placeholder="Đơn giá bán" name="DonGiaBan" value={DonGiaBan} onChange={e => onChange(e)} />

                </div>
                <input type="submit" className="btn btn-primary my-1" />
                <Link to="/dashboard" className="btn btn-light my-1">Quay về</Link>
            </form>
        </Fragment>
    )
}

CreateFood.propTypes = {
    createFood: PropTypes.func.isRequired
}

export default connect(null, { createFood })(CreateFood);


