import React, { useEffect, useState } from "react";
import ReviewCard from "./ReviewCard";
import { PiListChecksBold } from "react-icons/pi";
import { PiCursorClickFill } from "react-icons/pi";
import { MdLocalShipping } from "react-icons/md";
import { Link } from "react-router-dom";
import { Box, Modal } from "@mui/material";
import { useAuth } from "../context/AuthContext";
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


const Home = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user)
  const [open, setOpen] = useState(false);
  const { isAuthenticated } = useAuth();
  const [isAbonner, setAbonner] = useState(false);
  const [show, setShow] = useState(false);
  const [pay, setPay] = useState(false);
  const [selected, setSelected] = useState("");


  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
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
      console.log(isAbonner);
    }
  };

  return (
    <>
      <div className="relative h-[90vh] bg-hero w-full bg-cover z-0]">
        <div className="absolute inset-0 bg-black opacity-70"></div>
        <div className="h-full w-full flex items-center relative md:justify-normal justify-center ">
          <div className="w-[85%] h-[70%] flex items-center md:justify-end md:text-end text-center justify-center">
            <div className="md:w-[60%] lg:w-[50%] w-full">
              <div className="flex-col">
                <h1 className="text-white text-3xl md:text-[43px] font-bold leading-snug arabic-text">
                  انقل ما تريد بسهولة وسيطر على المركبات الثقيلة مع ترانزليا
                </h1>
                <br />
                <p className="text-light arabic-text">
                  يسر شركة ترانزليا أن تقدم لكم مجموعة متميزة من خدمات نقل مواد
                  البناء والمواد الثقيلة، بالإضافة إلى كراء المركبات الضخمة. كل
                  ما عليك فعله هو الضغط على الزر وتعبئة المعلومات المطلوبة للبدء
                  في استخدام خدمات النقل والكراء الخاصة بنا بسهولة ويسر. نحن هنا
                  لجعل عملية النقل والكراء أكثر سلاسة وكفاءة، مما يوفر عليك
                  الوقت والجهد. تواصل معنا الآن لتجربة الخدمة الأفضل في هذا
                  المجال
                </p>
                <br />

                {isAuthenticated ? (
                  isAbonner ? (
                    <Link
                      to={"/booking"}
                      className="px-8 py-3 text-light text-lg hover:bg-accent duration-200 rounded bg-background"
                    >
                      احجز الآن
                    </Link>
                  ) : (
                    <div className="w-full flex justify-end">
                      <div
                        onClick={handleShowOpen}
                        className="px-8 py-3 w-fit text-light text-lg hover:bg-accent duration-200 rounded bg-background cursor-pointer"
                      >
                        احجز الآن
                      </div>
                    </div>
                  )
                ) : (
                  <div className="w-full flex justify-end">
                    <div
                      onClick={handleOpen}
                      className="px-8 py-3 w-fit text-light text-lg hover:bg-accent duration-200 rounded bg-background cursor-pointer"
                    >
                      احجز الآن
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className=" w-full bg-background relative text-light p-10">
        <div className="w-[90%] md:w-[80%] flex flex-col justify-center items-center m-auto gap-6">
          <h1 className="m-5 text-4xl">كيف يعمل ترانزليا</h1>

          <div className="flex flex-row flex-wrap w-full items-center justify-between">
            <div className="p-3 h-[50vh] md:h-[40vh] lg:h-[60vh] w-full lg:w-1/3 mt-4">
              <div className="  h-full bg-light text-background rounded-lg flex items-center flex-col justify-between">
                <div className="w-full h-full m-auto p-5 flex flex-col justify-around items-center text-center">
                  <PiListChecksBold className="text-5xl text-accent h-[30%] mb-4" />
                  <h1 className="text-xl mb-4 font-bold h-[20%]">
                    اطلب العرض الذي يناسبك
                  </h1>
                  <p className="text-background font-light mb-4 h-[50%]">
                    قم بزيارة موقعنا الإلكتروني وقدم لنا بعض المعلومات الأساسية
                    عن احتياجاتك من النقل
                  </p>
                </div>
              </div>
            </div>
            <div className="p-3 h-[50vh] md:h-[40vh] lg:h-[60vh] w-full lg:w-1/3 mt-4">
              <div className="  h-full bg-light text-background rounded-lg">
                <div className="w-full h-full m-auto p-5 flex flex-col justify-around items-center text-center">
                  <PiCursorClickFill className="mb-4 text-accent text-5xl h-[30%]" />
                  <h1 className="text-xl mb-4 font-bold h-[20%]">حدد الطلب</h1>
                  <p className=" mb-4 font-light h-[50%]">
                    اختر طلب خدمة نقل أو كراء لشاحنة ثم عين المسار أو مدة الكراء
                    تلقى عروض من موردينا: سيقوم موردونا المختلفين بتقديم معاملة
                    راقية ذات جودة عالية
                  </p>
                </div>
              </div>
            </div>
            <div className="p-3 w-full h-[50vh] md:h-[40vh] lg:h-[60vh] lg:w-1/3 mt-4">
              <div className=" h-full bg-light text-background rounded-lg">
                <div className="w-full h-full m-auto p-5 flex flex-col justify-around items-center text-center">
                  <MdLocalShipping className="mb-4 text-accent text-5xl h-[30%]" />
                  <h1 className="text-xl mb-4 font-bold h-[20%]">
                    استرخ واستمتع
                  </h1>
                  <p className=" mb-4 font-light h-[50%]">
                    اترك الباقي لنا! سيتولى المورد المختار عملية النقل بأكملها
                 
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="relative h-fit w-full bg-light text-background flex flex-col items-center p-4 gap-6">
        <div className="w-[80%] lg:w-[85%] h-fit m-auto lg:flex-row text-center flex justify-between lg:text-end flex-col p-5 md:gap-0 gap-6 ">
          <h1 className="text-3xl lg:hidden  w-full leading-snug px-2 font-bold">
            نقل وكراء بلا حدود، لأننا في
            <span className="text-accent"> ترانزليا </span>
            ملتزمون بتقديم خدمات لا مثيل لها في مجال النقل والكراء
          </h1>

          <br />
          <p className="lg:hidden w-full px-2">
            في ترانزليا، نحن ملتزمون بتقديم أعلى مستويات الجودة في خدمات نقل
            مواد البناء والمواد الثقيلة، بالإضافة إلى كراء المركبات الضخمة. نفخر
            بأن نكون الخيار الأول لعملائنا من خلال توفير حلول مبتكرة وفعالة تلبي
            احتياجاتهم بكل دقة واحترافية. بفضل فريقنا المتخصص وأسطولنا المتطور،
            نضمن لكم تجربة سلسة وآمنة، مما يتيح لكم التركيز على تحقيق نجاح
            مشاريعكم. نحن هنا لتقديم الدعم الكامل لكم في كل خطوة على الطريق، مع
            ضمان أعلى مستويات الرضا والموثوقية
          </p>
          <p className="w-[47%] hidden lg:block ">
            في ترانزليا، نحن ملتزمون بتقديم أعلى مستويات الجودة في خدمات نقل
            مواد البناء والمواد الثقيلة، بالإضافة إلى كراء المركبات الضخمة. نفخر
            بأن نكون الخيار الأول لعملائنا من خلال توفير حلول مبتكرة وفعالة تلبي
            احتياجاتهم بكل دقة واحترافية. بفضل فريقنا المتخصص وأسطولنا المتطور،
            نضمن لكم تجربة سلسة وآمنة، مما يتيح لكم التركيز على تحقيق نجاح
            مشاريعكم. نحن هنا لتقديم الدعم الكامل لكم في كل خطوة على الطريق، مع
            ضمان أعلى مستويات الرضا والموثوقية
          </p>

          <h1 className="text-3xl w-[47%] leading-snug px-2 font-bold hidden lg:block">
            نقل وكراء بلا حدود، لأننا في
            <span className="text-accent"> ترانزليا </span>
            ملتزمون بتقديم خدمات لا مثيل لها في مجال النقل والكراء
          </h1>
        </div>
        <div className="flex flex-wrap lg:w-[85%] w-[95%] h-fit p-5 justify-between">
          <div className="sm:w-1/4 w-full px-2 mb-2">
            <div className="px-2 py-9  bg-white text-background text-center leading-loose rounded-lg">
              <h2 className="text-accent text-3xl mb-1">2000</h2>
              <p>الطلبات المكتملة </p>
            </div>
          </div>
          <div className=" sm:w-1/4 w-full px-2 mb-2">
            <div className="px-2 py-9 h-full bg-white text-background text-center leading-loose rounded-lg">
              <h2 className="text-accent text-4xl mb-1">15</h2>
              <p>سنوات الخبرة</p>
            </div>
          </div>
          <div className="sm:w-1/4 w-full px-2 mb-2">
            <div className="px-2 py-9  bg-white text-background text-center leading-loose rounded-lg">
              <h2 className="text-accent text-4xl mb-1">8745</h2>
              <p>عملاء يثقون بنا</p>
            </div>
          </div>
          <div className="sm:w-1/4 w-full px-2 mb-2">
            <div className="px-2 py-9  bg-white text-background text-center leading-loose rounded-lg">
              <h2 className="text-accent text-4xl mb-1">235</h2>
              <p>أسطول المركبات</p>
            </div>
          </div>
        </div>
      </div>
      <ReviewCard />

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="absolute top-1/2 left-1/2 transform rounded -translate-x-1/2 -translate-y-1/2 bg-background text-center  h-fit w-[400px] p-5">
          <h1 className="text-2xl text-light my-4">سجل الدخول أولا</h1>
          <div className="flex justify-center">
            <div className="px-6 py-2 my-5 text-md sm:text-lg bg-light text-background w-fit">
              <Link to={"/login"} onClick={handleClose}>
                تسجيل الدخول
              </Link>
            </div>
          </div>
        </div>
      </Modal>

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

export default Home;
