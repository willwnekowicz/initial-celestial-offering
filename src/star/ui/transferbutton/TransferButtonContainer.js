import { connect } from 'react-redux'
import TransferButton from './TransferButton'
import { transferStar } from './TransferButtonActions'

const mapStateToProps = (state, ownProps) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    onTransferStar: (event, to, starIndex) => {
      event.preventDefault();

      dispatch(transferStar(to, starIndex))
    }
  }
}

const TransferButtonContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TransferButton)

export default TransferButtonContainer
