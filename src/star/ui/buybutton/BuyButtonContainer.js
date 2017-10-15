import { connect } from 'react-redux'
import BuyButton from './BuyButton'
import { buyStar } from './BuyButtonActions'

const mapStateToProps = (state, ownProps) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    onBuyClick: (event, starIndex) => {
      event.preventDefault();

      dispatch(buyStar(starIndex))
    }
  }
}

const BuyButtonContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(BuyButton)

export default BuyButtonContainer
