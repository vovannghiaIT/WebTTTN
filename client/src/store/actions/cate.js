import * as apis from "../../services";
import actionTypes from "./actionTypes";

export const getCate = () => async (dispatch) => {
  try {
    const response = await apis.apiGetCate();

    if (response?.data.err === 0) {
      dispatch({
        type: actionTypes.GET_CATE,
        cates: response.data.response,
      });
    } else {
      dispatch({
        type: actionTypes.GET_CATE,
        msg: response.data.msg,
        cates: null,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.GET_CATE,
      cates: null,
    });
  }
};
