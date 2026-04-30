import React from 'react'

const SearchBar = ({ searchTerm, setSearchTerm, roleFilter, setRoleFilter, genderFilter, setGenderFilter, clearFilters }) => {
    return (
        <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col lg:flex-row gap-4 lg:items-center  shadow-sm">

            {/* Search */}
            <div className="relative w-full lg:max-w-sm">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="11" cy="11" r="8" />
                        <path d="m21 21-4.3-4.3" />
                    </svg>
                </div>

                <input
                    type="text"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-white border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-sm"
                />
            </div>

            {/* Filters */}
            <div className="flex flex-row gap-3 w-full lg:w-auto">

                {/* Role */}
                <div className="relative flex-1 lg:min-w-[140px]">
                    <select
                      value={roleFilter}
                    onChange={(e) => setRoleFilter(e.target.value)} 
                    className="w-full appearance-none bg-slate-100 border-none rounded-lg px-4 py-2 pr-10 text-sm focus:ring-2 focus:ring-slate-200 outline-none cursor-pointer">
                        <option value="">Role</option>
                        <option value="Admin">Admin</option>
                        <option value="Moderator">Moderator</option>
                        <option value="User">User</option>
                    </select>

                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="m6 9 6 6 6-6" />
                        </svg>
                    </div>
                </div>

                {/* Gender */}
                <div className="relative flex-1 lg:min-w-[140px]">
                    <select
                     value={genderFilter}
                    onChange={(e) => setGenderFilter(e.target.value)} 
                    className="w-full appearance-none bg-slate-100 border-none rounded-lg px-4 py-2 pr-10 text-sm focus:ring-2 focus:ring-slate-200 outline-none cursor-pointer">
                        <option value="">Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>

                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="m6 9 6 6 6-6" />
                        </svg>
                    </div>
                </div>

            </div>

            <button
             onClick={clearFilters} 
            className="text-slate-500 hover:text-slate-800 text-sm font-medium lg:ml-auto text-right">
                Clear all
            </button>

        </div>

    )
}

export default SearchBar