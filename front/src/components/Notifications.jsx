import React, { useEffect, useState } from "react";
import NotificationCard from "./NotificationCard";
import NotificationCardTew from "./NotificationCardTew";
import axios from "axios";
import NotificationsCardRes from "./NotificationsCardRes";
import NotificationsCardResNo from "./NotificationsCardResNo";

const Notifications = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user.id;
  const employer = JSON.parse(localStorage.getItem("employer"));
  const token = localStorage.getItem("token");
  const [selected, setSelected] = useState("me");
  const [Notifications, setNotifications] = useState();
  const [workNotifies, setWorkNotifies] = useState();
  const [myNotifies, setNotifies] = useState();

  useEffect(() => {
    const getNotifications = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/API/get_my_notification",
          {
            params: { id: userId, name: "" },
          }
        );
        if (response.status >= 200 && response.status <= 300) {
          console.log(response);
          setNotifications(response.data.notification);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getNotifications();
  }, [token, userId]);

  useEffect(() => {
    if (Notifications) {
      const work = Notifications.filter(
        (notification) =>
          notification.name_notification_type === "كراء" ||
          notification.name_notification_type === "توصيل"
      );

      const me = Notifications.filter(
        (notification) =>
          notification.name_notification_type === "قبول" ||
          notification.name_notification_type === "رفض"
      );
      setWorkNotifies(work);
      setNotifies(me);
    }
  }, [Notifications]);



  return (
    <>
      <div className="w-full justify-end flex mb-5">
        {employer && (
          <h1
            onClick={() => {
              setSelected("work");
            }}
            className={`w-fit ml-5 ${
              selected === "work" ? "border-b-2 border-accent" : "border-none"
            } cursor-pointer`}
          >
            إشعارات العمل
          </h1>
        )}
        <h1
          onClick={() => {
            setSelected("me");
          }}
          className={`w-fit ml-5 ${
            selected === "me" ? "border-b-2 border-accent" : "border-none"
          } cursor-pointer`}
        >
          إشعاراتي الخاصة
        </h1>
      </div>

      {selected === "work" ? (
        <div className="w-full flex flex-wrap">
          {workNotifies &&
            workNotifies.map((notify, index) =>
              notify.name_notification_type === "كراء" ? (
                <NotificationCard key={index} notify={notify} />
              ) : notify.name_notification_type === "توصيل" ? (
                <NotificationCardTew key={index} notify={notify} />
              ) : (
                ""
              )
            )}
        </div>
      ) : selected === "me" ? (
        <div className="w-full flex flex-wrap">
          {myNotifies &&
            myNotifies.map((notify, index) =>
              notify.name_notification_type === "قبول" ? (
                <NotificationsCardRes key={index} notify={notify} />
              ) : notify.name_notification_type === "رفض" ? (
                <NotificationsCardResNo key={index} notify={notify} />
              ) : (
                ""
              )
            )}
        </div>
      ) : (
        <h1>please select a type of notifications</h1>
      )}
      
    </>
  );
};

export default Notifications;
