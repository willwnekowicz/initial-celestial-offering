import axios from 'axios';
const proxyurl = "https://cors-anywhere.herokuapp.com/";

export const fetchStarData = (id) => (
    axios({
        method: 'GET',
        url: proxyurl + `https://puzzlebox.io/cgi-bin/puzzlebox/ico-api.py?id=${id}`,
        mode: 'no-cors',
    })
);