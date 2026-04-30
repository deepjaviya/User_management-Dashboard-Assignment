

import React, { useEffect, useState } from "react";

export default function UserForm({
  onAddUser,
  editUser,
  onUpdateUser,
  onClose,
}) {
  const emptyForm = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    age: "",
    gender: "",
    role: "",
    image: "",
    address: "",
    city: "",
    state: "",
    country: "",
    companyName: "",
    department: "",
    title: "",
  };

  const [formData, setFormData] = useState(emptyForm);

  /* EDIT DATA LOAD */
  useEffect(() => {
    if (editUser) {
      setFormData({
        firstName: editUser.firstName || "",
        lastName: editUser.lastName || "",
        email: editUser.email || "",
        phone: editUser.phone || "",
        age: editUser.age || "",
        gender: editUser.gender || "",
        role: editUser.role || "",
        image: editUser.image || "",
        address: editUser.address?.address || "",
        city: editUser.address?.city || "",
        state: editUser.address?.state || "",
        country: editUser.address?.country || "",
        companyName: editUser.company?.name || "",
        department: editUser.company?.department || "",
        title: editUser.company?.title || "",
      });
    } else {
      setFormData(emptyForm);
    }
  }, [editUser]);

  /* INPUT CHANGE */
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  /* RESET */
  const resetForm = () => {
    setFormData(emptyForm);
  };

  /* SUBMIT */
  const handleSubmit = (e) => {
    e.preventDefault();

    const newUser = {
      id: editUser ? editUser.id : Date.now(),
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      age: formData.age,
      gender: formData.gender,
      role: formData.role,
      image:
        formData.image || "https://i.pravatar.cc/150",
      company: {
        name: formData.companyName,
        department: formData.department,
        title: formData.title,
      },
      address: {
        address: formData.address,
        city: formData.city,
        state: formData.state,
        country: formData.country,
      },
    };

    if (editUser) {
      onUpdateUser(newUser);
    } else {
      onAddUser(newUser);
    }

    resetForm();

    if (onClose) {
      onClose();
    }
  };

  return (
    <div className="bg-white w-full max-w-3xl rounded-2xl shadow-sm border border-slate-200 mx-auto">
      {/* HEADER */}
      <div className="flex justify-between items-center px-5 py-3 border-b">
        <h2 className="text-xl font-bold text-slate-800">
          {editUser ? "Edit User" : "Create User"}
        </h2>
      </div>

      {/* FORM */}
      <form
        className="p-5 space-y-4"
        onSubmit={handleSubmit}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          {/* First Name */}
          <div>
            <label className="text-sm font-medium block mb-1">
              First Name
            </label>

            <input
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              type="text"
              placeholder="First name"
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm"
              required
            />
          </div>

          {/* Last Name */}
          <div>
            <label className="text-sm font-medium block mb-1">
              Last Name
            </label>

            <input
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              type="text"
              placeholder="Last name"
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm"
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-medium block mb-1">
              Email
            </label>

            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              type="email"
              placeholder="Email address"
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm"
              required
            />
          </div>

          {/* Phone */}
          <div>
            <label className="text-sm font-medium block mb-1">
              Phone
            </label>

            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              type="text"
              placeholder="Phone number"
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm"
            />
          </div>

          {/* Age */}
          <div>
            <label className="text-sm font-medium block mb-1">
              Age
            </label>

            <input
              name="age"
              value={formData.age}
              onChange={handleChange}
              type="number"
              placeholder="Age"
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm"
            />
          </div>

          {/* Gender */}
          <div>
            <label className="text-sm font-medium block mb-1">
              Gender
            </label>

            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm"
            >
              <option value="">
                Select Gender
              </option>
              <option value="Male">
                Male
              </option>
              <option value="Female">
                Female
              </option>
            </select>
          </div>

          {/* Role */}
          <div>
            <label className="text-sm font-medium block mb-1">
              Role
            </label>

            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm"
            >
              <option value="">
                Select Role
              </option>
              <option value="User">
                User
              </option>
              <option value="Admin">
                Admin
              </option>
              <option value="Manager">
                Manager
              </option>
            </select>
          </div>

          {/* Image */}
          <div>
            <label className="text-sm font-medium block mb-1">
              Profile Image URL
            </label>

            <input
              name="image"
              value={formData.image}
              onChange={handleChange}
              type="text"
              placeholder="https://..."
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm"
            />
          </div>

          {/* Address */}
          <div>
            <label className="text-sm font-medium block mb-1">
              Address Line
            </label>

            <input
              name="address"
              value={formData.address}
              onChange={handleChange}
              type="text"
              placeholder="Street address"
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm"
            />
          </div>

          {/* City */}
          <div>
            <label className="text-sm font-medium block mb-1">
              City
            </label>

            <input
              name="city"
              value={formData.city}
              onChange={handleChange}
              type="text"
              placeholder="City"
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm"
            />
          </div>

          {/* State */}
          <div>
            <label className="text-sm font-medium block mb-1">
              State
            </label>

            <input
              name="state"
              value={formData.state}
              onChange={handleChange}
              type="text"
              placeholder="State"
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm"
            />
          </div>

          {/* Country */}
          <div>
            <label className="text-sm font-medium block mb-1">
              Country
            </label>

            <input
              name="country"
              value={formData.country}
              onChange={handleChange}
              type="text"
              placeholder="Country"
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm"
            />
          </div>

          {/* Company */}
          <div>
            <label className="text-sm font-medium block mb-1">
              Company Name
            </label>

            <input
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              type="text"
              placeholder="Company name"
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm"
            />
          </div>

          {/* Department */}
          <div>
            <label className="text-sm font-medium block mb-1">
              Department
            </label>

            <input
              name="department"
              value={formData.department}
              onChange={handleChange}
              type="text"
              placeholder="e.g. Sales"
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm"
            />
          </div>

          {/* Job Title */}
          <div>
            <label className="text-sm font-medium block mb-1">
              Job Title
            </label>

            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              type="text"
              placeholder="e.g. Developer"
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm"
            />
          </div>
        </div>

        {/* BUTTONS */}
        <div className="flex justify-end gap-3 pt-5 border-t border-slate-100">
          <button
            type="button"
            onClick={() => {
              resetForm();
              if (onClose) onClose();
            }}
            className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-6 py-2 bg-emerald-600 text-white rounded-lg text-sm font-bold hover:bg-emerald-700"
          >
            {editUser ? "Update" : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
}