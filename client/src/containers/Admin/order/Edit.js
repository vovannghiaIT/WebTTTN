import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ItemsImg } from "../../../components";
import * as actions from "../../../store/actions";
import { numberWithCommas } from "../../../ultils/Common/formatVietnameseToString";

const Edit = ({ dataEdit, setModalEdit, modalEdit }) => {
  const dispatch = useDispatch();

  const { orderdetails } = useSelector((state) => state.orderdetail);
  const { images } = useSelector((state) => state.image);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    dispatch(actions.getOrderDetail());
    dispatch(actions.getImages());
  };

  console.log(orderdetails);
  let dataDetail = orderdetails?.filter(
    (items) => items?.orderId === dataEdit?.code
  );

  return (
    <div>
      {modalEdit && (
        <div
          className="fixed z-10  top-[15%] bottom-0 w-full left-0  "
          onClick={(e) => {
            e.stopPropagation();
            setModalEdit(false);
          }}
        >
          <div className="flex items-center justify-center  pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity ">
              <div className="fixed inset-0 bg-gray-900 opacity-75" />
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen">
              &#8203;
            </span>
            <div
              className="mt-[2%] inline-block align-center bg-white rounded-lg text-left  shadow-xl transform transition-all w-[70%]"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <div className="bg-white flex gap-5  px-4 pt-5">
                <div className="w-[50%]">
                  <div className="font-semibold text-[20px] py-2">
                    Thông tin khách hàng :
                    <span className="text-blue-500 px-2">
                      {dataEdit?.deliveryname}
                    </span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <p>
                      Mã đơn hàng:
                      <span className="text-blue-500 px-2">
                        {dataEdit?.code}
                      </span>
                    </p>
                    <p>
                      Email:
                      <span className="text-blue-500 px-2">
                        {dataEdit?.deliveryemail}
                      </span>
                    </p>
                    <p>
                      Số điện thoại:
                      <span className="text-blue-500 px-2">
                        {dataEdit?.deliveryphone}
                      </span>
                    </p>
                    <p>
                      Địa chỉ:
                      <span className="text-blue-500 px-2">
                        {dataEdit?.deliveryaddress}
                      </span>
                    </p>
                    <p>
                      Ngày đặt hàng:
                      <span className="text-blue-500 px-2">
                        {dataEdit?.exportdate}
                      </span>
                    </p>
                    <p>
                      Ghi chú
                      <span className="text-blue-500 px-2">
                        {dataEdit?.value}
                      </span>
                    </p>
                    <p>
                      Tổng tiền
                      <span className="text-blue-500 px-2">
                        {numberWithCommas(dataEdit?.sumtotal)} <sup>đ</sup>
                      </span>
                    </p>
                  </div>
                </div>
                <div className="w-[50%] overflow-y-auto h-[250px]">
                  <h1 className="font-semibold text-center">
                    Thông tin đơn hàng
                  </h1>
                  <table>
                    <thead>
                      <tr>
                        <th className="px-2 py-1 text-start">Tên sản phẩm</th>
                        <th className="px-2 py-1 text-start w-[100px]">
                          Hình ảnh
                        </th>
                        <th className="px-2 py-1 text-start">Số lượng</th>
                        <th className="px-2 py-1 text-start">Giá</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dataDetail?.length > 0 &&
                        dataDetail?.map((items, index) => {
                          return (
                            <tr key={index}>
                              <td className="px-2 py-1 text-start">
                                {items?.name}
                              </td>
                              <td className="px-4 py-1 text-start ">
                                {images?.length > 0 &&
                                  images
                                    .filter(
                                      (item) =>
                                        item?.status === 1 &&
                                        item?.code === items?.imagesId
                                    )
                                    .map((itemsImg, index) => {
                                      return (
                                        <div key={index}>
                                          <ItemsImg
                                            images={itemsImg?.picture}
                                          />
                                        </div>
                                      );
                                    })}
                              </td>
                              <td className="px-2 py-1 text-start">
                                {items?.quantity}
                              </td>
                              <td className="px-2 py-1 text-start">
                                {numberWithCommas(items?.price)} <sup>đ</sup>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="bg-gray-200 px-4 py-3 text-right">
                <button
                  type="button"
                  className="py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-700 mr-2"
                  onClick={() => setModalEdit(false)}
                >
                  <i className="fas fa-times"></i> Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Edit;
