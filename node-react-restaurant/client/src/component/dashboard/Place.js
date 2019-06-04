import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { getPlaces, deletePlaces } from '../../actions/place';


const Places = ({ getPlaces, place: { places, loading } }) => {
    useEffect(() => {
        getPlaces();
    }, [getPlaces]);
    const bodyPlaces = places.map(place => (
        <tr key={place.MaKhu}>
            <td>#{place.MaKhu}</td>
            <td>{place.TenKhu}</td>
            <td>
                <button
                    onClick={() => deletePlaces(place.MaKhu)}
                    className="btn btn-danger"
                >
                    Delete
        </button>
            </td>
        </tr>
    ));

    return (
        <Fragment>
            <h2 className="my-2">Bảng Bàn</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Mã Khu</th>
                        <th className="hide-sm">Tên Khu</th>
                        <th />
                    </tr>
                </thead>
                <tbody>{bodyPlaces}</tbody>
            </table>
        </Fragment>
    );
};

Places.propTypes = {
    getPlaces: PropTypes.func.isRequired,
    place: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    place: state.place
});

export default connect(mapStateToProps, { getPlaces })(Places);