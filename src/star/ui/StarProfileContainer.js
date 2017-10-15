import { getOwnershipDetails, getStarDetails } from '../starActions'

import { connect } from 'react-redux'
import StarProfile from './StarProfile'

const mapStateToProps = (state, ownProps) => {
  return {
    details: (state.star && state.star.details) || {},
    ownership: (state.star && state.star.ownership) || {},
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getStarDetails: (id) => dispatch(getStarDetails(id)),
    getOwnershipDetails: (id) => dispatch(getOwnershipDetails(id)),
  }
}

const StarProfileContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(StarProfile)

export default StarProfileContainer