import React, { useEffect, useState } from "react";
import { IoMdNotifications } from "react-icons/io";
import { Box, Link, Modal, Rating } from "@mui/material";
import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80vw",
  maxHeight: "90vh",
  overflowY: "auto",
  boxShadow: 24,
  textAlign: "end",
  p: 4,
};

const NotificationsCardResNo = ({ notify }) => {
  console.log(notify);
  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    const fetchEmloyer = async () => {
      try {
        const res = await axios.get(
          `http://127.0.0.1:8000/API/employer/${notify.id_from}/`
        );
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    };

    fetchEmloyer();
  });

  //   const handleRating = async () => {
  //     const res = axios.
  //   }

  return (
    <>
      <div className="p-3 w-full bg-background rounded-lg mb-5 flex text-end items-center justify-between text-light ">
        <Link
          to={"/rent"}
          className="px-4 py-2  rounded flex bg-light text-background text-xs md:text-sm font-bold hover:bg-white  duration-200"
        >
          كراء{" "}
        </Link>
        <div className="flex items-center">
          <h1>تم رفض طلبك للكراء حاول مع عامل اخر </h1>{" "}
          <IoMdNotifications className="text-white ml-5" />
        </div>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="bg-background">
          <div className="flex items-center justify-center">
            <div className="w-[80%]">
              <h1 className="text-4xl text-center text-light font-bold my-7">
                أترك تقييما
              </h1>
              <div className="w-full flex justify-center mb-2">
                <Rating
                  className="text-4xl"
                  name="simple-controlled"
                  precision={0.5}
                  value={rating}
                  onChange={(event, newValue) => {
                    setRating(newValue);
                  }}
                />
              </div>
              <div>
                <label className="block my-2 text-lg font-medium text-light ">
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
                  placeholder="أضف مراجعة للخدمة"
                  className="bg-gray-50 border border-gray-300 text-light sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 h-[100px] block w-full p-2.5 "
                />
              </div>

              <div className="flex w-full items-center justify-center">
                <div className="flex w-auto">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="px-6 py-2 m-4 rounded flex bg-light text-background text-xs md:text-xl font-bold hover:bg-accent  duration-200"
                  >
                    تأكيد
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default NotificationsCardResNo;
