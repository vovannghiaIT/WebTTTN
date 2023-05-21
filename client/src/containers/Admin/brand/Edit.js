import React, { useEffect, useState } from "react";
import { formatVietnameseToString } from "../../../ultils/Common/formatVietnameseToString";
import * as actions from "../../../store/actions";
import { apiInsertBrands, apiUpdateBrands } from "../../../services";

import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";

import icons from "../../../ultils/icons";

import { toast } from "react-toastify";

const Edit = () => {
  const { GrFormPreviousLink, AiOutlineSave, ImBin } = icons;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const param = useParams();
  const [invalidFields, setInvalidFields] = useState([]);
  const [dataEdit, setDataEdit] = useState([]);
  const { brands } = useSelector((state) => state.brand);

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    dispatch(actions.getBrand());
  };
  useEffect(() => {
    fetchDataProduct();
  }, [brands]);

  const fetchDataProduct = async () => {
    let _id = param?._id;
    let dataProduct = brands?.filter((items) => items?._id === _id);
    setDataEdit(dataProduct[0]);
  };

  // console.log(images);
  const [payload, setPayload] = useState(() => {
    const initData = {
      _id: "",
      name: dataEdit?.name || "",
      slug: dataEdit?.slug || "",
      status: 1,
    };
    return initData;
  });

  useEffect(() => {
    if (dataEdit) {
      setPayload({
        _id: dataEdit?._id || "",
        name: dataEdit?.name || "",
        slug: dataEdit?.slug || "",
        status: dataEdit?.status || 0,
      });
    }
  }, [dataEdit]);

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

  // console.log(param);
  const handlesubmitSave = async () => {
    let slug = formatVietnameseToString(payload?.name);
    payload.slug = slug;

    let invalids = validate(payload);

    payload.status = 1;

    // console.log("invalids", invalids);

    // console.log(payload);
    if (invalids === 0) {
      await apiUpdateBrands(payload);
      fetchData();

      setPayload({
        name: "",
        slug: "",
        status: "",
      });

      toast.success("Cập nhật  thành công", {
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
          <h1 className="text-xl font-semibold">Cập nhật thương hiệu</h1>
          <button
            onClick={() => navigate(-1)}
            className="text-blue-400 flex items-center gap-1 cursor-pointer"
          >
            <GrFormPreviousLink size={15} />
            Trở về danh sách
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

      <div className="bg-white border-t-4 mt-3 rounded-md border-t-blue-300">
        <div className="p-2">
          <h1 className="capitalize text-lg border-b px-4 py-2 ">
            Thông tin thương hiệu
          </h1>
          <div className="p-5 flex flex-col gap-3 justify-center items-center">
            <div className="grid grid-cols-3 gap-2 items-center w-full">
              <p className="text-right col-span-1 font-bold">Tên thương hiệu</p>
              <input
                type="text"
                id="name"
                value={payload.name}
                className="border col-span-2 px-4 py-2 "
                onFocus={() => setInvalidFields([])}
                onChange={(e) =>
                  setPayload((prev) => ({
                    ...prev,
                    ["name"]: e.target.value,
                  }))
                }
              />
            </div>
            {invalidFields.length > 0 &&
              invalidFields.some((i) => i.name === "name") && (
                <small className="text-red-500 italic text-right w-full">
                  {invalidFields.find((i) => i.name === "name")?.message}
                </small>
              )}

            {invalidFields.length > 0 &&
              invalidFields.some((i) => i.name === "value") && (
                <small className="text-red-500 italic text-right w-full">
                  {invalidFields.find((i) => i.name === "value")?.message}
                </small>
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Edit;
