import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoMenu } from "react-icons/io5";
import logo from "../assets/logo5.png";
import { useAuth } from "../context/AuthContext";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { MdCarRental } from "react-icons/md";
import { TbTruckDelivery } from "react-icons/tb";
import { MdAccountCircle } from "react-icons/md";
import { IoIosLogOut } from "react-icons/io";
import "./Navbar.css";
import axios from "axios";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [notify, setNotify] = useState([]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const { isAuthenticated, logout } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const settings = [
    {
      name: "كراء",
      link: "rent",
      icon: <MdCarRental className="ml-4 text-2xl" />,
    },
    {
      name: "توصيل",
      link: "booking",
      icon: <TbTruckDelivery className="ml-4 text-2xl" />,
    },
    {
      name: "لوحة التحكم",
      link: "dashboard",
      icon: <MdAccountCircle className="ml-4 text-2xl" />,
    },
  ];

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  useEffect(() => {
    if (isAuthenticated) {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = localStorage.getItem("token");
      setUser(user);
      setToken(token);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated && user && token) {
      const getNotifications = async () => {
        try {
          const response = await axios.get(
            "http://127.0.0.1:8000/API/get_my_notification",
            {
              params: { id: user.id, name: "" },
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          if (response.status >= 200 && response.status <= 300) {
            console.log(response);
            setNotifications(response.data.notification);
          }
        } catch (error) {
          console.log(error);
        }
      };

      getNotifications();
      const intervalId = setInterval(getNotifications, 10000);

      return () => clearInterval(intervalId);
    }
  }, [isAuthenticated, user, token]);

  useEffect(() => {
    if (notifications) {
      const notRead = notifications.filter(
        (notification) => !notification.is_readed
      );
      console.log(notRead);
      setNotify(notRead);
    }
  }, [notifications]);

  return (
    <>
      <div className="w-full bg-background text-light flex items-center justify-center text-md h-[65px] relative shadow inset shadow-top-2">
        <div className="w-[90%] h-full flex items-center justify-between ">
          <div className="flex items-center gap-4">
            {isAuthenticated && user ? (
              <Box sx={{ flexGrow: 0 }} className="w-fit">
                <Tooltip title="Open settings">
                  <IconButton
                    className="relative"
                    onClick={handleOpenUserMenu}
                    sx={{ p: 0 }}
                  >
                    <Avatar
                      alt={user.username}
                      src="/static/images/avatar/2.jpg"
                    />
                    <div className="absolute h-4 w-4 bg-red-600 text-white text-xs right-0 bottom-0 rounded-full">
                      <p>{notify.length > 9 ? "9+" : notify.length}</p>
                    </div>
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px", p: "8px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <div>
                    <h1 className="mt-1 font-bold text-sm">{user.username}</h1>
                    <span className="text-sm opacity-70">{user.email}</span>
                    <div className="border-t-2 border-[rgba(3, 27, 78, .5)] my-4"></div>
                  </div>
                  {settings.map((setting) => (
                    <Link key={setting.name} to={`/${setting.link}`}>
                      <MenuItem
                        onClick={handleCloseUserMenu}
                        className="text-end"
                      >
                        <h1 className="w-full text-end text-md">
                          {setting.name}
                        </h1>
                        {setting.icon}
                      </MenuItem>
                    </Link>
                  ))}
                  <Link to={"/login"}>
                    <MenuItem
                      onClick={logout}
                      className="text-end hover:text-red-700 duration-100"
                    >
                      <h1 className="w-full text-center text-md">
                        {" "}
                        تسجيل الخروج
                      </h1>
                      <IoIosLogOut className="ml-4 text-3xl" />
                    </MenuItem>
                  </Link>
                </Menu>
              </Box>
            ) : (
              <Link
                to={"/login"}
                className="px-4 py-2 rounded flex bg-white text-background text-sm font-bold hover:bg-light duration-500"
              >
                تسجيل الدخول
              </Link>
            )}
          </div>
          <div
            className={`absolute sm:relative sm:top-0 sm:left-0 sm:z-0 sm:w-fit sm:min-h-fit hidden sm:block`}
          >
            <ul className="flex gap-8 text-center items-center flex-row">
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
                  <Link to={"/plan"}> مخطط الموقع </Link>
                ) : (
                  <div onClick={handleOpen} className="cursor-pointer">
                    مخطط الموقع
                  </div>
                )}
              </li>
              <li className="hover:text-accent duration-300">
                {isAuthenticated ? (
                  <Link to={"/dashboard"}> لوحة التحكم </Link>
                ) : (
                  <div onClick={handleOpen} className="cursor-pointer">
                    لوحة التحكم
                  </div>
                )}
              </li>
            </ul>
          </div>
          <div className="flex items-center">
            <div className="h-[60px] w-[80px]">
              <Link to={"/"}>
                <img className="h-full w-full" src={logo} alt="logo" />
              </Link>
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
