import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import DashBoard from "./Page/DashBoard";
import UserDetail from "./Page/UserDetail";
import { getUsers } from "./api/userApi"; 
import UserForm from "./Components/UserForm";

function App() {
  const [users, setUsers] = useState([]);

 
  useEffect(() => {
    const loadData = async () => {
      const data = await getUsers();
      setUsers(data);
    };
    loadData();
  }, []);

 
  const addUser = (newUser) => {
    setUsers([newUser, ...users]);
  };

  return (
    <Routes>
      <Route 
        path="/" 
        element={<DashBoard users={users} setUsers={setUsers} addUser={addUser} />} 
      />
      
      <Route 
        path="/user/:id" 
        element={<UserDetail users={users} />} 
      />

      <Route 
        path="/user/:id" 
        element={ <UserForm onAddUser={addUser} />} 
      />
    </Routes>
  );
}

export default App;