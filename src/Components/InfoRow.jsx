import React from 'react'

const InfoRow = ({ label, value, isHighlight }) => {
  return (
   <div className="flex flex-col">
    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">{label}</span>
    <span className={`text-sm font-semibold ${isHighlight ? 'text-emerald-600' : 'text-slate-800'}`}>
      {value}
    </span>
  </div>
  )
}

export default InfoRow;