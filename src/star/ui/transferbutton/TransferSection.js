import React from 'react'

import TransferButton from './TransferButtonContainer';

class TransferSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      to: '0x0'
    }
  }

  updateToAddress() {
    this.setState({to: this.refs.to.value});
  }

  render() {
    let starIndex = this.props.starIndex;

    return(
      <div>
        <input type="text"
               ref="to"
               value={this.state.to}
               onChange={() => {this.updateToAddress()}}
        />
        <TransferButton starIndex={starIndex} to={this.state.to} />
      </div>
    )
  }
}

export default TransferSection
