import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Modal, Box} from "@mui/material"

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80vw",
  maxHeight: "90vh",
  overflowY: "auto",
  backgroundColor: "white",
  boxShadow: 24,
  textAlign: "end",
  p: 4,
};

const Plan = () => {
  const [isAbonner, setAbonner] = useState(false);
  const [show, setShow] = useState(false);
  const [pay, setPay] = useState(false);
  const [selected, setSelected] = useState("")

  const user = JSON.parse(localStorage.getItem("user"))


  const handleShowClose = () => {
    setShow(false);
    setPay(false);
  };

  const handleShowOpen = () => {
    setShow(true);
  };

  const AddAbonner = async () => {
    const res = await axios.post(
      "http://127.0.0.1:8000/API/add_to_is_abonner",
      {
        id: user.id,
      }
    );
    console.log(res);
    if (res.status >= 200 && res.status < 300) {
      setAbonner(true);
      setShow(false);
    }
  };

  useEffect(() => {
    if (user) {
      const CheckAbonner = async () => {
        const res = await axios.post(
          "http://127.0.0.1:8000/API/is_person_in_abonner",
          {
            id: user.id,
          }
        );
        setAbonner(res.data.is_abonner);
      };
      CheckAbonner();
    }
  }, [user]);

  return (
    <>
      <div className="w-full h-fit flex flex-col items-center text-light min-h-[80vh] justify-center relative bg-background">
        <h1 className="w-full text-4xl font-bold p-5"> مخطط الموقع</h1>
        <div className="w-full  flex items-start p-5">
          <ul style={{ listStyle: "circle" }} className="pl-10">
            <li>
              <Link to={"/"}>الصفحة الرئيسية</Link>
            </li>
            <li>
              {
                isAbonner ? <Link to={"/rent"}>الكراء</Link> : <div className="cursor-pointer" onClick={handleShowOpen}>
                  الكراء
                </div>
              }
              
            </li>
            <ul style={{ listStyle: "square" }} className="pl-10">
              <li>
                <Link>نتائج الكراء</Link>
              </li>
            </ul>
            <li>
              <Link to={"/booking"}>التوصيل</Link>
            </li>
            <ul style={{ listStyle: "square" }} className="pl-10">
              <li>
                <Link>نتائج التوصيل</Link>
              </li>
            </ul>
            <li>
              <Link to={"/dashboard"}>لوحة التحكم</Link>
            </li>
          </ul>
        </div>
      </div>

      <Modal
        open={show}
        onClose={handleShowClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {!pay ? (
          <div className="absolute top-1/2 left-1/2 transform rounded -translate-x-1/2 -translate-y-1/2 bg-light text-center w-[400px] p-5">
            <h1 className="text-2xl m-10">إشترك للإستفادة من هذه الخدمة</h1>
            <div>
              <button
                onClick={() => {
                  setPay(true);
                }}
                className="px-6 py-2 text-md sm:text-lg bg-background rounded-lg hover:bg-accent duration-200 text-light"
              >
                الإشتراك
              </button>
            </div>
          </div>
        ) : (
          <Box sx={style}>
            <div>
              <h1 className="mb-8 text-3xl font-bold">اختر طريقة الدفع</h1>
              <div className="flex w-full mb-5 justify-evenly">
                <div
                  className={` ${
                    selected.includes("dhahabiya")
                      ? `border-black`
                      : "border-white"
                  }  duration-200 border-2  hover:border-black p-1 rounded-xl`}
                  onClick={() => setSelected("dhahabiya")}
                >
                  <img
                    className="h-20 rounded-xl"
                    src="https://estorm.ooredoo.dz/e-payment/assets/img/EI.png"
                    alt="truck"
                  />
                </div>

                <div
                  className={` ${
                    selected.includes("CIB") ? `border-black` : "border-white"
                  }  duration-200 border-2  hover:border-black p-1 rounded-xl`}
                  onClick={() => setSelected("CIB")}
                >
                  <img
                    className="h-20 rounded-xl"
                    src="https://estorm.ooredoo.dz/e-payment/assets/img/CIB.png"
                    alt="truck"
                  />
                </div>
              </div>
              <div className="mb-5">
                <h1 className="text-lg mb-2">رقم البطاقة</h1>
                <input
                  type="text"
                  dir="rtl"
                  className="bg-whit mb-5 border border-gray-300 text-background sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                />
                <div className="flex w-full justify-between">
                  <div className="w-[48%]">
                    <h1 className="text-lg mb-2">تاريخ نهاية الصلاحية</h1>
                    <input
                      type="text"
                      dir="rtl"
                      className="bg-whit  border border-gray-300 text-background sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    />
                  </div>
                  <div className="w-[48%]">
                    <h1 className="text-lg mb-2 ">CVV</h1>
                    <input
                      type="text"
                      dir="rtl"
                      className="bg-whit  border border-gray-300 text-background sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    />
                  </div>
                </div>
              </div>
              <div className="w-full flex justify-center">
                <button
                  onClick={() => {
                    AddAbonner();
                  }}
                  className="w-full text-light bg-background hover:bg-accent duration-300 text-lg focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg  px-5 py-2.5 text-center "
                >
                  تأكيد الدفع
                </button>
              </div>
            </div>{" "}
          </Box>
        )}
      </Modal>
    </>
  );
};

export default Plan;
