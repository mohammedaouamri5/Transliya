import React from "react";
import ReviewCard from "./ReviewCard";

const Home = () => {
  return (
    <>
      <div className="relative h-[90vh] bg-hero w-full bg-cover z-0]">
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="h-full w-full flex items-center relative md:justify-normal justify-center ">
          <div className="w-[85%] h-[70%] flex items-center md:justify-end md:text-end text-center justify-center">
            <div className="md:w-[60%] lg:[50%] w-full">
              <div className="flex-col">
              <h4 className="text-white text-5xl font-bold leading-snug arabic-text">
               هل تبحث عن شاحنة للنقل او الكراء؟ ترانسليا توفر لك حلولاً سهلة وسريعة من اجل ذلك
            </h4>
                <br />
                <p className="text-light arabic-text">
                      :ما يميزنا
              <br />
              سهولة الاستخدام: ما عليك سوى زيارة موقعنا الإلكتروني وطلب العرض الذي يناسبك.
              <br />
              مجموعة واسعة من الموردين: نتعاون مع شبكة واسعة من الموردين الموثوق بهم لضمان حصولك على أفضل خدمة ممكنة.
              <br />
              أسعار تنافسية: نقدم أسعارًا تنافسية اضافة الى عروض خاصة.
              <br />
              خدمة عملاء ممتازة: نحن ملتزمون بتقديم خدمة ممتازة لجميع عملائنا.
            </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="relative h-fit w-full bg-light text-background flex flex-col items-center p-4 gap-6">
        <div className="w-[80%] lg:w-[85%] h-fit m-auto md:flex-row flex justify-between text-end flex-col p-5 md:gap-0 gap-6 ">
        <h1 className="text-4xl md:hidden  w-full leading-snug px-2 font-bold">
            <span className="text-accent">Translya</span> 
          
          </h1>
            <p className="md:hidden w-full px-2 arabic-text">
          لماذا تختار ترانسليا؟
            <br />
            نوفر لك الوقت والمال: نوفر لك عناء البحث عن موردين موثوق بهم ومقارنة الأسعار.
            <br />
          نضمن لك راحة البال: نعمل فقط مع الموردين الموثوق بهم الذين نثق بقدرتهم على تقديم خدمة ممتازة.
          <br />
          نساعدك على دعم الشركات المحلية: عندما تستخدم ترانسليا، فإنك تدعم الشركات المحلية في منطقتك.
        <br />
            !لا تنتظر أكثر! اطلب عرضك اليوم
      </p>

          <p className="px-2 w-[47%] md:block hidden arabic-text">
          لماذا تختار ترانسليا؟
          <br />
          نوفر لك الوقت والمال: نوفر لك عناء البحث عن موردين موثوق بهم ومقارنة الأسعار
        <br />
          نضمن لك راحة البال: نعمل فقط مع الموردين الموثوق بهم الذين نثق بقدرتهم على تقديم خدمة ممتازة
        <br />
        نساعدك على دعم الشركات المحلية: عندما تستخدم ترانسليا، فإنك تدعم الشركات المحلية في منطقتك
        <br />
        !لا تنتظر أكثر! اطلب عرضك اليوم
      </p>

        <h1 className="text-4xl w-[47%] leading-snug px-2 font-bold hidden md:block arabic-text">
        <span className="text-accent"> كيف يعمل</span> :  ترانسليا
        <br />
        اطلب العرض الذي يناسبك: قم بزيارة موقعنا الإلكتروني وقدم لنا بعض المعلومات الأساسية عن احتياجاتك من النقل
          <br />
        حدد الطلب: اختر طلب خدمة نقل أو كراء لشاحنة ثم عين المسار أو مدة الكراء
        <br />
          تلقى عروض من موردينا: سيقوم موردونا المختلفين بتقديم معاملة راقية ذات جودة عالية
        <br />  
          استرخ واستمتع: اترك الباقي لنا! سيتولى المورد المختار عملية النقل بأكملها، من التحميل إلى التفريغ
      </h1>
            </div>
            <div className="flex flex-wrap lg:w-[85%] w-[95%] h-fit p-5 justify-between">
                <div className="sm:w-1/4 w-1/2 px-2 mb-2">
                <div className="px-2 py-9  bg-white text-background text-center leading-loose rounded-lg">
                    <h2 className="text-accent text-3xl mb-1">2000</h2>
                    <p>الطلبات المكتملة </p>
                </div>
              </div>
              <div className="sm:w-1/4 w-1/2 px-2 mb-2">
                <div className="px-2 py-9  bg-white text-background text-center leading-loose rounded-lg">
                    <h2 className="text-accent text-4xl mb-1">15</h2>
                    <p>سنوات الخبرة</p>
                </div>
              </div>
              <div className="sm:w-1/4 w-1/2 px-2 mb-2">
                <div className="px-2 py-9  bg-white text-background text-center leading-loose rounded-lg">
                    <h2 className="text-accent text-4xl mb-1">8745</h2>
                    <p>عملاء يثقون بنا</p>
                </div>
              </div>
              <div className="sm:w-1/4 w-1/2 px-2 mb-2">
                <div className="px-2 py-9  bg-white text-background text-center leading-loose rounded-lg">
                    <h2 className="text-accent text-4xl mb-1">235</h2>
                    <p>أسطول المركبات</p>
                </div>
              </div>
          </div>
      </div>
      < ReviewCard />
    </>
  );
};

export default Home;
