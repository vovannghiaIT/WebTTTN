import React, { useCallback, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "./Header";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions";
import { ToastContainer } from "react-toastify";
const Layout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    dispatch(actions.getProduct());
  };

  return (
    <>
      <div className="w-full flex flex-wrap ">
        <div className="bg-[#343a40] w-[20%] text-white overflow-auto h-screen ">
          <Header />
        </div>
        <div className="w-[80%] bg-gray-300 overflow-auto h-screen ">
          <Outlet />
        </div>
        <ToastContainer
          position="top-right"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </>
  );
};

export default Layout;
