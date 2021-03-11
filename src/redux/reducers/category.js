export const SET_CATEGORIES = 'SET_CATEGORIES';

const initialState = {
  categories: []
};

export default function category(state = initialState, action) {
  switch (action.type) {
    case SET_CATEGORIES:
      return {
        categories: action.payload
      }
    default:
      return state
  }
};
