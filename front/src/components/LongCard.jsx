import React from "react";


const LongCard = ({photo, name, weight}) => {
  return (
    <>
      <div className="p-3 w-full bg-background rounded-lg mb-5 flex text-end items-center justify-between text-light">
        <div className="p-2">

          <h1 className="mb-2">السعر</h1>
          
          <h1 className="text-2xl"> DZD 2000 </h1>

        </div>
        <div className="p-2 flex items-center">  
            <div>
            <h1 className="text-xl mb-2 w-fit">{name}</h1>
            <h1>{weight}</h1>
          </div>
          <div className="h-[75px] w-[150px] rounded-md ml-2">
            <img className="w-full h-full rounded-md" src={photo} alt="truck" />
          </div>
        
        </div>
      </div>
    </>
  );
};

export default LongCard;
