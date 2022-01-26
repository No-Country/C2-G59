import { axiosWithOutToken } from '../../services/axios';
import { types } from '../types';

/** Type Actions */
const getUsersStart = () => {
  return {
    type: types.USER_START,
  };
};

const getUsersSuccess = users => {
  return {
    type: types.USER_SUCCESS,
    payload: { users },
  };
};
const getUsersFail = error => {
  return {
    type: types.USER_START,
    payload: { error },
  };
};

/** Actions Service */
function getUsers() {
  return dispatch => {
    dispatch(getUsersStart());
    return axiosWithOutToken('/users')
      .then(resp => {
        dispatch(getUsersSuccess(resp.data));
        return resp.data;
      })
      .catch(err => {
        console.log(err.response);
        dispatch(getUsersFail(err.response?.data));
      });
  };
}

function saveUser(data) {
  // aqui la funcion
}

export { getUsers, saveUser };
