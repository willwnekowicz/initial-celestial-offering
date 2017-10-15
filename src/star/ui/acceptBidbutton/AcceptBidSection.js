import React from 'react'

import AcceptBidButton from './AcceptBidButtonContainer';

class AcceptBidSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      minAmount: 0
    }
  }

  updateMinAmount() {
    this.setState({minAmount: this.refs.minAmount.value});
  }

  render() {
    let starIndex = this.props.starIndex;

    return(
      <div>
        <input type="number"
               ref="minAmount"
               value={this.state.minAmount}
               onChange={() => {this.updateMinAmount()}}
        />
        <AcceptBidButton starIndex={starIndex} minAmount={this.state.minAmount} />
      </div>
    )
  }
}

export default AcceptBidSection
