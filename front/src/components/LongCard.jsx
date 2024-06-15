import React from "react";
import truck from "../assets/home-background.jpg";

const LongCard = () => {
  return (
    <>
      <div className="p-3 w-full bg-background rounded-lg mb-5 flex text-end items-center justify-between text-light">
        <div className="p-2">

          <h1 className="mb-2">السعر</h1>
          
          <h1 className="text-2xl"> DZD 2000 </h1>

        </div>
        <div className="p-2 flex items-center">  
            <div>
            <h1 className="text-xl mb-2 w-fit">اسم الشاحنة</h1>
            <h1>وزن الشاحنة</h1>
          </div>
          <div className="h-[75px] w-[150px] rounded-md ml-2">
            <img className="w-full h-full rounded-md" src={truck} alt="truck" />
          </div>
        
        </div>
      </div>
    </>
  );
};

export default LongCard;
