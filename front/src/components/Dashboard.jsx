import React, { useState } from "react";
import truck from "../assets/home-background.png";
import { IoMdNotifications } from "react-icons/io";
import MyAccount from "./MyAccount";
import MyTrucks from "./MyTrucks";
import Notifications from "./Notifications";
import AddTruck from "./AddTruck";
import { FaTruck } from "react-icons/fa";
import { ImBoxAdd } from "react-icons/im";
import { IoPerson } from "react-icons/io5";

const Dashboard = () => {
  const string_user = localStorage.getItem("user");
  const user = JSON.parse(string_user);

  const string_employer = localStorage.getItem("employer");
  const employer = JSON.parse(string_employer);

  const [show, setShow] = useState(0);

  return (
    <>
      <div className="text-center flex justify-center text-4xl h-[40vh] items-center w-full ">
        <h1>لوحة التحكم</h1>
      </div>

      <div className=" w-full flex items-center justify-center bg-background pt-24">
        <div className="flex-col lg:flex-row flex w-full lg:mx-5 px-5">
          <div className="px-2">
            <div className="p-8 rounded-lg bg-white lg:w-[250px] w-full mb-8">
              <div className="w-full flex items-center justify-center">
                <img
                  className="rounded-[50%] w-[150px] h-[150px] p-1 border-4 border-background"
                  src={truck}
                  alt=""
                />
              </div>
              <div className="mt-5 text-center">
                <h3>{user.username}</h3>
                <p className="text-background opacity-50">{user.email}</p>
              </div>
              <div className="mt-5">
                <div
                  className={`flex p-2 cursor-pointer rounded ${
                    show === 0
                      ? "bg-background text-light"
                      : "bg-white text-background"
                  } justify-end items-center duration-200`}
                  onClick={() => {
                    setShow(0);
                  }}
                >
                  {" "}
                  <span className="text-md font-bold">حسابي</span>
                  <IoPerson className="text-lg ml-4" />{" "}
                </div>

                {employer && (
                  <>
                    <div
                      className={`flex items-center cursor-pointer justify-end p-2 rounded ${
                        show === 1
                          ? "bg-background text-light"
                          : "bg-white text-background"
                      }  duration-200 text-end`}
                      onClick={() => {
                        setShow(1);
                      }}
                    >
                      <h1 className="text-md font-bold">شاحناتي</h1>
                      <FaTruck className="text-lg ml-4" />
                    </div>

                    <div
                      className={`flex items-center cursor-pointer p-2 rounded ${
                        show === 3
                          ? "bg-background text-light"
                          : "bg-white text-background"
                      } justify-end duration-200`}
                      onClick={() => {
                        setShow(3);
                      }}
                    >
                      {" "}
                      <span className="text-md font-bold">اضافة شاحنة</span>
                      <ImBoxAdd className="text-lg ml-4" />{" "}
                    </div>
                  </>
                )}

                <div
                  className={`flex items-center cursor-pointer p-2 rounded ${
                    show === 2
                      ? "bg-background text-light"
                      : "bg-white text-background"
                  } justify-end duration-200`}
                  onClick={() => {
                    setShow(2);
                  }}
                >
                  {" "}
                  <span className="text-md font-bold">الاشعارات</span>
                  <IoMdNotifications className="text-lg ml-4" />{" "}
                </div>
              </div>
            </div>
          </div>

          <div className="px-4 w-full">
            <div className="w-full lg:p-8 p-4 bg-white rounded-lg mb-8 ">
              {show === 3 ? (
                <AddTruck employer={user} />
              ) : show === 2 ? (
                <Notifications />
              ) : show === 1 ? (
                <MyTrucks />
              ) : (
                <MyAccount />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
