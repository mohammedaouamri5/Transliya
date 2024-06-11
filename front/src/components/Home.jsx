import React from "react";
import ReviewCard from "./ReviewCard";

const Home = () => {
  return (
    <>
      <div className="relative h-[90vh] bg-hero w-full bg-cover z-0]">
        <div class="absolute inset-0 bg-black opacity-60"></div>
        <div className="h-full w-full flex items-center relative md:justify-normal justify-center ">
          <div className="w-[85%] h-[70%] flex items-center md:justify-end md:text-end text-center justify-center">
            <div className="md:w-[60%] lg:[50%] w-full">
              <div className="flex-col">
                <h1 className="text-white text-4xl md:text-5xl font-bold leading-snug ">
                  This is a placeholder for some header for later Maybe
                </h1>
                <br />
                <p className="text-light">Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident cumque alias autem, eum perferendis porro commodi corrupti doloremque minus eveniet.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="relative h-fit w-full bg-light text-background flex flex-col items-center p-4 gap-6">
        <div className="w-[80%] lg:w-[85%] h-fit m-auto md:flex-row flex justify-between text-end flex-col p-5 md:gap-0 gap-6 ">
        <h1 className="text-4xl md:hidden  w-full leading-snug px-2 font-bold">
            <span className="text-accent">Translya</span> hiya lblasa li ra7 yconnecti fiha l client m3a l5adam bi sohola
          </h1>
          <p className="md:hidden w-full px-2">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsam numquam quos delectus quis doloremque, aperiam corrupti, dolorem, fugiat doloribus repellat odio enim sapiente accusantium minus repudiandae eligendi obcaecati? Consectetur nulla ea necessitatibus praesentium iure laudantium nobis, commodi aliquam voluptate minus illum quos ipsam. Ipsum dolorem tenetur perferendis voluptate quo velit possimus ipsa! Error recusandae delectus odit harum pariatur atque et.</p>
          
          <p className="px-2 w-[47%] md:block hidden">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsam numquam quos delectus quis doloremque, aperiam corrupti, dolorem, fugiat doloribus repellat odio enim sapiente accusantium minus repudiandae eligendi obcaecati? Consectetur nulla ea necessitatibus praesentium iure laudantium nobis, commodi aliquam voluptate minus illum quos ipsam. Ipsum dolorem tenetur perferendis voluptate quo velit possimus ipsa! Error recusandae delectus odit harum pariatur atque et.</p>
          <h1 className="text-4xl w-[47%] leading-snug px-2 font-bold hidden md:block">
            <span className="text-accent">Translya</span> hiya lblasa li ra7 yconnecti fiha l client m3a l5adam bi sohola
          </h1>
        </div>
        <div className="flex flex-wrap lg:w-[85%] w-[95%] h-fit p-5 justify-between">
              <div className="sm:w-1/4 w-1/2 px-2 mb-2">
                <div className="px-2 py-9  bg-white text-background text-center leading-loose rounded-lg">
                    <h2 className="text-accent text-3xl mb-1">2000</h2>
                    <p>Completed Orders</p>
                </div>
              </div>
              <div className="sm:w-1/4 w-1/2 px-2 mb-2">
                <div className="px-2 py-9  bg-white text-background text-center leading-loose rounded-lg">
                    <h2 className="text-accent text-4xl mb-1">15</h2>
                    <p>Years Experience</p>
                </div>
              </div>
              <div className="sm:w-1/4 w-1/2 px-2 mb-2">
                <div className="px-2 py-9  bg-white text-background text-center leading-loose rounded-lg">
                    <h2 className="text-accent text-4xl mb-1">8745</h2>
                    <p>Happy Customers</p>
                </div>
              </div>
              <div className="sm:w-1/4 w-1/2 px-2 mb-2">
                <div className="px-2 py-9  bg-white text-background text-center leading-loose rounded-lg">
                    <h2 className="text-accent text-4xl mb-1">235</h2>
                    <p>Vehicles Fleet</p>
                </div>
              </div>
          </div>
      </div>
      < ReviewCard />
    </>
  );
};

export default Home;
