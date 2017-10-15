import React from 'react'

class RevokeOfferButton extends React.Component {
  render() {
    let starIndex = this.props.starIndex;

    return(
      <button onClick={(event) => this.props.onRevokeOffer(event, starIndex)}>Revoke Offer</button>
    )
  }
}

export default RevokeOfferButton
