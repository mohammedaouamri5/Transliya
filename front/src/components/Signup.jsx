import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { PiButterflyThin } from "react-icons/pi";

const Signup = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [confirmPassword, setConfirmPassword] = useState("");

  const [Type, setType] = useState(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    username: "",
    phonenumberp: "",
    driving_license: "",
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleTypeUser = () => {
    setType("user");
  };
  const handleTypeEmployee = () => {
    setType("employee");
  };

  console.log(Type);

  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password === confirmPassword) {
      console.log('[BRUH] formData : ' , formData )
      console.log('[BRUH] Type : ' , Type )
      if (Type === "user") {

        try {
          const { driving_license, ...userData } = formData;
          signup(userData, Type);
          console.log("userData: ", userData);
          navigate("/");
        } catch (error) {
          setErrorMessage(error);
          console.log(error);
        }
      } else if (Type === "employee") {
        try {
          signup(formData, Type);
          navigate("/");
        } catch (error) {
          setErrorMessage(error);
        }
      }
    } else {
      setErrorMessage("خطأ في تأكيد كلمة السر");
    }
  };

  return (
    <>
      <section className="bg-hero bg-cover relative text-end">
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="flex flex-col items-center relative justify-center px-6 py-8 mx-auto min-h-screen ">
          <h1 className="flex items-center mb-6 text-2xl font-semibold text-white ">
            Transilya
          </h1>

          <div className="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-[600px] xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              {Type ? (
                <>
                  {" "}
                  <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                    إنشاء حساب{" "}
                    <span className="text-secondary">{`${
                      Type === "employee" ? "ناقل" : "زبون"
                    }`}</span>
                  </h1>
                  <form
                    className="space-y-4 md:space-y-6"
                    onSubmit={handleSubmit}
                  >
                    <div className="flex gap-2 justify-between">
                      <div className="w-[45%]">
                        <label className="block mb-2 text-sm font-medium text-gray-900 ">
                          الاسم الاخير
                        </label>
                        <input
                          type="text"
                          name="last_name"
                          id="last_name"
                          dir="rtl"
                          value={formData.last_name}
                          onChange={handleChange}
                          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                          placeholder=""
                          required=""
                        />
                      </div>

                      <div className="w-[45%]">
                        <label className="block mb-2 text-sm font-medium text-gray-900 ">
                          الاسم الاول
                        </label>
                        <input
                          type="text"
                          name="first_name"
                          dir="rtl"
                          id="first_name"
                          placeholder=""
                          value={formData.first_name}
                          onChange={handleChange}
                          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                          required=""
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 ">
                        الإيمايل
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        dir="rtl"
                        placeholder="name@company.com"
                        value={formData.email}
                        onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                        required=""
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 ">
                        username
                      </label>
                      <input
                        type="text"
                        name="username"
                        id="username"
                        dir="rtl"
                        placeholder=""
                        value={formData.username}
                        onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                        required=""
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 ">
                        رقم الهاتف
                      </label>
                      <input
                        type="phonenumberp"
                        name="phonenumberp"
                        id="phonenumberp"
                        dir="rtl"
                        placeholder=""
                        value={formData.phonenumberp}
                        onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                        required=""
                      />
                    </div>

                    {Type === "employee" && (
                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 ">
                          رقم رخصة السياقة
                        </label>
                        <input
                          type="text"
                          name="driving_license"
                          id="driving_license"
                          dir="rtl"
                          placeholder=""
                          value={formData.driving_license}
                          onChange={handleChange}
                          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                          required=""
                        />
                      </div>
                    )}
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 ">
                        كلمة السر
                      </label>
                      <input
                        type="password"
                        name="password"
                        id="password"
                        dir="rtl"
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                        required=""
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 ">
                        تأكيد كلمة السر
                      </label>
                      <input
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        dir="rtl"
                        placeholder="••••••••"
                        value={confirmPassword}
                        onChange={(e) => {
                          setConfirmPassword(e.target.value);
                        }}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                        required=""
                      />
                    </div>
                    <div className="text-red-800 text-center">
                      {errorMessage}
                    </div>
                    <div className="flex items-center justify-between"></div>
                    <button
                      type="submit"
                      className="w-full text-white bg-background hover:bg-secondary duration-300 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                    >
                      إنشاء حساب{" "}
                    </button>
                    <p className="text-sm font-light text-gray-500 ">
                      لديك حساب ؟{" "}
                      <Link
                        to="/login"
                        className="font-medium text-primary-600 hover:underline "
                      >
                        تسجيل الدخول
                      </Link>
                    </p>
                  </form>
                </>
              ) : (
                <>
                  <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl text-center">
                    اختر نوع الحساب
                  </h1>
                  <div className="w-full justify-around flex">
                    <button
                      className="px-5 py-2 rounded-md hover:bg-secondary duration-200 bg-black text-light"
                      onClick={handleTypeUser}
                    >
                      أنشئ حساب زبون
                    </button>
                    <button
                      className="px-5 py-2 rounded-md hover:bg-secondary duration-200 bg-black text-light"
                      onClick={handleTypeEmployee}
                    >
                      أنشئ حساب ناقل
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Signup;
