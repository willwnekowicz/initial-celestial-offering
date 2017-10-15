import React from 'react'

class RevokeBidButton extends React.Component {
  render() {
    let starIndex = this.props.starIndex;

    return(
      <button onClick={(event) => this.props.onRevokeBid(event, starIndex)}>Revoke Bid</button>
    )
  }
}

export default RevokeBidButton
