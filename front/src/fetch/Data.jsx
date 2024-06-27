import axios from "axios";

export const fetchCarTypes = async (setTypes) => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/API/get_all_car_type"
      );
      setTypes(response.data.car_type);
      console.log(response.data.car_type);
    } catch (error) {
      console.error("Error fetching car types:", error);
    }
  };