import { connect } from 'react-redux'
import Stars from './Stars'

const mapStateToProps = (state, ownProps) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

const StarsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Stars)

export default StarsContainer