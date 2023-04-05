import React, { memo, useState } from "react";
import { useSelector } from "react-redux";
import ItemsImg from "./ItemsImg";
import { Link } from "react-router-dom";
import { numberWithCommas } from "../ultils/Common/formatVietnameseToString";

const ItemsProduct = ({
  sale,
  contextleft,
  contextright,
  name,

  pricesale,
  price,
  imagesId,
  slug,
  onClick,
}) => {
  const { products } = useSelector((state) => state.product);
  const { categories } = useSelector((state) => state.category);
  const { images } = useSelector((state) => state.image);

  var PhoneHot = "63fff9ef2e19bcfd9a272ccd";
  var LapTopHot = "63fffa2a2e19bcfd9a272cd3";
  //PanginateProduct
  const [itemOffsetProductleft, setItemOffsetProductleft] = useState(0);
  const [itemsPerPageProductleft, setItemsPerPageProductleft] = useState(8);

  const endOffsetProductleft = itemOffsetProductleft + itemsPerPageProductleft;
  const currentItemsProductleft = products
    .filter((item) => item?.status === 1 && item?.categoryId === PhoneHot)
    .slice(itemOffsetProductleft, endOffsetProductleft);
  //PanginateProduct
  const [itemOffsetProductright, setItemOffsetProductright] = useState(0);
  const [itemsPerPageProductright, setItemsPerPageProductright] = useState(8);

  const endOffsetProductright =
    itemOffsetProductright + itemsPerPageProductright;
  const currentItemsProductright = products
    .filter((item) => item.status === 1 && item?.categoryId === LapTopHot)
    .slice(itemOffsetProductright, endOffsetProductright);

  return (
    <>
      {!contextleft && !contextright && (
        <Link
          to={"/productdetail/" + slug}
          className={`shadow-25% flex gap-2 flex-col p-2 w-full h-full min-w-[120px]  bg-white rounded-md overflow-hidden cursor-pointer relative`}
          onClick={onClick}
        >
          {pricesale !== 0 && (
            <div className="absolute clip__pathSale bg-red-500 w-[40px] h-[50px] top-0 left-0 z-50 shadow-md">
              <p className="w-full text-center text-[10px] text-white font-sans font-semibold ">
                Giảm {pricesale}%
              </p>
            </div>
          )}
          {images?.length > 0 &&
            images
              .filter((item) => item?.status === 1 && item?.code === imagesId)
              .map((itemsImg, index) => {
                return (
                  <div key={index}>
                    <ItemsImg images={itemsImg?.picture} homeItem />
                  </div>
                );
              })}

          {sale && (
            <div className="uppercase text-[10px] bg-[#ff8a97] rounded-xl py-[1px] text-center text-white">
              Đã bán: 35
            </div>
          )}
          <h3 className="font-semibold sm:max-md:text-[12px]">
            {name.length > 22 ? name.slice(0, 22) + "..." : name.slice(0, 22)}
          </h3>
          <div className="flex gap-2">
            {pricesale === 0 ? (
              <>
                <p className="text-red-500 text-[15px] text-center font-medium">
                  {numberWithCommas(price)}đ
                </p>
              </>
            ) : (
              <>
                <p className="text-red-500 text-[15px] font-medium">
                  {numberWithCommas(
                    parseInt(price - price * (pricesale / 100))
                  )}
                  đ
                </p>
                <p className="text-gray-400 line-through text-[14px]">
                  {numberWithCommas(price)}đ
                </p>
              </>
            )}
          </div>
        </Link>
      )}

      {contextleft &&
        currentItemsProductleft?.length > 0 &&
        currentItemsProductleft.map((items, index) => {
          return (
            <Link
              to={"productdetail/" + items?.slug}
              className={`shadow-25% flex gap-2 flex-col p-2 w-full  h-full  bg-white rounded-md overflow-hidden cursor-pointer`}
              key={index}
            >
              {images?.length > 0 &&
                images
                  .filter(
                    (item) => item?.status === 1 && item?.code === imagesId
                  )
                  .map((itemsImg, index) => {
                    return (
                      <div key={index}>
                        <ItemsImg images={itemsImg?.picture} homeItem />
                      </div>
                    );
                  })}

              {sale && (
                <div className="uppercase text-[10px] bg-[#ff8a97] rounded-xl py-[1px] text-center text-white">
                  Đã bán: 35
                </div>
              )}
              <h3 className="font-semibold">
                {items?.name.length > 22
                  ? items?.name.slice(0, 22) + "..."
                  : items?.name.slice(0, 22)}
              </h3>
              <div className="flex gap-2 items-center justify-center">
                {items.pricesale === 0 ? (
                  <>
                    <p className="text-red-500 text-[15px] text-center font-medium">
                      {numberWithCommas(items.price)}đ
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-red-500 text-[15px] font-medium">
                      {numberWithCommas(items.pricesale)}đ
                    </p>
                    <p className="text-gray-400 line-through text-[14px]">
                      {numberWithCommas(items.price)}đ
                    </p>
                  </>
                )}
              </div>
            </Link>
          );
        })}
      {contextright &&
        currentItemsProductright?.length > 0 &&
        currentItemsProductright.map((items, index) => {
          return (
            <Link
              to={"productdetail/" + items?.slug}
              className={`shadow-25% flex gap-2 flex-col p-2  w-full h-full  bg-white rounded-md overflow-hidden cursor-pointer`}
              key={index}
            >
              {images?.length > 0 &&
                images
                  .filter(
                    (item) => item?.status === 1 && item?.code === imagesId
                  )
                  .map((itemsImg, index) => {
                    return (
                      <div key={index}>
                        <ItemsImg images={itemsImg?.picture} homeItem />
                      </div>
                    );
                  })}

              {sale && (
                <div className="uppercase text-[10px] bg-[#ff8a97] rounded-xl py-[1px] text-center text-white">
                  Đã bán: 35
                </div>
              )}
              <h3 className="font-semibold">
                {items?.name.length > 22
                  ? items?.name.slice(0, 22) + "..."
                  : items?.name.slice(0, 22)}
              </h3>
              <div className="flex gap-2 items-center justify-center">
                {items.pricesale === 0 ? (
                  <>
                    <p className="text-red-500 text-[15px] text-center font-medium">
                      {numberWithCommas(items.price)}đ
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-red-500 text-[15px] font-medium">
                      {numberWithCommas(items.pricesale)}đ
                    </p>
                    <p className="text-gray-400 line-through text-[14px]">
                      {numberWithCommas(items.price)}đ
                    </p>
                  </>
                )}
              </div>
            </Link>
          );
        })}
    </>
  );
};

export default ItemsProduct;
