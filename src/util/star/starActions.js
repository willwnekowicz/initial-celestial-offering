import {fetchStarData} from './starUtil.js';

export const RECEIVE_STAR_DATA = 'RECEIVE_STAR_DATA';

export const receiveStarData = data => ({
    type: RECEIVE_STAR_DATA,
    data,
});

export const requestStarData = id => dispatch => {
    return fetchStarData(id).then(({data}) =>
        dispatch(receiveStarData(data)))
};