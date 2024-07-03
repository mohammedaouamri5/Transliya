import React from "react";

const MyAccount = () => {

    
  const string_user = localStorage.getItem("user");
  const string_employer = localStorage.getItem("employer");
  const user = JSON.parse(string_user);
  const employer = JSON.parse(string_employer);


  return (
    <>
      <div className="w-full flex flex-wrap justify-end">
        <div className="w-full lg:w-1/2 px-2 mb-5 text-end">
          <h2 className="mb-3 font-bold">اسم المستخدم</h2>
          <div className="p-2 mb-2 w-full border-2 border-background  bg-gray-200 rounded-lg">
            <p>{user.username}</p>
          </div>
        </div>
        <div className="w-full lg:w-1/2 px-2 mb-5 text-end">
          <h2 className="mb-3 font-bold">الإيمايل</h2>
          <div className="p-2 mb-2 w-full border-2 border-background  bg-gray-200 rounded-lg">
            <p>{user.email}</p>
          </div>
        </div>
        <div className="w-full lg:w-1/2 px-2 mb-5 text-end">
          <h2 className="mb-3 font-bold"> الإسم الأخير</h2>
          <div className="p-2 mb-2 w-full border-2 border-background bg-gray-200 rounded-lg">
            <p>{user.last_name}</p>
          </div>
        </div>
        <div className="w-full lg:w-1/2 px-2 mb-5 text-end">
          <h2 className="mb-3 font-bold">الإسم الأول </h2>
          <div className="p-2 mb-2 w-full border-2 border-background bg-gray-200 rounded-lg">
            <p>{user.first_name}</p>
          </div>
        </div>
        <div className="w-full lg:w-1/2 px-2 mb-5 text-end">
          <h2 className="mb-3 font-bold">رقم الهاتف </h2>
          <div className="p-2 mb-2 w-full border-2 border-background bg-gray-200 rounded-lg">
            <p>{user.phonenumberp}</p>
          </div>
        </div>
        {employer && (
          <div className="w-full lg:w-1/2 px-2 mb-5 text-end">
            <h2 className="mb-3 font-bold">رقم رخصصة السياقة</h2>
            <div className="p-2 mb-2 w-full border-2 border-background bg-gray-200 rounded-lg">
              <p>{employer.driving_license}</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MyAccount;
