import React, { useState } from 'react';
import '../css/TaskForm.css';
import { Modal, Button, Form } from 'react-bootstrap';

const TaskForm = ({ show, handleClose, handleSubmit }) => {
    const [task, setTask] = useState({
      title: '',
      description: '',
      priority: 'Medium'
    });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setTask((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    };
  
    const onSubmit = (e) => {
      e.preventDefault();
      handleSubmit(task);
      setTask({ title: '', description: '' }); 
    };
  
    return (
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={onSubmit}>
            <Form.Group controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={task.title}
                onChange={handleChange}
                placeholder="Enter title"
              />
            </Form.Group>
            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={task.description}
                onChange={handleChange}
                placeholder="Enter description"
              />
            </Form.Group>
            <Form.Group controlId="formPriority">
        <Form.Label>Priority</Form.Label>
        <Form.Select
          name="priority"
          value={task.priority}
          onChange={handleChange}
        >
          <option value="Urgent">Urgent</option>
          <option value="Important">Important</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </Form.Select>
      </Form.Group>

            <Button variant="primary" type="submit">
              Add Task
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  };

export default TaskForm;
