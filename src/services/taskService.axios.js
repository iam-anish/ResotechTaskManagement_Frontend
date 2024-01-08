import axios from 'axios';

const API_URL = 'http://localhost:9070/api/tasks';

export const getAllTasks = () => {
  return axios.get(API_URL).then((response) => response.data);;
};

export const createTask = async (task,username,password) => {
  const response = await axios.post(API_URL, task,{
    headers: {
      'Authorization': 'Basic ' + btoa(username + ':' + password),
    },
  }).then((response) => response.data);
  return response;
};

export const loginAPI = (username,password) => {
    return axios.get(`${API_URL}/login`,{
        headers: {
          'Authorization': 'Basic ' + btoa(username + ':' + password),
        },
      }).then((response) => response.data);;
}


