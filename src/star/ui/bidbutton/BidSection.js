import React from 'react'

import BidButton from './BidButtonContainer';

class BidSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bidAmount: 0
    }
  }

  updateBidAmount() {
    this.setState({bidAmount: this.refs.bidAmount.value});
  }

  render() {
    let starIndex = this.props.starIndex;

    return(
      <div>
        <input type="number"
               ref="bidAmount"
               value={this.state.bidAmount}
               onChange={() => {this.updateBidAmount()}}
        />
        <BidButton starIndex={starIndex} bidAmount={this.state.bidAmount} />
      </div>
    )
  }
}

export default BidSection
