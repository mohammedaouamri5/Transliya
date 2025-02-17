import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Booking = () => {
  const user = JSON.parse(localStorage.getItem("user"))

  const navigate = useNavigate();
  const [selected, setSelected] = useState([]);
  const [types, setTypes] = useState()

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
    navigate(`/bookingresults/${selected.join(", ")}`);
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

  return (
    types &&
    <>
      <div className="w-full h-fit flex flex-col items-center justify-center relative">
        <div className="h-[30vh] sm:h-[40vh] w-full bg-white text-center flex items-center justify-center text-4xl text-bold">
          التوصيل
        </div>
        <div
          className={`  flex-col flex items-center justify-evenly w-full bg-background text-light text-end px-10 py-20`}
        >
          <h1 className="text-center text-3xl my-10">إختر نوع المركبة</h1>
          <div className="flex w-full p-8 flex-wrap justify-center">

            {types.map((truck, index) => (
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
                    src={`http://127.0.0.1:8000/${truck.image}`}
                    alt="truck"
                  />
                </div>
                <p className="text-center text-xl"> {truck.name_car_type}</p>
              </div>
            ))}

          </div>
          <button
            type="button"
            onClick={handleSubmit}
            className="w-[80%] text-background bg-white hover:text-light hover:bg-accent duration-300 text-lg focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg mb-5  px-5 py-2.5 text-center "
          >
            إظهار النتائج
          </button>{" "}
        </div>
      </div>
    </>
  );
};

export default Booking;
