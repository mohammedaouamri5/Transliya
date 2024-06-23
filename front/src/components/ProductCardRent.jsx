import { FaTruck } from "react-icons/fa";
import { FaWeightHanging } from "react-icons/fa";
import { AddRent } from "../fetch/Services";
import { DownloadPDF } from "../fetch/DownloadPDF";
import { Checkbox, Modal, TextField } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import LongCard from "./LongCard";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Box from "@mui/material/Box";
import { RentPrice } from "../fetch/Price";

import dayjs from "dayjs";
import DFM from "../assets/DFM.jpg";
import jac5 from "../assets/jac5ton.jpg";
import jac3 from "../assets/jac3ton.jpg";
import cam20 from "../assets/camion20ton.jpg";
import cam10 from "../assets/camion10ton.jpg";
import axios from "axios";

const trucks = [
  {
    id_car_type: 3,
    name: "Camion 20 ton",
    weight: 20,
    photo: cam20,
  },
];

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

const ProductCardRent = ({ userData, token, types }) => {
  console.log(userData);

  const [info, setInfo] = useState();
  const [days, setDays] = useState(0);
  const [months, setMonths] = useState(0);
  const [isChecked, setIsChecked] = useState(false);


  const user = JSON.parse(localStorage.getItem("user"));
  console.log(userData.id_employer.id_employer.username);

  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState("");
  const [start, setStart] = useState(dayjs());
  const [end, setEnd] = useState(dayjs());
  const [comment, setComment] = useState("");
  const [price, setPrice] = useState(0);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDownload = () => {
    DownloadPDF(username, employer_username, "Rent", price);
  };

  const generateKeryaPDF = async () => {
    try {
      const data = {
        id_: 0,
        employer: employer_username,
        person: username,
        matricule: matricule,
        start: start,
        end: end,
        prix: price,
        poids: 0,
        employer_id: id_employer,
        person_id: user.id,
      };
      const response = await axios.post(
        "http://127.0.0.1:8000/API/kerya_pdf/",
        data
      );
      const pdfUrl = `http://127.0.0.1:8000/${response.data.path}`;

      // Use useNavigate for navigation (React Router v6+)
      window.open(pdfUrl, "_blank"); // Navigate to the generated PDF URL
    } catch (error) {
      console.error("Error generating tawsila PDF:", error);
    }
  };

  const handleCheckboxChange = () => {
    setIsChecked((prevChecked) => !prevChecked); // Toggle checkbox state
    if (isChecked) {
      setPrice(price - 2000);
    } else {
      setPrice(price + 2000);
    }
  };

  useEffect(() => {
    const info = JSON.stringify({
      start: start,
      end: end,
      comment: comment,
      phone: phone,
      matricule: matricule,
      type: "rent",
    });
    setInfo(info);
  }, [start, end, comment]);

  const calculateDifference = useCallback(() => {
    if (start && end) {
      const daysDiff = end.diff(start, "day");
      const monthsDiff = end.diff(start, "month");
      setDays(daysDiff);
      setMonths(monthsDiff);
    }
  }, [start, end]);

  useEffect(() => {
    calculateDifference();
  }, [calculateDifference]);

  const matricule = userData.matricule_car;

  const handleRent = async () => {
    try {
      AddRent(
        start,
        end,
        user.id,
        matricule,
        comment,
        token,
        id_employer,
        6,
        info
      );
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  const handleStartChange = (newValue) => {
    setStart(newValue);
  };

  const handleEndChange = (newValue) => {
    setEnd(newValue);
  };

  useEffect(() => {
    console.log(price);
    RentPrice(days, months, setPrice);
    console.log(price);
  }, [days, months]);

  const username = user.username;
  const employer_username = userData.id_employer.id_employer.username;
  const id_employer = userData.id_employer.id_employer.id;
  const phone = userData.id_employer.id_employer.phonenumberp;
  const id_car_type = userData.id_car_type;

  const truck = trucks.find((truck) => truck.id_car_type === id_car_type);
  const carType = types.find((type) => type.id_car_type === truck.id_car_type);

  console.log(months, days);

  return (
    <>
      <div className="h-auto w-auto   bg-light p-2 text-background m-5 rounded-lg text-end shadow-md shadow-light">
        <div className={`h-[45%] w-full`}>
          {" "}
          <img
            src={
              userData.image
                ? `http://127.0.0.1:8000${userData.image}`
                : truck.photo
            }
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
            <p className="opacity-70 mb-2text-sm md:text-md">السعر</p>

            <div className="flex justify-between">
              <button
                onClick={handleOpen}
                className="px-4 py-2 rounded flex bg-background text-light text-lg md:text-lg font-bold hover:bg-accent duration-500"
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
                  <div className="w-full flex justify-between">
                    <button
                      onClick={handleRent}
                      className="w-[48%] text-light bg-background hover:bg-accent duration-300 text-lg focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg  px-5 py-2.5 text-center "
                    >
                      تأكيد الدفع
                    </button>
                    <button
                      onClick={generateKeryaPDF}
                      className="w-[48%] text-light bg-background hover:bg-accent duration-300 text-lg focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg  px-5 py-2.5 text-center "
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
                          onChange={handleEndChange}
                        />
                      </div>
                      <div className="w-[48%]">
                        <label className="block mb-2 text-lg font-medium text-background ">
                          من
                        </label>
                        <DatePicker
                          value={start}
                          className="bg-gray-50 border border-gray-300 text-background sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                          onChange={handleStartChange}
                        />
                      </div>
                    </LocalizationProvider>
                  </div>
                  <div className="mb-5">
                    <label className="block my-2 text-lg font-medium text-background ">
                      السعر
                    </label>
                    <TextField
                      className="w-full bg-white rounded-lg"
                      id="outlined-read-only-input"
                      dir="rtl"
                      value={price}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
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
                  <div className="flex flex-col w-full justify-between items-end mb-5">
                    <div className="w-full flex justify-end">
                      <h1 className="text-xl font-bold my-5"> أضف رافعة</h1>
                      <Checkbox
                        checked={isChecked}
                        onChange={handleCheckboxChange}
                      />
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setShow(true);
                    }}
                    className="w-full text-light bg-background hover:bg-accent duration-300 text-lg focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg  px-5 py-2.5 text-center "
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
