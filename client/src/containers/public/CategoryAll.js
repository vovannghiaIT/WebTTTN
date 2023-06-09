import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ItemsImg } from "../../components";
import * as actions from "../../store/actions";

const CategoryAll = () => {
  const { categories } = useSelector((state) => state.category);
  const { images } = useSelector((state) => state.image);

  const dispatch = useDispatch();
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    dispatch(actions.getCategories());
    dispatch(actions.getImages());
  };
  // console.log(categories);
  return (
    <div className="bg-[#e4e4e4] flex flex-col gap-4 w-full">
      <div className="w-[100%] mx-auto bg-white">
        <div className="w-[80%] mx-auto pt-2 pb-2">
          Trang chủ / Tất cả loại sản phẩm
        </div>
      </div>
      <div className="bg-white w-[80%] rounded-lg mx-auto p-2 ">
        <h1 className="text-[22px]">Tất cả loại sản phẩm</h1>
        <div className="mt-2 grid grid-cols-4  gap-3 sm:max-md:grid-cols-2  p-2">
          {categories?.length > 0 &&
            categories
              .filter((items) => items.status === 1)
              .map((items, index) => {
                return (
                  <Link
                    to={"/category-product/" + items?.slug}
                    className="border border-gray-400 shadow-25% cursor-pointer hover:text-red-500 hover:border-red-500  flex justify-start items-center p-4 gap-4 rounded-lg"
                    key={index}
                  >
                    <div className="w-[25%] md:max-lg:w-[40%] sm:max-md:w-[60%]">
                      {images?.length > 0 &&
                        images
                          .filter(
                            (item) =>
                              item?.status === 1 &&
                              item?.code === items?.imagesId
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
                    <div className="text-start capitalize sm:max-md:text-[10px]">
                      {items?.name.length > 10
                        ? items?.name.slice(0, 10) + "..."
                        : items?.name.slice(0, 10)}
                    </div>
                  </Link>
                );
              })}
        </div>
      </div>
    </div>
  );
};

export default CategoryAll;
