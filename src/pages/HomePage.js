import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import TaskForm from '../components/TaskForm.jsx';
import TaskList from '../components/TaskList.jsx';
import '../css/HomePage.css';
import { createTask, loginAPI } from '../services/taskService.axios.js';

const HomePage = () => {

  const [login,setLogin] = useState(0); 

  const [user,setUser] = useState('');
  const [pass,setPass] = useState('');
  
  const logOut = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('password');
    setLogin(0);
    setUser('');
    setPass('');
  }

  // Save username and password to localStorage
  const saveCredentialsToLocalStorage = (username, password) => {
    localStorage.setItem('username', username);
    localStorage.setItem('password', password);
  };

  const getCredentialsFromLocalStorage = () => {
    const username = localStorage.getItem('username');
    const password = localStorage.getItem('password');
    return { username, password };
  };

  const { username, password } = getCredentialsFromLocalStorage();
  

  const [show, setShow] = useState(false);
  const [reload,setReload] = useState(0);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showTaskForm, setShowTaskForm] = useState(false);
  const handleShowTaskForm = () => setShowTaskForm(true);
  const handleCloseTaskForm = () => setShowTaskForm(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform login logic here (e.g., send data to backend, validate credentials, etc.)
    console.log('Username:', user);
    console.log('Password:', pass);
    loginAPI(user,pass)
      .then((data) => {
        console.log(data);
        saveCredentialsToLocalStorage(user, pass);
        setLogin(true);
      })
      .catch((error) => {
        console.log(error);
      });
    handleClose();
  };

  const handleSubmitTask = async (task) => {
     console.log(task)
     const data = await createTask(task,username,password).then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
      if (reload) {
        setReload(0);
      }
      else{
        setReload(1);
      }
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
                value={user}
                onChange={(e) => setUser(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
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
      <TaskList reload={reload} login={login}/>
    </div>
    {loginFormModel()}
    <TaskForm
        show={showTaskForm}
        handleClose={handleCloseTaskForm}
        handleSubmit={handleSubmitTask}
        setReload={setReload}
      />
    </>
  );
};

export default HomePage;
