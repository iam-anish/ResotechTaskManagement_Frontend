# **Resotech Task Management System**

## **Frontend Service (React):**

**Project Setup:**
1. Install Node.js and npm:
   
   -> If you haven't installed Node.js and npm yet, download and install them from Node.js official website.


2. Navigate to Frontend Directory:
   
   -> Open your terminal and navigate to the frontend directory of your React project.


3. Install Dependencies:

   -> Run the following command to install all required dependencies:
   npm install


4. Update API URL:
   
   -> Locate the taskService.axios.js file in your React project.
   
   -> Update the const API_URL variable with the backend API URL as follows:

   const API_URL = 'http://localhost:9070/api/tasks';
   Ensure that you replace http://localhost:9070/api/tasks with the actual API URL where your Spring Boot backend is running.


5. Start the Frontend Development Server:
   
   -> After updating the API URL, run the following command to start the frontend development server:
   npm start

   This will start the React application, and you can access it via http://localhost:3000 in your web browser.
   By following these steps, you should have both the backend and frontend services up and running, allowing you to manage tasks effectively using the Resotech Task Management System.