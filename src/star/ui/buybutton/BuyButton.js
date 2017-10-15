import React from 'react'

class BuyButton extends React.Component {
  render() {
    let starIndex = this.props.starIndex;

    return(
      <button onClick={(event) => this.props.onBuyClick(event, starIndex)}>Buy star</button>
    )
  }
}

export default BuyButton
