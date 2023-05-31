import React from "react";

import Navbar from "../../../components/Navbar/Navbar";
import Sidebar from "../../../components/Sidebar/Sidebar";
import playIcon from "../../../assets/play-button-icon.jpg";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import AssessmentIcon from "@mui/icons-material/Assessment";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import moment from "moment";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Playlist() {
  const [videos, setVideos] = useState([]);

  console.log(videos);

  // const getPlayers = async () => {
  //   await axios
  //     .get(`http://64.227.170.236/video/playlist/`)
  //     .then(({ data }) => {
  //       console.log(data);
  //       setVideos(data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  const getPlayers = async () => {
    await axios
      .get(`/api/playlist/getPlaylists`)
      .then(({ data }) => {
        console.log(data);
        setVideos(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getPlayers();
  }, []);

  // const handleDelete = async (id) => {
  //   await axios
  //     .delete(`http://64.227.170.236/video/playlist/update/delete/${id}/`)
  //     .then((res) => {
  //       getPlayers();
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  const handleDelete = async (id) => {
    await axios
      .put(`/api/playlist/deletePlaylist`, { playlistId: id })
      .then((res) => {
        getPlayers();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="palyers">
      <Navbar />
      <div className="palyers-main">
        <Sidebar />
        <div className="palyers-main-container">
          <Link to="/addPlaylists" className="newPlayerButton">
            Create Playlist
          </Link>
          <div className="programsContainer">
            {videos?.map((e, index) => {
              return (
                <div className="programsBox" key={index}>
                  <img className="playIcon" src={playIcon} alt=""></img>
                  <div className="programsBox-main">
                    <div className="programsBox-title-div">
                      <span className="programsBox-title">{e.title}</span>
                      <div className="programsBox-button-div">
                        {/* <span className="duration">Duration: 00:00</span> */}
                        {/* <span className="duration">Publish Date: {moment(e.uploaded_at).format("DD/MM/YYYY ")}</span> */}
                        <span className="programsBox-button">Edit</span>
                      </div>
                    </div>
                    <div style={{ margin: "5px 0px", display: "flex", alignItems: "center" }}>
                      <span>Playlist Id: {e._id}</span>
                    </div>

                    <span className="programBox-details">
                      <Link to="/dashboard" className="link">
                        <li className="sidebarListItem active">
                          <BorderColorIcon className="sidebarIcon" />
                        </li>
                      </Link>
                      <Link to="/pendingApprovalsAdmin" className="link">
                        <li className="sidebarListItem">
                          <AssessmentIcon className="sidebarIcon" />
                        </li>
                      </Link>
                      <li className="sidebarListItem" onClick={() => handleDelete(e._id)}>
                        <DeleteIcon className="sidebarIcon" />
                      </li>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
