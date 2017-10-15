import { connect } from 'react-redux'
import AcceptBidButton from './AcceptBidButton'
import { acceptBid } from './AcceptBidButtonActions'

const mapStateToProps = (state, ownProps) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAcceptBid: (event, starIndex, minAmount) => {
      event.preventDefault();

      dispatch(acceptBid(starIndex, minAmount))
    }
  }
}

const AcceptBidButtonContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AcceptBidButton)

export default AcceptBidButtonContainer
