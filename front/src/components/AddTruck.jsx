import React, { useEffect, useState } from 'react';
import { Button, MenuItem, Select, TextField, Typography } from '@mui/material';
import axios from 'axios';

const weightOptions = {
  1: [
    { value: 10, label: 'Ten' },
    { value: 20, label: 'Twenty' },
    { value: 30, label: 'Thirty' },
  ],
  2: [
    { value: 40, label: 'Forty' },
    { value: 50, label: 'Fifty' },
    { value: 60, label: 'Sixty' },
  ],
  3: [
    { value: 70, label: 'Seventy' },
    { value: 80, label: 'Eighty' },
    { value: 90, label: 'Ninety' },
  ],
};

const AddTruck = ({ employer }) => {
  const [truckData, setTruckData] = useState([]);
  const token = localStorage.getItem('token');

  const [formData, setFormData] = useState({
    matricule_car: '',
    name: '',
    id_type_car: '',
    weight: '',
    photos: [], // Array to store selected files
  });

  const id_employer = employer.id;

  const getWeights = () => {
    return weightOptions[formData.id_type_car] || [];
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleImageChange = (event) => {
    // Handle multiple image selection
    const files = Array.from(event.target.files);
    setFormData({ ...formData, photos: files });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('id_employer', id_employer);
    formDataToSend.append('id_type_car', formData.id_type_car);
    formDataToSend.append('matricule_car', formData.matricule_car);

    // Append each image file to formDataToSend
    formData.photos.forEach((file, index) => {
      formDataToSend.append(`photos[${index}]`, file);
    });

    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/API/create_caremployer',
        formDataToSend,
        { headers: { Authorization: `token ${token}` } }
      );

      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Fetch car types on component mount
  useEffect(() => {
    const fetchCarTypes = async () => {
      try {
        const response = await axios.get(
          'http://127.0.0.1:8000/API/get_all_car_type'
        );
        setTruckData(response.data.car_type);
      } catch (error) {
        console.error('Error fetching car types:', error);
      }
    };

    fetchCarTypes();
  }, []);

  return (
    <>
      <div className="w-full p-12">
        <h1 className="text-center text-4xl font-bold mb-8">Add a truck</h1>
        <form
          className="w-full p-12 border-2 border-background"
          onSubmit={handleSubmit}
        >
          <div className="flex w-full justify-between items-start mb-5">
            <div className="w-[30%]">
              <h1 className="text-xl font-bold">Name *</h1>
              <p className="text-[0.9rem]">
                Enter the name of the truck.
              </p>
            </div>
            <TextField
              className="w-[65%]"
              id="outlined-text-input"
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="flex w-full justify-between items-start mb-5">
            <div className="w-[30%]">
              <h1 className="text-xl font-bold">Type *</h1>
              <p className="text-[0.9rem]">
                Select the type of the truck.
              </p>
            </div>
            <Select
              className="w-[65%]"
              value={formData.id_type_car}
              name="id_type_car"
              onChange={handleChange}
              displayEmpty
              placeholder="Type"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {truckData.map((truck) => (
                <MenuItem key={truck.id_car_type} value={truck.id_car_type}>
                  {truck.name_car_type}
                </MenuItem>
              ))}
            </Select>
          </div>

          <div className="flex w-full justify-between items-start mb-5">
            <div className="w-[30%]">
              <h1 className="text-xl font-bold">Weight *</h1>
              <p className="text-[0.9rem]">
                Select the weight of the truck.
              </p>
            </div>
            <Select
              className="w-[65%]"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              displayEmpty
              placeholder="Weight"
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {getWeights().map((weight) => (
                <MenuItem key={weight.value} value={weight.value}>
                  {weight.label}
                </MenuItem>
              ))}
            </Select>
          </div>

          <div className="flex w-full justify-between items-start mb-5">
            <div className="w-[30%]">
              <h1 className="text-xl font-bold">Photos *</h1>
              <p className="text-[0.9rem]">
                Upload one or more photos of the truck.
              </p>
            </div>
            <input
              accept="image/*"
              id="image-upload"
              type="file"
              multiple
              onChange={handleImageChange}
              style={{ display: 'none' }}
            />
            <label htmlFor="image-upload">
              <Button variant="contained" component="span">
                Upload Images
              </Button>
            </label>
            {formData.photos.length > 0 && (
              <div className="mt-2">
                <Typography variant="subtitle1">Selected Images:</Typography>
                <ul>
                  {formData.photos.map((file, index) => (
                    <li key={index}>{file.name}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <Button type="submit" variant="contained" color="primary">
            Add Truck
          </Button>
        </form>
      </div>
    </>
  );
};

export default AddTruck;
