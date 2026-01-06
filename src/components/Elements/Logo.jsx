const Logo = (props) => {
  const { variant = "primary" } = props;
  return (
    <div className={`flex items-center gap-2 ${variant === "primary" ? "text-blue-600" : "text-white"}`}>
      {/* Gunakan ikon tetesan air untuk tema banjir */}
      <div className="bg-blue-500 p-1 rounded-md">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
            <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>
        </svg>
      </div>
      <span className="text-2xl font-bold italic">ByeByeBanjir</span>
    </div>
  );
};

export default Logo;