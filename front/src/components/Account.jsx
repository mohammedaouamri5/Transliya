import React from "react";
import truck from "../assets/home-background.png";

const Account = () => {
  const string_user = localStorage.getItem("user");
  const user = JSON.parse(string_user);
  console.log(user);

  return (
    <>
      <div className="text-center flex justify-center text-3xl h-[40vh] items-center w-full ">
        <h1>Account</h1>
      </div>

      <div className=" w-full flex items-center justify-center bg-background pt-24">
        <div className="flex-col lg:flex-row flex w-full mx-5 px-5">
          <div className="px-2">
            <div className="p-8 rounded-lg bg-white lg:w-[250px] w-full mb-8">
              <div className="w-full flex items-center justify-center">
                <img
                  className="rounded-[50%] w-[150px] h-[150px] p-2"
                  src={truck}
                  alt=""
                />
              </div>
              <div className="mt-5 text-center">
                <h3>{user.username}</h3>
                <p className="text-secondary opacity-50">{user.email}</p>
              </div>
            </div>
          </div>
          <div className="px-4 w-full">
            <div className="w-full p-8 bg-white rounded-lg mb-8 ">
              <div className="w-full flex flex-wrap">
                <div className="w-full lg:w-1/2 px-2 mb-5 text-end">
                  <h2 className="mb-2">اسم المستخدم</h2>
                  <div className="p-2 mb-2 w-full border-2 border-light  bg-gray-200 rounded-lg">
                    <p className="opacity-50">{user.username}</p>
                  </div>
                </div>
                <div className="w-full lg:w-1/2 px-2 mb-5 text-end">
                  <h2 className="mb-2">الإيمايل</h2>
                  <div className="p-2 mb-2 w-full border-2 border-light  bg-gray-200 rounded-lg">
                    <p className="opacity-50">{user.email}</p>
                  </div>
                </div>
                <div className="w-full lg:w-1/2 px-2 mb-5 text-end">
                  <h2 className="mb-2"> الإسم الأخير</h2>
                  <div className="p-2 mb-2 w-full border-2 border-light bg-gray-200 rounded-lg">
                    <p className="opacity-50">{user.last_name}</p>
                  </div>
                </div>
                <div className="w-full lg:w-1/2 px-2 mb-5 text-end">
                  <h2 className="mb-2">الإسم الأول </h2>
                  <div className="p-2 mb-2 w-full border-2 border-light bg-gray-200 rounded-lg">
                    <p className="opacity-50">{user.first_name}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Account;
