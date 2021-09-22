// import { act } from "react-dom/test-utils";

const initialState = {
  countryWiseData: [],
  allCountryData: {},
  loading: true
};

const Reducers =  (state = initialState, action ) => {
    switch (action.type) {

      case "SAVE_DATA":
          
        return {
          ...state,
         countryWiseData: action.data
        };

      case "SAVE_ALLDATA":

        return {
          ...state,
          allCountryData: action.data
        };
      
      case "SET_LOADER": 

        return {
          ...state,
          loading: action.data
        }
      
      
      default:
        return state;
    }
  };
export default Reducers;
