import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import HomeAdmin from "./HomeAdmin";

import { path } from "../../ultils/constant";
import { HomeProduct, InsertProduct, EditProduct } from "./product";
import { EditCategory, HomeCategory, InsertCategory } from "./category";
import { HomeBrand, TrashBrand } from "./brand";
import { HomeOpera, TrashOpera } from "./opera";

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
          {/* product */}
          <Route path={path.INSERTPRODUCT} element={<InsertProduct />} />
          <Route path={path.EDITPRODUCT} element={<EditProduct />} />

          {/* category */}

          <Route path={path.INSERTCATEGORY} element={<InsertCategory />} />
          <Route path={path.EDITCATEGORY} element={<EditCategory />} />

          <Route path={path.TRANSHBRAND} element={<TrashBrand />} />
          <Route path={path.TRANSHOPERA} element={<TrashOpera />} />
        </Route>
      </Routes>
    </>
  );
};

export default Admin;
