// Mock
import stars from './mock.json';

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

const StarProfileContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(StarProfile)

export default StarProfileContainer