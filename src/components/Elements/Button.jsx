import React from "react";

const Button = (props) => {
  // Destructuring props: memberikan nilai default agar tidak error jika tidak diisi
  const { 
    children, 
    variant = "bg-blue-600", 
    type = "button", 
    onClick = () => {} 
  } = props;

  return (
    <button
      className={`h-12 px-6 font-semibold rounded-xl text-white transition-all active:scale-95 hover:opacity-90 ${variant}`}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;