import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ItemsImg, Pagination } from "../../../components";
import * as actions from "../../../store/actions";
import Edit from "./Edit";
import Insert from "./Insert";
import icons from "../../../ultils/icons";
import Swal from "sweetalert2";
import { apiUpdateBrands } from "../../../services";

const HomeBrand = () => {
  return <div>brands</div>;
};

export default HomeBrand;
