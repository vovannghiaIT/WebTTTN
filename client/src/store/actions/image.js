import * as apis from "../../services";
import actionTypes from "./actionTypes";

export const getImages = () => async (dispatch) => {
  try {
    const response = await apis.apiGetImages();
    if (response?.data.err === 0) {
      dispatch({
        type: actionTypes.GET_IMAGES,
        images: response.data.response,
      });
    } else {
      dispatch({
        type: actionTypes.GET_IMAGES,
        msg: response.data.msg,
        images: null,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.GET_IMAGES,
      images: null,
    });
  }
};
