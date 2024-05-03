// api.js

const baseURL = "http://127.0.0.1:8000/api";

export const getBaseURL = () => {
  return baseURL;
};

export const getLogoutURL = () => {
  return `${baseURL}/logout/`;
};

export const getTasksDetailURL = (userId) => {
    return `${baseURL}/${userId}/tasks_detail/`; 
};
  
export const getTaskDetailModifURL = (taskId) => {
    return `${baseURL}/${taskId}/tasks_detail_modif/`; 
};
  
export const getTasksURL = () => {
    return `${baseURL}/tasks/`;
};

export const getUsersURL = () => {
    return `${baseURL}/user/`;
};
  
export const getLoginURL = () => {
    return `${baseURL}/login/`;
};

export const getRegisterURL = () => {
    return `${baseURL}/register/`;
};