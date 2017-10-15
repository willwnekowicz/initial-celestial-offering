export const STARS_RECEIVED = 'STARS_RECEIVED'

function starsReceived(stars) {
  return {
    type: STARS_RECEIVED,
    stars: stars
  }
}

export function getStarsByConstellation(constellation) {
  return function (dispatch) {
    let proxyUrl = 'https://cors-anywhere.herokuapp.com/'
    let url = proxyUrl + 'https://puzzlebox.io/cgi-bin/puzzlebox/ico-api.py?con=' + constellation

    const options = {
      method: 'GET',
    };

    fetch(url, options).then((response) => {
      let json = response.json()
      return json
    }).then((json) => {
      dispatch(starsDetailsReceived(json))
    })
  }
}
