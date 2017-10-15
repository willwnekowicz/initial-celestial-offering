import { connect } from 'react-redux'
import BidButton from './BidButton'
import { enterBid } from './BidButtonActions'

const mapStateToProps = (state, ownProps) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    onEnterBid: (event, starIndex, bidAmount) => {
      event.preventDefault();

      dispatch(enterBid(starIndex, bidAmount))
    }
  }
}

const BidButtonContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(BidButton)

export default BidButtonContainer
