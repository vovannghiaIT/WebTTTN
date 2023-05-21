import * as apis from "../../services";
import actionTypes from "./actionTypes";

export const getVoucher = () => async (dispatch) => {
  try {
    const response = await apis.apiGetVouchers();
    if (response?.data.err === 0) {
      dispatch({
        type: actionTypes.GET_VOUCHER,
        vouchers: response.data.response,
      });
    } else {
      dispatch({
        type: actionTypes.GET_VOUCHER,
        msg: response.data.msg,
        vouchers: null,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.GET_VOUCHER,
      vouchers: null,
    });
  }
};
