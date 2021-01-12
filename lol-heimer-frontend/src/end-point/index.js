const URL = process.env.REACT_APP_AXIOS_URL ? process.env.REACT_APP_AXIOS_URL : '';
const ROOT = `${URL}`;

export const API_CHANPION_GET_ROTATIONS = `${ROOT}/api/champion/getRotations`;

export const API_SEARCH_USER = `${ROOT}/api/search/getUserInfo`;
export const API_SEARCH_GET_MATCH_LIST = `${ROOT}/api/search/getMatchList`;
export const API_SEARCH_GET_MATCH_DETAIL = `${ROOT}/api/search/getMatchListDetail`;
