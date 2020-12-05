const URL = process.env.REACT_APP_AXIOS_URL ? process.env.REACT_APP_AXIOS_URL : '';
const ROOT = `${URL}/index.php`;

export const API_SEARCH_USER=`${ROOT}/api/search/user`;
