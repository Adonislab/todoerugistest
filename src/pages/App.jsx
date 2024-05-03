import '../styles/App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home"
import Layout from './Layout';
import Register from './Register';
import Login from './Login'
import Tache from './Tache';
import UserTasks from './Task';


function App() {
  
  return (
    <BrowserRouter>
    <Routes>
     <Route path='/' element={<Layout/>}> 
     <Route index element={<Home/>}/>
     <Route path="task" element={<Tache/>}/>
     <Route path="login" element={<Login/>}/>
     <Route path="register" element={<Register/>}/>
     <Route path="tasks/:id/:username" element={<UserTasks/>} />
 
     </Route>
    </Routes>
    
    </BrowserRouter> 
  )
}

export default App
