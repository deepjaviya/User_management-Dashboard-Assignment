import React, { useEffect, useState } from "react";
import InfoRow from "../Components/InfoRow";
import { useNavigate, useParams } from "react-router-dom";


const UserDetail = ({ users }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        findUser();
    }, [id, users]); 
    const findUser = () => {
        const singleUser = users.find((item) => item.id.toString() === id.toString());

        if (singleUser) {
            setUser(singleUser);
        }
        setLoading(false);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center text-xl font-bold">
                <div className="animate-pulse text-emerald-600">Loading User Details...</div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="min-h-screen flex flex-col justify-center items-center gap-4">
                <h2 className="text-2xl font-bold text-slate-800">No User Found</h2>
                <button 
                    className="px-4 py-2 bg-emerald-600 text-white rounded-lg"
                    onClick={() => navigate("/")}
                >
                    Go Back Home
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#f9fafb] p-4 md:p-10 font-sans text-slate-900">
            <div className="max-w-5xl mx-auto">

                <div className="flex items-center justify-between mb-8">
                    <button className="flex items-center text-slate-500 hover:text-emerald-600 font-semibold transition-all" onClick={() => navigate("/")}>
                        <span className="mr-2">←</span> Back to Dashboard
                    </button>

                    <button className="px-4 py-2 text-sm font-bold text-white bg-[#10b981] rounded-lg hover:bg-[#059669] shadow-md shadow-emerald-100 transition-all">
                        Edit User
                    </button>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm mb-6 flex flex-col md:flex-row items-center gap-8">
                    <img
                        src={user.image || "https://i.pravatar.cc/150"}
                        alt={user.firstName}
                        className="w-32 h-32 rounded-2xl object-cover ring-4 ring-emerald-50 shadow-lg"
                    />

                    <div className="text-center md:text-left">
                        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                            {user.firstName} {user.lastName}
                        </h1>

                        <p className="text-lg font-medium text-emerald-600 mb-4">
                            {user.company?.title || user.role}
                        </p>

                        <div className="flex flex-wrap justify-center md:justify-start gap-4">
                            <span className="bg-slate-50 px-3 py-1 rounded-full text-xs font-bold text-slate-500 border border-slate-100 uppercase tracking-wider">
                                ID: {user.id}
                            </span>

                            <span className="bg-emerald-50 px-3 py-1 rounded-full text-xs font-bold text-emerald-600 border border-emerald-100 uppercase tracking-wider">
                                {user.role || 'Member'}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* Basic Info */}
                    <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                        <h3 className="text-sm font-black text-slate-400 uppercase tracking-[0.1em] mb-6 border-b border-slate-50 pb-3">
                            Basic Information
                        </h3>

                        <div className="space-y-4">
                            <InfoRow label="Email Address" value={user.email} />

                            <div className="grid grid-cols-2 gap-4">
                                <InfoRow label="Phone" value={user.phone} />
                                <InfoRow label="Age" value={user.age ? `${user.age} Years` : "N/A"} />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <InfoRow label="Gender" value={user.gender} />
                                <InfoRow
                                    label="Current Role"
                                    value={user.role}
                                    isHighlight
                                />
                            </div>
                        </div>
                    </section>

                    <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                        <h3 className="text-sm font-black text-slate-400 uppercase tracking-[0.1em] mb-6 border-b border-slate-50 pb-3">
                            Address Information
                        </h3>

                        <div className="space-y-4">
                            <InfoRow label="Address Line" value={user.address?.address || "N/A"} />

                            <div className="grid grid-cols-2 gap-4">
                                <InfoRow label="City" value={user.address?.city || "N/A"} />
                                <InfoRow label="State" value={user.address?.state || "N/A"} />
                            </div>

                            <InfoRow label="Country" value={user.address?.country || "N/A"} />
                        </div>
                    </section>

                    <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                        <h3 className="text-sm font-black text-slate-400 uppercase tracking-[0.1em] mb-6 border-b border-slate-50 pb-3">
                            Company Information
                        </h3>

                        <div className="space-y-4">
                            <InfoRow label="Company Name" value={user.company?.name || "N/A"} />
                            <InfoRow label="Department" value={user.company?.department || "N/A"} />
                            <InfoRow label="Designation Title" value={user.company?.title || "N/A"} />
                        </div>
                    </section>

                    <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                        <h3 className="text-sm font-black text-slate-400 uppercase tracking-[0.1em] mb-6 border-b border-slate-50 pb-3">
                            Additional Information
                        </h3>

                        <div className="space-y-4">
                            <InfoRow label="Date of Birth" value={user.birthDate || "N/A"} />

                            <div className="flex flex-col">
                                <span className="text-[10px] font-bold text-slate-400 uppercase mb-1">
                                    University
                                </span>

                                <span className="text-sm font-semibold text-slate-800 flex items-center">
                                    <span className="mr-2">🎓</span>
                                    {user.university || "Not Provided"}
                                </span>
                            </div>
                        </div>
                    </section>

                </div>
            </div>
        </div>
    );
};

export default UserDetail;