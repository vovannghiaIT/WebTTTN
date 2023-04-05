import React, { useEffect, useState } from "react";

import { formatVietnameseToString } from "../../../ultils/Common/formatVietnameseToString";
import * as actions from "../../../store/actions";
import { apiInsertBrands } from "../../../services";

import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import icons from "../../../ultils/icons";

import { toast } from "react-toastify";
const Insert = () => {
  const { GrFormPreviousLink, AiOutlineSave, ImBin } = icons;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [invalidFields, setInvalidFields] = useState([]);

  const { brands } = useSelector((state) => state.brand);

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    dispatch(actions.getBrand());
  };

  // console.log(images);
  const [payload, setPayload] = useState({
    name: "",
    slug: "",
    status: 1,
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
    let slug = formatVietnameseToString(payload?.name);
    payload.slug = slug;

    let invalids = validate(payload);

    payload.status = 1;

    // console.log("invalids", invalids);

    // console.log(payload);
    if (invalids === 0) {
      await apiInsertBrands(payload);
      fetchData();

      setPayload({
        name: "",
        slug: "",
        status: "",
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
          <h1 className="text-xl font-semibold">Add a new brand</h1>
          <button
            onClick={() => navigate(-1)}
            className="text-blue-400 flex items-center gap-1 cursor-pointer"
          >
            <GrFormPreviousLink size={15} />
            back to brand list
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
          <h1 className="capitalize text-lg border-b px-4 py-2 ">Brand Info</h1>
          <div className="p-5 flex flex-col gap-3 justify-center items-center">
            <div className="grid grid-cols-3 gap-2 items-center w-full">
              <p className="text-right col-span-1 font-bold">Name</p>
              <input
                type="text"
                id="name"
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

export default Insert;
