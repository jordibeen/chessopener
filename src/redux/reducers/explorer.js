export const SET_EXPLORER_SEQUENCE = 'SET_EXPLORER_SEQUENCE';

const initialState = {
  sequence: null
};

export default function explorer(state = initialState, action) {
  switch (action.type) {
    case SET_EXPLORER_SEQUENCE:
      return {
        sequence: action.payload
      }
    default:
      return state
  }
};
