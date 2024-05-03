import { useState, useEffect } from 'react';
import axios from "axios";
import { getUsersURL } from '../utils/api';
import HomeComp from '../components/HomeComp';
import Initiale from '../components/initiale';
import UserTasks from '../components/UserTask';

export default function Home() {
  
  const [users, setUsers] = useState([]);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null); 

  useEffect (()=>{
    const checkLoggedInUser = async () =>{
      try{
        const token = localStorage.getItem("accessToken");
        if (token) {
          const config = {
            headers: {
              "Authorization":`Bearer ${token}`
            }
          };
          const response = await axios.get(getUsersURL(), config)
          setLoggedIn(true)
          setUsers(response.data); 
        }
        else{
          setLoggedIn(false);
          setUsers([]); 
        }
      }
      catch(error){
        setLoggedIn(false);
        setUsers([]); 
      }
    };
    checkLoggedInUser()
  }, [])

 

  return (
    <div>
      {isLoggedIn ? (
        selectedUserId ? ( 
          <UserTasks userId={selectedUserId} />
        ) : ( 
          <HomeComp users={users} setSelectedUserId={setSelectedUserId} />
        )
      ) : (
        <Initiale/>
      )}
    </div>
  )
}
