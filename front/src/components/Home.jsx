import React from "react";
import ReviewCard from "./ReviewCard";
import { PiListChecksBold } from "react-icons/pi";
import { PiCursorClickFill } from "react-icons/pi";
import { MdLocalShipping } from "react-icons/md";
import { Link } from "react-router-dom";

const Home = () => {
  const user = localStorage.getItem("user");
  console.log(user);
  return (
    <>
      <div className="relative h-[90vh] bg-hero w-full bg-cover z-0]">
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="h-full w-full flex items-center relative md:justify-normal justify-center ">
          <div className="w-[85%] h-[70%] flex items-center md:justify-end md:text-end text-center justify-center">
            <div className="md:w-[60%] lg:w-[50%] w-full">
              <div className="flex-col">
                <h1 className="text-white text-3xl md:text-[43px] font-bold leading-snug arabic-text">
                  انقل ما تريد بسهولة وسيطر على المركبات الثقيلة مع ترانزليا{" "}
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
                <Link
                  to={"/booking"}
                  className="px-8 py-3 text-background text-lg hover:bg-light duration-200 rounded bg-white"
                >
                  احجز الآن
                </Link>
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
              <MdLocalShipping className="mb-4 text-5xl h-[30%]" />
                <h1 className="text-xl mb-4 font-bold h-[20%]">استرخ واستمتع</h1>
                <p className="text-accent mb-4 font-light h-[50%]">
                  {" "}
                اترك الباقي لنا! سيتولى المورد المختار عملية النقل بأكملها
                </p>
              </div>
            </div>
            </div>
          <div className="p-3 h-[50vh] md:h-[40vh] lg:h-[60vh] w-full lg:w-1/3 mt-4">
            <div className="  h-full bg-light text-background rounded-lg">
              <div className="w-full h-full m-auto p-5 flex flex-col justify-around items-center text-center">
                <PiCursorClickFill className="mb-4 text-5xl h-[30%]" />
                <h1 className="text-xl mb-4 font-bold h-[20%]">حدد الطلب</h1>
                <p className="text-accent mb-4 font-light h-[50%]">
                  {" "}
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

              <PiListChecksBold className="text-5xl h-[30%] mb-4" />
                <h1 className="text-xl mb-4 font-bold h-[20%]">
                  اطلب العرض الذي يناسبك
                </h1>
                <p className="text-accent font-light mb-4 h-[50%]">
                  {" "}
                  قم بزيارة موقعنا الإلكتروني وقدم لنا بعض المعلومات الأساسية عن
                  احتياجاتك من النقل
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
            ضمان أعلى مستويات الرضا والموثوقية.
          </p>
          <p className="w-[47%] hidden lg:block ">
            في ترانزليا، نحن ملتزمون بتقديم أعلى مستويات الجودة في خدمات نقل
            مواد البناء والمواد الثقيلة، بالإضافة إلى كراء المركبات الضخمة. نفخر
            بأن نكون الخيار الأول لعملائنا من خلال توفير حلول مبتكرة وفعالة تلبي
            احتياجاتهم بكل دقة واحترافية. بفضل فريقنا المتخصص وأسطولنا المتطور،
            نضمن لكم تجربة سلسة وآمنة، مما يتيح لكم التركيز على تحقيق نجاح
            مشاريعكم. نحن هنا لتقديم الدعم الكامل لكم في كل خطوة على الطريق، مع
            ضمان أعلى مستويات الرضا والموثوقية.
          </p>

          <h1 className="text-3xl w-[47%] leading-snug px-2 font-bold hidden lg:block">
            نقل وكراء بلا حدود، لأننا في
            <span className="text-accent"> ترانزليا </span>
            ملتزمون بتقديم خدمات لا مثيل لها في مجال النقل والكراء.
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
    </>
  );
};

export default Home;
