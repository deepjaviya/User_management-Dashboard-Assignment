import React, { useState } from "react";
import UserForm from "./UserForm";

export default function Header({ onAddUser, totalUsers }) {
    const [open, setOpen] = useState(false);

   
    const handleAddUser = (userData) => {
        onAddUser(userData);
        setOpen(false); 
    };

    return (
        <div>
            <div className="p-4 font-sans text-slate-700">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 leading-tight">
                            User Management
                        </h1>
                        <p className="text-xs text-slate-500">
                            {totalUsers} total users
                        </p>
                    </div>

                    <button 
                        className="flex items-center justify-center bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors shadow-sm font-medium h-10 w-10 sm:w-auto sm:px-4 sm:py-2" 
                        onClick={() => setOpen(true)}
                    >
                        <span className="text-xl leading-none">+</span>
                        <span className="hidden sm:inline ml-2">Add User</span>
                    </button>
                </div>
            </div>

            {/* Modal */}
            {open && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <div className="relative w-full max-w-3xl mx-4">
                       
                        <button
                            onClick={() => setOpen(false)}
                            className="absolute top-4 right-4 z-10 text-gray-500 hover:text-black text-xl"
                        >
                            ✕
                        </button>

                        <UserForm onAddUser={handleAddUser} />
                    </div>
                </div>
            )}
        </div>
    );
}