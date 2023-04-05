import React, { useEffect, useRef, useState } from "react";

import { ItemsImg, Pagination } from "../../../components";

import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../../store/actions";

import {
  apiDeleteBrands,
  apiDeleteCategories,
  apiDeleteImages,
} from "../../../services";
import { toast } from "react-toastify";
import icons from "../../../ultils/icons";

const HomeBrand = () => {
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
  const { brands } = useSelector((state) => state.brand);

  const [checkAll, setcheckAll] = useState(false);
  const [check, setCheck] = useState([]);
  const [checked, setChecked] = useState(false);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    dispatch(actions.getBrand());
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

  //Panginate
  const [itemOffset, setItemOffset] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = brands.slice(itemOffset, endOffset);
  const total = brands;
  const pageCount = Math.ceil(total.length / itemsPerPage);
  // console.log(total);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % brands.length;
    setItemOffset(newOffset);
  };
  const submitDelete = async () => {
    //delete category
    //delete img
    for (let i = 0; i <= check.length; i++) {
      // console.log(check[i]);
      let listImg = brands.filter((items) => items?._id === check[i]);

      // console.log(listImg);
      if (listImg[0]) {
        await apiDeleteBrands(listImg[0]);
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
    <div className="p-5 grid gap-4">
      <div className="flex justify-between items-center">
        <h1 className="capitalize text-xl font-semibold">Brand</h1>
        <div className="flex gap-2 items-center">
          <Link
            to="/admin/brand/insert"
            className="flex gap-2 items-center bg-blue-500 px-4 py-2 rounded-md hover:opacity-[80%]  opacity-[100%] "
          >
            <BiPlusCircle size={20} color="white" />
            <span className="text-white"> Add new</span>
          </Link>
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
      <div className="p-5 bg-white rounded-sm shadow-md flex items-center gap-2 justify-between">
        <h1 className="capitalize text-lg font-semibold flex gap-4 items-center">
          <span>
            <FiSearch size={23} />
          </span>
          Search
        </h1>
        <RiArrowDropDownFill size={35} />
      </div>
      <div className="bg-white rounded-sm shadow-md p-2 ">
        <table className="bg-gray-200 w-full overflow-hidden " id="customers">
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
                name
              </th>

              <th className="border border-gray-300 text-center capitalize px-4 py-2">
                Status
              </th>

              <th className="border border-gray-300 text-center capitalize px-4 py-2">
                edit
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

                    <td className="border border-gray-300 text-center px-2 py-2 w-[79px] ">
                      <Link
                        to={`/admin/brand/edit/` + items._id}
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

export default HomeBrand;
