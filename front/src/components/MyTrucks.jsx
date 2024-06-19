import React, { useEffect, useState } from "react";
import MyLongCard from "./MyLongCard";
import axios from "axios";
const MyTrucks = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [types, setTypes] = useState();
  const [trucks, setTrucks] = useState();

  useEffect(() => {
    const fetchTrucks = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/API/get_my_cars", {
          params: { id: user.id },
        });
        setTrucks(res.data.cars);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTrucks();
  }, [user.id]);

  useEffect(() => {
    const fetchCarTypes = async () => {
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

    fetchCarTypes();
  }, []);

  console.log(trucks);
  return (
    <>
      <div className="w-full flex flex-wrap">
        {trucks && types &&
          trucks.map((truck, index) => (
            <MyLongCard key={index} truckData={truck} types={types}/>
          ))}
      </div>
    </>
  );
};

export default MyTrucks;
