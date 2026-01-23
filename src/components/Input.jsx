const Input = ({
  value,
  setValue,
  type = "text",
  placeholder,
  title,
  readOnly = false,
  required = false,
  errorMessage = null
}) => {
  return (
    <label className="relative mt-[10px]">
      <div className="bg-white flex items-center justify-center px-2 absolute -top-[10px] left-1.5">
        <p className="text-[12px] font-medium text-ston">
          {title}
          {required && <span className="text-red-600 ml-[2px]">*</span>}
        </p>
      </div>
      <input
        className="w-[220px] border border-[#ddd] rounded p-2 outline-none focus:border-[#333] duration-300"
        type={type}
        value={value || ""}
        onChange={e => setValue(e.target.value)}
        placeholder={placeholder}
        readOnly={readOnly}
        required={required}
      />
      {errorMessage && <p className="text-xs pl-2 pt-1 text-red-600 font-medium">{errorMessage}</p>}
    </label>
  );
};

export default Input;
