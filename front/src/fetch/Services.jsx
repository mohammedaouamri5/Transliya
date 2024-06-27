import axios from "axios";

export const AddRent = async (
  start,
  end,
  userId,
  matricule,
  comment,
  token,
  id_employer,
  notification,
  info,
  price
) => {
  try {
    console.log("info: ", info);
    const res = await axios.post(
      "http://127.0.0.1:8000/API/create_kerya",
      {
        t_started: start,
        t_ended: end,
        matricule_car: matricule,
        id_zaboun: userId,
        comment_Kerya: comment,
      },
      {
        headers: { Authorization: `Token ${token}` },
      }
    );
    console.log("info: ", info);

    if (res.status >= 200 && res.status <= 300) {
      try {
        console.log("info: ", info);

        const response = await axios.post(
          "http://127.0.0.1:8000/API/create_notification",
          {
            id_from: userId,
            id_to: id_employer,
            id_notification_type: notification,
            info: info,
          },
          {
            headers: { Authorization: `Token ${token}` },
          }
        );
      } catch (error) {}
    }
  } catch (error) {}
};

export const AddBooking = async (
  form,
  token,
  userId,
  id_employer,
  notification,
  info,
  price
) => {
  try {
    const res = await axios.post(
      "http://127.0.0.1:8000/API/create_tewsila",
      { ...form },
      {
        headers: { Authorization: `Token ${token}` },
      }
    );

    if (res.status >= 200 && res.status < 300) {
      const response = await axios.post(
        "http://127.0.0.1:8000/API/create_notification",
        {
          id_from: userId,
          id_to: id_employer,
          id_notification_type: notification,
          info: info,
        },
        {
          headers: { Authorization: `Token ${token}` },
        }
      );

      if (response.status >= 200 && response.status < 300) {
        try {
          const ress = await axios.post(
            "http://127.0.0.1:8000/API/get-pay",
            {
              prix: price,
              id_employer: id_employer,
            },
            {
              headers: {Authorization: `Token ${token}`}
            }
          );
          console.log(ress);
        } catch (error) {
          console.log("Error in get-pay request:", error);
        }
      }
    }
  } catch (error) {
    console.log("Error in create_tewsila or create_notification request:", error);
  }
};