import React from "react";
import Grid from "@mui/material/Grid";
import ProductCard from "./ProductCard";

const BookingResults = ( ) => {
  return (
    <>
      <div className="w-full">
        <div className="w-full h-[30vh] flex items-center justify-center sm:h-[40vh] bg-white">
          <h1 className="text-4xl font-bold">نتائج البحث</h1>
        </div>
        <div className={`w-full p-10 bg-background flex items-center`}>
          <Grid container columns={{ xs: 1, sm: 8, md: 12 }}>
            {Array.from(Array(10)).map((_, index) => (
              <Grid item xs={2} sm={4} md={4} key={index}>
                <ProductCard />
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
    </>
  );
};

export default BookingResults;
