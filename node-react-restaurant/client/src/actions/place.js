import axios from 'axios';
import {
    CREATE_PLACE,
    GET_PLACE,
} from './types';
import { setAlert } from './alert';

export const createPlace = (formData, history, edit = false) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const res = await axios.post('/api/place', formData, config);
        dispatch({
            type: CREATE_PLACE,
            payload: res.data
        });
        dispatch(setAlert('Thêm thành công.', 'success'))
        history.push('/dashboard')
    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

// Get all place
export const getPlaces = () => async dispatch => {
    try {
        const res = await axios.get('/api/place');

        dispatch({
            type: GET_PLACE,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

export const deletePlaces = () => async dispatch => {
}



