const FileInput = ({ value, setValue, title, required = false }) => {
  return (
    <label className="relative mt-[10px]">
      <div className="bg-white flex items-center justify-center px-2 absolute -top-[10px] left-1.5">
        <p className="text-[12px] font-medium text-ston">
          {title}
          {required && <span className="text-red-600 ml-[2px]">*</span>}
        </p>
      </div>
      <div>
        <input
          className="w-[220px] border border-[#ddd] rounded p-2 outline-none focus:border-[#333] duration-300"
          type="file"
          onChange={e => setValue(e.target.files[0])}
        />
        {value && (
          <p className="text-[10px] text-gray-600 mt-1">{value.name}</p>
        )}
      </div>
    </label>
  );
};

export default FileInput;
