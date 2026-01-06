import React from "react";

const InputForm = (props) => {
  const { label, name, type, placeholder } = props;
  return (
    <div className="mb-6">
      <label htmlFor={name} className="block text-slate-700 text-sm font-bold mb-2">
        {label}
      </label>
      <input
        type={type}
        className="text-sm border rounded w-full py-2 px-3 text-slate-700 placeholder:text-slate-400 outline-none focus:ring-1 focus:ring-blue-600"
        placeholder={placeholder}
        name={name}
        id={name}
      />
    </div>
  );
};

export default InputForm;