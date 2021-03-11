export const SET_OPENINGS = 'SET_OPENINGS';

const initialState = {
  openings: []
};

export default function opening(state = initialState, action) {
  switch (action.type) {
    case SET_OPENINGS:
      return {
        openings: action.payload
      }
    default:
      return state
  }
};
