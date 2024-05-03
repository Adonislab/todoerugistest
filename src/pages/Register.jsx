import { useState } from "react";
import axios from "axios";
import "../styles/Register.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getRegisterURL } from '../utils/api'; 

export default function Register() {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password1: "",
        password2: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
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
            const response = await axios.post(getRegisterURL(), formData);
            console.log("Success!", response.data);
            toast.success("Inscription réussie !");
			
        } catch (error) {
            console.log("Error during registration!", error.response?.data);
            if (error.response && error.response.data) {
                Object.keys(error.response.data).forEach((field) => {
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
            <h2>Créer un nouveau compte</h2>
            <form>
                <label>Votre nom utilisateur</label>
                <br />
                <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="input-field"
                />
                <br />
                <br />
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
                    name="password1"
                    value={formData.password1}
                    onChange={handleChange}
                    className="input-field"
                />
                <br />
                <br />
                <label>Confirmez votre mot de passe</label>
                <br />
                <input
                    type="password"
                    name="password2"
                    value={formData.password2}
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
                    Inscription
                </button>
            </form>
        </div>
    );
}
