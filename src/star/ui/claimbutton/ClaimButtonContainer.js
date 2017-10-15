import { connect } from 'react-redux'
import ClaimButton from './ClaimButton'
import { claimStar } from './ClaimButtonActions'

const mapStateToProps = (state, ownProps) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    onClaimClick: (event, starIndex) => {
      event.preventDefault();

      dispatch(claimStar(starIndex))
    }
  }
}

const ClaimButtonContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ClaimButton)

export default ClaimButtonContainer
