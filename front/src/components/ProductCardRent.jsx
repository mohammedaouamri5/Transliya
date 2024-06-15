import { FaTruck } from "react-icons/fa";
import { FaWeightHanging } from "react-icons/fa";
import truck from "../assets/home-background.png";
import { Link } from "react-router-dom";
import { Modal } from "@mui/material";
import { useState } from "react";
import LongCard from "./LongCard";

const ProductCardRent = () => {  
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("from: ", formData.from);
    console.log("to: ", formData.to);
  };

  return (
    <>
      <div className="h-auto w-auto   bg-light p-2 text-background m-5 rounded-lg text-end shadow-md shadow-light">
        <div className={`h-[45%] w-full`}>
          {" "}
          <img src={truck} alt="" className="h-auto max-w-full" />{" "}
        </div>
        <div className="p-4  w-full text-xl h-[55%]">
          <h2 className="mb-2">كاميون كبير هه</h2>
          <div className="flex flex-wrap w-full justify-end h-fit border-b border-background pb-4">
            <span className="mr-5 flex gap-2 items-center">
              Jac <FaTruck />
            </span>
            <span className=" flex gap-2 items-center">
              10 ton
              <FaWeightHanging />
            </span>
          </div>
          <div className="flex w-full flex-col mt-2">
            <p className="opacity-70 mb-2 text-sm md:text-md">السعر</p>

            <div className="flex justify-between">
              <button
              onClick={handleOpen}
                className="px-4 py-2 rounded flex bg-background text-light text-lg md:text-lg font-bold hover:bg-secondary duration-500"
              >
                كراء
              </button>
              <h1 className="text-xl lg:text-2xl text-center p-1">2000 DZD</h1>
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
        <div className="absolute top-1/2 left-1/2 transform rounded -translate-x-1/2 -translate-y-1/2 bg-light text-end w-[400px] sm:w-[600px] p-5">
        <LongCard />
        <form
              className="space-y-4 px-5 md:space-y-6 w-full"
              onSubmit={handleSubmit}
            >
              <div className="flex gap-2 justify-between">
                <div className="w-[48%]">
                  <label className="block mb-2 text-lg font-medium text-background ">
                    إلى
                  </label>
                  <input
                    type="text"
                    name="to"
                    id="to"
                    dir="rtl"
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-background sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    placeholder=""
                    required
                  />
                </div>
                <div className="w-[48%]">
                  <label className="block mb-2 text-lg font-medium text-background ">
                    من
                  </label>
                  <input
                    type="text"
                    name="from"
                    id="from"
                    dir="rtl"
                    onChange={handleChange}
                    placeholder="اختر نقطة بداية التوصيل"
                    className="bg-gray-50 border border-gray-300 text-background sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block my-2 text-lg font-medium text-background ">
                  أضف ملاحظة
                </label>
                <textarea
                  type="text"
                  name="from"
                  id="from"
                  dir="rtl"
                  placeholder="اختر نقطة بداية التوصيل"
                  className="bg-gray-50 border border-gray-300 text-background sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 h-[100px] block w-full p-2.5 "
                  required=""
                />
              </div>

              <button
                type="submit"
                className="w-full text-light bg-background hover:bg-secondary duration-300 text-lg focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg  px-5 py-2.5 text-center "
              >
                  إظهار النتائج 
              </button>
            </form>
        </div>
      </Modal>
    </>
  );
};

export default ProductCardRent;
