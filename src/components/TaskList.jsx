import React, { useEffect, useState } from "react";
import { Button, Modal, Form,Card } from "react-bootstrap";
import { deleteTask, doneTask, getAllTasks, updateTask } from "../services/taskService.axios";
import { toast } from "react-toastify";
import "../css/TaskList.css";
import Swal from "sweetalert2";

const TaskList = ({ reload, login}) => {
  const [tasks, setTasks] = useState([]);
  const [task,setTask] = useState(null);

  const getCredentialsFromLocalStorage = () => {
    const username = localStorage.getItem('username');
    const password = localStorage.getItem('password');
    return { username, password };
  };

  const { username, password } = getCredentialsFromLocalStorage();

  const fetchTasks = async () => {
    getAllTasks()
      .then((data) => {
        console.log(data);
        setTasks(data);
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

  const handleFieldChange = (event, property) => {
    setTask({
      ...task,
      [property]: event.target.value,
    });
  };

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (task) => {
    setTask(task)
    setShow(true);
  };

  const submitTask = async (event) => {
    event.preventDefault();
    if (task.title === undefined || task.title.trim() === "") {
       toast.error("Title is required !!");
       return;
    }
    if (task.description === undefined || task.description.trim() === "") {
      toast.error("Description is required !!");
      return;
   }
   if (task.priority === undefined || task.priority.trim() === "") {
    toast.error("Priority is required !!");
    return;
 }
   const data = await updateTask(task.id,task,username,password).then((data) => {
    console.log(data);
    handleClose();
  })
  .catch((error) => {
    console.log(error);
  });
  fetchTasks()
  }

  const dltTask = (taskId) => {
    return(
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteTask(taskId,username,password)
          .then((data) => {
            console.log(data);
            Swal.fire("Deleted!", "Your file has been deleted.", "success");
           fetchTasks();
          })
          .catch((error) => {
            console.log(error);
            toast.error("Error while deleting category.");
          });
      }
    })
    )
  }

  const taskStatus = (taskId) => {
    return(
    Swal.fire({
      title: "Are you sure?",
      text: "You have done with this task!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, done it!",
    }).then((result) => {
      if (result.isConfirmed) {
        doneTask(taskId,username,password)
          .then((data) => {
            console.log(data);
            Swal.fire("Done!", "Your task has been updated.", "success");
           fetchTasks();
          })
          .catch((error) => {
            console.log(error);
          });
      }
    })
    )
  }

  const editTask = () => {
    return (
      <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Body>
            <Form onSubmit={submitTask}>
              <Form.Group>
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter title"
                  value={task?.title}
                  onChange={(event) => handleFieldChange(event, "title")}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter description"
                  value={task?.description}
                  onChange={(event) => handleFieldChange(event, "description")}
                />
              </Form.Group>
              <Form.Group controlId="formPriority">
        <Form.Label>Priority</Form.Label>
        <Form.Select
          name="priority"
          value={task?.priority}
          onChange={(event) => handleFieldChange(event, "priority")}
        >
          <option value="Urgent">Urgent</option>
          <option value="Important">Important</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </Form.Select>
      </Form.Group>


              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </>
    );
  };

  return (
    <div className="text-center task-container">
      {tasks.map((task) => (
        <div key={task.id} className="card-container">
          <Card style={{ backgroundColor: task.status === 'DONE' ? '#DAFFD5' : '#FAADAD' }}>
        <Card.Body>
        <Card.Title> <span className="tastTitle">{task.title}</span> <span className="tastPriority">({task.priority})</span> </Card.Title>
        <Card.Text>
           {task.description}
        </Card.Text>
        <div className="text-center">
        {login ? (
                <button className="btn btn-primary mx-2" onClick={()=>taskStatus(task.id)}>
                  Done
                </button>
              ) : (
                ""
              )}
             {login ? (
                <button className="btn btn-info mx-2" onClick={() => handleShow(task)}>
                  Edit
                </button>
              ) : (
                ""
              )} 
              {login ? (
                <button className="btn btn-danger mx-2" onClick={()=>dltTask(task.id)}>Delete</button>
              ) : (
                ""
              )}
              </div>
      </Card.Body>
    </Card>
    </div>
      ))}
      {editTask()}
    </div>
  );
};

export default TaskList;
