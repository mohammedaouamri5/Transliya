import ProductCard from "./ProductCard";
import Grid from "@mui/material/Grid";
import truck from "../assets/home-background.jpg";
import { useState } from "react";

const Booking = () => {
  const [formData, setFormData] = useState({
    from: '',
    to: '',
  })

  const [selected, setSelected] = useState([]);
  const [show, setShow] = useState(false)
  const [next, setNext] = useState(false)

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
    e.preventDefault()
    console.log("from: " , formData.from)
    console.log("to: " , formData.to)
    setShow(true)
  }

  const trucks = [
    {
      name: "JAC",
      weight: 10,
    },
    {
      name: "Nigga",
      weight: 10,
    },
    {
      name: "giga nigga",
      weight: 10,
    },
    {
      name: "le fancy nigga",
      weight: 10,
    },
    {
      name: "the nigga of iftar",
      weight: 10,
    },
  ];
  return (
    <>
      <div className="w-full h-fit flex flex-col items-center justify-center relative">
        <div className={` ${next ? `hidden` : `block`} min-h-screen h-fit flex-col flex items-center justify-evenly w-full bg-background text-light text-end`}>
          <h1 className="text-center text-3xl m-10">إختر نوع المركبة</h1>
          <div className="flex w-[90%] flex-wrap gap-4 justify-center">
            {trucks.map((truck1, index) => (
              <div key={index} className={`flex-col w-1/4`}>
                <div
                  className={`w-full ${
                    selected.includes(truck1.name)
                      ? `border-white`
                      : "border-black"
                  }  duration-200 border-2 hover:border-white rounded-xl`}
                  onClick={() => handleSelected(truck1.name)}
                >
                  <img className="w-full rounded-xl" src={truck} alt="truck" />
                </div>
                <p className="text-center text-2xl"> {truck1.name} </p>
              </div>
            ))}
          </div>

          <button className='px-4 py-2 rounded flex bg-white text-background text-sm font-bold hover:bg-light duration-500' onClick={(e) => {setNext(true)}}> التالي</button>
        </div>


        <div className={`${next ? `block` : `hidden`} min-h-screen h-fit flex-col flex items-center justify-evenly w-full bg-background text-light text-end`}>
          <div className=" p-10 ">
            <form className="space-y-4 md:space-y-6 w-full" onSubmit={handleSubmit}>
              <h1 className="text-center text-3xl">إملأ المعلومات اللازمة</h1>
              <div className="flex gap-2 justify-between">
                <div className="w-[48%]">
                  <label className="block mb-2 text-sm font-medium text-light ">
                    إلى
                  </label>
                  <input
                    type="text"
                    name="to"
                    id="to"
                    dir="rtl"
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-background sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    placeholder="name@company.com"
                    required=""
                  />
                </div>
                <div className="w-[48%]">
                  <label className="block mb-2 text-sm font-medium text-light ">
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
                    required=""
                  />
                </div>
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-light ">
                  من
                </label>
                <input
                  type="text"
                  name="from"
                  id="from"
                  dir="rtl"
                  placeholder="اختر نقطة بداية التوصيل"
                  className="bg-gray-50 border border-gray-300 text-background sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                  required=""
                />
              </div>

              <button
                type="submit"
                className="w-full text-background bg-white hover:bg-light duration-300 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
              >
                إظهار النتائج
              </button>
            </form>
          </div>
          <button className='px-4 py-2 rounded flex bg-white text-background text-sm font-bold hover:bg-light duration-500' onClick={(e) => {setNext(false)}}> الرجوع لاختيار المركبات</button>

        </div>
        <div className={`w-[90%] ${show ? `block` : `hidden`} flex items-center`}>
          <Grid container columns={{ xs: 1, sm: 8, md: 12 }}>
            {Array.from(Array(10)).map((_, index) => (
              <Grid item xs={2} sm={4} md={4} key={index}>
                <ProductCard />
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
    </>
  );
};

export default Booking;
