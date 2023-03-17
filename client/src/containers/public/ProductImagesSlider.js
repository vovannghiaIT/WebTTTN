import React, { useEffect, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Thumbs,
  Pagination,
  Scrollbar,
  A11y,
  FreeMode,
} from "swiper";
//Swiper
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/bundle";

import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions";

const ProductImagesSlider = ({ imagesId, images }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const dataImages = images?.filter(
    (item) => item?.status === 1 && item?.code === imagesId
  );

  // console.log(dataImages[0]?.picture);

  return (
    <div>
      <Swiper
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff",
        }}
        loop={true}
        spaceBetween={5}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2"
      >
        {images?.length > 0 &&
          dataImages[0]?.picture?.map((i, index) => {
            return (
              <SwiperSlide key={index}>
                <img src={i} alt="img" className="object-cover" />
              </SwiperSlide>
            );
          })}
      </Swiper>

      <Swiper
        onSwiper={setThumbsSwiper}
        loop={true}
        spaceBetween={3}
        slidesPerView={images?.length}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        breakpoints={{
          1024: {
            slidesPerView: 4,
            slidesPerGroup: 4,
          },
          767: {
            slidesPerView: 4,
            slidePerGroup: 4,
          },
          330: {
            slidesPerView: 2,
            slidesPerGroup: 2,
          },
          318: {
            slidesPerView: 1,
            slidesPerGroup: 1,
          },
        }}
        className="mySwiper"
      >
        {images?.length > 1 &&
          dataImages[0]?.picture?.map((i, index) => {
            return (
              <SwiperSlide key={index}>
                <img src={i} alt="img" className="object-cover" />
              </SwiperSlide>
            );
          })}
      </Swiper>
    </div>
  );
};

export default ProductImagesSlider;
