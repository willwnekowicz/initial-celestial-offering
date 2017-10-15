import React from 'react'

class TransferButton extends React.Component {
  render() {
    let to = this.props.to;
    let starIndex = this.props.starIndex;

    return(
      <button onClick={(event) => this.props.onTransferStar(event, to, starIndex)}>Transfer Star</button>
    )
  }
}

export default TransferButton
