import axios from 'axios';
import {
    GET_FOOD
} from './types';
import { setAlert } from './alert';

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



