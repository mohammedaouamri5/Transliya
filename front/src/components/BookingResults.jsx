import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import ProductCard from "./ProductCard";
import { useParams } from "react-router-dom";
import axios from "axios";

const BookingResults = () => {
  const token = localStorage.getItem("token");
  const { ids } = useParams();
  const idsArray = ids.split(",").map((id) => parseInt(id.trim()));

  const [trucks, setTrucks] = useState([]);
  const [types, setTypes] = useState();

  useEffect(() => {
    const fetchCarTypes = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/API/get_all_car_type"
        );
        setTypes(response.data.car_type);
      } catch (error) {
        console.error("Error fetching car types:", error);
      }
    };

    fetchCarTypes();
  }, []);

  useEffect(() => {
    const fetchTrucks = async () => {
      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/API/search_by_name",
          {
            cars_type_id: idsArray,
          },
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );
        setTrucks(response.data);
      } catch (error) {
        console.error("Error fetching results:", error);
      }
    };

    fetchTrucks();
  }, [token]);

  return (
    <>
      <div className="w-full">
        <div className="w-full h-[30vh] flex items-center justify-center sm:h-[40vh] bg-white">
          <h1 className="text-4xl font-bold">نتائج البحث</h1>
        </div>
        <div className={`w-full px-10 py-20 bg-background flex items-center`}>
          {trucks.length > 0 ? (
            <Grid container columns={{ xs: 1, sm: 8, md: 12 }}>
              {trucks.map((truck, index) => (
                <Grid item xs={2} sm={4} md={4} key={index}>
                  <ProductCard userData={truck} token={token} types={types} />
                </Grid>
              ))}
            </Grid>
          ) : (
            <>
              <div className="w-full text-center text-light text-3xl">لا يوجد مركبات من هذا النوع حاليا جرب اختيار نوع أو أنواع أخرى</div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default BookingResults;
