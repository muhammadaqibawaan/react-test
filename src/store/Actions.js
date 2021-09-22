import Axios from "axios";
export const saveData = (data) => ({
  type: "SAVE_DATA",
  data: data,
});

export const saveAllData = (data) => ({
  type: "SAVE_ALLDATA",
  data: data,
});

const setLoader = (data) => ({
  type: "SET_LOADER",
  data: data,
});

export const fetchData = () => async (dispatch) => {
  try {
    await Axios.get("https://disease.sh/v3/covid-19/countries")

      .then((response) => {
        dispatch(saveData(response.data));
        return dispatch(setLoader(false));
      })
      .catch((error) => {
        console.log("something went wrng", error);
        // return dispatch({ type: 'LOADER', data: true});
        return dispatch(setLoader(true));
      });
  } catch (error) {}
};

export const fetchAllData = () => async (dispatch) => {
  await Axios.get("https://disease.sh/v3/covid-19/all")

    .then((response) => {
      return dispatch(saveAllData(response.data));
    })
    .catch((error) => {
      console.log("something went wrng");
      // return dispatch({ type: 'LOADER', data: true});
      return dispatch(setLoader(true));
    });

 
};
