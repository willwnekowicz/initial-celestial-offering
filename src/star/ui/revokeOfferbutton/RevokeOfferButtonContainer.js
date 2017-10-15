import { connect } from 'react-redux'
import RevokeOfferButton from './RevokeOfferButton'
import { revokeOffer } from './RevokeOfferButtonActions'

const mapStateToProps = (state, ownProps) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    onRevokeOffer: (event, starIndex) => {
      event.preventDefault();

      dispatch(revokeOffer(starIndex))
    }
  }
}

const RevokeOfferButtonContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(RevokeOfferButton)

export default RevokeOfferButtonContainer
