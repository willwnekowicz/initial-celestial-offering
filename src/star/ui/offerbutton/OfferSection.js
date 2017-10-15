import React from 'react'

import OfferButton from './OfferButtonContainer';

class OfferSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      offerAmount: 0
    }
  }

  updateOfferAmount() {
    this.setState({offerAmount: this.refs.offerAmount.value});
  }

  render() {
    let starIndex = this.props.starIndex;

    return(
      <div>
        <input type="number"
               ref="offerAmount"
               value={this.state.offerAmount}
               onChange={() => {this.updateOfferAmount()}}
        />
        <OfferButton starIndex={starIndex} offerAmount={this.state.offerAmount} />
      </div>
    )
  }
}

export default OfferSection
