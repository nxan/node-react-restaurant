import axios from 'axios';
import {
    GET_FOOD,
    CREATE_FOOD
} from './types';
import { setAlert } from './alert';

export const createFood = (formData, history, edit = false) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const res = await axios.post('/api/food', formData, config);
        dispatch({
            type: CREATE_FOOD,
            payload: res.data
        });
        dispatch(setAlert('Thêm thành công.', 'success'))
        history.push('/dashboard')
    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'success')));
        }
        dispatch({
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

// Get all food
export const getFoods = () => async dispatch => {
    try {
        const res = await axios.get('/api/food');

        dispatch({
            type: GET_FOOD,
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



