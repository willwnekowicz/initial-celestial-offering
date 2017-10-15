import React from 'react'

class BidButton extends React.Component {
  render() {
    let starIndex = this.props.starIndex;
    let bidAmount = this.props.bidAmount;

    return(
      <button onClick={(event) => this.props.onEnterBid(event, starIndex, bidAmount)}>Enter Bid</button>
    )
  }
}

export default BidButton
