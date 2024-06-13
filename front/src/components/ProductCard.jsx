import { FaTruck } from "react-icons/fa";
import { FaWeightHanging } from "react-icons/fa";
import truck from "../assets/home-background.png";
import { Link } from "react-router-dom";

const ProductCard = () => {
  const url = "../assets/home-background.png";

  return (
    <>
      <div className="w-[300px] h-[350px] bg-background p-2 text-light m-5 rounded-lg text-end shadow-md shadow-black">
        <div
          className={`h-[45%] w-full bg-cover`}
          style={{ backgroundImage: `url(${truck})` }}
        ></div>
        <div className="p-4  w-full text-xl h-[55%]">
          <h2 className="mb-2">كاميون كبير هه</h2>
          <div className="flex flex-wrap w-full justify-end h-fit border-b border-white pb-4">
            <span className="mr-5 flex gap-2 items-center">
              Jac <FaTruck />
            </span>
            <span className=" flex gap-2 items-center">
              10 ton
              <FaWeightHanging />
            </span>
          </div>
          <div className="flex w-full flex-col mt-2">
            <p className="opacity-70 mb-2 text-lg">السعر</p>

            <div className="flex justify-between">
              <Link
                to={"/vehicles/details"}
                className="px-4 py-2 rounded flex bg-white text-background text-sm font-bold hover:bg-light duration-500"
              >
                المزيد
              </Link>
              <h1 className="text-2xl">2000 DZD</h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
