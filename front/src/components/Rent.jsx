import { useEffect, useState } from "react";
import DFM from "../assets/DFM.jpg";
import jac5 from "../assets/jac5ton.jpg";
import jac3 from "../assets/jac3ton.jpg";
import cam20 from "../assets/camion20ton.jpg";
import cam10 from "../assets/camion10ton.jpg";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Rent = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const id = user.id;
  const token = localStorage.getItem("token");

  const navigate = useNavigate();

  const [trucks, setTrucks] = useState([
    {
      name: "JAC 3 ton",
      weight: 3,
      photo: jac3,
    },
    {
      name: "JAC 5 ton",
      weight: 5,
      photo: jac5,
    },
    {
      name: "DFM 1 ton",
      weight: 1,
      photo: DFM,
    },
    {
      name: "Camion 10 ton",
      weight: 10,
      photo: cam10,
    },
    {
      name: "Camion 20 ton",
      weight: 20,
      photo: cam20,
    },
  ]);


  const [selected, setSelected] = useState([]);
  const [truckData, setTruckData] = useState([]);

  const handleSelected = (index) => {
    setSelected((prevSelected) => {
      if (prevSelected.includes(index)) {
        return prevSelected.filter((div) => div !== index);
      } else {
        return [...prevSelected, index];
      }
    });
  };

  const handleSubmit = () => {
    navigate(`/rentresults/${selected.join(", ")}`);
  };

  useEffect(() => {
    const fetchCarTypes = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/API/get_all_car_type"
        );
        const carTypes = response.data.car_type;

        // Merge fetched data with the trucks array
        const updatedTrucks = trucks.map((truck) => {
          const matchedCarType = carTypes.find((car) =>
            truck.name.includes(car.name_car_type)
          );
          return {
            ...truck,
            ...matchedCarType,
          };
        });

        setTruckData(updatedTrucks);
      } catch (error) {
        console.error("Error fetching car types:", error);
      }
    };

    fetchCarTypes();
  }, [user.id]);

  return (
    <>
      <div className="w-full h-fit flex flex-col items-center justify-center relative">
        <div className="h-[30vh] sm:h-[40vh] w-full bg-white text-center flex items-center justify-center text-4xl text-bold">
          الكراء
        </div>
        <div
          className={`  flex-col flex items-center justify-evenly w-full bg-background text-light text-end p-5`}
        >
          <h1 className="text-center text-3xl my-10">إختر نوع المركبة</h1>
          <div className="flex w-full p-8 flex-wrap justify-center">

            {truckData.map((truck, index) => (
              <div key={index} className={`flex-col p-3 w-[200px]`}>
                <div
                  className={`w-full ${
                    selected.includes(truck.id_car_type)
                      ? `border-white`
                      : "border-black"
                  }  duration-200 border-2  hover:border-white p-1 rounded-xl`}
                  onClick={() => handleSelected(truck.id_car_type)}
                >
                  <img
                    className="w-full h-[100px] rounded-xl"
                    src={truck.photo}
                    alt="truck"
                  />
                </div>
                <p className="text-center text-xl"> {truck.name}</p>
              </div>
            ))}
            
          </div>
          <button
            type="button"
            onClick={handleSubmit}
            className="w-[80%] text-background bg-white hover:bg-light duration-300 text-lg focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg mb-5  px-5 py-2.5 text-center "
          >
            إظهار النتائج
          </button>
        </div>
      </div>
    </>
  );
};

export default Rent;
