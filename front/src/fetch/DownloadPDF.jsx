import axios from "axios";

export const DownloadPDF = (username, employerName, type, price) => {
    const response = axios.get("http://127.0.0.1:8000/API/generate-pdf/", {
      params: {
        username: username,
        employerName: employerName,
        Type: type,
        price: price,
      },
    });
  };