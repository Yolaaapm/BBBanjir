import React from "react"; 

function Card(props) {
  const { title, desc, link } = props;

  return (
    <div className="h-full flex flex-col">
      {/* Header Card */}
      <div className="flex justify-between items-center mb-4">
        <div className="text-lg font-bold text-slate-700">{title}</div> 
        {link && (
          <div className="text-xs text-blue-600 hover:underline cursor-pointer font-semibold">
            Lihat Semua
          </div>
        )}
      </div>
      
      {/* Body Card */}
      <div className="flex-1 bg-white rounded-2xl px-6 py-5 shadow-sm border border-gray-100">
        <div className="text-slate-600">
          {desc}
        </div>
      </div>
    </div>
  );
}

export default Card;