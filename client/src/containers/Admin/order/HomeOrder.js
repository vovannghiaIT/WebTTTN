import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ItemsImg } from "../../../components";
import icons from "../../../ultils/icons";
import * as actions from "../../../store/actions";
import { toast, ToastContainer } from "react-toastify";
import { apiDeleteOrder, apiUpdateOrder } from "../../../services";
// import Edit from "./Edit";
import Swal from "sweetalert2";
import { exportExcel } from "../../../ultils/Common/Commonexport";
import Edit from "./Edit";

const HomeOrder = () => {
  const {
    BiTrash,
    AiFillCheckCircle,
    MdRemoveRedEye,
    AiFillFileExcel,
    TbLayoutList,
  } = icons;
  const dispatch = useDispatch();

  const { orders } = useSelector((state) => state.order);
  const { orderdetails } = useSelector((state) => state.orderdetail);

  const [modelCheck, setModelCheck] = useState(false);
  const [dataEdit, setDataEdit] = useState([]);
  const [modalEdit, setModalEdit] = useState(false);
  const [check, setCheck] = useState([]);
  const [checked, setChecked] = useState(false);
  const [payload, setPayload] = useState([
    {
      InFo: "",
    },
  ]);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    dispatch(actions.getOrder());
    dispatch(actions.getOrderDetail());
  };

  const CheckStatusOrder = async (item) => {
    let itemOrder = orders.filter((items) => items?._id === item?._id);

    if (itemOrder[0].status !== 1) {
      toast.warning("Đã Check hàng", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    } else if (itemOrder[0].status === 1) {
      toast.success("Check hàng  thành công", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
      await apiUpdateOrder({ ...item, status: 2 });
      fetchData();
    }
  };
  const deleteSubmit = (items) => {
    Swal.fire({
      title: "Bạn muốn xóa ? <br/>" + items?.code,
      text: "Bạn có thể khôi phục tại thùng rác!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "vâng, chắc chắn rồi!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire("Xóa thành công!", "Bạn đã đưa vào thùng rác.", "success");
        await apiUpdateOrder({ ...items, status: 0 });
        fetchData();
      }
    });
  };

  const handleExport = async (item) => {
    let dataDetail = orderdetails?.filter(
      (items) => items?.orderId === item?.code
    );
    // console.log(item);
    payload[0].InFo =
      "Tên khách hàng" +
      item?.deliveryname +
      " Số điện thoại " +
      item?.deliveryphone +
      " Email " +
      item?.deliveryemail +
      " Địa chỉ " +
      item?.deliveryaddress +
      " Ngày xuất đơn " +
      item?.exportdate;

    for (let i = 0; i < dataDetail?.length; i++) {
      delete dataDetail[i]._id;
      delete dataDetail[i].imagesId;
      delete dataDetail[i].orderId;
      delete dataDetail[i].productId;
      delete dataDetail[i].createdAt;
      delete dataDetail[i].createdAt;
      delete dataDetail[i].updatedAt;
      delete dataDetail[i].status;
      delete dataDetail[i].orders;
      dataDetail[i].amount = dataDetail[i].price * dataDetail[i].quantity;
    }
    // console.log(dataDetail);
    // console.log([payload[0], ...dataDetail]);
    // console.log([payload[0], ...dataDetail]);
    await exportExcel(dataDetail, "Danh sách sản phẩm", "ListProduct");
  };
  const handleChange = (e) => {
    let ischeked = e.target.checked;
    let value = e.target.value;

    if (ischeked) {
      // console.log(check);
      setCheck([...check, value]);
    } else {
      let datalist = check.filter((items) => items !== value);

      setCheck(datalist);
    }
  };
  const submitDelete = async () => {
    //delete category
    //delete img
    for (let i = 0; i <= check.length; i++) {
      // console.log(check[i]);
      let listImg = orders.filter((items) => items?._id === check[i]);

      // console.log(listImg);
      if (listImg[0]) {
        await apiDeleteOrder(listImg[0]);
      }
    }
    toast.success("Xóa " + check.length + "  thành công", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

    setChecked(false);
    setCheck([]);
    fetchData();
    // console.log(this.refs.minus.checked);
  };
  return (
    <div className="w-full">
      <div className="w-[95%]  mx-auto">
        <div className="bg-white mt-12">
          <div className="w-full  bg-gray-100">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
              <div className="flex flex-col">
                <div className="mb-4">
                  <h1 className="text-3xl mt-7 font-bolder leading-tight text-gray-900">
                    Đơn hàng
                  </h1>
                </div>
                <div className="-mb-2 py-4 flex flex-wrap flex-grow justify-between">
                  <div className="flex items-center py-2">
                    <input
                      className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                      id="inline-searcg"
                      type="text"
                      placeholder="Search"
                    />
                  </div>
                  <div className="flex items-center py-2 gap-3">
                    <div>
                      <button
                        className="flex gap-2 items-center bg-red-500 px-4 py-2 rounded-md hover:opacity-[80%]  opacity-[100%] "
                        onClick={() => submitDelete()}
                      >
                        <BiTrash size={20} color="white" />
                        <span className="text-white">
                          Delete(selected) <span>{check.length} </span>
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="my-2 py-2 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 ">
                  <div className="align-middle inline-block w-full shadow overflow-x-auto sm:rounded-lg border-b border-gray-200">
                    <table className="min-w-full ">
                      <thead>
                        <tr className="border-b border-gray-200 bg-white leading-4 tracking-wider text-base text-gray-900">
                          <th
                            className="px-2 py-5 text-left bg-white w-full"
                            colSpan="12"
                          >
                            {/* <input
                              className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                              type="checkbox"
                            /> */}
                          </th>
                        </tr>
                        <tr className="bg-gray-50 border-b border-gray-200 text-xs leading-4 text-gray-500 uppercase tracking-wider">
                          <th className="px-2  py-2 text-center font-medium "></th>
                          <th className="px-2  py-2 text-center font-medium">
                            Mã đơn hàng
                          </th>
                          <th className="px-2  py-2 text-center font-medium">
                            Người đặt hàng
                          </th>
                          <th className="px-2  py-2 text-center font-medium">
                            Status
                          </th>
                          <th className="px-2  py-2 text-center font-medium">
                            Created
                          </th>
                          <th className="px-2  py-2 text-center font-medium">
                            Updated
                          </th>
                          <th className="px-2 text-center flex gap-2 py-2   border-gray-200 ">
                            <input
                              className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                              type="checkbox"
                              onClick={() => setModelCheck(!modelCheck)}
                            />
                            <span className="text-blue-500 ">Chức năng</span>
                          </th>
                        </tr>
                      </thead>

                      <tbody className="bg-white">
                        {orders?.length > 0 &&
                          orders
                            .filter((item) => item.status !== 0)
                            .map((items, index) => {
                              return (
                                <tr key={index}>
                                  <td className="px-2 text-center py-2 whitespace-no-wrap border-b border-gray-200">
                                    {checked ? (
                                      <input
                                        type="checkbox"
                                        className="w-4 h-4"
                                        value={items._id}
                                        checked
                                        onChange={(e) => handleChange(e)}
                                      />
                                    ) : (
                                      <input
                                        type="checkbox"
                                        className="w-4 h-4"
                                        value={items._id}
                                        onChange={(e) => handleChange(e)}
                                      />
                                    )}
                                  </td>
                                  <td className="px-2 text-center py-2 whitespace-no-wrap border-b border-gray-200">
                                    <div className="text-sm leading-5 text-gray-900">
                                      {items?.code}
                                    </div>
                                  </td>

                                  <td className="px-2 text-center py-2 whitespace-no-wrap border-b border-gray-200">
                                    <div className="text-sm leading-5 text-gray-900">
                                      {items?.deliveryname}
                                    </div>
                                  </td>

                                  <td className="px-2 text-center py-2 whitespace-no-wrap border-b border-gray-200">
                                    {items.status === 1 && (
                                      <span className="px-2  text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                        {items?.status === 1 &&
                                          "đang chờ xác nhận"}
                                      </span>
                                    )}
                                    {items?.status === 2 && (
                                      <span className="px-2 text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                        {items?.status === 2 &&
                                          "đang giao hàng"}
                                      </span>
                                    )}
                                    {items?.status === 3 && (
                                      <span className="px-2  text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                        {items?.status === 3 &&
                                          "giao thành công"}
                                      </span>
                                    )}
                                  </td>
                                  <td className="px-2 text-center py-2 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-500">
                                    {new Date(
                                      items?.created_at
                                    ).toLocaleDateString()}
                                  </td>
                                  <td className="px-2 text-center py-2 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-500">
                                    {new Date(
                                      items?.updated_at
                                    ).toLocaleDateString()}
                                  </td>
                                  <td className=" relative flex flex-col justify-center items-center  gap-1 text-center py-2 whitespace-no-wrap  border-b border-gray-200 text-sm  font-medium ">
                                    {!modelCheck && (
                                      <button className="text-blue-500 px-4  py-2 menu-list">
                                        <TbLayoutList size={22} />
                                      </button>
                                    )}
                                    {modelCheck && (
                                      <>
                                        <div className="flex gap-4">
                                          <div
                                            className="px-4 py-1 "
                                            onClick={(e) => {
                                              CheckStatusOrder(items);
                                            }}
                                          >
                                            <AiFillCheckCircle
                                              size={25}
                                              color="green"
                                            />
                                          </div>
                                          <div
                                            className=" px-4 py-1 "
                                            onClick={(e) => {
                                              setDataEdit(items);
                                              setModalEdit(true);
                                            }}
                                          >
                                            <MdRemoveRedEye
                                              size={25}
                                              color="blue"
                                            />
                                          </div>
                                        </div>
                                        <div className="flex  gap-4">
                                          <div
                                            className="px-4 py-1 "
                                            onClick={() => {
                                              handleExport(items);
                                            }}
                                          >
                                            <AiFillFileExcel
                                              size={25}
                                              color="green"
                                            />
                                          </div>
                                        </div>
                                      </>
                                    )}
                                  </td>
                                </tr>
                              );
                            })}
                      </tbody>
                    </table>
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
                </div>
              </div>
              <Edit
                modalEdit={modalEdit}
                setModalEdit={setModalEdit}
                dataEdit={dataEdit}
              />
            </div>
            {/* <div>
            <Pagination
              pageCount={pageCount}
              handlePageClick={handlePageClick}
            />
          </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeOrder;
