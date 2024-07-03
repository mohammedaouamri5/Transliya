import React from "react";

const LongCard = ({ photo, name, weight, matricule }) => {
  return (
    <>
      <div className="p-3 w-full bg-background rounded-lg mb-5 flex text-end items-center justify-end text-light">
        <div className="flex-col items-center gap-8">
          <h1 className="text-xl mb-2 w-fit">{name} : نوع الشاحنة </h1>
          <h1 className="text-xl m-0 w-full text-end">
            {matricule
              ? `${matricule} : رقم التسجيل  `
              : weight
              ? ` ${weight} : وزن الشاحنة  `
              : ""}
          </h1>
        </div>
        <div className="p-2 flex items-center">
          <div className="h-[75px] w-[150px] rounded-md ml-2">
            <img className="w-full h-full rounded-md" src={photo} alt="truck" />
          </div>
        </div>
      </div>
    </>
  );
};

export default LongCard;
