// Mock
import stars from './mock.json';

<<<<<<< HEAD
import { connect } from 'react-redux';
import StarProfile from './StarProfile';
// import fetchStarData from '../../util/starUtil.js'
import {receiveStarData, requestStarData} from '../../util/star/starActions.js';

const mapStateToProps = (state, ownProps) => ({
  star: stars[0]
})

const mapDispatchToProps = (dispatch) => ({
  requestStarData: (id) => dispatch(requestStarData(id))
})
=======
import { getOwnershipDetails, getStarDetails } from '../starActions'

import { connect } from 'react-redux'
import StarProfile from './StarProfile'

const mapStateToProps = (state, ownProps) => {
  return {
    star: stars[0],
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
>>>>>>> 4cf1fee332a178243f93519f6641170c877ae082

const StarProfileContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(StarProfile)

export default StarProfileContainer