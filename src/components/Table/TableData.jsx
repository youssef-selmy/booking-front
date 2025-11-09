const TableData = ({ children, colSpan = 1, small = false }) => {
  return (
    <td
      colSpan={colSpan}
      className={`text-center p-2 border border-[#ddd] ${
        small ? "w-[100px]" : ""
      }`}
    >
      {children}
    </td>
  );
};

export default TableData