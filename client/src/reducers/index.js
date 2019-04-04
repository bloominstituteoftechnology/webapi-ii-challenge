import { FETCH_START, FETCH_NEON_SUCCESS, FETCH_NEON_FAILURE, UPDATE, DELETE } from '../actions';

const initialState = {
    Neon: [],
    fetchingNeon: false,
    addingNeon: false,
    updatingNeon: false,
    deletingNeon: false,
    error: null
};

export const rootReducer = (state = initialState, action) => {
  console.log(rootReducer)
  switch (action.type) {
    case FETCH_START:
        return {
    ...state,
    fetchingNeon: true
  };
  default:
    return state;
    }
};











