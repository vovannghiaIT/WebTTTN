import React, { useEffect, useRef, useState } from "react";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ItemsImg, NoProduct } from "../../components";
import { v4 } from "uuid";
import data from "../../ultils/Common/data.json";
import { numberWithCommas } from "../../ultils/Common/formatVietnameseToString";
import { path } from "../../ultils/constant";
import icons from "../../ultils/icons";
import * as actions from "../../store/actions";
import emailjs from "@emailjs/browser";
import {
  apiInsertOrderDetails,
  apiInsertOrders,
  apiUpdateUsersOld,
} from "../../services";
import { toast, ToastContainer } from "react-toastify";

const Payment = () => {
  const { FcPrevious } = icons;
  const navigate = useNavigate();

  const date = new Date();
  const dispatch = useDispatch();
  const [isActive, setIsActive] = useState({
    email: "",
    name: "",
    phone: "",
    address: "",
    text: "",
  });
  const { images } = useSelector((state) => state.image);
  const [dataPriceSale, setDataPriceSale] = useState(0);
  const [total, setTotal] = useState();
  const param = useParams();
  // address
  const [dataAddress, setDataAddress] = useState();
  const [dataCity, setDataCity] = useState();
  const [dataDistricts, setDataDistricts] = useState();
  const [IdDistricts, setIdDistricts] = useState();
  const [idWard, setIdWard] = useState();
  const [dataWards, setDataWards] = useState();
  // cart
  const [cookies, setCookie] = useCookies(["Cart"]);
  const [dataCart, setDataCart] = useState();
  //validate
  const [invalidFields, setInvalidFields] = useState([]);
  // add pay
  const { currentData } = useSelector((state) => state.user);
  const [email, setEmail] = useState({
    to_name: currentData?.firstName + currentData?.lastName,
    user_email: currentData?.email || "",
    message: "Bạn đã đặt hàng thành công!",
  });
  const [payloadDetail, setpayloadDetail] = useState({
    name: "",
    orderId: "",
    productId: 0,
    price: "",
    imagesId: "",
    quantity: "",
    amount: 0,
    status: 1,
  });
  const [payloadOrder, setPayloadOrder] = useState({
    _id: "",
    code: "",
    userId: currentData?._id || "",
    exportdate: "",
    deliveryaddress: "",
    deliveryname: currentData?.firstName + currentData?.lastName,
    deliveryphone: currentData?.phone,
    deliveryemail: currentData?.email || "",
    value: "",
    sumtotal: 0,
    status: 1,
  });

  useEffect(() => {
    setEmail({
      to_name: currentData?.firstName + currentData?.lastName,
      user_email: currentData?.email || "",
      message: "Bạn đã đặt hàng thành công!",
    });
    setPayloadOrder({
      _id: "",
      code: "",
      userId: currentData?._id || "",
      exportdate: "",
      deliveryaddress: "",
      deliveryname: currentData?.firstName + currentData?.lastName || "",
      deliveryphone: currentData?.phone || "",
      deliveryemail: currentData?.email || "",
      value: "không",
      sumtotal: 0,
      status: 1,
    });
  }, [currentData]);
  //user

  useEffect(() => {
    fetchCurrent();
  }, []);

  const fetchCurrent = async () => {
    dispatch(actions.getCurrent());
    dispatch(actions.getImages());
  };

  //Cart
  useEffect(() => {
    fetchData();
    totalCart();
  }, [dataCart]);
  const fetchData = () => {
    setDataCart(cookies?.Cart);
  };
  //end cart
  useEffect(() => {
    fectDataAddress();
  }, []);

  useEffect(() => {
    fectDataDistrict();
  }, [dataCity]);
  useEffect(() => {
    fectDataWard();
  }, [IdDistricts]);

  const fectDataAddress = async () => {
    await setDataAddress(data);
  };

  const fectDataDistrict = async () => {
    let idCity = dataCity;
    let dataDistrict = data?.filter((item) => item?.Name === idCity);
    await setDataDistricts(dataDistrict[0]?.Districts);
  };

  const fectDataWard = async () => {
    if (IdDistricts) {
      let idWard = IdDistricts;
      let dataDistrict = dataDistricts?.filter((item) => item?.Name === idWard);

      await setDataWards(dataDistrict[0]?.Wards);
    }
  };

  const setDefaultvalue = (e) => {
    setDataCity(e.target.value);
    if (e.target.value === "DEFAULT") {
      setDataWards();
    }
  };

  let price = param?.price;

  const totalCart = () => {
    setDataPriceSale(parseInt(price.slice(6)));
    let sum = 0;
    dataCart?.length > 0 &&
      dataCart?.map((item) => {
        return (sum += item.price * item.number);
      });
    console.log("sum", sum);
    if (sum < dataPriceSale) {
      setTotal(0);
    } else {
      setTotal(parseInt(sum - dataPriceSale));
    }
  };

  const submitPay = async () => {
    let addressvalue = dataCity + "," + IdDistricts + "," + idWard;

    payloadOrder._id = v4();

    payloadOrder.deliveryaddress = addressvalue;

    // console.log(dataCart);
    payloadOrder.exportdate = date.toLocaleDateString();
    let code = date.toISOString().replace(/[^0-9]/g, "");
    payloadOrder.code = code;
    let invalidsOrder = validate(payloadOrder);

    // console.log(dataCart);
    //-------------

    //------------

    if (dataCart === "" || !dataCart) {
      toast.warning("Bạn chưa có sản phẩm", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    }
    if (invalidsOrder !== 0 || !dataCity || !IdDistricts || !idWard) {
      toast.info("vui lòng điền đủ thông tin", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    }
    if (invalidsOrder === 0 && dataCart && dataCity && IdDistricts && idWard) {
      payloadOrder.sumtotal = total;
      await apiInsertOrders(payloadOrder);
      for (let i = 0; i < dataCart.length; i++) {
        payloadDetail.name = dataCart[i]?.name;
        payloadDetail.price = dataCart[i]?.price;
        payloadDetail.quantity = dataCart[i]?.number;
        payloadDetail.imagesId = dataCart[i]?.images[0]?.code;
        payloadDetail.orderId = payloadOrder?.code;
        // console.log("payloadDetail", payloadDetail);
        await apiInsertOrderDetails(payloadDetail);
      }
      let avatar = currentData?.avatar;
      let orders = currentData?.orders ? currentData?.orders + 1 : 1;
      // console.log("currentData", currentData);
      // console.log("orders", orders);
      // console.log("avatar", avatar);
      await apiUpdateUsersOld({
        ...currentData,
        avatar: avatar,
        orders: orders,
      });
      sendEmail();
      toast.success("Đặt hàng thành công", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });

      setTimeout(function () {
        navigate(path.HOME);
      }, 2100);
      setCookie("Cart", "", { path: "/" });
    }
  };

  const sendEmail = () => {
    emailjs
      .send("service_dexav2e", "template_lfjpcan", email, "bYxPdUGcB7fHNoKok")
      .then(
        function (response) {
          console.log("SUCCESS!", response.status, response.text);
        },
        function (error) {
          console.log("FAILED...", error);
        }
      );
  };

  const validate = (payload) => {
    let invalids = 0;
    let fields = Object.entries(payload);
    fields.forEach((item) => {
      if (item[1] === "") {
        setInvalidFields((prev) => [
          ...prev,
          {
            name: item[0],
            message: "Bạn không được bỏ trống trường này.",
          },
        ]);
        invalids++;
      }
    });

    return invalids;
  };
  const indexs = [0];
  return (
    <div className="w-full">
      <div className="w-[90%] sm:max-md:w-full mx-auto flex sm:max-md:flex-col gap-2 ">
        <div className="w-[70%] sm:max-md:w-full flex flex-col gap-2 p-4 sm:max-md:p-2">
          <div className="flex gap-2 text-[13px] text-blue-400 capitalize">
            Giỏ hàng / Thanh toán
          </div>
          <div className="font-semibold ">Thông tin nhận hàng</div>
          <div className="flex flex-col gap-4 p-2 sm:max-md:w-full">
            <div className=" input-effect relative mb-3 ">
              {/* <form onSubmit={sendEmail}>
                <input
                  type="hidden"
                  name="user_name"
                  value={email?.user_name}
                />

                <input
                  type="hidden"
                  name="user_email"
                  value={email?.user_email}
                />

                <input type="hidden" name="subject" value={"xin chào"} />

                <input
                  type="hidden"
                  name="message"
                  value={"Bạn đã đặt hàng thành công"}
                />
                <input type="submit" value="Send" />
              </form> */}
              <input
                id="email"
                className={`effect-16 w-full ${
                  isActive.email ? "has-content " : ""
                }  ${payloadOrder.deliveryemail ? "has-content" : ""}`}
                type="text"
                placeholder=""
                value={payloadOrder.deliveryemail}
                onBlur={(e) => {
                  setIsActive((prev) => ({
                    ...prev,
                    ["email"]: e.target.value,
                  }));
                }}
                onChange={(e) => {
                  setEmail((prev) => ({
                    ...prev,
                    [" user_email"]: e.target.value,
                  }));
                  setPayloadOrder((prev) => ({
                    ...prev,
                    ["deliveryemail"]: e.target.value,
                  }));
                }}
                onFocus={() => setInvalidFields([])}
              />

              {invalidFields.length > 0 &&
                invalidFields.some((i) => i.name === "deliveryemail") && (
                  <small className="text-red-500 italic ">
                    {
                      invalidFields.find((i) => i.name === "deliveryemail")
                        ?.message
                    }
                  </small>
                )}
              <br />
              <label>Email</label>

              <span className="focus-border"></span>
            </div>

            <div className=" input-effect relative mb-3">
              <input
                id="name"
                className={`effect-16 w-full ${
                  isActive.name ? "has-content" : ""
                } 
                ${payloadOrder.deliveryname ? "has-content" : ""}`}
                type="text"
                placeholder=""
                value={payloadOrder.deliveryname}
                onBlur={(e) => {
                  setIsActive((prev) => ({
                    ...prev,
                    ["name"]: e.target.value,
                  }));
                }}
                onChange={(e) => {
                  setEmail((prev) => ({
                    ...prev,
                    [" user_name"]: e.target.value,
                  }));
                  setPayloadOrder((prev) => ({
                    ...prev,
                    ["deliveryname"]: e.target.value,
                  }));
                }}
                onFocus={() => setInvalidFields([])}
              />
              {invalidFields.length > 0 &&
                invalidFields.some((i) => i.name === "deliveryname") && (
                  <small className="text-red-500 italic ">
                    {
                      invalidFields.find((i) => i.name === "deliveryname")
                        ?.message
                    }
                  </small>
                )}
              <br />
              <label>Họ và tên</label>
              <span className="focus-border"></span>
            </div>
            <div className=" input-effect relative mb-3">
              <input
                id="phone"
                className={`effect-16 w-full ${
                  isActive.phone ? "has-content" : ""
                } ${payloadOrder.deliveryphone ? "has-content" : ""} `}
                type="text"
                placeholder=""
                value={payloadOrder.deliveryphone}
                onBlur={(e) => {
                  setIsActive((prev) => ({
                    ...prev,
                    ["phone"]: e.target.value,
                  }));
                }}
                onChange={(e) =>
                  setPayloadOrder((prev) => ({
                    ...prev,
                    ["deliveryphone"]: e.target.value,
                  }))
                }
                onFocus={() => setInvalidFields([])}
              />
              {invalidFields.length > 0 &&
                invalidFields.some((i) => i.name === "deliveryphone") && (
                  <small className="text-red-500 italic ">
                    {
                      invalidFields.find((i) => i.name === "deliveryphone")
                        ?.message
                    }
                  </small>
                )}

              <br />
              <label>Số điện thoại</label>
              <span className="focus-border"></span>
            </div>
            <div className=" input-effect relative">
              <input
                id="deliveryaddress"
                className={`effect-16  has-content w-full`}
                type="text"
                placeholder=""
                value={
                  (dataCity ? dataCity : "") +
                  (dataCity && IdDistricts ? "," : "") +
                  (IdDistricts ? IdDistricts : " ") +
                  (IdDistricts && idWard ? "," : "") +
                  (idWard ? idWard : "")
                }
                disabled
              />

              <label>Địa chỉ(tùy chọn)</label>
              <span className="focus-border"></span>
            </div>
            <div className=" flex gap-2 justify-between mt-4">
              <div className="w-[33%] relative">
                <select
                  defaultValue={"DEFAULT"}
                  onChange={(e) => setDefaultvalue(e)}
                >
                  <option value="DEFAULT" disabled>
                    ---
                  </option>
                  {dataAddress?.length > 0 &&
                    dataAddress.map((items) => {
                      return (
                        <option key={items.Id} value={items.Name}>
                          {items.Name}
                        </option>
                      );
                    })}
                </select>
                <label className="text-[12px] absolute top-[1px] left-2">
                  Tỉnh thành
                </label>
                {!dataCity && (
                  <small className="text-red-500 italic ">
                    Bạn không được bỏ trống trường này.
                  </small>
                )}
              </div>
              <div className="w-[33%] relative">
                <select
                  defaultValue={"DEFAULT"}
                  className={`${dataDistricts ? "" : "bg-gray-200  "}`}
                  onChange={(e) => setIdDistricts(e.target.value)}
                  disabled={!dataDistricts}
                >
                  <option value="DEFAULT" disabled>
                    ---
                  </option>
                  {dataDistricts?.length > 0 &&
                    dataDistricts.map((items) => {
                      return (
                        <option key={items.Id} value={items.Name}>
                          {items.Name}
                        </option>
                      );
                    })}
                </select>
                <label className="text-[12px] absolute top-[1px] left-2">
                  Quận huyện(tùy chọn)
                </label>
                {!IdDistricts && (
                  <small className="text-red-500 italic ">
                    Bạn không được bỏ trống trường này.
                  </small>
                )}
              </div>
              <div className="w-[33%] relative">
                <select
                  defaultValue={"DEFAULT"}
                  className={`${dataWards ? "" : "bg-gray-200"}`}
                  onChange={(e) => setIdWard(e.target.value)}
                  disabled={!dataWards}
                >
                  <option value="DEFAULT" disabled>
                    ---
                  </option>
                  {dataWards?.length > 0 &&
                    dataWards.map((items) => {
                      return (
                        <option key={items.Id} value={items.Name}>
                          {items.Name}
                        </option>
                      );
                    })}
                </select>
                <label className="text-[12px] absolute top-[1px] left-2">
                  Phường xã(tùy chọn)
                </label>
                {!idWard && (
                  <small className="text-red-500 italic ">
                    Bạn không được bỏ trống trường này.
                  </small>
                )}
                <br />
              </div>
            </div>

            <div className="input-effect relative">
              <textarea
                rows="3"
                cols="50"
                value={payloadOrder.value}
                className={`effect-16 has-content `}
                onBlur={(e) => {
                  setIsActive((prev) => ({
                    ...prev,
                    ["text"]: e.target.value,
                  }));
                }}
                onChange={(e) =>
                  setPayloadOrder((prev) => ({
                    ...prev,
                    ["value"]: e.target.value,
                  }))
                }
              ></textarea>
              <label>Ghi chú đặt hàng</label>
            </div>
            <div className="flex gap-4 justify-between items-center">
              <button
                onClick={() => navigate(-1)}
                className="text-right   text-blue-400 flex gap-1 justify-center items-center"
              >
                <span>
                  <FcPrevious size={15} color="red" />
                </span>
                <span> Giỏ hàng</span>
              </button>
              <button
                onClick={() => submitPay()}
                className="text-right py-2 px-4 border border-gray-500 rounded-lg hover:border-red-500 hover:text-red-500"
              >
                Đặt hàng
              </button>
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
        <div className="w-[30%] sm:max-md:w-full ">
          <div className="p-5 border-b-2 w-full md:max-lg:text-[13px] text-center font-semibold text-[20px]">
            Đơn hàng ({cookies?.Cart?.length > 0 ? cookies?.Cart?.length : 0}
            sản phẩm)
          </div>
          <div className="p-2 border-b-2 w-full md:max-lg:p-1">
            {dataCart?.length > 0 ? (
              <>
                {dataCart?.map((items, index) => {
                  return (
                    <div
                      className="px-5 py-1 flex gap-2  justify-between items-center"
                      key={index}
                    >
                      <div className="flex gap-5 justify-start items-center">
                        <div className="w-10">
                          {images?.length > 0 &&
                            images
                              .filter(
                                (item) =>
                                  item?.status === 1 &&
                                  item?.code === items?.images[0]?.code
                              )
                              .map((itemsImg, index) => {
                                return (
                                  <div
                                    key={index}
                                    className="w-1/2  overflow-hidden"
                                  >
                                    <ItemsImg images={itemsImg?.picture} />
                                  </div>
                                );
                              })}
                        </div>
                        <div className="capitalize">{items?.name}</div>
                      </div>
                      <div className="text-right">{items?.price}</div>
                    </div>
                  );
                })}
              </>
            ) : (
              <NoProduct />
            )}
          </div>
          <div className="flex justify-between items-center mt-2 px-2">
            <span> Tổng cộng</span>
            <span className="text-blue-500">
              {total && numberWithCommas(total)} đ
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
