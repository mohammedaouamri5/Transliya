import React from "react";

const Home = () => {
  return (
    <>
      <div className="relative h-[90vh] bg-hero w-full bg-cover">
        <div class="absolute inset-0 bg-black opacity-60"></div>
        <div className="h-full w-full flex items-center relative">
          <div className="w-[85%] h-[70%] m-auto">
            <div className="w-[50%]">
              <div className="flex-col">
                <h1 className="text-white text-5xl font-bold leading-snug">
                  This is a placeholder for some header for later Maybe
                </h1>
                <p className="text-light">Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident cumque alias autem, eum perferendis porro commodi corrupti doloremque minus eveniet.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
