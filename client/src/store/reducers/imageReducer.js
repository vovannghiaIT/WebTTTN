import actionTypes from "../actions/actionTypes";

const initState = {
  msg: "",
  images: [],
};

const imageReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.GET_IMAGES:
      return {
        ...state,
        images: action.images || [],
        msg: action.msg || "",
      };
    default:
      return state;
  }
};

export default imageReducer;
