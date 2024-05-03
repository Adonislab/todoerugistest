import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import "../styles/UserTask.css";
import image from "../assets/planification.jpeg";
import { getTasksDetailURL, getTaskDetailModifURL } from "../utils/api";

function UserTasks() {
    const [tasks, setTasks] = useState([]);
    const [selectedTask, setSelectedTask] = useState(null);
    const [editedTask, setEditedTask] = useState(null);
    const [filter, setFilter] = useState('all'); 
    const { id } = useParams();
    const { username } = useParams();

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');

        const fetchTasks = async () => {
            try {
                const response = await axios.get(getTasksDetailURL(id), {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                });
                console.log(response.data);
                setTasks(response.data);
            } catch (error) {
                console.error('Failed to fetch tasks:', error);
            }
        };

        fetchTasks();
    }, [id]);

    const confirmDeleteTask = (taskId) => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer cette tâche ?")) {
            deleteTask(taskId);
        }
    };

    const deleteTask = async (taskId) => {
        try {
            await axios.delete(getTaskDetailModifURL(taskId), {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            });
            setTasks(tasks.filter(task => task.id !== taskId));
            toast.success("Tâche supprimée avec succès !");
        } catch (error) {
            console.error('Failed to delete task:', error);
        }
    };

    const openEditModal = (task) => {
        setSelectedTask(task);
        setEditedTask({...task}); 
    };

    const closeEditModal = () => {
        setSelectedTask(null);
        setEditedTask(null); 
    };

    const handleEditChange = (e) => {
        const { name, value, checked, type } = e.target;
        setEditedTask(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const saveEditedTask = async () => {
        try {
            await axios.put(getTaskDetailModifURL(editedTask.id), editedTask, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            });
            setTasks(tasks.map(task => (task.id === editedTask.id ? editedTask : task)));
            closeEditModal();
            toast.success("Tâche modifiée avec succès !");
        } catch (error) {
            console.error('Failed to update task:', error);
        }
    };

    // Filtrer les tâches en fonction de l'état du filtre
    const filteredTasks = tasks.filter(task => {
        if (filter === 'completed') {
            return task.completed;
        } else if (filter === 'notCompleted') {
            return !task.completed;
        } else {
            return true; 
        }
    });

    return (
        <div>
            <ToastContainer /> 
            {/* Boutons de filtre */}
            <h3>Quelles sont les tâches ?</h3>
            <div className='Checkbox'>
                <label className="checkbox-label">
                    <input
                        type="checkbox"
                        checked={filter === 'all'}
                        onChange={() => setFilter('all')}
                    />
                    Toutes les tâches
                </label>
                <label className="checkbox-label">
                    <input
                        type="checkbox"
                        checked={filter === 'completed'}
                        onChange={() => setFilter('completed')}
                    />
                    Tâches finies
                </label>
                <label className="checkbox-label">
                    <input
                        type="checkbox"
                        checked={filter === 'notCompleted'}
                        onChange={() => setFilter('notCompleted')}
                    />
                    Tâches en cours
                </label>
            </div>
            {/* Modal de modification */}
            {selectedTask && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={closeEditModal}>&times;</span>
                        <h2>Modifier la tâche : {editedTask.title}</h2>
                        <input
                            type="text"
                            name="title"
                            value={editedTask.title}
                            onChange={handleEditChange}
                            placeholder="Titre"
                        />
                        <textarea
                            name="description"
                            value={editedTask.description}
                            onChange={handleEditChange}
                            placeholder="Description"
                        />
                        <label>
                            Mettre comme terminée :
                            <input
                                type="checkbox"
                                name="completed"
                                checked={editedTask.completed}
                                onChange={handleEditChange}
                            />
                        </label>
                        <label>
                            Mettre en favoris :
                            <input
                                type="checkbox"
                                name="favoris"
                                checked={editedTask.favoris}
                                onChange={handleEditChange}
                            />
                        </label>
                        <button onClick={saveEditedTask}>Enregistrez</button>
                    </div>
                </div>
            )}
            {/* Liste des tâches filtrées */}
            {filteredTasks.map(task => (
                <div key={task.id} className="user-task-card">
                    <p className="user-task-username">Tâche de : {username}</p>
                    <h3 className="user-task-title"> Titre : {task.title}</h3>
                    <p className="user-task-username">{task.completed ? "Tâche terminée" : "Tâche en cours"}</p>
                    <img src={image} alt={task.title} className="user-task-image" />
                    <p className="user-task-description">{task.description}</p>
                    <p className="user-task-username">{task.favoris ? "En favoris" : "Pas en favoris"}</p>
                    <div className="user-task-buttons">
                        <button className="user-task-button" onClick={() => openEditModal(task)}>Modifiez</button>
                        <button className="user-task-button" onClick={() => confirmDeleteTask(task.id)}>Supprimez</button>
                    </div>
                </div>
            ))}
        </div>
    );    
}

export default UserTasks;
