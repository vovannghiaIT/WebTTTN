import React, { useState, useEffect, useRef } from "react";
import icons from "../../../ultils/icons";

import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../../store/actions";
import ItemsImg from "../../../components/ItemsImg";
import { apiDeleteCategories, apiDeleteImages } from "../../../services";
import { toast } from "react-toastify";
import { Pagination } from "../../../components";
const HomeCategory = () => {
  const {
    BiPlusCircle,
    FiSearch,
    RiArrowUpSFill,
    RiArrowDropDownFill,
    BiTrash,
    GrEdit,
    AiFillCheckCircle,
  } = icons;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const checkbox = useRef(false);
  // console.log(ref);
  const { categories } = useSelector((state) => state.category);
  const { images } = useSelector((state) => state.image);

  const [checkAll, setcheckAll] = useState(false);
  const [check, setCheck] = useState([]);
  const [checked, setChecked] = useState(false);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    dispatch(actions.getCategories());
    dispatch(actions.getImages());
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
      let listImg = categories.filter((items) => items?._id === check[i]);

      // console.log(listImg);
      if (listImg[0]) {
        await apiDeleteCategories(listImg[0]);
      }
      let itemsImg = images.filter(
        (items) => items?.code === listImg[0]?.imagesId
      );
      // console.log(itemsImg);
      if (itemsImg[0]) {
        await apiDeleteImages(itemsImg[0]);
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

  //Panginate
  const [itemOffset, setItemOffset] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = categories.slice(itemOffset, endOffset);
  const total = categories;
  const pageCount = Math.ceil(total.length / itemsPerPage);
  // console.log(total);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % categories.length;
    setItemOffset(newOffset);
  };

  // console.log(checked);
  return (
    <div className="p-5 grid gap-4">
      <div className="flex justify-between items-center">
        <h1 className="capitalize text-xl font-semibold">Loại sản phẩm</h1>
        <div className="flex gap-2 items-center">
          <Link
            to="/admin/category/insert"
            className="flex gap-2 items-center bg-blue-500 px-4 py-2 rounded-md hover:opacity-[80%]  opacity-[100%] "
          >
            <BiPlusCircle size={20} color="white" />
            <span className="text-white"> Thêm mới</span>
          </Link>
          <button
            className="flex gap-2 items-center bg-red-500 px-4 py-2 rounded-md hover:opacity-[80%]  opacity-[100%] "
            onClick={() => submitDelete()}
          >
            <BiTrash size={20} color="white" />
            <span className="text-white">
              Xóa(chọn) <span>{check.length} </span>
            </span>
          </button>
        </div>
      </div>
      <div className="p-5 bg-white rounded-sm shadow-md flex items-center gap-2 justify-between">
        <h1 className="capitalize text-lg font-semibold flex gap-4 items-center">
          <span>
            <FiSearch size={23} />
          </span>
          Tìm kiếm
        </h1>
        <RiArrowDropDownFill size={35} />
      </div>
      <div className="bg-white rounded-sm shadow-md p-2 ">
        <table
          className="bg-gray-200 w-full overflow-hidden mb-5"
          id="customers"
        >
          <thead>
            <tr className="border border-gray-300">
              <th className="border border-gray-300 text-center capitalize px-4 py-2 ">
                {/* {!checkAll && (
                <input
                  type="checkbox"
                  className="w-4 h-4"
                  onChange={() => {
                    setcheckAll(true);
                    setChecked(true);
                  }}
                />
              )}
              {checkAll && (
                <span
                  className="text-center"
                  onClick={() => {
                    setcheckAll(false);
                    setChecked(false);
                  }}
                >
                  <BiCheckboxMinus size={25} />
                </span>
              )} */}
              </th>
              <th className="border border-gray-300 text-center capitalize px-4 py-2">
                Hình ảnh
              </th>
              <th className="border border-gray-300 text-center capitalize px-4 py-2">
                Tên
              </th>

              <th className="border border-gray-300 text-center capitalize px-4 py-2">
                Trạng thái
              </th>
              <th className="border border-gray-300 text-center capitalize px-4 py-2">
                Thứ tự hiển thị
              </th>
              <th className="border border-gray-300 text-center capitalize px-4 py-2">
                Cập nhật
              </th>
            </tr>
          </thead>
          <tbody>
            {currentItems?.length > 0 &&
              currentItems.map((items, index) => {
                return (
                  <tr className="border border-gray-300" key={index}>
                    <td className="border border-gray-300 text-center px-4 py-2">
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
                    <td className="border border-gray-300 text-center px-4 py-2 w-7 h-7">
                      {images?.length > 0 &&
                        images
                          .filter(
                            (item) =>
                              item?.status === 1 &&
                              item?.code === items?.imagesId
                          )
                          .map((itemsImg, index) => {
                            return (
                              <span key={index}>
                                <ItemsImg images={itemsImg?.picture} />
                              </span>
                            );
                          })}
                    </td>
                    <td className="border border-gray-300 text-center px-4 py-2">
                      {items?.name}
                    </td>

                    <td className="border border-gray-300 text-center  px-4 py-2">
                      <span className="flex justify-center items-center">
                        {items?.status === 1 ? (
                          <AiFillCheckCircle color="green" size={25} />
                        ) : (
                          <AiFillCheckCircle color="red" size={25} />
                        )}
                      </span>
                    </td>

                    <td className="border border-gray-300 text-center px-4 py-2">
                      {items?.displayorder}
                    </td>

                    <td className="border border-gray-300 text-center px-2 py-2 w-[79px] ">
                      <Link
                        to={`/admin/category/edit/` + items._id}
                        className="flex items-center justify-center gap-2 border bg-white px-0 rounded-md cursor-pointer hover:bg-gray-200  py-2"
                      >
                        <GrEdit size={15} />
                        <span className="text-sm">Edit</span>
                      </Link>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        <Pagination pageCount={pageCount} handlePageClick={handlePageClick} />
      </div>
    </div>
  );
};

export default HomeCategory;
