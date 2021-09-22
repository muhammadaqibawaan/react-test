import * as actionTypes from '../actions/actionTypes';

const initialState = {
  patients: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_PATIENT:
      return {
        ...state,
        patients: action.patients,
      };
    default:
      return state;
  }
};
