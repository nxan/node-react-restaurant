import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { getFoods, deletePlaces } from '../../actions/food';


const Foods = ({ getFoods, food: { foods, loading } }) => {
    useEffect(() => {
        getFoods();
    }, [getFoods]);
    const bodydesks = foods.map(food => (
        <tr key={food.MaMon}>
            <td>#{food.MaMon}</td>
            <td>{food.TenMon}</td>
            <td>{food.tbl_Nhom.TenNhom}</td>
            <td>{food.DonVi}</td>
            <td>{food.DonGiaBan}</td>
            <td>
                <button
                    onClick={() => deletePlaces(foods.MaKhu)}
                    className="btn btn-danger"
                >
                    Delete
        </button>
            </td>
        </tr>
    ));

    return (
        <Fragment>
            <h2 className="my-2">Bảng thực đơn</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th></th>
                        <th className="hide-sm">Tên món</th>
                        <th className="hide-sm">Nhóm</th>
                        <th className="hide-sm">Số lượng</th>
                        <th className="hide-sm">Giá bán</th>
                        <th />
                    </tr>
                </thead>
                <tbody>{bodydesks}</tbody>
            </table>
        </Fragment>
    );
};

Foods.propTypes = {
    getFoods: PropTypes.func.isRequired,
    food: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    food: state.food
});

export default connect(mapStateToProps, { getFoods })(Foods);