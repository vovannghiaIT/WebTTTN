import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import HomeAdmin from "./HomeAdmin";

import { path } from "../../ultils/constant";
import {
  HomeProduct,
  InsertProduct,
  EditProduct,
  TrashProduct,
} from "./product";
import { EditCategory, HomeCategory, InsertCategory } from "./category";
import { EditBrand, HomeBrand, InsertBrand, TrashBrand } from "./brand";
import { EditOpera, HomeOpera, InsertOpera, TrashOpera } from "./opera";
import { HomeVoucher, EditVoucher, InsertVoucher } from "./voucher";
import { HomeUser, TrashUser } from "./user";
import HomeOrder from "./order/HomeOrder";

const Admin = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="*" element={<HomeAdmin />} />
          <Route path={path.CATEGORY} element={<HomeCategory />} />
          <Route path={path.PRODUCT} element={<HomeProduct />} />
          <Route path={path.Brand} element={<HomeBrand />} />
          <Route path={path.Opera} element={<HomeOpera />} />
          <Route path={path.Order} element={<HomeOrder />} />
          <Route path={path.User} element={<HomeUser />} />
          <Route path={path.Voucher} element={<HomeVoucher />} />
          <Route path={path.Home} element={<HomeAdmin />} />

          {/* product */}
          <Route path={path.INSERTPRODUCT} element={<InsertProduct />} />
          <Route path={path.EDITPRODUCT} element={<EditProduct />} />
          <Route path={path.TRASHPRODUCT} element={<TrashProduct />} />

          {/* category */}

          <Route path={path.INSERTCATEGORY} element={<InsertCategory />} />
          <Route path={path.EDITCATEGORY} element={<EditCategory />} />

          {/* brand */}
          <Route path={path.TRANSHBRAND} element={<TrashBrand />} />
          <Route path={path.INSERTBRAND} element={<InsertBrand />} />
          <Route path={path.EDITBRAND} element={<EditBrand />} />

          {/* opera */}
          <Route path={path.TRANSHOPERA} element={<TrashOpera />} />
          <Route path={path.INSERTOPERA} element={<InsertOpera />} />
          <Route path={path.EDITOPERA} element={<EditOpera />} />

          {/* user */}
          <Route path={path.TRANSHUSER} element={<TrashUser />} />

          {/* voucher */}
          <Route path={path.INSERTVOUCHER} element={<InsertVoucher />} />
          <Route path={path.EDITVOUCHER} element={<EditVoucher />} />
        </Route>
      </Routes>
    </>
  );
};

export default Admin;
