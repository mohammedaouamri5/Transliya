import React, { useState } from "react";
import truck from "../assets/home-background.jpg";
import { Modal } from "@mui/material";
import LongCard from "./LongCard";
import Box from "@mui/material/Box";

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

const NotificationCard = () => {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  return (
    <>
      <div className="p-3 w-full bg-background rounded-lg mb-5 flex text-end items-center justify-between text-light">
        <button
          onClick={handleOpen}
          className="px-4 py-2 rounded flex bg-light text-background text-xs md:text-sm font-bold hover:bg-white  duration-200"
        >
          التفاصيل
        </button>
        <div>
          <h1 className="text-xl">كراء</h1>
        </div>
        <div className="p-2 flex items-center">
          <div>
            <h1 className="text-xl mb-2 w-fit">اسم الشاحنة</h1>
            <h1>وزن الحمولة</h1>
          </div>
          <div className="h-[75px] w-[150px] rounded-md ml-2">
            <img className="w-full h-full rounded-md" src={truck} alt="truck" />
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
          <LongCard />
          <div>
            <h1 className="text-4xl font-bold my-7">نوع العملية : كراء</h1>
            <div className="flex gap-2 justify-between mb-4">
              <div className="w-[48%]">
                <label className="block mb-2 text-lg font-medium text-background">
                  إلى
                </label>
                <div className="bg-gray-50 border border-gray-300 text-background sm:text-lg rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5">
                  20/09/2015
                </div>
              </div>
              <div className="w-[48%]">
                <label className="block mb-2 text-lg font-medium text-background">
                  من
                </label>
                <div className="bg-gray-50 border border-gray-300 text-background sm:text-lg rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5">
                  10/05/2013
                </div>
              </div>
            </div>

            <div className="w-full mb-2">
              <label className="block mb-2 text-lg font-medium text-background">
                رقم الهاتف
              </label>
              <div className="bg-gray-50 border border-gray-300 text-background sm:text-lg rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5">
                029348345
              </div>
            </div>
            <div>
              <label className="block my-2 text-lg font-medium text-background">
                ملاحظة من عند الزبون
              </label>
              <div
                className="bg-gray-50 border border-gray-300 text-background sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 h-fit block w-full p-2.5"
              >
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur
                asperiores voluptas, nobis, magnam quam eos similique fugiat
                eligendi nesciunt consequuntur repellat non quos reiciendis
                assumenda corporis nihil quae blanditiis et quis quidem itaque
                ipsa eveniet dolore voluptatibus. Iusto, expedita aliquam
                facilis quod repellendus vitae rem deserunt quibusdam eum
                explicabo fugit illo, officia harum ut at quos libero tempore
                officiis itaque!
              </div>
            </div>
            <div className="flex w-full items-center justify-center">
              <div className="flex w-auto">
                <button className="px-4 py-2 m-2 rounded flex bg-background text-light text-xs md:text-xl font-bold hover:bg-secpndary  duration-200">
                  رفض
                </button>
                <button className="px-4 py-2 m-2 rounded flex bg-background text-light text-xs md:text-xl font-bold hover:bg-secondary  duration-200">
                  تأكيد
                </button>
                
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default NotificationCard;
