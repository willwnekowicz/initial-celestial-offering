// Mock
import stars from './mock.json'

import { connect } from 'react-redux'
import StarProfile from './StarProfile'

const mapStateToProps = (state, ownProps) => {
  return {
    star: stars[0]
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

const StarProfileContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(StarProfile)

export default StarProfileContainer