import React from 'react'

class ClaimButton extends React.Component {
  render() {
    let starIndex = this.props.starIndex;

    return(
      <button onClick={(event) => this.props.onClaimClick(event, starIndex)}>Claim this star</button>
    )
  }
}

export default ClaimButton
