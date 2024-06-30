import React, { useEffect, useState } from "react";
import truck from "../assets/home-background.jpg";
import { Modal } from "@mui/material";
import LongCard from "./LongCard";
import Box from "@mui/material/Box";
import axios from "axios";

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


const NotificationCardTew = ({ notify }) => {
  console.log("notify: ", notify);
  const token = localStorage.getItem("token")
  const [open, setOpen] = useState(false);
  const [types, setTypes] = useState();
  const [truck, setTruck] = useState();
  const [carType, setCarType] = useState("");
  const [isLoading, setLoading] = useState(false)




  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const info = JSON.parse(notify.info);
  console.log(info);
  const { weight, phone, start, end, material, matricule, price } = info;

  useEffect(() => {
    const fetchCarTypes = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/API/get_all_car_type"
        );
        setTypes(response.data.car_type);
        console.log(response.data.car_type);
      } catch (error) {
        console.error("Error fetching car types:", error);
      }
    };
    fetchCarTypes();
  }, [notify]);

  useEffect(() => {
    const fetchCar = async () => {
      const res = await axios.get(
        `http://127.0.0.1:8000/API/car/${matricule}/`
      );
      setTruck(res.data);
    };
    fetchCar();
  }, [notify.id_notify]);

  useEffect(() => {
    if (types && truck) {
      const carType = types.find(
        (type) => type.id_car_type === truck.id_car_type
      );
      setCarType(carType);
    }
  }, [types]);

  const handleNotification = async (type) => {
    
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/API/create_notification",
        {
          id_from: notify.id_to,
          id_to: notify.id_from,
          id_notification_type: type,
        },
        {
          headers: { Authorization: `Token ${token}` },
        }
      );
      console.log("entered hh")

      console.log(response);

      if (response.status >= 200 && response.status < 300) {
        try {
          const res = await axios.post(
            "http://127.0.0.1:8000/API/mark_as_readed",
            {
              id_person: notify.id_to,
              id_notification: notify.id_notify,
            },
            {
              headers: {Authorization: `Token ${token}`}
            }
          );
          console.log(res);
        } catch (error) {
          console.log(error)
        }
      }
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    if (carType && truck && notify) {
      setLoading(true)
    }
  }, [carType, truck])

  console.log("loading: ", isLoading)
  return (
    isLoading && (
      <>
        <div className="p-3 w-full bg-background rounded-lg mb-5 flex text-end items-center justify-between text-light">
          <button
            onClick={handleOpen}
            className="px-4 py-2 rounded flex bg-light text-background text-xs md:text-sm font-bold hover:bg-accent  duration-200"
          >
            التفاصيل
          </button>
          <div>
            <h1 className="text-xl">{notify.name_notification_type}</h1>
          </div>
          <div className="p-2 flex items-center">
            <div>
              <h1 className="text-xl mb-2 w-fit">{carType.name_car_type}</h1>
              <h1>{matricule}</h1>
            </div>
            <div className="h-[75px] w-[150px] rounded-md ml-2">
              <img
                className="w-full h-full rounded-md"
                src={
                  truck.image
                    ? `http://127.0.0.1:8000/${truck.image}`
                    : `http://127.0.0.1:8000/${carType.image}`
                }
                alt="truck"
              />
            </div>
          </div>
        </div>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
           
              <LongCard
                photo={
                  truck.image
                    ? `http://127.0.0.1:8000/${truck.image}`
                    : `http://127.0.0.1:8000/${carType.image}`
                }
                price={price}
                name={carType.name_car_type}
                matricule={matricule}
              />
           
            <div>
              <h1 className="text-4xl font-bold my-7">
                نوع العملية : {notify.name_notification_type}
              </h1>
              <div className="flex gap-2 justify-between mb-4">
                <div className="w-[48%]">
                  <label className="block mb-2 text-lg font-medium text-background">
                    إلى
                  </label>
                  <div className="bg-gray-50 border border-gray-300 text-background sm:text-lg rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5">
                    {end}
                  </div>
                </div>
                <div className="w-[48%]">
                  <label className="block mb-2 text-lg font-medium text-background">
                    من
                  </label>
                  <div className="bg-gray-50 border border-gray-300 text-background sm:text-lg rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5">
                    {start}
                  </div>
                </div>
              </div>

              <div className="w-full mb-2">
                <label className="block mb-2 text-lg font-medium text-background">
                  رقم الهاتف
                </label>
                <div className="bg-gray-50 border border-gray-300 text-background sm:text-lg rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5">
                  {phone}
                </div>
              </div>
              <div className="w-full mb-2">
                <label className="block mb-2 text-lg font-medium text-background">
                  المادة{" "}
                </label>
                <div className="bg-gray-50 border border-gray-300 text-background sm:text-lg rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5">
                  {material}
                </div>
              </div>
              <div className="w-full mb-2">
                <label className="block mb-2 text-lg font-medium text-background">
                  الوزن{" "}
                </label>
                <div className="bg-gray-50 border border-gray-300 text-background sm:text-lg rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5">
                  {`${weight} kg`}
                </div>
              </div>
              <div className="flex w-full items-center justify-center">
                <div className="flex w-auto">
                  <button
                    onClick={() => {
                      handleNotification(4);
                    }}
                    className="px-4 py-2 m-2 rounded flex bg-background text-light text-xs md:text-xl font-bold hover:bg-accent  duration-200"
                  >
                    رفض
                  </button>

                  <button
                  type="button"
                    onClick={() => {
                     handleNotification(3);
                    }}
                    className="px-4 py-2 m-2 rounded flex bg-background text-light text-xs md:text-xl font-bold hover:bg-accent  duration-200"
                  >
                    تأكيد
                  </button>

                </div>
              </div>
            </div>
          </Box>
        </Modal>
      </>
    )
  );
};

export default NotificationCardTew;
