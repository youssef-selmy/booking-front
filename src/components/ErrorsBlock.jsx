const ErrorsBlock = ({ globalErrors = [] }) => {
  return (
    <>
      {globalErrors.length > 0 && (
        <div className="text-red-600 flex flex-wrap w-full gap-2.5 p-5">
          {globalErrors.map((ele, idx) => (
            <p className="bg-[#333] px-3 py-2 rounded font-medium" key={idx}>{ele}</p>
          ))}
        </div>
      )}
    </>
  );
};

export default ErrorsBlock;
