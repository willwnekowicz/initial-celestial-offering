const initialState = {
  details: {},
  ownership: {}
}

const starReducer = (state = initialState, action) => {
  if (action.type === 'STAR_RECEIVED')
  {
    return Object.assign({}, state, {
      details: action.details
    })
  }

  if (action.type === 'STAR_OWNERSHIP_RECEIVED')
  {
    return Object.assign({}, state, {
      ownership: action.ownership
    })
  }

  return state
}

export default starReducer
