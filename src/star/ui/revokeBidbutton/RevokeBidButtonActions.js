import StarMarketContract from '../../../../build/contracts/StarMarket.json'
import store from '../../../store'

const contract = require('truffle-contract')

export function revokeBid(starIndex) {
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

          starMarketInstance.withdrawBidForStar(starIndex, {from: coinbase, gas: 200000}).then(function(result) {
            console.log('revoke bid for star', result);
          })
        })
      })
    }
  } else {
    console.error('Web3 is not initialized.');
  }
}
