import React from "react";

const Home = () => {
  return (
    <>
      <div className="relative h-[90vh] bg-hero w-full bg-cover z-0]">
        <div class="absolute inset-0 bg-black opacity-60"></div>
        <div className="h-full w-full flex items-center relative">
          <div className="w-[85%] h-[70%] m-auto">
            <div className="w-[50%]">
              <div className="flex-col">
                <h1 className="text-white text-5xl font-bold leading-snug">
                  This is a placeholder for some header for later Maybe
                </h1>
                <br />
                <p className="text-light">Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident cumque alias autem, eum perferendis porro commodi corrupti doloremque minus eveniet.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="relative h-[90vh] w-full bg-background text-light flex items-center">
        <div className="w-[80%] h-[80%] m-auto flex">
          <h1 className="text-6xl"> 
            <span className="text-primary">Translya</span> is the place where the user and tehe 5adam connect to satisfy each other bla bla
          </h1>
        </div>
      </div>
    </>
  );
};

export default Home;
