import { GET_PLACE } from '../actions/types';

const initialState = {
    places: [],
    loading: true,
    error: {}
}

export default function (state = initialState, action) {
    const { type, payload } = action

    switch (type) {
        case GET_PLACE:
            return {
                ...state,
                places: payload,
                loading: false
            };
        default:
            return state;
    }
}