import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Toast from "../../../components/Toast";
import icons from "../../../ultils/icons";
import * as actions from "../../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import {
  apiUpdateImages,
  apiUpdateProducts,
  apiUploadImages,
} from "../../../services";

//CKEditor
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Loading } from "../../../components";
import { formatVietnameseToString } from "../../../ultils/Common/formatVietnameseToString";
import { toast } from "react-toastify";

const Edit = () => {
  const [loading, setLoading] = useState(false);
  const [tytoast, setTyToast] = useState(false);
  const [invalidFields, setInvalidFields] = useState(false);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [addsale, setAddsale] = useState(0);
  const [dataEdit, setDataEdit] = useState([]);
  const [check, setCheck] = useState(false);

  // console.log(check);

  const [addCategory, setAddCategory] = useState([]);
  const [addBrand, setAddBrand] = useState([]);
  const [addOpera, setAddOpera] = useState([]);
  const [dataDescription, setDataDescription] = useState();

  const navigate = useNavigate();
  const param = useParams();
  const dispatch = useDispatch();
  const { GrFormPreviousLink, AiOutlineSave, ImBin } = icons;

  const { products } = useSelector((state) => state.product);
  const { images } = useSelector((state) => state.image);
  const { categories } = useSelector((state) => state.category);
  const { operas } = useSelector((state) => state.opera);
  const { brands } = useSelector((state) => state.brand);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchDataProduct();
  }, [products]);
  const fetchData = async () => {
    dispatch(actions.getBrand());
    dispatch(actions.getOpera());
    dispatch(actions.getCategories());
    dispatch(actions.getImages());
    dispatch(actions.getProduct());
  };

  const fetchDataProduct = async () => {
    let _id = param?._id;
    let dataProduct = products?.filter((items) => items?._id === _id);
    setDataEdit(dataProduct[0]);
  };

  const handleAddCategory = (e) => {
    setAddCategory(e.target.value);
  };
  const handleAddBrands = (e) => {
    setAddBrand(e.target.value);
  };
  const handleAddOperas = (e) => {
    setAddOpera(e.target.value);
  };

  const [payload, setPayload] = useState(() => {
    const initData = {
      _id: dataEdit?._id || "",
      name: dataEdit?.name || "",
      categoryId: dataEdit?.categoryId || "",
      operaId: dataEdit?.operaId || "",
      brandId: dataEdit?.brandId || "",
      imagesId: dataEdit?.imagesId || "",
      star: dataEdit?.star || 0,
      slug: dataEdit?.slug || "",
      shortdescription: dataEdit?.shortdescription || "",
      fulldescription: dataEdit?.fulldescription || "",
      number: dataEdit?.number || "",
      price: dataEdit?.price || "",

      displayorder: dataEdit?.displayorder || 0,
      new: dataEdit?.new || 0,
      showonhomepage: dataEdit?.showonhomepage || 0,
      pricesale: dataEdit?.pricesale || 0,
      status: dataEdit?.status || 1,
    };
    return initData;
  });

  useEffect(() => {
    if (dataEdit) {
      setPayload({
        _id: dataEdit?._id || "",
        name: dataEdit?.name || "",
        categoryId: dataEdit?.categoryId || "",
        operaId: dataEdit?.operaId || "",
        brandId: dataEdit?.brandId || "",
        imagesId: dataEdit?.imagesId || "",
        star: dataEdit?.star || 0,
        slug: dataEdit?.slug || "",
        shortdescription: dataEdit?.shortdescription || "",
        fulldescription: dataEdit?.fulldescription || "",
        number: dataEdit?.number || "",
        price: dataEdit?.price || "",

        displayorder: dataEdit?.displayorder || 0,
        new: dataEdit?.new || 0,
        showonhomepage: dataEdit?.showonhomepage || 0,
        pricesale: dataEdit?.pricesale || 0,
        status: dataEdit?.status || 1,
      });
      setAddCategory(dataEdit?.categoryId || "");
      setAddBrand(dataEdit?.brandId || "");
      setAddOpera(dataEdit?.operaId || "");
      setAddsale(dataEdit?.pricesale || "");
      setCheck(dataEdit.pricesale > 0 ? true : false);

      let img = images.filter((items) => items?.code === dataEdit?.imagesId);

      // console.log(img[0]?);
      setImagesPreview(img[0]?.picture);
    }
  }, [dataEdit]);
  // console.log(payload);
  const [payloadImage, setPayloadImage] = useState({
    _id: "",
    code: "",
    picture: "",
    displayorder: "",
    alt: "",
    title: "",
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

      setImagesPreview([...imagesPreview, ...images]);

      setLoading(false);
    }
  };

  const handleDeleteImage = (image) => {
    setImagesPreview((prev) => prev?.filter((item) => item !== image));
    setPayload((prev) => ({
      ...prev,
      images: prev.images?.filter((item) => item !== image),
    }));
  };

  const handleaddsale = (e) => {
    setAddsale(e.target.value);
  };

  const handlesubmitSave = async () => {
    let img = images?.filter((items) => items?.code === dataEdit?.imagesId);
    let idImages = img[0]?._id || "";

    // console.log("img", img);
    let codeImages = img[0]?.code || "";
    payloadImage._id = idImages;
    payloadImage.code = codeImages;
    payloadImage.picture = imagesPreview || 0;

    let pricesale = addsale;
    payload.pricesale = pricesale;

    let slug = formatVietnameseToString(dataEdit?.name);
    payload.slug = slug;
    let invalids = validate(payload);
    if (imagesPreview?.length === 0) {
      setTyToast(true);
    }

    // console.log(invalids);

    if (invalids === 0 && payload && payloadImage) {
      // console.log(payload);
      // console.log(payloadImage);
      await apiUpdateProducts(payload);
      await apiUpdateImages(payloadImage);
      fetchData();
      setImagesPreview([]);
      toast.success("Cập nhật sản phẩm thành công", {
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

  // console.log(payload);

  return (
    <div className="p-4 ">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4 ">
          <h1 className="text-xl font-semibold">Edit a product</h1>
          <button
            onClick={() => navigate(-1)}
            className="text-blue-400 flex items-center gap-1 cursor-pointer"
          >
            <GrFormPreviousLink size={15} />
            back to product list
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
            Product Info
          </h1>
          <div className="p-5 flex flex-col gap-3 justify-center items-center">
            <div className="grid grid-cols-3 gap-2 items-center w-full">
              <p className="text-right col-span-1 font-bold">Product name</p>
              <input
                type="text"
                id="name"
                className="border col-span-2 px-4 py-2 "
                onFocus={() => setInvalidFields([])}
                value={payload?.name}
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
            <div className="grid  grid-cols-3 gap-2 items-center w-full">
              <p className="text-right col-span-1 font-bold">
                Short description
              </p>
              <textarea
                className="border col-span-2  px-4 py-2"
                onFocus={() => setInvalidFields([])}
                value={payload?.shortdescription}
                onChange={(e) =>
                  setPayload((prev) => ({
                    ...prev,
                    ["shortdescription"]: e.target.value,
                  }))
                }
              />
            </div>
            {invalidFields.length > 0 &&
              invalidFields.some((i) => i.name === "shortdescription") && (
                <small className="text-red-500 italic text-right w-full">
                  {
                    invalidFields.find((i) => i.name === "shortdescription")
                      ?.message
                  }
                </small>
              )}
            <div className="grid  grid-cols-3 gap-2 items-center w-full">
              <p className="text-right col-span-1 font-bold">
                Full description
              </p>
              <span className="col-span-2">
                <CKEditor
                  editor={ClassicEditor}
                  data={payload?.fulldescription[0]}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    setDataDescription(data);
                  }}
                />
              </span>
            </div>
            {invalidFields.length > 0 &&
              invalidFields.some((i) => i.name === "fulldescription") && (
                <small className="text-red-500 italic text-right w-full">
                  {
                    invalidFields.find((i) => i.name === "fulldescription")
                      ?.message
                  }
                </small>
              )}
            <div className="grid grid-cols-3 gap-2 items-center w-full">
              <p className="text-right col-span-1 font-bold">Categories</p>
              <select
                onChange={(e) => handleAddCategory(e)}
                className="cursor-pointer px-2 capitalize"
                defaultValue={dataEdit?.categoryId}
              >
                <option value="DEFAULT" disabled>
                  Chọn danh mục sản phẩm...
                </option>
                {categories?.length > 0 &&
                  categories
                    .filter((item) => item.status === 1)
                    .map((items, index) => {
                      return (
                        <option key={index} value={items?._id}>
                          {items?.name}
                        </option>
                      );
                    })}
              </select>
            </div>
            {invalidFields.length > 0 &&
              invalidFields.some((i) => i.name === "categoryId") && (
                <small className="text-red-500 italic text-right w-full">
                  {invalidFields.find((i) => i.name === "categoryId")?.message}
                </small>
              )}
            <div className="grid grid-cols-3 gap-2 items-center w-full">
              <p className="text-right col-span-1 font-bold">Brand</p>
              <select
                onChange={(e) => handleAddBrands(e)}
                className="cursor-pointer px-2 capitalize"
                defaultValue={dataEdit?.brandId}
              >
                <option value="DEFAULT" disabled>
                  Chọn thương hiệu sản phẩm...
                </option>
                {brands?.length > 0 &&
                  brands
                    .filter((item) => item.status === 1)
                    .map((items, index) => {
                      return (
                        <option key={index} value={items?._id}>
                          {items?.name}
                        </option>
                      );
                    })}
              </select>
            </div>
            {invalidFields.length > 0 &&
              invalidFields.some((i) => i.name === "brandId") && (
                <small className="text-red-500 italic text-right w-full">
                  {invalidFields.find((i) => i.name === "brandId")?.message}
                </small>
              )}
            <div className="grid grid-cols-3 gap-2 items-center w-full">
              <p className="text-right col-span-1 font-bold">Opera</p>
              <select
                onChange={(e) => handleAddOperas(e)}
                className="cursor-pointer px-2 capitalize"
                defaultValue={dataEdit?.operaId}
              >
                <option value="DEFAULT" disabled>
                  Chọn Hệ điều hành...
                </option>
                {operas?.length > 0 &&
                  operas
                    .filter((item) => item.status === 1)
                    .map((items, index) => {
                      return (
                        <option key={index} value={items._id}>
                          {items?.name}
                        </option>
                      );
                    })}
              </select>
            </div>
            {invalidFields.length > 0 &&
              invalidFields.some((i) => i.name === "operaId") && (
                <small className="text-red-500 italic text-right w-full">
                  {invalidFields.find((i) => i.name === "operaId")?.message}
                </small>
              )}
            <div className="grid grid-cols-3 gap-2 items-center w-full">
              <p className="text-right col-span-1 font-bold">Display order</p>
              <input
                className="border col-span-2 px-4 py-2 "
                onFocus={() => setInvalidFields([])}
                value={payload?.displayorder}
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
                <small className="text-red-500 italic text-right w-full">
                  {
                    invalidFields.find((i) => i.name === "displayorder")
                      ?.message
                  }
                </small>
              )}

            <div className="grid grid-cols-3 gap-2 items-center w-full">
              <p className="text-right col-span-1 font-bold">New</p>
              <p className="text-left">
                {payload?.new === 1 ? (
                  <input
                    type="checkbox"
                    className=" col-span-2 w-4 h-4 "
                    onFocus={() => setInvalidFields([])}
                    checked
                    onChange={(e) =>
                      setPayload((prev) => ({
                        ...prev,
                        ["new"]: e.target.checked ? 1 : 0,
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
                        ["new"]: e.target.checked ? 1 : 0,
                      }))
                    }
                  />
                )}
              </p>
            </div>
            <div className="grid grid-cols-3 gap-2 items-center w-full">
              <p className="text-right col-span-1 font-bold">showOnHomePage</p>
              <p className="text-left">
                {payload?.showonhomepage === 1 ? (
                  <input
                    type="checkbox"
                    className=" col-span-2 w-4 h-4 "
                    onFocus={() => setInvalidFields([])}
                    checked
                    onChange={(e) =>
                      setPayload((prev) => ({
                        ...prev,
                        ["showonhomepage"]: e.target.checked ? 1 : 0,
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
                        ["showonhomepage"]: e.target.checked ? 1 : 0,
                      }))
                    }
                  />
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white border-t-4 mt-3 rounded-md border-t-blue-300">
        <div className="p-2">
          <h1 className="capitalize text-lg border-b px-4 py-2 ">Price</h1>
          <div className="p-5 flex flex-col gap-3 justify-center items-center">
            <div className="grid grid-cols-3 gap-2 items-center w-full">
              <p className="text-right col-span-1 font-bold">Price</p>
              <input
                type="number"
                className="border col-span-2 px-4 py-2 "
                value={payload?.price}
                onFocus={() => setInvalidFields([])}
                onChange={(e) =>
                  setPayload((prev) => ({
                    ...prev,
                    ["price"]: e.target.value,
                  }))
                }
              />
            </div>
            {invalidFields.length > 0 &&
              invalidFields.some((i) => i.name === "price") && (
                <small className="text-red-500 italic text-right w-full">
                  {invalidFields.find((i) => i.name === "price")?.message}
                </small>
              )}
            <div className="grid  grid-cols-3 gap-2 items-center w-full">
              <p className="text-right col-span-1 font-bold">Number</p>
              <p className="text-left">
                <input
                  type="number"
                  className="border col-span-2 px-4 py-2 "
                  value={payload?.number}
                  onFocus={() => setInvalidFields([])}
                  onChange={(e) =>
                    setPayload((prev) => ({
                      ...prev,
                      ["number"]: e.target.value,
                    }))
                  }
                />
              </p>
              {invalidFields.length > 0 &&
                invalidFields.some((i) => i.name === "number") && (
                  <small className="text-red-500 italic text-right w-full ">
                    {invalidFields.find((i) => i.name === "number")?.message}
                  </small>
                )}
            </div>
            <div className="grid  grid-cols-3 gap-2 items-center w-full">
              <p className="text-right col-span-1 font-bold">Sale</p>
              <p className="text-left">
                {check ? (
                  <input
                    type="checkbox"
                    className="cursor-pointer"
                    checked
                    onChange={() => {
                      setCheck(!check);
                      setAddsale(0);
                    }}
                  />
                ) : (
                  <input
                    type="checkbox"
                    className="cursor-pointer"
                    onChange={() => {
                      setCheck(!check);
                      setAddsale(0);
                    }}
                  />
                )}
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2 items-center w-full">
              <p className="text-right col-span-1 font-bold">Phần trăm</p>
              <select
                defaultValue={addsale}
                value={addsale}
                onChange={(e) => handleaddsale(e)}
                className="cursor-pointer px-2 capitalize"
                disabled={!check}
              >
                <option value="DEFAULT" disabled>
                  Chọn giảm giá...
                </option>
                <option value="10">10%</option>
                <option value="20">20%</option>
                <option value="30">30%</option>
                <option value="40">40%</option>
                <option value="50">50%</option>
                <option value="60">60%</option>
                <option value="70">70%</option>
                <option value="80">80%</option>
                <option value="90">90%</option>
                <option value="99">99%</option>
              </select>
            </div>
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
