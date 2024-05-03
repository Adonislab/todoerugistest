import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom"; // Importez useHistory
import { getLoginURL } from '../utils/api';
import "../styles/Login.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {
    const history = useHistory(); // Initialisez useHistory
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (isLoading) {
            return;
        }

        setIsLoading(true);

        try {
            const response = await axios.post(getLoginURL(), formData);
            console.log("Success!", response.data);
            toast.success("Connexion réussie !");
            localStorage.setItem("accessToken", response.data.tokens.access);
            localStorage.setItem("refreshToken", response.data.tokens.refresh);
            // Utilisez history.push pour rediriger vers une nouvelle route
            history.push("/");
        } catch (error) {
            console.log("Error during Login!", error.response?.data);
            if (error.response && error.response.data) {
                Object.keys(error.response.data).forEach(field => {
                    const errorMessages = error.response.data[field];
                    if (errorMessages && errorMessages.length > 0) {
                        toast.error(errorMessages[0]);
                    }
                });
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="form-container">
            <ToastContainer />
            <h2>Se connecter à son compte</h2>
            <form>
                <label>Email</label>
                <br />
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="input-field"
                />
                <br />
                <br />
                <label>Mot de passe</label>
                <br />
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="input-field"
                />
                <br />
                <br />
                <button
                    type="submit"
                    disabled={isLoading}
                    onClick={handleSubmit}
                    className="submit-button"
                >
                    Connexion
                </button>
            </form>
        </div>
    );
}
