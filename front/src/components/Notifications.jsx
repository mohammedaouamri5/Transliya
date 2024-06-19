import React, { useEffect, useState } from "react";
import NotificationCard from "./NotificationCard";
import axios from "axios";

const Notifications = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user.id;
  const token = localStorage.getItem("token");

  const [Notifications, setNptifications] = useState();

  useEffect(() => {
    const getNotifications = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/API/get_my_notification",
          {
            headers: {
              Authorization: `Token ${token}`,
            },
            params: { name: "", id: userId },
          }
        );
        if (response.status >= 200 && response.status <= 300) {
          console.log(response);
          setNptifications(response.data)
        }
      } catch (error) {
        console.log(error);
      }
    };
    getNotifications()
  }, [token, userId]);

  return (
    <>
      <div className="w-full flex flex-wrap">
        {Array.from(Array(10)).map((_, index) => (
          <NotificationCard key={index} />
        ))}
      </div>
    </>
  );
};

export default Notifications;
