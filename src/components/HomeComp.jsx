import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getLogoutURL } from "../utils/api"; 
import downloadIcon from "../assets/person.png";
import "../styles/Home.css";

export default function HomeComp({ users }) {
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");

      if (accessToken && refreshToken) {
        const config = {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };
        toast.info('Vous serez déconnecté'); 
        await axios.post(
          getLogoutURL(),
          { refresh: refreshToken },
          config
        );
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        setLoggingOut(true);
        setTimeout(() => {
          window.location.href = "/login";
        }, 5000);
      }
    } catch (error) {
      console.error(
        "Failed to logout",
        error.response?.data || error.message
      );
    }
  };

  return (
    <>
      <ToastContainer />
      <h3>Profil</h3>
      <button onClick={handleLogout} className="logout-button" disabled={loggingOut}>
        {loggingOut ? "Déconnexion en cours..." : "Déconnexion"}
      </button>

      <div className="user-cards">
        {users.map((user) => (
          <div className="user-card" key={user.id}>
            <img src={downloadIcon} alt="Download" className="download-icon" />
            <Link to={`tasks/${user.id}/${user.username}`}>{user.username}</Link>
          </div>
        ))}
      </div>
    </>
  );
}
