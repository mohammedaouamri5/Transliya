import React, { useEffect, useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { createTheme, ThemeProvider } from "@mui/material/styles";


const MyLongCard = ({ truckData, types }) => {
  const [state, setState] = useState("");
  const [carType, setCarType] = useState("");
  const [subName, setSubName] = useState("")


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
    if (types) {
      const carType = types.find(
        (type) => type.id_car_type === truckData.id_car_type
      );
      if (carType) {
        setSubName(carType.name_car_type.split(' ')[0])
      }
      setCarType(carType);
    }
  }, [types]);
  
  

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
              <MenuItem value={"stoped"}>خامل</MenuItem>
              <MenuItem value={"rent"}>كراء</MenuItem>
              <MenuItem value={"booking"}>توصيل</MenuItem>
            </Select>
          </div>
          <div className="p-2 flex items-center">
            <div>
              <h1 className="text-xl mb-2 w-fit">
                {subName ? subName : "اسم الشاحنة"} : النوع
              </h1>
              <h1>{carType ? `${carType.car_poitds} ton` : "اسم الشاحنة"} : الوزن</h1>
            </div>
            <div className="h-[100px] w-[200px] rounded-md ml-2">
              <img
                className="w-full h-full rounded-md"
                src={
                  truckData.image
                    ? `http://127.0.0.1:8000${truckData.image}`
                    : `http://127.0.0.1:8000${carType.image}`
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
