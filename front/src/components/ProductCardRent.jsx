import { FaTruck } from "react-icons/fa";
import { FaWeightHanging } from "react-icons/fa";
import truck from "../assets/home-background.png";
import { Modal } from "@mui/material";
import { useState } from "react";
import LongCard from "./LongCard";
import axios from "axios";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Box from "@mui/material/Box";
import DFM from "../assets/DFM.jpg";
import jac5 from "../assets/jac3ton.jpg";
import cam20 from "../assets/camion20ton.jpg";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80vw", // Adjust width as needed
  maxHeight: "90vh", // Allow some padding around the edges
  overflowY: "auto", // Enable vertical scrolling if content overflows
  backgroundColor: "white",
  boxShadow: 24,
  textAlign: "end",
  p: 4,
};

const ProductCardRent = ({ userData, token, types }) => {
  const trucks = [
    {
      id_car_type: 2,
      name: "JAC",
      weight: 5,
      photo: jac5,
    },
    {
      id_car_type: 1,
      name: "DFM",
      weight: 1,
      photo: DFM,
    },
    {
      id_car_type: 3,
      name: "Camion",
      weight: 10,
      photo: cam20,
    },
  ];

  const user = JSON.parse(localStorage.getItem("user"));
  console.log(userData.id_employer.id_employer.username);

  const id_employer = userData.id_employer.id_employer.id;
  const phone = userData.id_employer.id_employer.phonenumberp;

  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState("");
  const [start, setStart] = useState();
  const [end, setEnd] = useState();
  const [comment, setComment] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDownload = () => {
    const response = axios.get("http://127.0.0.1:8000/API/generate-pdf/", {
      params: {
        username: user.username,
        employerName: userData.id_employer.id_employer.username,
        Type: "Rent",
        price: 2000,
      },
    });
  };

  const handleRent = async () => {
    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/API/create_kerya",
        {
          t_started: start,
          t_ended: end,
          matricule_car: 165,
          id_zaboun: user.id,
          comment_Kerya: comment,
        },
        {
          headers: { Authorization: `Token ${token}` },
        }
      );

      if (res.status >= 200 && res.status <= 300) {
        console.log(res);
        try {
          const response = await axios.post(
            "http://127.0.0.1:8000/API/create_notification",
            {
              id_from: user.id,
              id_to: id_employer,
              id_notification_type: 2,
            },
            {
              headers: { Authorization: `Token ${token}` },
            }
          );
          handleClose();
        } catch (error) {}
      }
    } catch (error) {}
  };

  const id_car_type = userData.id_car_type;
  const truck = trucks.find((truck) => truck.id_car_type === id_car_type);
  const carType = types.find(
    (type) => type.id_car_type === userData.id_car_type
  );

  return (
    <>
      <div className="h-auto w-auto   bg-light p-2 text-background m-5 rounded-lg text-end shadow-md shadow-light">
        <div className={`h-[45%] w-full`}>
          {" "}
          <img
            src={truck ? truck.photo : defaultImage}
            alt=""
            className="h-auto max-w-full"
          />{" "}
        </div>
        <div className="p-4  w-full text-xl h-[55%]">
          <h2 className="mb-2">
            {carType ? carType.name_car_type : "اسم الشاحنة"}
          </h2>
          <div className="flex flex-wrap w-full justify-end h-fit border-b border-background pb-4">
            <span className="mr-5 flex gap-2 items-center">
              {carType ? carType.name_car_type : "اسم الشاحنة"}
              <FaTruck />
            </span>
            <span className=" flex gap-2 items-center">
              {carType ? `${carType.car_poitds} kg` : "وزن الشاحنة"}
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
          <Box sx={style}>
            {show ? (
              <>
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
                        selected.includes("CIB")
                          ? `border-black`
                          : "border-white"
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
                  <div className="w-full">
                    <button
                      onClick={handleRent}
                      className="w-[48%] text-light bg-background hover:bg-secondary duration-300 text-lg focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg  px-5 py-2.5 text-center "
                    >
                      تأكيد الدفع
                    </button>
                    <button
                      onClick={handleDownload}
                      className="w-[48%] text-light bg-background hover:bg-secondary duration-300 text-lg focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg  px-5 py-2.5 text-center "
                    >
                      حمل الفاتورة
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <LongCard
                  photo={truck ? truck.photo : defaultImage}
                  name={carType ? carType.name_car_type : "اسم الشاحنة"}
                  weight={carType ? `${carType.car_poitds} kg` : "وزن الشاحنة"}
                />
                <form className="space-y-4 px-5 md:space-y-6 w-full">
                  <div className="flex gap-2 justify-between">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <div className="w-[48%]">
                        <label className="block mb-2 text-lg font-medium text-background ">
                          إلى
                        </label>
                        <DatePicker
                          value={end}
                          className="bg-gray-50 border border-gray-300 text-background sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                          onChange={(newValue) => setEnd(newValue)}
                        />
                      </div>
                      <div className="w-[48%]">
                        <label className="block mb-2 text-lg font-medium text-background ">
                          من
                        </label>
                        <DatePicker
                          value={start}
                          className="bg-gray-50 border border-gray-300 text-background sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                          onChange={(newValue) => setStart(newValue)}
                        />
                      </div>
                    </LocalizationProvider>
                  </div>
                  {phone && (
                    <div>
                      <label className="block mb-2 text-lg font-medium text-background ">
                        رقم هاتف صاحب الشاحنة
                      </label>
                      <div className="bg-gray-50 border border-gray-300 text-background sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 ">
                        {phone}
                      </div>
                    </div>
                  )}
                  <div>
                    <label className="block my-2 text-lg font-medium text-background ">
                      أضف ملاحظة
                    </label>
                    <textarea
                      type="text"
                      name="from"
                      id="from"
                      dir="rtl"
                      value={comment}
                      onChange={(e) => {
                        setComment(e.target.value);
                      }}
                      placeholder="اختر نقطة بداية التوصيل"
                      className="bg-gray-50 border border-gray-300 text-background sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 h-[100px] block w-full p-2.5 "
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setShow(true);
                    }}
                    className="w-full text-light bg-background hover:bg-secondary duration-300 text-lg focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg  px-5 py-2.5 text-center "
                  >
                    الانتقال الى الدفع
                  </button>{" "}
                </form>
              </>
            )}
          </Box>
        </div>
      </Modal>
    </>
  );
};

export default ProductCardRent;
