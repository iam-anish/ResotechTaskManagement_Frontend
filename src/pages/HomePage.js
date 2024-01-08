import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import TaskForm from '../components/TaskForm.jsx';
import TaskList from '../components/TaskList.jsx';
import '../css/HomePage.css';
import { createTask, loginAPI } from '../services/taskService.axios.js';

const HomePage = () => {

  const [login,setLogin] = useState(0); 
  
  const logOut = () => {
    localStorage.clear();
    setLogin(0);
    setPassword('');
    setUsername('');
  }

  const [show, setShow] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [reload,setReload] = useState(0);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showTaskForm, setShowTaskForm] = useState(false);
  const handleShowTaskForm = () => setShowTaskForm(true);
  const handleCloseTaskForm = () => setShowTaskForm(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform login logic here (e.g., send data to backend, validate credentials, etc.)
    console.log('Username:', username);
    console.log('Password:', password);
    loginAPI(username,password)
      .then((data) => {
        console.log(data);
        setLogin(true);
      })
      .catch((error) => {
        console.log(error);
      });
    handleClose();
  };

  const createTask = async (task) => {
    const data = await createTask(task,username,password).then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSubmitTask = (task) => {
    console.log(task)
     createTask(task);
      setReload(0);
      handleCloseTaskForm()
  }

  const loginFormModel = () =>{
    return(
        <>
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal></>
    )
  }

  return (
    <>
    <div className="home-page-container">
      <div className='header'>
        <h1 className="title">ResoTech Task Management System</h1>
        {login ? <button className='btn btn-primary login-button'
          onClick={handleShowTaskForm} 
        >Add Task</button> : ''}
        {login ?
            <button className='btn btn-primary login-button'
          onClick={logOut} 
        >Logout</button> : 
        <button className='btn btn-primary login-button'
          onClick={handleShow} 
        >Login</button>
        }
      </div>
      <TaskList reload={reload}/>
      {/* Add other components and functionalities */}
    </div>
    {loginFormModel()}
    <TaskForm
        show={showTaskForm}
        handleClose={handleCloseTaskForm}
        handleSubmit={handleSubmitTask}
      />
    </>
  );
};

export default HomePage;
