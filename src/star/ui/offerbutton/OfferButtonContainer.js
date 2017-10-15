import { connect } from 'react-redux'
import OfferButton from './OfferButton'
import { enterOffer } from './OfferButtonActions'

const mapStateToProps = (state, ownProps) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    onEnterOffer: (event, starIndex, offerAmount) => {
      event.preventDefault();

      dispatch(enterOffer(starIndex, offerAmount))
    }
  }
}

const OfferButtonContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(OfferButton)

export default OfferButtonContainer
