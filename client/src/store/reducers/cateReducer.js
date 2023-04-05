import actionTypes from "../actions/actionTypes";

const initState = {
  msg: "",
  cates: [],
};

const cateReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.GET_CATE:
      return {
        ...state,
        cates: action.cates || [],
        msg: action.msg || "",
      };
    default:
      return state;
  }
};

export default cateReducer;
