import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Rent = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const [types, setTypes] = useState()
  const [selected, setSelected] = useState([]);
  const [carType, setCarType] = useState("");


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
        const types = response.data.car_type;
        // Merge fetched data with the trucks array
        setTypes(types)
      } catch (error) {
        console.error("Error fetching car types:", error);
      }
    };

    fetchCarTypes();
  }, [user.id]);

  useEffect(() => {
    if (types) {
      const carType = types.find(
        (type) => type.name_car_type === "Camion 20 ton"
      );
      setCarType(carType);
    }
  }, [types]);

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

            
              <div className={`flex-col p-3 w-[200px]`}>
                <div
                  className={`w-full ${
                    selected.includes(carType.id_car_type)
                      ? `border-white`
                      : "border-black"
                  }  duration-200 border-2  hover:border-white p-1 rounded-xl`}
                  onClick={() => handleSelected(carType.id_car_type)}
                >
                  <img
                    className="w-full h-[100px] rounded-xl"
                    src={`http://127.0.0.1:8000/${carType.image}`}
                    alt="truck"
                  />
                </div>
                <p className="text-center text-light text-xl"> {carType.name_car_type}</p>
              </div>
            
            
          </div>
          <button
            type="button"
            onClick={handleSubmit}
            className="w-[80%] text-background bg-light hover:bg-accent hover:text-light duration-200 text-lg focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg mb-5  px-5 py-2.5 text-center "
          >
            إظهار النتائج
          </button>
        </div>
      </div>
    </>
  );
};

export default Rent;
