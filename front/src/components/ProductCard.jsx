import { FaTruck } from "react-icons/fa";
import { FaWeightHanging } from "react-icons/fa";
import truck from "../assets/home-background.png";
import { Link } from "react-router-dom";

const ProductCard = () => {
  const url = "../assets/home-background.png";

  return (
    <>
      <div className="h-auto w-auto   bg-light p-2 text-background m-5 rounded-lg text-end shadow-md shadow-light">
        <div
          className={`h-[45%] w-full`}
        
        > <img src={truck} alt="" className="h-auto max-w-full"/> </div>
        <div className="p-4  w-full text-xl h-[55%]">
          <h2 className="mb-2">كاميون كبير هه</h2>
          <div className="flex flex-wrap w-full justify-end h-fit border-b border-background pb-4">
            <span className="mr-5 flex gap-2 items-center">
              Jac <FaTruck />
            </span>
            <span className=" flex gap-2 items-center">
              10 ton
              <FaWeightHanging />
            </span>
          </div>
          <div className="flex w-full flex-col mt-2">
            <p className="opacity-70 mb-2 text-sm md:text-md">السعر</p>

            <div className="flex justify-between">
              <Link
                to={"/vehicles/details"}
                className="px-4 py-2 rounded flex bg-background text-light text-xs md:text-sm font-bold hover:bg-secondary duration-500"
              >
                المزيد
              </Link>
              <h1 className="text-xl lg:text-2xl text-center p-1">2000 DZD</h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
