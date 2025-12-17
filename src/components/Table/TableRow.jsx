const TableRow = ({ children, rowNum }) => {
  return (
    <tr className={`w-full ${(rowNum + 1) % 2 === 1 ? "bg-white" : "bg-[#f5f5f5]"}`}>
      {children}
    </tr>
  );
};

export default TableRow;