import * as actionTypes from './actionTypes';

export const fetchPatients = () => {
  return async (dispatch, getState) => {
    let userId = getState().auth.localId;
    try {
      const response = await fetch(
        `https://shiffa-test-default-rtdb.firebaseio.com/.json`,
        {
          method: 'GET',
        }
      );

      if (!response.ok) {
        throw new Error('Something went wrong');
      }
      const responseData = await response.json();
      let patinets = [];
      for (const key in responseData.patinet) {
          let data = responseData.patinet[key];
          data.tokenno = key;
          data.status = 'Viewd';
        patinets.push(data);
      }
       console.log('responseData', patinets);
      dispatch({
        type: actionTypes.SET_PATIENT,
        patients: patinets,
      });
    } catch (error) {
      throw error;
    }
  };
};

