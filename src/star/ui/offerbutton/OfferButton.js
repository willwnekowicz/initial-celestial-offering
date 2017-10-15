import React from 'react'

class OfferButton extends React.Component {
  render() {
    let starIndex = this.props.starIndex;
    let offerAmount = this.props.offerAmount;

    return(
      <button onClick={(event) => this.props.onEnterOffer(event, starIndex, offerAmount)}>Enter Offer</button>
    )
  }
}

export default OfferButton
