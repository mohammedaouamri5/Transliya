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
  info
) => {

  try {
    console.log("info: ",info);

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
    console.log("info: ",info);


    if (res.status >= 200 && res.status <= 300) {
      try {
        console.log("info: ",info);

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
  info
) => {
  try {
    const res = await axios.post(
      "http://127.0.0.1:8000/API/create_tewsila",
      {
        ...form,
      },
      {
        headers: { Authorization: `Token ${token}` },
      }
    );

    if (res.status >= 200 && res.status <= 300) {
      console.log(res);
      try {
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
  } catch (error) {
    console.log(error);
  }
};
