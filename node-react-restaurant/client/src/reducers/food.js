import { GET_FOOD } from '../actions/types';

const initialState = {
    foods: [],
    loading: true,
    error: {}
}

export default function (state = initialState, action) {
    const { type, payload } = action

    switch (type) {
        case GET_FOOD:
            return {
                ...state,
                foods: payload,
                loading: false
            };
        default:
            return state;
    }
}