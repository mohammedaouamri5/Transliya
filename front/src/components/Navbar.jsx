import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoMenu } from "react-icons/io5";
import logo from "../assets/logo.png";
import { useAuth } from "../context/AuthContext";
import Modal from "@mui/material/Modal";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { isAuthenticated, logout } = useAuth();
  const [visible, setVisible] = useState(false);

  const onToggle = () => {
    setVisible(!visible);
  };

  return (
    <>
      <div className="w-full bg-background text-light flex items-center justify-center text-md h-[65px] relative shadow inset shadow-top-2">
        <div className="w-[90%] h-full flex items-center justify-between ">
          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <Link
                to={"/login"}
                onClick={logout}
                className="px-4 py-2 rounded flex bg-white text-background text-sm font-bold hover:bg-light duration-500"
              >
                تسجيل الخروج
              </Link>
            ) : (
              <Link
                to={"/login"}
                className="px-4 py-2 rounded flex bg-white text-background text-sm font-bold hover:bg-light duration-500"
              >
                تسجيل الدخول
              </Link>
            )}

            <IoMenu
              className="w-7 h-7 sm:hidden cursor-pointer"
              onClick={onToggle}
            />
          </div>
          <div
            className={`absolute sm:relative sm:top-0 sm:left-0 sm:z-0 sm:w-fit sm:min-h-fit ${
              visible
                ? "min-h-[50vh] w-full p-4 top-[65px] flex justify-center text-[18px] left-0 bg-background duration-500 z-[1] "
                : "z-[1] w-full left-0 duration-500 top-[-300%] bg-background"
            }`}
          >
            <ul className="flex flex-col gap-8 text-center items-center sm:flex-row">
              <li className="hover:text-accent duration-300">
                <Link to={"/"}> الصفحة الرئيسية </Link>
              </li>
              <li className="hover:text-accent duration-300">
                {isAuthenticated ? (
                  <Link to={"/rent"}> الكراء </Link>
                ) : (
                  <div onClick={handleOpen} className="cursor-pointer">
                    الكراء
                  </div>
                )}
              </li>
              <li className="hover:text-accent duration-300">
                {isAuthenticated ? (
                  <Link to={"/booking"}> التوصيل </Link>
                ) : (
                  <div onClick={handleOpen} className="cursor-pointer">
                    التوصيل
                  </div>
                )}
              </li>
              <li className="hover:text-accent duration-300">
                {isAuthenticated ? (
                  <Link to={"/dashboard"}> حسابي </Link>
                ) : (
                  <div onClick={handleOpen} className="cursor-pointer">
                    حسابي
                  </div>
                )}
              </li>
            </ul>
          </div>
          <div className="flex items-center">              

            <div className="h-[60px] w-[108px]">            
              <img className="h-full w-full" src={logo} alt="logo" />
            </div>
          </div>
        </div>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="absolute top-1/2 left-1/2 transform rounded -translate-x-1/2 -translate-y-1/2 bg-light text-center w-[400px] p-5">
          <h1 className="text-2xl m-10">سجل الدخول أولا</h1>
          <div>
            <Link
              to={"/login"}
              onClick={handleClose}
              className="px-6 py-2 text-md sm:text-lg bg-background text-light"
            >
              تسجيل الدخول
            </Link>
          </div>
        </div>
      </Modal>

      


    </>
  );
};

export default Navbar;
