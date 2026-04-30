import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DeleteModal from "../components/DeleteModal";
import SearchBar from "./SearchBar";
import UserForm from "./UserForm";

const UserContent = ({ users, setUsers }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [roleFilter, setRoleFilter] = useState("");
    const [genderFilter, setGenderFilter] = useState("");

    /* EDIT POPUP */
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const usersPerPage = 10;
    const navigate = useNavigate();

    /* VIEW */
    const viewHandle = (id) => {
        navigate(`/user/${id}`);
    };

    /* OPEN EDIT */
    const openEditModal = (user) => {
        setSelectedUser(user);
        setShowEditModal(true);
    };

    /* CLOSE EDIT */
    const closeEditModal = () => {
        setSelectedUser(null);
        setShowEditModal(false);
    };

    /* UPDATE USER */
    const handleUpdateUser = (updatedUser) => {
        const updatedUsers = users.map((user) =>
            user.id === updatedUser.id ? updatedUser : user
        );

        setUsers(updatedUsers);
        closeEditModal();
    };

    /* DELETE */
    const openDeleteModal = (id) => {
        setSelectedUserId(id);
        setShowDeleteModal(true);
    };

    const closeDeleteModal = () => {
        setSelectedUserId(null);
        setShowDeleteModal(false);
    };

    const confirmDelete = () => {
        const updatedUsers = users.filter(
            (user) => user.id !== selectedUserId
        );

        if (currentUsers.length === 1 && currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }

        setUsers(updatedUsers);
        closeDeleteModal();
    };

    /* FILTER */
    const filteredUsers = users.filter((user) => {
        const fullName =
            `${user.firstName} ${user.lastName}`.toLowerCase();

        const email = user.email.toLowerCase();

        const matchesSearch =
            fullName.includes(searchTerm.toLowerCase()) ||
            email.includes(searchTerm.toLowerCase());

        const matchesRole =
            roleFilter === "" ||
            user.role?.toLowerCase() === roleFilter.toLowerCase();

        const matchesGender =
            genderFilter === "" ||
            user.gender?.toLowerCase() === genderFilter.toLowerCase();

        return matchesSearch && matchesRole && matchesGender;
    });

    /* PAGINATION */
    const lastIndex = currentPage * usersPerPage;
    const firstIndex = lastIndex - usersPerPage;
    const currentUsers = filteredUsers.slice(firstIndex, lastIndex);

    const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

    const clearFilters = () => {
        setSearchTerm("");
        setRoleFilter("");
        setGenderFilter("");
    };

    return (
        <div>
            {/* SEARCH */}
            <SearchBar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                roleFilter={roleFilter}
                setRoleFilter={setRoleFilter}
                genderFilter={genderFilter}
                setGenderFilter={setGenderFilter}
                clearFilters={clearFilters}
            />

            {/* MOBILE */}
            <div className="grid grid-cols-1 gap-4 md:hidden mt-3">
                {currentUsers.map((user) => (
                    <div
                        key={user.id}
                        className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:border-emerald-200 transition-colors"
                    >
                        <div className="flex items-center gap-3 border-b pb-3 mb-3">
                            <img
                                src={
                                    user.image ||
                                    user.imageUrl ||
                                    "https://i.pravatar.cc/150?img=1"
                                }
                                alt=""
                                className="w-12 h-12 rounded-full border border-slate-100 object-cover"
                            />

                            <div>
                                <h3 className="font-bold text-slate-800 text-base">
                                    {user.firstName} {user.lastName}
                                </h3>

                                <p className="text-xs text-emerald-600 font-medium uppercase tracking-wider">
                                    {user.role}
                                </p>
                            </div>
                        </div>

                        <div className="space-y-2 text-sm text-slate-600 mb-4">
                            <div className="flex justify-between">
                                <span>Email:</span>
                                <span>{user.email}</span>
                            </div>

                            <div className="flex justify-between">
                                <span>Phone:</span>
                                <span>{user.phone}</span>
                            </div>

                            <div className="flex justify-between">
                                <span>Company:</span>
                                <span>{user.company?.name}</span>
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <button
                                onClick={() => viewHandle(user.id)}
                                className="flex-1 py-2 bg-slate-100 rounded-lg"
                            >
                                View
                            </button>

                            <button
                                onClick={() => openEditModal(user)}
                                 className="p-2 bg-blue-100 text-blue-600 rounded-lg active:scale-95 transition-transform cursor-pointer"
                            >
                               <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-5 h-5 mx-auto"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M15.232 5.232l3.536 3.536M9 11l6.768-6.768a2.5 2.5 0 113.536 3.536L12.536 14.536 9 15l.464-3.536z"
                                    />
                                </svg>
                            </button>

                            <button
                                onClick={() => openDeleteModal(user.id)}
                                className="p-2 bg-red-100 text-red-500 rounded-lg active:scale-95 transition-transform cursor-pointer"
                            >
                               <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-5 h-5 mx-auto"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 7h12M9 7V4h6v3m-7 4v6m4-6v6m4-6v6M5 7l1 13h12l1-13"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* DESKTOP */}
            <div className="hidden md:block bg-white rounded-xl border border-slate-200 shadow-sm mt-3 overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-xs tracking-wider">
                            <th className="px-6 py-4 font-semibold uppercase">
                                Name
                            </th>
                            <th className="px-6 py-4 font-semibold uppercase">
                                Email
                            </th>
                            <th className="px-6 py-4 font-semibold uppercase">
                                Phone
                            </th>
                            <th className="px-6 py-4 font-semibold uppercase">
                                Company
                            </th>
                            <th className="px-6 py-4 font-semibold uppercase">
                                Role
                            </th>
                            <th className="px-6 py-4 font-semibold uppercase text-center">
                                Actions
                            </th>
                        </tr>
                    </thead>

                    <tbody className="text-sm text-slate-700">
                        {currentUsers.map((user) => (
                            <tr
                                key={user.id}
                                className="border-b last:border-none hover:bg-slate-50 transition-colors"
                            >
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <img
                                            src={
                                                user.image ||
                                                user.imageUrl ||
                                                "https://i.pravatar.cc/150?img=1"
                                            }
                                            alt=""
                                            className="w-10 h-10 rounded-full object-cover border"
                                        />

                                        <span>
                                            {user.firstName}{" "}
                                            {user.lastName}
                                        </span>
                                    </div>
                                </td>

                                <td className="px-6 py-4">
                                    {user.email}
                                </td>

                                <td className="px-6 py-4">
                                    {user.phone}
                                </td>

                                <td className="px-6 py-4">
                                    {user.company?.name}
                                </td>

                                <td className="px-6 py-4">
                                    {user.role}
                                </td>

                                <td className="px-6 py-4">
                                    <div className="flex gap-2 justify-center">
                                        <button
                                            onClick={() =>
                                                viewHandle(user.id)
                                            }
                                            className="px-3 py-1 bg-slate-100 rounded"
                                        >
                                            View
                                        </button>

                                        <button
                                            onClick={() =>
                                                openEditModal(user)
                                            }
                                            className="p-2 bg-blue-100 text-blue-600 rounded-lg active:scale-95 transition-transform cursor-pointer"
                                        >
                                           <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-5 h-5 mx-auto"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M15.232 5.232l3.536 3.536M9 11l6.768-6.768a2.5 2.5 0 113.536 3.536L12.536 14.536 9 15l.464-3.536z"
                                    />
                                </svg>
                                        </button>

                                        <button
                                            onClick={() =>
                                                openDeleteModal(user.id)
                                            }
                                            className="p-2 bg-red-100 text-red-500 rounded-lg active:scale-95 transition-transform cursor-pointer"
                                        >
                                            <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-5 h-5 mx-auto"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 7h12M9 7V4h6v3m-7 4v6m4-6v6m4-6v6M5 7l1 13h12l1-13"
                                    />
                                </svg>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* PAGINATION */}
            <div className="flex items-center justify-between mt-6 px-1">
                <button
                    onClick={() =>
                        setCurrentPage(currentPage - 1)
                    }
                    disabled={currentPage === 1}
                    className="px-4 py-2 border rounded-lg"
                >
                    Prev
                </button>

                <div className="flex gap-2">
                    {[...Array(totalPages)].map((_, index) => (
                        <button
                            key={index}
                            onClick={() =>
                                setCurrentPage(index + 1)
                            }
                            className={`px-3 py-1 rounded ${
                                currentPage === index + 1
                                    ? "bg-emerald-600 text-white"
                                    : "bg-slate-100"
                            }`}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>

                <button
                    onClick={() =>
                        setCurrentPage(currentPage + 1)
                    }
                    disabled={
                        currentPage === totalPages ||
                        totalPages === 0
                    }
                    className="px-4 py-2 border rounded-lg"
                >
                    Next
                </button>
            </div>

            {/* DELETE MODAL */}
            <DeleteModal
                show={showDeleteModal}
                onCancel={closeDeleteModal}
                onConfirm={confirmDelete}
            />

            {/* EDIT POPUP */}
            {showEditModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <div className="relative w-full max-w-3xl mx-4">
                        <button
                            onClick={closeEditModal}
                            className="absolute top-4 right-4 z-10 text-gray-500 hover:text-black text-xl"
                        >
                            ✕
                        </button>

                        <UserForm
                            editUser={selectedUser}
                            onUpdateUser={handleUpdateUser}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserContent;
