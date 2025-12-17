const TableData = ({ children, className, colSpan = 1, small = false }) => {
  return (
    <td
      colSpan={colSpan}
      className={`text-center p-2 border border-[#ddd] ${
        small ? "w-[120px]" : ""
      } ${className}`}
    >
      {children}
    </td>
  );
};

export default TableData