import React from 'react'

class AcceptBidButton extends React.Component {
  render() {
    let starIndex = this.props.starIndex;
    let minAmount = this.props.minAmount;

    return(
      <button onClick={(event) => this.props.onAcceptBid(event, starIndex, minAmount)}>Accept Bid</button>
    )
  }
}

export default AcceptBidButton
