import actionTypes from "../actions/actionTypes";

const initState = {
  msg: "",
  vouchers: [],
};

const voucherReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.GET_VOUCHER:
      return {
        ...state,
        vouchers: action.vouchers || [],
        msg: action.msg || "",
      };

    default:
      return state;
  }
};
export default voucherReducer;
