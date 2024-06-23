import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { MdCloudUpload } from "react-icons/md";
import { useEffect, useState } from "react";
import axios from "axios";
import { TextField } from "@mui/material";



const AddTruck = ({ employer }) => {
  const [truckData, setTruckData] = useState([]);
  const [preview, setPreview] = useState();
  const [formData, setFormData] = useState({
    matricule_car: "",
    name: "",
    id_car_type: "",
    image: "",
  });

  const token = localStorage.getItem("token");
  console.log(token);



  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleFileChange = (event) => {
    if (event.target.files) {
      setPreview(URL.createObjectURL(event.target.files[0]));
    }
    setFormData({ ...formData, image: event.target.files[0] });
  };

  useEffect(() => {
    const fetchCarTypes = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/API/get_all_car_type"
        );
        setTruckData(response.data.car_type);
        console.log(response.data.car_type);
      } catch (error) {
        console.error("Error fetching car types:", error);
      }
    };

    fetchCarTypes();
  }, [employer.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id_employer = employer.id;
    const { matricule_car, id_car_type, image } = formData;

    console.log("image: ", image); // This should log the correct File object

    // Create a FormData object to handle file upload
    const formData2 = new FormData();

    formData2.append("id_employer", id_employer);
    formData2.append("id_car_type", id_car_type);
    formData2.append("matricule_car", matricule_car);
    formData2.append("image", image); // Append the file object here

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/API/create_caremployer",
        formData2,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Important for file uploads
            Authorization: `token ${token}`,
          },
        }
      );

      console.log("Response:", response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="w-full p-4">
        <h1 className="text-center text-4xl font-bold mb-8">اضافة شاحنة</h1>
        <form className="w-full p-4 text-end" onSubmit={handleSubmit}>
          <div className="flex flex-col w-full justify-between items-start mb-5">
            <div className="w-full mb-4">
              <h1 className="text-xl font-bold">اسم الشاحنة</h1>
            </div>
            <TextField
              className="w-full"
              id="outlined-text-input"
              type="text"
              dir="rtl"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col w-full justify-between items-start mb-5">
            <div className="w-full  mb-4 ">
              <h1 className="text-xl font-bold">النوع</h1>
            </div>
            <Select
              inputProps={{ "aria-label": "Without label" }}
              className="w-full"
              value={formData.id_car_type}
              name="id_car_type"
              onChange={handleChange}
              displayEmpty
              placeholder="Type"
            >
              <MenuItem dir="rtl" value="">
                <em>لا شيئ</em>
              </MenuItem>
              {truckData.map((truck) => (
                <MenuItem
                  dir="rtl"
                  key={truck.id_car_type}
                  value={truck.id_car_type}
                >
                  {truck.name_car_type}
                </MenuItem>
              ))}
            </Select>
          </div>

          <div className="flex flex-col w-full justify-between items-start mb-5">
            <div className="w-full mb-4">
              <h1 className="text-xl font-bold">رقم التسجيل</h1>
            </div>
            <TextField
              className="w-full"
              id="outlined-text-input"
              type="text"
              dir="rtl"
              name="matricule_car"
              placeholder="رقم تسجيل السيارة"
              value={formData.matricule_car}
              onChange={handleChange}
            />
          </div>

          <div className="flex w-full flex-col justify-between items-start mb-5">
            <div className="w-full  mb-4 ">
              <h1 className="text-xl font-bold">صورة</h1>
            </div>
            <form
              className={`${
                preview ? "w-fit h-fit" : "w-full h-[200px]"
              }  p-1 hover:text-background hover:border-background duration-200 flex items-center justify-center cursor-pointer border-dashed border-2 border-background`}
              onClick={() => {
                document.querySelector("#image-input").click();
              }}
            >
              <input
                id="image-input"
                accept="image/*"
                type="file"
                name="image"
                onChange={handleFileChange}
                className="hidden"
              />

              {preview ? (
                <img className="w-full h-auto" src={preview} alt="" />
              ) : (
                <MdCloudUpload className="text-3xl" />
              )}
            </form>
          </div>

          <div className="w-full flex justify-center items-center">
            <button
              type="submit"
              className="px-4 py-2 text-white bg-background rounded"
            >
              Add camion
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddTruck;
