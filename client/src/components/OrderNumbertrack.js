import React from "react";

const OrderNumbertrack = ({ dataOrder }) => {
  return (
    <div>
      {dataOrder?.length > 0 &&
        dataOrder
          .filter((item) => item.status !== 0)
          .map((iCount, index) => {
            let count = index + 1;
            return (
              <span
                key={index}
                className="absolute top-[40%] right-[45%] text-center bg-red-600 rounded-xl w-[20px] h-[20px] leading-[20px] text-white text-[9px] "
              >
                {count}
              </span>
            );
          })}
    </div>
  );
};

export default OrderNumbertrack;
