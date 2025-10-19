const Input = ({ value, setValue, type = "text", placeholder, title, readOnly = false, required = false }) => {
  return (
    <label className="relative">
      <div className="bg-white flex items-center justify-center px-2 absolute -top-5 left-1.5">
        <p className="text-[12px] font-medium text-ston">{title}{required && <span className="text-red-600 ml-[2px]">*</span>}</p>
      </div>
      <input
        className="border border-stone-400 rounded p-2 outline-none focus:border-[#333] duration-300"
        type={type}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        readOnly={readOnly}
      />
    </label>
  );
};

export default Input;
