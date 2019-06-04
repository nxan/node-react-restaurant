import React, { useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createPlace } from '../../actions/place';

const CreatePlace = ({ createPlace, history }) => {
    const [formData, setFormData] = useState({
        TenKhu: ''
    });

    const {
        TenKhu
    } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        createPlace(formData, history);
    }

    return (
        <Fragment>
            <h1 className="large text-primary">
                Tạo khu mới
            </h1>
            <form className="form" onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                    <input type="text" placeholder="Khu" name="TenKhu" value={TenKhu} onChange={e => onChange(e)} />
                    <small className="form-text"
                    >Vui lòng nhập khu bạn muốn thêm</small
                    >
                </div>
                <input type="submit" className="btn btn-primary my-1" />
                <Link to="/dashboard" className="btn btn-light my-1">Quay về</Link>
            </form>
        </Fragment>
    )
}

CreatePlace.propTypes = {
    createPlace: PropTypes.func.isRequired
}

export default connect(null, { createPlace })(CreatePlace);


