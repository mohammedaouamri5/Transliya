import { FaTruck } from "react-icons/fa";
import { FaWeightHanging } from "react-icons/fa";
import { Modal } from "@mui/material";
import { useEffect, useState } from "react";
import LongCard from "./LongCard";
import axios from "axios";
import DFM from "../assets/DFM.jpg";
import jac5 from "../assets/jac3ton.jpg";
import cam20 from "../assets/camion20ton.jpg";
import { Button, MenuItem, Select, TextField, Typography } from '@mui/material';
import Box from "@mui/material/Box";
import MapboxComponent from "./Mapbox";

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

const ProductCard = ({ userData, token, types }) => {

  console.log(userData);
  const user = JSON.parse(localStorage.getItem("user"));
  const id_employer = userData.id_employer.id_employer.id;
  const matricule = userData.matricule;
  const [material, setMat] = useState() 


  const materials = [
    {
      name: "grafi",
      value: 1,
    },
    { name: "sima",
      value: 2,

    },
    { name: "rmel",
      value: 3,

    },
    { name: "sabl",
      value: 4,

    }
  ]
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState([]);

  const [form, setForm] = useState({
    from_lon: "",
    from_lat: "",
    to_lon: "",
    to_lat: "",
    distention: "",
    matricule_car: matricule,
    id_zaboun: "",
  });

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

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    console.log(form);
  }, [form]);

  const handleBooking = async () => {
    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/API/create_tewsila",
        {
          ...form,
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
              id_notification_type: 1,
            },
            {
              headers: { Authorization: `Token ${token}` },
            }
          );
        } catch (error) {}
      }
    } catch (error) {}
  };

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



  const id_car_type = userData.id_car_type;
  const truck = trucks.find((truck) => truck.id_car_type === id_car_type);
  const carType = types.find(
    (type) => type.id_car_type === userData.id_car_type
  );

  const defaultImage = trucks.length > 0 ? trucks[0].photo : null;

  return (
    <>
      <div className="h-auto w-auto   bg-light p-2 text-background m-5 rounded-lg text-end shadow-md shadow-light">
        <div className={`h-[45%]  w-full`}>
          {" "}
          <img
            src={truck ? truck.photo : defaultImage}
            alt=""
            className="h-[auto] max-w-full"
          />{" "}
        </div>
        <div className="p-4  w-full text-xl h-[55%]">
          <h2 className="mb-2">
            {carType ? carType.name_car_type : "اسم الشاحنة"}
          </h2>
          <div className="flex flex-wrap w-full justify-end h-fit border-b border-background pb-4">
            <span className="mr-5 flex gap-2 items-center">
              {carType ? carType.name_car_type : "اسم الشاحنة"} <FaTruck />
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
                className="px-4 py-2 rounded flex bg-background text-light text-xs md:text-sm font-bold hover:bg-secondary duration-200"
              >
                المزيد
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
          <Box sx={style} className="rounded-lg">
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
                      onClick={handleBooking}
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

                <div className="flex flex-col w-full justify-between items-end mb-5">
                  <div className="w-[30%]">
                    <h1 className="text-xl font-bold my-5">المادة</h1>
                  </div>
                  <Select
                    className="w-[100%]"
                    name="weight"
                    value={material}
                    onChange={() => {setMat(e.target.value)}}
                    displayEmpty
                    placeholder="المادة"
                    inputProps={{ "aria-label": "Without label" }}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {materials.map((material, index) => (
                      <MenuItem key={index} value={material.value}>
                        {material.name}
                      </MenuItem>
                    ))}
                  </Select>
                </div>

                <MapboxComponent
                  user={user}
                  userData={userData}
                  setShow={setShow}
                  setForm={setForm}
                />
              </>
            )}
          </Box>
        </div>
      </Modal>
    </>
  );
};

export default ProductCard;
