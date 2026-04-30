import React from "react";

const DeleteModal = ({ show, onCancel, onConfirm }) => {
    if (!show) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center  bg-black/50 bg-opacity-40">
            <div className="bg-white p-6 rounded-lg shadow-lg w-80">
                <h2 className="text-lg font-semibold mb-4">
                    Are you sure you want to delete this user?
                </h2>

                <div className="flex justify-end gap-3">
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 bg-gray-200 rounded"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 bg-red-500 text-white rounded"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteModal;