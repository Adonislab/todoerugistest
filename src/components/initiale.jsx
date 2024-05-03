import { Link } from "react-router-dom";
import "../styles/Initale.css";
import plan from "../assets/planification.jpeg";

export default function initiale() {
  return (
    <>
        <section>
            <p className="img">
                <img src={plan}/>
            </p>
            <p>
                <h2>Votre plateforme pour une estion efficace des tâches</h2>
            
                La planification est une organisation selon un plan. Il est question de processus volontariste de 
                fixation des objectifs, suivi par une détermination des moyens et des ressources nécessaires pour 
                atteindre ces objectifs selon un calendrier donnant les étapes à franchir.
            </p>

            <p>
                <h3>Vous ne connaissez pas encore TodoApp.</h3> 
                <div>
                    <Link to="/register">Rejoingez-nous ?</Link> 
                    <Link to="/login">Connectez-vous ?</Link> 
                </div>
            </p>
        </section>
    </>
  )
}
