import { List, ListItem, ListItemText } from "@mui/material";
import { Button, ConfigProvider } from "antd";
import axios from "axios";
import React, { useState, useEffect } from "react";
import css from "./annoncelist.module.css";

const AnnonceList = () => {
  const [announcements, setannouncementData] = useState({ annonces: [] });
  const newAnnouncementInterval = 24 * 60 * 60 * 1000; // 1 day in milliseconds

  useEffect(() => {
    fetchAnnouncements();
    const intervalId = setInterval(fetchAnnouncements, 10000); // fetch announcements every 10 seconds
    return () => clearInterval(intervalId); // cleanup function to clear interval on unmount
  }, []);

  const fetchAnnouncements = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/annonces");
      const sortedAnnouncements = response.data.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
      setannouncementData({ annonces: sortedAnnouncements });
    } catch (error) {
      console.error("API error:", error);
    }
  };

  // function pour differencier les nouvelles annonces des plus ancienne
  const renderTime = (date) => {
    const timeDiff = new Date() - new Date(date);
    const minutes = Math.floor(timeDiff / 60000);

    if (minutes < 60) {
      return (
        <span className={css.new}>
          {" "}
          <span>Nouveau</span> <span>{`${minutes}  min`}</span>
        </span>
      );
    } else if (minutes < 1440) {
      const hours = Math.floor(minutes / 60);
      return <span className={css.latest}>{`${hours} heures`}</span>;
    } else {
      return <span>Plus ancien</span>;
    }
  };

  return (
    <div>
      {typeof announcements.annonces === "undefined" ? (
        <p>Loading...</p>
      ) : (
        <div className={css.Container}>
          <List>
            {announcements.annonces.slice(0, 10).map((announcement) => {
              return (
                <div key={announcement.id}>
                  <ListItem className={css.Content}>
                    <div className={css.left}>
                      <div className={css.leftheader}>
                        {renderTime(announcement.date)}
                        <div>{announcement.prestation}</div>
                      </div>
                      <div className={css.offres}>
                        <span>{announcement.budget}</span> -{" "}
                        <span
                          className={
                            announcement.urgence === "Normal"
                              ? css.normal
                              : announcement.urgence === "Urgent"
                              ? css.urgent
                              : css.recurrent
                          }
                        >
                          {announcement.urgence}
                        </span>{" "}
                      </div>
                      <div className={css.desc}>{announcement.detail}</div>
                    </div>

                    <div className={css.right}>
                      <div>Profile: {announcement.profile}</div>
                    </div>
                  </ListItem>
                  <hr />
                </div>
              );
            })}
          </List>

          <div className={css.all_annoncements}>
            <ConfigProvider
              theme={{
                token: {
                  colorPrimary: "#FF7A00",
                },
              }}
            >
              <Button className={css.btn_annonce}>
                Voir toute les annonces
              </Button>
            </ConfigProvider>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnnonceList;
