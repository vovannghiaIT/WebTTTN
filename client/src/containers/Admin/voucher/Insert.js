import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import ItemsImg from "../../../components/ItemsImg";
import {
  apiInsertCategories,
  apiInsertImages,
  apiInsertVouchers,
  apiUploadImages,
} from "../../../services";
import { formatVietnameseToString } from "../../../ultils/Common/formatVietnameseToString";
import icons from "../../../ultils/icons";
import * as actions from "../../../store/actions";
import { v4 } from "uuid";
import Toast from "../../../components/Toast";

import { toast } from "react-toastify";

const Insert = () => {
  const { GrFormPreviousLink, AiOutlineSave, ImBin } = icons;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [imagesPreview, setImagesPreview] = useState([]);
  const [invalidFields, setInvalidFields] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tytoast, setTyToast] = useState(false);

  const { vouchers } = useSelector((state) => state.voucher);

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    dispatch(actions.getVoucher());
  };

  // console.log(images);
  const [payload, setPayload] = useState({
    code: "",
    date_start: "",
    date_end: "",
    price: 0,
  });

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

  const handlesubmitSave = async () => {
    let invalids = validate(payload);

    if (invalids === 0) {
      await apiInsertVouchers(payload);
      fetchData();
      setImagesPreview([]);
      setPayload({
        code: "",
        date_start: "",
        date_end: "",
        price: 0,
      });

      toast.success("Thêm  thành công", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setTimeout(function () {
        navigate(-1);
      }, 1100);
    }
  };
  return (
    <div className="p-4 ">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4 ">
          <h1 className="text-xl font-semibold">Add a new voucher</h1>
          <button
            onClick={() => navigate(-1)}
            className="text-blue-400 flex items-center gap-1 cursor-pointer"
          >
            <GrFormPreviousLink size={15} />
            back to voucher list
          </button>
        </div>
        <div className="flex gap-2 items-center">
          <button
            className="text-white px-4 py-2 bg-blue-500 rounded-md flex items-center gap-1"
            onClick={() => handlesubmitSave()}
          >
            <AiOutlineSave size={20} />
            Save
          </button>
          {/* <button className="text-white px-4 py-2 bg-blue-500 rounded-md flex items-center gap-1">
    <AiOutlineSave size={20} />
    Save and Continue Edit
  </button> */}
        </div>
      </div>
      {tytoast && <Toast warn text={"Sản phẩm chưa có hình ảnh"} />}
      <div className="bg-white border-t-4 mt-3 rounded-md border-t-blue-300">
        <div className="p-2">
          <h1 className="capitalize text-lg border-b px-4 py-2 ">
            Voucher Info
          </h1>
          <div className="p-5 flex flex-col gap-3 justify-center items-center">
            <div className="grid grid-cols-3 gap-2 items-center w-full">
              <p className="text-right col-span-1 font-bold">Mã</p>
              <input
                type="text"
                id="code"
                className="border col-span-2 px-4 py-2 "
                onFocus={() => setInvalidFields([])}
                onChange={(e) =>
                  setPayload((prev) => ({
                    ...prev,
                    ["code"]: e.target.value,
                  }))
                }
              />
            </div>
            {invalidFields.length > 0 &&
              invalidFields.some((i) => i.code === "code") && (
                <small className="text-red-500 italic text-right w-full">
                  {invalidFields.find((i) => i.code === "code")?.message}
                </small>
              )}
            <div className="grid grid-cols-3 gap-2 items-center w-full">
              <p className="text-right col-span-1 font-bold">Ngày bắt đầu</p>
              <input
                type="date"
                id="code"
                className="border col-span-2 px-4 py-2 "
                onFocus={() => setInvalidFields([])}
                data-date-format="DD MMMM YYYY"
                onChange={(e) =>
                  setPayload((prev) => ({
                    ...prev,
                    ["date_start"]: e.target.value,
                  }))
                }
              />
            </div>
            {invalidFields.length > 0 &&
              invalidFields.some((i) => i.code === "code") && (
                <small className="text-red-500 italic text-right w-full">
                  {invalidFields.find((i) => i.code === "code")?.message}
                </small>
              )}
            <div className="grid grid-cols-3 gap-2 items-center w-full">
              <p className="text-right col-span-1 font-bold">Ngày kết thúc</p>
              <input
                type="date"
                id="code"
                className="border col-span-2 px-4 py-2 "
                onFocus={() => setInvalidFields([])}
                onChange={(e) =>
                  setPayload((prev) => ({
                    ...prev,
                    ["date_end"]: e.target.value,
                  }))
                }
              />
            </div>
            {invalidFields.length > 0 &&
              invalidFields.some((i) => i.code === "code") && (
                <small className="text-red-500 italic text-right w-full">
                  {invalidFields.find((i) => i.code === "code")?.message}
                </small>
              )}

            <div className="grid  grid-cols-3 gap-2 items-center w-full   max-h-[230px] overflow-auto"></div>
          </div>

          <div className="grid grid-cols-3 gap-2 items-center w-full mt-2">
            <p className="text-right col-span-1 font-bold ">Price</p>
            <p className="text-left">
              <input
                type="number"
                className="border col-span-2 mx-2 py-1 "
                onFocus={() => setInvalidFields([])}
                onChange={(e) =>
                  setPayload((prev) => ({
                    ...prev,
                    ["price"]: e.target.value,
                  }))
                }
              />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Insert;
