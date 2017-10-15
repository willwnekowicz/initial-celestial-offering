import React from 'react';
import './star.css'

import { getWeb3 } from '../../util/web3/getWeb3'

import BuyButton from './buybutton/BuyButtonContainer';
import ClaimButton from './claimbutton/ClaimButtonContainer';
import BidSection from './bidbutton/BidSection';
import AcceptBidSection from './acceptBidbutton/AcceptBidSection';
import OfferSection from './offerbutton/OfferSection';
import TransferSection from './transferbutton/TransferSection';
import RevokeOfferButton from './revokeOfferbutton/RevokeOfferButtonContainer';
import RevokeBidButton from './revokeBidbutton/RevokeBidButtonContainer';
import WithdrawFundsButton from './withdrawFundsbutton/WithdrawFundsButtonContainer';

import StarDetails from './StarDetails';

const Spectrum = ({color}) => {
  const colors = { a: 'blue', b: 'blue', o: 'blue', f: 'light-blue', g: 'yellow', m: 'magenta', k: 'orange' }
  const style = { background: colors[color[0].toLowerCase()] }
  return <div className="star-spectrum" style={style}>{color}</div>
}

class StarProfile extends React.Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.getStarDetails(this.props.params.id)
    getWeb3.then(() => {
      this.props.getOwnershipDetails(this.props.params.id)
    });
  }

  render() {
    const props = this.props;
    const {details, ownership} = props;
    const starName = details.proper || 'No Name';
    const starConstellation = details && details.con || '';

    return (
      <main className="container">
        <StarDetails details={details} />
        <div className="star-main">
          <div className="star-image">
            ★
          </div>
          <div className="star-name">
            {starName}
          </div>
          <div className="star-constellation">
            {starConstellation ? starConstellation + ' constellation' : ''}
          </div>
          <div className="pure-g">
            <div className="pure-u-1-1">
              <div className="star-profile pure-u-1-2">
                <h2>Current Ownership Status</h2>


                { ownership.hasOwner ?
                  ownership.isOwner ? (
                      <p>
                        You own {details.proper || 'this unnamed star'}!
                      </p>
                    ) : (
                      <p>
                        {details.proper || 'this unnamed star'} is owned by
                        <br />
                        {ownership.owner}
                      </p>
                    ) : (
                    <p>
                      This star is not owned. Claim it now!
                    </p>
                  )
                }

                { ownership.hasOwner ?
                    ownership.isOwner ? (
                      <div>
                        <AcceptBidSection starIndex={props.params.id}/>
                        <br /><br />
                        <OfferSection starIndex={props.params.id}/>
                        <br />
                        <RevokeOfferButton starIndex={props.params.id}/>
                        <br /><br />
                        <TransferSection starIndex={props.params.id}/>
                        <br />
                      </div>
                      ) : (
                      <div>
                        <BidSection starIndex={props.params.id}/>
                        <br />
                        <RevokeBidButton starIndex={props.params.id}/>
                        <br /><br />
                        <BuyButton starIndex={props.params.id}/>
                      </div>
                      )
                   : (
                    <ClaimButton starIndex={props.params.id}/>
                  ) }

                <h2>Current Marketplace Status</h2>
              </div>
            </div>
          </div>
          <div className="account-details">
            <div className="account-number">
              Your account: {ownership.coinbase}
            </div>
            <div className="account-buttons">
              <WithdrawFundsButton />
            </div>
          </div>
        </div>
      </main>
    )
  }
}

export default StarProfile

// TODO:
  // Get bids
  // Get offers


// [{"id":119610,"hip":null,"hd":null,"hr":null,"gl":"NN 4380","bf":null,"proper":null,"ra":23.962387,
// "dec":19.770238,"dist":18.1818,"pmra":132.31,"pmdec":-461.4,"rv":0.0,"mag":13.01,"absmag":11.712,
// "spect":"m","ci":null,"x":17.109274,"y":-0.168446,"z":6.149978,"vx":1.387e-05,"vy":1.153e-05,"vz":-3.827e-05,
// "rarad":6.273338288849037,"decrad":0.3450557542719,"pmrarad":6.414569807430556e-07,"pmdecrad":-2.236954562e-06,
// "bayer":null,"flam":null,"con":null,"comp":1,"comp_primary":119610,"base":null,"lum":0.001799699516577357,"var":null,
// "var_min":null,"var_max":null},{"id":119611,"hip":null,"hd":null,"hr":null,"gl":"NN 4381","bf":null,"proper":null,
// "ra":23.963895,"dec":38.629391,"dist":16.9492,"pmra":-162.63,"pmdec":-162.63,"rv":0.0,"mag":12.64,"absmag":11.494,
// "spect":"m","ci":null,"x":13.240128,"y":-0.125297,"z":10.581054,"vx":8.22e-06,"vy":-1.344e-05,"vz":-1.044e-05,
// "rarad":6.273733165375566,"decrad":0.67421005940595,"pmrarad":-7.884524886875e-07,"pmdecrad":-7.88471881e-07,"bayer":null,
// "flam":null,"con":null,"comp":1,"comp_primary":119611,"base":null,"lum":0.002199885109049247,"var":null,"var_min":null,
// "var_max":null},