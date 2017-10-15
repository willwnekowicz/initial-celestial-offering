const initialState = {
  stars: [],
}

const starsReducer = (state = initialState, action) => {
  if (action.type === 'STAR_RECEIVED')
  {
    return { ...state, stars: [...state.stars, action.stars] }
  }

  return state
}

export default starsReducer
