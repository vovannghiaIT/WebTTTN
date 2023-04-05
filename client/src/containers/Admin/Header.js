import React, { useState, useEffect } from "react";
import icons from "../../ultils/icons";
import { Link, NavLink } from "react-router-dom";

const Header = () => {
  const [focus, setFocus] = useState(false);
  const [menuCatalog, setMenuCatalog] = useState(false);
  const {
    BsDisplay,
    BiBookAlt,
    FaShoppingCart,
    AiFillCaretLeft,
    BiRadioCircleMarked,
    FaUsers,
  } = icons;
  return (
    <div>
      <div className="p-4 border-b-[0.2px] ">Admin</div>
      <div className="py-2 px-4">
        <input
          className={`py-2 px-4 text-sm border text-black  border-white ${
            focus ? "bg-white" : "bg-[#343a40]"
          } `}
          placeholder="Search"
          onFocus={() => {
            setFocus(true);
          }}
          onBlur={() => {
            setFocus(false);
          }}
        />
      </div>
      <div className=" flex flex-col w-full">
        <div className="py-2 px-4  capitalize text-md-center w-full flex gap-2  items-center">
          <BsDisplay size={20} />
          <p> DashBoard</p>
        </div>
        <div
          className="py-2 px-4 capitalize text-md-center w-full cursor-pointer relative"
          onClick={() => setMenuCatalog(!menuCatalog)}
        >
          <div className="flex justify-between items-center gap-2">
            <div className="flex items-center gap-2">
              <BiBookAlt size={20} />
              <p> Catalog</p>
            </div>
            <div
              className={` ${
                menuCatalog
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
            menuCatalog
              ? "opacity-[100%] h-[170px] transition-all   pt-2 bg-gray-05 "
              : "opacity-0 h-[0px]  transition-all   "
          }`}
        >
          <NavLink
            to="/admin/product"
            className={({ isActive }) =>
              isActive
                ? "px-4 py-2 hover:text-white cursor-pointer text-white flex items-center  "
                : "px-4 py-2 hover:text-white cursor-pointer text-gray-400 flex items-center  "
            }
          >
            <BiRadioCircleMarked size={25} /> <div>Products</div>
          </NavLink>
          <NavLink
            to="/admin/category"
            className={({ isActive }) =>
              isActive
                ? "px-4 py-2 hover:text-white cursor-pointer text-white flex items-center  "
                : "px-4 py-2 hover:text-white cursor-pointer text-gray-400 flex items-center  "
            }
          >
            <BiRadioCircleMarked size={25} /> <div>Categories</div>
          </NavLink>
          <NavLink
            to="/admin/brand"
            className={({ isActive }) =>
              isActive
                ? "px-4 py-2 hover:text-white cursor-pointer text-white flex items-center  "
                : "px-4 py-2 hover:text-white cursor-pointer text-gray-400 flex items-center  "
            }
          >
            <BiRadioCircleMarked size={25} /> <div>Brands</div>
          </NavLink>
          <NavLink
            to="/admin/opera"
            className={({ isActive }) =>
              isActive
                ? "px-4 py-2 hover:text-white cursor-pointer text-white flex items-center  "
                : "px-4 py-2 hover:text-white cursor-pointer text-gray-400 flex items-center  "
            }
          >
            <BiRadioCircleMarked size={25} /> <div>Opera</div>
          </NavLink>
        </div>
        <Link
          to="/admin/order"
          className="py-2 px-4  capitalize text-md-center w-full transition-all flex gap-2 items-center"
        >
          <FaShoppingCart size={20} />
          <p> Sale</p>
        </Link>
        <Link
          to="/admin/user"
          className="py-2 px-4  capitalize text-md-center w-full transition-all flex gap-2 items-center"
        >
          <FaUsers size={20} />
          <p> User</p>
        </Link>
      </div>
    </div>
  );
};

export default Header;
