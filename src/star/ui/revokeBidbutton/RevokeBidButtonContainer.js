import { connect } from 'react-redux'
import RevokeBidButton from './RevokeBidButton'
import { revokeBid } from './RevokeBidButtonActions'

const mapStateToProps = (state, ownProps) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    onRevokeBid: (event, starIndex) => {
      event.preventDefault();

      dispatch(revokeBid(starIndex))
    }
  }
}

const RevokeBidButtonContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(RevokeBidButton)

export default RevokeBidButtonContainer
