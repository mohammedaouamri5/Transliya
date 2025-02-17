import { FaTruck } from "react-icons/fa";
import { FaWeightHanging } from "react-icons/fa";
import { Checkbox, Modal } from "@mui/material";
import { useEffect, useState } from "react";
import LongCard from "./LongCard";
import axios from "axios";
import { MenuItem, Select, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import MapboxComponent from "./Mapbox";
import { AddBooking } from "../fetch/Services";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80vw", // Adjust width as needed
  maxHeight: "90vh", // Allow some padding around the edges
  overflowY: "auto", // Enable vertical scrolling if content overflows
  backgroundColor: "white",
  boxShadow: 24,
  textAlign: "end",
  p: 4,
};

const ProductCard = ({ userData, token, types }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const username = user.username;
  const employer_username = userData.id_employer.id_employer.username;
  const id_employer = userData.id_employer.id_employer.id;
  const matricule = userData.matricule_car;

  const [material, setMat] = useState("");
  const [weight, setWeight] = useState();
  const [info, setInfo] = useState();
  const [comment, setComment] = useState("");
  const [carType, setCarType] = useState("");
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState([]);
  const [price, setPrice] = useState(0);
  const [subName, setSubName] = useState("")


  const [form, setForm] = useState({
    from_lon: "",
    from_lat: "",
    to_lon: "",
    to_lat: "",
    distention: "",
    matricule_car: matricule,
    id_zaboun: "",
  });

  const [form1, setForma] = useState({
    start: "",
    end: "",
    distance: "",
  });

  const materials = [
    {
      name: "grafi",
      value: "grafi",
    },
    { name: "sima", value: "sima" },
    { name: "rmel", value: "rmel" },
    { name: "sabl", value: "sabl" },
  ];

  const generateTawsilaPDF = async () => {
    try {
      const data = {
        id_: 0,
        employer: employer_username,
        person: username,
        distance: form1.distance,
        produit: material,
        prix: price,
        poids: weight,
        employer_id: id_employer,
        person_id: user.id,
      };
      const response = await axios.post(
        "http://127.0.0.1:8000/API/tawsila_pdf/",
        data
      );
      const pdfUrl = `http://127.0.0.1:8000/${response.data.path}`;

      window.open(pdfUrl, "_blank");
    } catch (error) {
      console.error("Error generating tawsila PDF:", error);
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false)
    setShow(false)
   };

  const handleBooking = async () => {
    try {
      AddBooking(form, token, user.id, id_employer, 1, info, price);
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const info = JSON.stringify({
      weight: weight,
      phone: phone,
      material: material,
      start: form1.start,
      end: form1.end,
      matricule: matricule,
      price: price,
      distance: form.distance,
      type: "tew",
    });
    setInfo(info);
  }, [form1, material, weight, price, form]);

  useEffect(() => {
    if (types) {
      const carType = types.find(
        (type) => type.id_car_type === userData.id_car_type
      );
      if (carType) {
        setSubName(carType.name_car_type.split(' ')[0])
      }
      setCarType(carType);
    }
  }, [types]);


  const phone = userData.id_employer.id_employer.phonenumberp;

  return (
    userData && (
      <>
        <div className="h-auto w-auto bg-light p-2 text-background m-5 rounded-lg text-end shadow-md shadow-light">
          <div className={`h-[45%]  w-full`}>
            {" "}
            <img
              src={
                userData.image
                  ? `http://127.0.0.1:8000${userData.image}`
                  : `http://127.0.0.1:8000${carType.image}`
              }
              alt=""
              className="h-auto md:min-h-[170px] sm:min-h-[190px] min-h-[250px] lg:min-h-[220px] max-w-full"
              />{" "}
          </div>
          <div className="p-4  w-full text-xl h-[55%]">
            <h2 className="mb-2">
              {carType ? carType.name_car_type : "اسم الشاحنة"}
            </h2>
            <div className="flex flex-wrap w-full justify-end h-fit border-b border-background pb-4">
              <span className="mr-5 flex gap-2 items-center">
                {subName ? subName : "اسم الشاحنة"}
                <FaTruck />
              </span>
              <span className=" flex gap-2 items-center">
                {carType ? `${carType.car_poitds}` : "وزن الشاحنة"}
                <FaWeightHanging />
              </span>
            </div>
            <div className="flex w-full flex-col mt-2">

              <div className="flex justify-between">
                <button
                  onClick={handleOpen}
                  className="px-4 py-2 rounded flex bg-background text-light text-xs md:text-sm font-bold hover:bg-accent duration-200"
                >
                  المزيد
                </button>
              </div>
            </div>
          </div>
        </div>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <div className="absolute top-1/2 left-1/2 transform rounded -translate-x-1/2 -translate-y-1/2 bg-light text-end w-[400px] sm:w-[600px] p-5">
            <Box sx={style} className="rounded-lg">
              {show ? (
                <>
                  <div>
                    <h1 className="mb-8 text-3xl font-bold">
                      اختر طريقة الدفع
                    </h1>
                    <div className="flex w-full mb-5 justify-evenly">
                      <div
                        className={` ${
                          selected.includes("dhahabiya")
                            ? `border-black`
                            : "border-white"
                        }  duration-200 border-2  hover:border-black p-1 rounded-xl`}
                        onClick={() => setSelected("dhahabiya")}
                      >
                        <img
                          className="h-20 rounded-xl"
                          src="https://estorm.ooredoo.dz/e-payment/assets/img/EI.png"
                          alt="truck"
                        />
                      </div>

                      <div
                        className={` ${
                          selected.includes("CIB")
                            ? `border-black`
                            : "border-white"
                        }  duration-200 border-2  hover:border-black p-1 rounded-xl`}
                        onClick={() => setSelected("CIB")}
                      >
                        <img
                          className="h-20 rounded-xl"
                          src="https://estorm.ooredoo.dz/e-payment/assets/img/CIB.png"
                          alt="truck"
                        />
                      </div>
                    </div>
                    <div className="mb-5">
                      <h1 className="text-lg mb-2">رقم البطاقة</h1>
                      <input
                        type="text"
                        dir="rtl"
                        className="bg-whit mb-5 border border-gray-300 text-background sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                      />
                      <div className="flex w-full justify-between">
                        <div className="w-[48%]">
                          <h1 className="text-lg mb-2">تاريخ نهاية الصلاحية</h1>
                          <input
                            type="text"
                            dir="rtl"
                            className="bg-whit  border border-gray-300 text-background sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                          />
                        </div>
                        <div className="w-[48%]">
                          <h1 className="text-lg mb-2 ">CVV</h1>
                          <input
                            type="text"
                            dir="rtl"
                            className="bg-whit  border border-gray-300 text-background sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                          />
                        </div>
                      </div>
                    </div>
                    <div className="w-full flex justify-between">
                      <button
                        onClick={() => {
                          handleBooking()
                          setShow(false)
                        }}
                        className="w-[48%] text-light bg-background hover:bg-accent duration-300 text-lg focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg  px-5 py-2.5 text-center "
                      >
                        تأكيد الدفع
                      </button>
                      <button
                        onClick={generateTawsilaPDF}
                        className="w-[48%] text-light bg-background hover:bg-accent duration-300 text-lg focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg  px-5 py-2.5 text-center "
                      >
                        حمل الفاتورة
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <LongCard
                    photo={
                      userData.image
                        ? `http://127.0.0.1:8000${userData.image}`
                        : `http://127.0.0.1:8000${carType.image}`
                    }
                    name={subName ? subName : "اسم الشاحنة"}
                    weight={carType ? `${carType.car_poitds}  ton` : "وزن الشاحنة"}
                  />

                  <div className="flex flex-col w-full justify-between items-end mb-5">
                    <div className="w-[30%]">
                      <h1 className="text-xl font-bold my-5">المادة</h1>
                    </div>
                    <Select
                      className="w-[100%]"
                      name="weight"
                      value={material}
                      onChange={(e) => {
                        setMat(e.target.value);
                      }}
                      displayEmpty
                      placeholder="المادة"
                      inputProps={{ "aria-label": "Without label" }}
                    >
                      <MenuItem value="" dir="rtl">
                        <em>لا شيء</em>
                      </MenuItem>
                      {materials.map((material, index) => (
                        <MenuItem dir="rtl" key={index} value={material.value}>
                          {material.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </div>

                  <div className="flex flex-col w-full justify-between items-end mb-5">
                    <div className="w-[30%]">
                      <h1 className="text-xl font-bold my-5"> kg الوزن بال </h1>
                    </div>
                    <TextField
                      id="outlined-number"
                      dir="rtl"
                      type="number"
                      className="w-full"
                      onChange={(e) => {
                        setWeight(e.target.value);
                      }}
                    />
                  </div>

          

                  <div className="flex flex-col w-full justify-between items-end mb-5">
                    <label className="block my-2 text-lg font-medium text-background ">
                      أضف ملاحظة
                    </label>
                    <textarea
                      type="text"
                      name="from"
                      id="from"
                      dir="rtl"
                      value={comment}
                      onChange={(e) => {
                        setComment(e.target.value);
                      }}
                      placeholder="أضف معلومات قد يحتاجها العامل"
                      className="bg-gray-50 border border-gray-300 text-background sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 h-[100px] block w-full p-2.5 "
                    />
                  </div>

                  <MapboxComponent
                    user={user}
                    userData={userData}
                    setShow={setShow}
                    setForm={setForm}
                    id_car_type={userData.id_car_type}
                    setForma={setForma}
                    setPrice1={setPrice}
                  />
                </>
              )}
            </Box>
          </div>
        </Modal>
      </>
    )
  );
};

export default ProductCard;
