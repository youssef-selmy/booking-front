const ErrorsBlock = ({ globalErrors = [] }) => {
  return (
    <>
      {globalErrors.length > 0 && (
        <div className="text-red-600 flex w-full justify-center gap-5">
          {globalErrors.map((ele, idx) => (
            <p key={idx}>{ele}</p>
          ))}
        </div>
      )}
    </>
  );
};

export default ErrorsBlock;
