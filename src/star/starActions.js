import StarMarketContract from '../../build/contracts/StarMarket.json'
import store from '../store'

const contract = require('truffle-contract')

export const STAR_RECEIVED = 'STAR_RECEIVED'
export const STAR_OWNERSHIP_RECEIVED = 'STAR_OWNERSHIP_RECEIVED'

function starDetailsReceived(starDetails) {
  return {
    type: STAR_RECEIVED,
    details: starDetails
  }
}

function starOwnershipReceived(starOwnershipDetails) {
  return {
    type: STAR_OWNERSHIP_RECEIVED,
    ownership: starOwnershipDetails
  }
}

export function getStarDetails(starIndex) {
  return function (dispatch) {
    let proxyUrl = 'https://cors-anywhere.herokuapp.com/'
    let url = proxyUrl + 'https://puzzlebox.io/cgi-bin/puzzlebox/ico-api.py?id=' + starIndex

    const options = {
      method: 'GET',
    };

    fetch(url, options).then((response) => {
      let json = response.json()
      return json
    }).then((json) => {
      dispatch(starDetailsReceived(json))
    })
  }
}

export function getOwnershipDetails(starIndex) {
  let web3 = store.getState().web3.web3Instance

  // Double-check web3's status.
  if (typeof web3 !== 'undefined') {

    return function(dispatch) {
      // Using truffle-contract we create the starMarket object.
      const starMarket = contract(StarMarketContract)
      starMarket.setProvider(web3.currentProvider)

      // Declaring this for later so we can chain functions on StarMarket.
      var starMarketInstance

      // Get current ethereum wallet.
      web3.eth.getCoinbase((error, coinbase) => {
        // Log errors, if any.
        if (error) {
          console.error(error);
        }

        starMarket.deployed().then(function(instance) {
          starMarketInstance = instance

          starMarketInstance.starIndexToAddress.call(starIndex, {from: coinbase}).then(function(owner) {

            let starOwnershipDetails = {
              isOwner: owner == coinbase,
              owner: owner,
            }

            dispatch(starOwnershipReceived(starOwnershipDetails))

          })
        })
      })
    }
  } else {
    console.error('Web3 is not initialized.');
  }
}
