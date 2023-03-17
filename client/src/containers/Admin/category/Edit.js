import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import ItemsImg from "../../../components/ItemsImg";
import {
  apiInsertCategories,
  apiInsertImages,
  apiUpdateCategories,
  apiUpdateImages,
  apiUploadImages,
} from "../../../services";
import { formatVietnameseToString } from "../../../ultils/Common/formatVietnameseToString";
import icons from "../../../ultils/icons";
import * as actions from "../../../store/actions";
import { v4 } from "uuid";
import Toast from "../../../components/Toast";

//CKEditor
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Loading } from "../../../components";
import { toast } from "react-toastify";

const Edit = () => {
  const { GrFormPreviousLink, AiOutlineSave, ImBin } = icons;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const param = useParams();

  const [imagesPreview, setImagesPreview] = useState([]);
  const [invalidFields, setInvalidFields] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tytoast, setTyToast] = useState(false);
  const [dataEdit, setDataEdit] = useState([]);
  const [addPant_IdCategory, setaddPant_IdCategory] = useState();
  const [dataDescription, setDataDescription] = useState();
  const { categories } = useSelector((state) => state.category);
  const { images } = useSelector((state) => state.image);

  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    fetchDataProduct();
  }, [categories]);

  const fetchDataProduct = async () => {
    let _id = param?._id;
    let dataProduct = categories?.filter((items) => items?._id === _id);
    setDataEdit(dataProduct[0]);
  };
  const fetchData = async () => {
    dispatch(actions.getCategories());
    dispatch(actions.getImages());
  };

  // console.log(images);
  const [payload, setPayload] = useState(() => {
    const initData = {
      name: dataEdit?.name || "",
      slug: dataEdit?.slug || "",
      imagesId: dataEdit?.imagesId || "",
      parent_id: dataEdit?.parent_id || "",
      displayorder: dataEdit?.displayorder || "",
      value: dataEdit?.value || "",
      status: 0,
    };
    return initData;
  });

  useEffect(() => {
    if (dataEdit) {
      setPayload({
        _id: dataEdit?._id || "",
        name: dataEdit?.name || "",
        slug: dataEdit?.slug || "",
        imagesId: dataEdit?.imagesId || "",
        parent_id: dataEdit?.parent_id || "",
        displayorder: dataEdit?.displayorder || "",
        value: dataEdit?.value || "",
        status: dataEdit?.status || 0,
      });
      setaddPant_IdCategory(dataEdit?.parent_id || "");

      let img = images.filter((items) => items?.code === dataEdit?.imagesId);

      // console.log(img[0]?);
      setImagesPreview(img[0]?.picture);
    }
  }, [dataEdit]);

  const [payloadImage, setPayloadImage] = useState({
    _id: "",
    code: "",
    picture: "",
    displayorder: "",
    alt: "",
    title: "",
    status: 1,
  });

  const handleAddCategory = (e) => {
    setaddPant_IdCategory(e.target.value);
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

  const handleFile = async (e) => {
    e.stopPropagation();
    setLoading(true);
    const files = e.target.files;
    //biến imhg chứa link ảnh
    let images = [];
    const formData = new FormData();
    for (let i of files) {
      formData.append("file", i);
      formData.append(
        "upload_preset",
        process.env.REACT_APP_UPLOAD_ASSETS_NAME
      );

      // console.log(formData);
      const response = await apiUploadImages(formData);

      if (response.status === 200) {
        images = [...images, response.data?.secure_url];
      }

      setImagesPreview(images);

      setLoading(false);
    }
  };

  const handleDeleteImage = (image) => {
    setImagesPreview((prev) => prev?.filter((item) => item !== image));
    setPayload((prev) => ({
      ...prev,
      images: prev.images?.filter((item) => item !== image),
    }));
    toast.success("Xóa ảnh thành công", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const handlesubmitSave = async () => {
    let slug = formatVietnameseToString(payload?.name);
    payload.slug = slug;

    let parent_id = addPant_IdCategory || "";
    payload.parent_id = parent_id;

    let fulldescription = dataDescription ? dataDescription : "";
    payload.value = fulldescription;

    // img
    let img = images?.filter((items) => items?.code === dataEdit?.imagesId);

    let idImages = img[0]?._id || "";
    payloadImage._id = idImages;
    let codeImages = img[0]?.code || "";
    payloadImage.code = codeImages;

    let picture = imagesPreview || 0;
    payloadImage.picture = picture;

    let invalids = validate(payload);

    if (imagesPreview?.length === 0 || !imagesPreview) {
      setTyToast(true);
    }

    console.log(payloadImage);
    if (invalids === 0 && imagesPreview?.length !== 0 && imagesPreview) {
      await apiUpdateCategories(payload);

      await apiUpdateImages(payloadImage);

      toast.success("cập nhật  thành công", {
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
        fetchData();
        setImagesPreview([]);
      }, 1100);
    }
  };

  return (
    <div className="p-4 ">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4 ">
          <h1 className="text-xl font-semibold">Edit a new category</h1>
          <button
            onClick={() => navigate(-1)}
            className="text-blue-400 flex items-center gap-1 cursor-pointer"
          >
            <GrFormPreviousLink size={15} />
            back to category list
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
            Category Info
          </h1>
          <div className="p-5 flex flex-col gap-3 justify-center items-center">
            <div className="grid grid-cols-3 gap-2 items-center w-full">
              <p className="text-right col-span-1 font-bold">Name</p>
              <input
                type="text"
                id="name"
                className="border col-span-2 px-4 py-2 "
                onFocus={() => setInvalidFields([])}
                value={payload.name}
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

            <div className="grid  grid-cols-3 gap-2 items-center w-full   max-h-[230px] overflow-auto">
              <p className="text-right col-span-1 font-bold">Description</p>
              <span className="col-span-2">
                <CKEditor
                  editor={ClassicEditor}
                  data={payload?.value}
                  //data={payload?.description}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    setDataDescription(data);
                  }}
                />
              </span>
            </div>
            {invalidFields.length > 0 &&
              invalidFields.some((i) => i.name === "value") && (
                <small className="text-red-500 italic text-right w-full">
                  {invalidFields.find((i) => i.name === "value")?.message}
                </small>
              )}
            <div className="grid grid-cols-3 gap-2 items-center w-full">
              <p className="text-right col-span-1 font-bold">Parent</p>
              <select
                defaultValue={dataEdit?.parent_id}
                onChange={(e) => handleAddCategory(e)}
                className="cursor-pointer px-2 capitalize"
              >
                <option value="DEFAULT" disabled>
                  Chọn danh mục sản phẩm...
                </option>
                <option value={1}>Không có cấp cha</option>
                {categories?.length > 0 &&
                  categories
                    .filter((item) => item.status === 1)
                    .map((items, index) => {
                      return (
                        <option key={index} value={items._id}>
                          {items.name}
                        </option>
                      );
                    })}
              </select>
            </div>
            {invalidFields.length > 0 &&
              invalidFields.some((i) => i.name === "parent_id") && (
                <small className="text-red-500 italic text-right w-full">
                  {invalidFields.find((i) => i.name === "parent_id")?.message}
                </small>
              )}
          </div>
        </div>
      </div>
      <div className="bg-white border-t-4 mt-3 rounded-md border-t-blue-300">
        <div className="p-2">
          <h1 className="capitalize text-lg border-b px-4 py-2 ">Display</h1>
          <div className="grid grid-cols-3 gap-2 items-center w-full mt-2">
            <p className="text-right col-span-1 font-bold">Display order</p>
            <input
              className="border col-span-2 px-4 py-2  "
              onFocus={() => setInvalidFields([])}
              value={payload.displayorder}
              onChange={(e) =>
                setPayload((prev) => ({
                  ...prev,
                  ["displayorder"]: e.target.value,
                }))
              }
            />
          </div>
          {invalidFields.length > 0 &&
            invalidFields.some((i) => i.name === "displayorder") && (
              <small className="text-red-500 italic text-right w-full block">
                {invalidFields.find((i) => i.name === "displayorder")?.message}
              </small>
            )}
          <div className="grid grid-cols-3 gap-2 items-center w-full mt-2">
            <p className="text-right col-span-1 font-bold">Status</p>
            <p className="text-left">
              {payload?.status === 1 ? (
                <input
                  type="checkbox"
                  className=" col-span-2 w-4 h-4 "
                  onFocus={() => setInvalidFields([])}
                  checked
                  onChange={(e) =>
                    setPayload((prev) => ({
                      ...prev,
                      ["status"]: e.target.checked ? 1 : 0,
                    }))
                  }
                />
              ) : (
                <input
                  type="checkbox"
                  className=" col-span-2 w-4 h-4 "
                  onFocus={() => setInvalidFields([])}
                  onChange={(e) =>
                    setPayload((prev) => ({
                      ...prev,
                      ["status"]: e.target.checked ? 1 : 0,
                    }))
                  }
                />
              )}
            </p>
          </div>
        </div>
      </div>
      <div className="bg-white border-t-4 mt-3 rounded-md border-t-blue-300">
        <div className="p-2">
          <h1 className="capitalize text-lg border-b px-4 py-2 ">Picture</h1>
          <div className="p-5 flex flex-col gap-3 justify-center items-center">
            <span className="border w-full  border-gray-300 text-center capitalize px-4 py-2">
              Picture
            </span>

            <div className="mt-2  grid grid-cols-5 overflow-y-auto">
              {imagesPreview?.map((item, index) => {
                return (
                  <div key={item} className="relative   ">
                    <img
                      src={item}
                      alt="preview"
                      className="w-40 h-40 object-cover rounded-md"
                    />
                    <span
                      title="Xóa"
                      onClick={() => handleDeleteImage(item)}
                      className="absolute top-0 right-0 p-4 cursor-pointer bg-gray-300 hover:bg-gray-400 rounded-full"
                    >
                      <ImBin />
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="flex w-full items-center justify-end p-3  ">
          {loading ? (
            <p>loading...</p>
          ) : (
            <label className=" flex flex-col items-center  bg-white mb-2 text-blue rounded-lg shadow-lg tracking-wide  border border-blue-500 cursor-pointer hover:bg-blue-500 hover:text-white">
              <span className="px-4 py-2 text-base leading-normal capitalize">
                Upload File
              </span>
              <input
                type="file"
                className="hidden"
                onChange={handleFile}
                multiple
              />
            </label>
          )}
        </div>
      </div>
    </div>
  );
};

export default Edit;
