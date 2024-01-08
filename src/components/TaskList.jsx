import React, { useEffect, useState } from 'react';
import { getAllTasks } from '../services/taskService.axios';
import '../css/TaskList.css';

const TaskList = ({reload}) => {
  console.log(reload);
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    getAllTasks()
    .then((data) => {
      console.log(data);
      setTasks(data)
    })
    .catch((error) => {
      console.log(error);
    });
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    console.log(reload);
    fetchTasks();
  }, [reload]);

  return (
    <div className="task-container">
      {tasks.map((task) => (
        // <div className="task-card" key={task.id}>
        //   <h3>{task.title}</h3>
        //   <p>{task.description}</p>
        //   {/* Add other task details and actions */}
        // </div>

        <div className="row border rounded shadow p-3 mb-5 bg-white rounded my-3 p-2" key={task.id}> 
        <div className="col-12 d-flex justify-content-between"> 
        <div> 
          <h4>{task.title}</h4> 
          <p>{task.description}</p> 
          {/* <h6>description</h6> */} 
          </div> 
          <div className="d-flex align-items-center"> 
          <button className="btn btn-primary mx-2" 
              //onClick={() => handleEdit(elem.id)} 
              > 
              Edit 
              </button> 
         <button className="btn btn-danger mx-2" 
           > Delete </button>
          </div> 
          </div>
          </div>
      ))}
        </div>
      );
};

      export default TaskList;
