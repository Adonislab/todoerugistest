import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getTasksURL } from "../utils/api"; 
import axios from "axios";
import "../styles/Tache.css";

export default function Tache() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  

  useEffect(() => {
    const checkLoggedInUser = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (token) {
          const config = {
            headers: {
              "Authorization": `Bearer ${token}`
            }
          };
          await axios.get(getTasksURL(), config)
          setLoggedIn(true);
        }
        else {
          setLoggedIn(false);
        }
      }
      catch (error) {
        setLoggedIn(false);
      }
    };
    checkLoggedInUser();
  }, []);

  const handleTaskSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("accessToken");
      const config = {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      };
      const newTask = {
        title: taskTitle,
        description: taskDescription,
     
      };
      const response = await axios.post("http://127.0.0.1:8000/api/tasks/", newTask, config);
      console.log("Task added successfully:", response.data);
      // Réinitialiser les champs de formulaire après l'ajout de la tâche
      setTaskTitle("");
      setTaskDescription("");
      // Afficher un toast de succès
      toast.success("Tâche ajoutée avec succès !");
    } catch (error) {
      console.error("Error adding task:", error);
      // Afficher un toast d'erreur
      toast.error("Une erreur s'est produite lors de l'ajout de la tâche.");
    }
  };

  return (
    <div className="container">
      <ToastContainer />
      {isLoggedIn ? (
        <>
          <h2>Quelle tâche planifiez-vous ce jour ?</h2>
          <form onSubmit={handleTaskSubmit}>
            <div className="form-group">
              <label htmlFor="taskTitle">Titre de la tâche:</label>
              <input
                type="text"
                id="taskTitle"
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="taskDescription">Description de la tâche:</label>
              <textarea
                id="taskDescription"
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
                required
              />
            </div>
            <button type="submit">Ajoutez la tâche</button>
          </form>
        </>
      ) : (
        <h2>Veuillez vous connecter</h2>
      )}
    </div>
  );
}
