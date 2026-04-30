import React from 'react'
import Header from '../Components/Header'
import SearchBar from '../Components/SearchBar'
import UserContent from '../Components/UserContent'

const DashBoard = ({ users, setUsers, addUser }) => {
  return (
    <div className="min-h-screen bg-slate-50 pl-4 pr-4 sm:pl-4 sm:pr-4 mx-auto">
       
        <Header onAddUser={addUser} totalUsers={users.length} />
   
        <UserContent users={users} setUsers={setUsers} />
    </div>
  );
};

export default DashBoard;