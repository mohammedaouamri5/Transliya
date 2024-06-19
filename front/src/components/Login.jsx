import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      setErrorMessage(null); // Clear any previous errors
    } catch (err) {
      setErrorMessage(err.message); // Display error message
    } finally {
      setEmail("");
      setPassword("");
      navigate("/");
    }
  };

  console.log("auth: ", isAuthenticated);

  return (
    <>
      <section className="bg-hero bg-cover relative">
        <div className="absolute inset-0 bg-black opacity-60"></div>

        <div className="flex flex-col items-center relative justify-center px-6 py-8 mx-auto h-screen lg:py-0 ">
          <h1 className="flex items-center mb-6 text-2xl font-semibold text-white ">
            Transilya
          </h1>

          <div className="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0 text-end">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                تسجيل الدخول إلى حسابك
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 ">
                    بريدك الإلكتروني
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    placeholder="name@company.com"
                    required=""
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 ">
                    كلمة السر
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    required=""
                  />
                </div>
                <div>{errorMessage}</div>
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="remember"
                        aria-describedby="remember"
                        type="checkbox"
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 "
                        required=""
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label className="text-primary-600 ">ذكرني</label>
                    </div>
                  </div>
                  <a
                    href="#"
                    className="text-sm font-medium text-primary-600 hover:underline "
                  >
                    نسيت كلمة المرور؟
                  </a>
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-background hover:bg-secondary duration-300 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                >
                  تسجيل الدخول
                </button>
                <p className="text-sm font-light text-gray-500 ">
                  ليس لديك حساب حتى الآن؟{" "}
                  <Link
                    to="/signup"
                    className="font-medium text-primary-600 hover:underline "
                  >
                    إنشاء حساب
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
