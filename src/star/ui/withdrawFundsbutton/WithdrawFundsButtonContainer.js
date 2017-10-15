import { connect } from 'react-redux'
import WithdrawFundsButton from './WithdrawFundsButton'
import { withdrawFunds } from './WithdrawFundsButtonActions'

const mapStateToProps = (state, ownProps) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    onWithdrawFunds: (event) => {
      event.preventDefault();

      dispatch(withdrawFunds())
    }
  }
}

const WithdrawFundsButtonContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(WithdrawFundsButton)

export default WithdrawFundsButtonContainer
