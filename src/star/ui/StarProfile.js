import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import React from 'react'

const Profile = (props) => {
  console.log(props)
  return(
    <main className="container">
      <div className="pure-g">
        <div className="pure-u-1-1">
          <div className="star-profile">
             <p>Hi my name is { props.params.id }</p>
          </div>
        </div>
      </div>
    </main>
  )
}


const mapStateToProps = (state, ownProps) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

const StarProfile = connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile)

export default withRouter(StarProfile)
