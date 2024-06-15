import { useState } from "react";
import DFM from "../assets/DFM.jpg";
import jac5 from "../assets/jac5ton.jpg";
import jac3 from "../assets/jac3ton.jpg";
import cam20 from "../assets/camion20ton.jpg";
import cam10 from "../assets/camion10ton.jpg";
import { Link } from "react-router-dom";

const Booking = () => {
  const [formData, setFormData] = useState({
    from: "",
    to: "",
  });

  const [selected, setSelected] = useState([]);

  const handleSelected = (index) => {
    setSelected((prevSelected) => {
      if (prevSelected.includes(index)) {
        return prevSelected.filter((div) => div !== index);
      } else {
        return [...prevSelected, index];
      }
    });
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("from: ", formData.from);
    console.log("to: ", formData.to);
  };

  const trucks = [
    {
      name: "JAC 3 ton",
      weight: 3,
      photo: jac3,
    },
    {
      name: "JAC 5 ton",
      weight: 5,
      photo: jac5,
    },
    {
      name: "DFM 1 ton",
      weight: 1,
      photo: DFM,
    },
    {
      name: "Camion 10 ton",
      weight: 10,
      photo: cam10,
    },
    {
      name: "Camion 20 ton",
      weight: 20,
      photo: cam20,
    },
  ];
  return (
    <>
      <div className="w-full h-fit flex flex-col items-center justify-center relative">
        <div className="h-[30vh] sm:h-[40vh] w-full bg-white text-center flex items-center justify-center text-4xl text-bold">
          التوصيل
        </div>
        <div
          className={`  flex-col flex items-center justify-evenly w-full bg-background text-light text-end p-5`}
        >
          <h1 className="text-center text-3xl my-10">إختر نوع المركبة</h1>
          <div className="flex w-full p-8 flex-wrap justify-center">
            {trucks.map((truck, index) => (
              <div key={index} className={`flex-col p-3 w-[200px]`}>
                <div
                  className={`w-full ${
                    selected.includes(truck.name)
                      ? `border-white`
                      : "border-black"
                  }  duration-200 border-2  hover:border-white p-1 rounded-xl`}
                  onClick={() => handleSelected(truck.name)}
                >
                  <img
                    className="w-full h-[100px] rounded-xl"
                    src={truck.photo}
                    alt="truck"
                  />
                </div>
                <p className="text-center text-xl"> {truck.name}</p>
              </div>
            ))}
          </div>
        </div>

        <div
          className={` h-fit flex-col p-10 flex items-center justify-evenly w-full relative bg-background text-light text-end`}
        >
          <div className="w-full sm:w-[90%] md:w-[80%]">
            <form
              className="space-y-4 px-5 md:space-y-6 w-full"
              onSubmit={handleSubmit}
            >
              <div className="flex gap-2 justify-between">
                <div className="w-[48%]">
                  <label className="block mb-2 text-lg font-medium text-light ">
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
                  <label className="block mb-2 text-lg font-medium text-light ">
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
{/* 
              <div>
                <label className="block my-2 text-lg font-medium text-light ">
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
              </div> */}
              <button
                
                type="submit"
                className="w-full text-background bg-white hover:bg-light duration-300 text-lg focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg  px-5 py-2.5 text-center "
              >
                <Link to={'/bookingresults'}>  إظهار النتائج</Link>
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Booking;
