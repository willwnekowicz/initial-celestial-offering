import { RECEIVE_STAR_DATA } from './starActions.js';
import merge from 'lodash/merge';




const starReducer = (state = {}, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_STAR_DATA:
            return merge({}, state, action.data);
        default:
            return state;
    }
};

export default starReducer;
