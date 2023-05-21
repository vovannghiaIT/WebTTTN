import React, { useEffect, useState } from "react";
import icons from "../../../ultils/icons";
import {
  Link,
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../../store/actions";
import ItemsImg from "../../../components/ItemsImg";
import {
  apiDeleteCate,
  apiDeleteImages,
  apiDeleteProduct,
  apiSearchProductAdmin,
  apiUpdateProducts,
} from "../../../services";
import { toast } from "react-toastify";
import { Pagination } from "../../../components";

const HomeProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products } = useSelector((state) => state.product);
  const { images } = useSelector((state) => state.image);
  const { cates } = useSelector((state) => state.cate);
  const { categories } = useSelector((state) => state.category);

  const [checkAll, setcheckAll] = useState(false);
  const [check, setCheck] = useState([]);
  const [menuCatalog1, setMenuCatalog1] = useState(false);
  const [addCategory, setAddCategory] = useState("");
  const [checked, setChecked] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [dataSearch, setdataSearch] = useState([]);
  const [paySearch, setPaySearch] = useState({
    key: "",
    categoryId: "",
  });
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    dispatch(actions.getProduct());
    dispatch(actions.getImages());
    dispatch(actions.getCate());
    dispatch(actions.getCategories());
  };

  const handleAddCategory = (e) => {
    setAddCategory(e.target.value);
  };
  const {
    BiPlusCircle,
    FiSearch,
    RiArrowUpSFill,
    RiArrowDropDownFill,
    BiTrash,
    AiFillCheckCircle,
    GrEdit,
    BiCheckboxMinus,
    AiFillCaretLeft,
  } = icons;

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
    //delete product
    //delete img
    for (let i = 0; i < check.length; i++) {
      let listImg = products.filter((items) => items?._id === check[i]);

      if (listImg[0]) {
        await apiUpdateProducts({ ...listImg[0], status: 0 });
      }
    }
    toast.success("Xóa " + check.length + " sản phẩm thành công", {
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
    fetchData();
    setCheck([]);
  };
  //Panginate
  const [itemOffset, setItemOffset] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = products.slice(itemOffset, endOffset);
  const total = products;
  const pageCount = Math.ceil(total.length / itemsPerPage);
  // console.log(total);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % products.length;
    setItemOffset(newOffset);
  };

  const handleSubmitSearch = () => {
    let categoryId = addCategory;
    paySearch.categoryId = categoryId;
    navigate({
      pathname: "/admin/product",
      search: createSearchParams({
        key: paySearch?.key,
        categoryId: paySearch?.categoryId,
      }).toString(),
    });
  };
  return (
    <div className="p-5 grid gap-4">
      <div className="flex justify-between items-center">
        <h1 className="capitalize text-xl font-semibold">Product</h1>
        <div className="flex gap-2 items-center">
          <Link
            to="/admin/product/insert"
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
          <Link
            to="/admin/product/trash"
            className="flex gap-2 items-center bg-red-500 px-4 py-2 rounded-md hover:opacity-[80%]  opacity-[100%] relative "
          >
            <BiTrash size={20} color="white" />
            {products?.length > 0 &&
              products
                .filter((item) => item.status === 0)
                .map((iCount, index) => {
                  let count = index + 1;
                  return (
                    <span
                      key={index}
                      className="absolute z-10 top-[-20%] right-[-10%] text-white w-[25px] h-[25px] text-center bg-blue-600 rounded-full"
                    >
                      {count ? count : 0}
                    </span>
                  );
                })}
            <span className="text-white"> Trash</span>
          </Link>
        </div>
      </div>
      <div>
        <div
          className="p-5 bg-white rounded-sm shadow-md flex items-center gap-2 justify-between"
          onClick={() => setMenuCatalog1(!menuCatalog1)}
        >
          <h1 className="capitalize text-lg font-semibold flex gap-4 items-center">
            <span>
              <FiSearch size={23} />
            </span>
            Search
          </h1>
          <div
            className={` ${
              menuCatalog1
                ? "opacity-[100%] rotate-[-90deg] transition-all  "
                : "opacity-[100%] rotate-0 transition-all  "
            }`}
          >
            <AiFillCaretLeft size={15} />
          </div>
        </div>
      </div>
      <div
        className={` ${
          menuCatalog1
            ? "opacity-[100%] h-[170px] transition-all   pt-2 bg-gray-05 "
            : "opacity-0 h-[0px]  transition-all   "
        }`}
      >
        <div className="bg-white rounded-sm shadow-md p-2">
          <label className="p-2">Name</label>
          <input
            className="w-[300px]  border p-2"
            onChange={(e) =>
              setPaySearch((prev) => ({
                ...prev,
                ["key"]: e.target.value,
              }))
            }
          />
          <label className="p-2">Category</label>
          <select
            defaultValue={"DEFAULT"}
            onChange={(e) => handleAddCategory(e)}
            className="cursor-pointer px-2 capitalize w-[300px]"
          >
            <option value="DEFAULT" disabled>
              Chọn danh mục sản phẩm...
            </option>
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
          <button
            className="p-2 bg-red-500 rounded-md ml-5 text-white"
            onClick={() => handleSubmitSearch()}
          >
            Tìm kiếm
          </button>
        </div>
      </div>

      <div className="bg-white rounded-sm shadow-md p-2 ">
        <table
          className="bg-gray-200 w-full overflow-hidden mb-5 "
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
                Picture
              </th>
              <th className="border border-gray-300 text-center capitalize px-4 py-2">
                Product name
              </th>
              <th className="border border-gray-300 text-center capitalize px-4 py-2">
                slug
              </th>
              <th className="border border-gray-300 text-center capitalize px-4 py-2">
                price
              </th>
              <th className="border border-gray-300 text-center capitalize px-4 py-2">
                price sale
              </th>
              <th className="border border-gray-300 text-center capitalize px-4 py-2 w-10 ">
                publised
              </th>
              <th className="border border-gray-300 text-center capitalize px-4 py-2">
                edit
              </th>
            </tr>
          </thead>
          <tbody>
            {currentItems?.length > 0 &&
              currentItems
                .filter((items) => items.status === 1)
                .map((items, index) => {
                  return (
                    <tr className="border border-gray-300" key={index}>
                      <td className="border border-gray-300 text-center px-4 py-2">
                        {checked && (
                          <input
                            type="checkbox"
                            className="w-4 h-4"
                            value={items._id}
                            checked
                            onChange={(e) => handleChange(e)}
                          />
                        )}
                        {!checked && (
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
                      <td className="border border-gray-300 text-center px-4 py-2">
                        {items?.slug}
                      </td>
                      <td className="border border-gray-300 text-center px-4 py-2">
                        {items?.price}
                      </td>

                      <td className="border border-gray-300 text-center px-4 py-2">
                        {items?.pricesale} %
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
                      <td className="border border-gray-300 text-center px-4 py-2 ">
                        <Link
                          to={`/admin/product/edit/` + items._id}
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

export default HomeProduct;
