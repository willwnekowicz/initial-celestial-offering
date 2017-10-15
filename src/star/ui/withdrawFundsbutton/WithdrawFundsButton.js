import React from 'react'

class withdrawFundsButton extends React.Component {
  render() {
    return(
      <button onClick={(event) => this.props.onWithdrawFunds(event)}>Withdraw Funds</button>
    )
  }
}

export default withdrawFundsButton
