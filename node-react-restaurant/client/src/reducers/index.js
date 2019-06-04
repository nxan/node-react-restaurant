import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import place from './place';
import food from './food';


export default combineReducers({
    alert, auth, profile, place, food
});