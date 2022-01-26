import { axiosWithOutToken } from '../../services/axios';
import { types } from '../types';

/** Type Actions */
const getPurchasesStart = () => {
  return {
    type: types.PURCHASE_START,
  };
};

const getPurchasesSuccess = purchases => {
  return {
    type: types.PURCHASE_SUCCESS,
    payload: { purchases },
  };
};
const getPurchasesFail = error => {
  return {
    type: types.PURCHASE_START,
    payload: { error },
  };
};

/** Actions Service */
function getPurchases() {
  return dispatch => {
    dispatch(getPurchasesStart());
    return axiosWithOutToken('/purchases')
      .then(resp => {
        dispatch(getPurchasesSuccess(resp.data.products));
        return resp.data.products;
      })
      .catch(err => {
        console.log(err.response);
        dispatch(getPurchasesFail(err.response?.data));
      });
  };
}

function savePurchase(data) {
  // aqui la funcion
}

export { getPurchases, savePurchase };
