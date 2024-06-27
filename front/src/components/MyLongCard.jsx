import React, { useEffect, useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import DFM from "../assets/DFM.jpg";
import jac5 from "../assets/jac5ton.jpg";
import jac3 from "../assets/jac3ton.jpg";
import cam20 from "../assets/camion20ton.jpg";
import cam10 from "../assets/camion10ton.jpg";

const MyLongCard = ({ truckData, types }) => {
  const [state, setState] = useState("");
  const [carType, setCarType] = useState("");
  const [truck, setTruck] = useState("");

  const trucks = [
    {
      id_car_type: 5,
      name: "JAC 3 ton",
      subName: "JAC",
      weight: 3,
      photo: jac3,
    },
    {
      id_car_type: 6,
      name: "JAC 5 ton",
      subName: "JAC",
      weight: 5,
      photo: jac5,
    },
    {
      id_car_type: 4,
      name: "DFM",
      subName: "DFM",
      photo: DFM,
    },
    {
      id_car_type: 7,
      name: "Camion 10 ton",
      subName: "Camion",
      weight: 10,
      photo: cam10,
    },
    {
      id_car_type: 8,
      name: "Camion 20 ton",
      subName: "Camion",
      weight: 20,
      photo: cam20,
    },
  ];

  const theme = createTheme({
    components: {
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "white",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "white",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "white",
            },
            color: "white",
          },
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: {
            color: "white",
          },
        },
      },
      MuiSelect: {
        styleOverrides: {
          icon: {
            color: "white",
          },
        },
      },
      MuiMenuItem: {
        styleOverrides: {
          root: {
            color: "black",
          },
        },
      },
    },
  });

  useEffect(() => {
    if (trucks && types) {
      const truck = trucks.find((truck) => truck.id_car_type === id_car_type);
      const carType = types.find(
        (type) => type.id_car_type === truck.id_car_type
      );
      setCarType(carType);
      setTruck(truck);
    }
  }, [types]);

  const id_car_type = truckData.id_car_type;

  console.log("truck: ", truck);

  return (
    <>
      <ThemeProvider theme={theme}>
        <div className="p-3 w-full bg-background rounded-lg mb-5 flex text-end items-center justify-between text-light">
          <div className="p-2 text-light">
            <Select
              inputProps={{ "aria-label": "Without label" }}
              className="w-[100px] text-light"
              value={state}
              name="type"
              onChange={(e) => {
                setState(e.target.value);
              }}
              displayEmpty
              placeholder="Type"
            >
              <MenuItem value="">
                <em>اختيار</em>
              </MenuItem>
              <MenuItem value={"stoped"}>ناقل</MenuItem>
              <MenuItem value={"rent"}>كراء</MenuItem>
              <MenuItem value={"booking"}>توصيل</MenuItem>
            </Select>
          </div>
          <div className="p-2 flex items-center">
            <div>
              <h1 className="text-xl mb-2 w-fit">
                {truck ? truck.subName : "اسم الشاحنة"} : النوع
              </h1>
              <h1>{truck ? `${truck.weight} ton` : "اسم الشاحنة"} : الوزن</h1>
            </div>
            <div className="h-[100px] w-[200px] rounded-md ml-2">
              <img
                className="w-full h-full rounded-md"
                src={
                  truckData.image
                    ? `http://127.0.0.1:8000${truckData.image}`
                    : truck.photo
                }
                alt="truck"
              />
            </div>
          </div>
        </div>
      </ThemeProvider>
    </>
  );
};

export default MyLongCard;
