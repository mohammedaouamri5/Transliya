import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import ProductCardRent from "./ProductCardRent";
import { useParams } from "react-router-dom";
import axios from "axios";
import { fetchCarTypes } from "../fetch/Data";

const RentResults = () => {
  const token = localStorage.getItem("token");

  const { ids } = useParams();
  const idsArray = ids.split(",").map((id) => parseInt(id.trim()));

  const [trucks, setTrucks] = useState([]);
  const [types, setTypes] = useState();

  useEffect(() => {
    fetchCarTypes(setTypes)
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
        console.log(response)
        setTrucks(response.data);
      } catch (error) {
        console.error("Error fetching results:", error);
      }
    };

    fetchTrucks();
  }, [token]);

  return (
    <>
      <div className="w-full ">
        <div className="w-full h-[30vh] flex items-center justify-center sm:h-[40vh] bg-white">
          <h1 className="text-4xl font-bold">نتائج البحث</h1>
        </div>
        <div className={`w-full py-20 px-10 bg-background flex items-center`}>
          {trucks.length > 0 ? (
            <Grid container columns={{ xs: 1, sm: 8, md: 12 }}>
              {trucks.map((truck, index) => (
                <Grid item xs={2} sm={4} md={4} key={index}>
                  <ProductCardRent userData={truck} token={token} types={types} />
                </Grid>
              ))}
            </Grid>
          ) : (
            "Loading"
          )}
        </div>
      </div>
    </>
  );
};

export default RentResults;
