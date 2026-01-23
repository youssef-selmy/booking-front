import { useEffect, useState } from "react";
import Section from "../../../components/Section";
import Table from "../../../components/Table/Table";
import TableRow from "../../../components/Table/TableRow";
import TableData from "../../../components/Table/TableData";
import TableEdit from "../../../components/Table/TableEdit";
import api from "../../../../api/axios";
import AddPopup from "./AddPopup";
import EditPopup from "./EditPopup";
import FiltersPopup from "./FiltersPopup";

const ManagerUsers = () => {
  const [data, setData] = useState([]);
  const [paginationData, setPaginationData] = useState(null);
  const [mode, setMode] = useState(null);
  const [editItem, setEditItem] = useState(null);

  useEffect(() => {
    const handleGet = async () => {
      if (editItem != null) return;
      const { data } = await api.get(
        `users?page=${paginationData === null ? 1 : paginationData.currentPage}`,
      );
      console.log(data);
      setData(data.data);
      setPaginationData(data.paginationResult);
    };
    handleGet();
  }, [editItem]);

  async function next() {
    if (paginationData === null) return;
    if (paginationData.currentPage + 1 >= paginationData.numberOfPages) return;

    const { data } = await api.get(
      `users?page=${paginationData.currentPage + 1}`,
    );
    console.log(data);
    setData(data.data);
    setPaginationData(data.paginationResult);
  }

  return (
    <>
      <Section classname="p-5 pt-[90px] flex flex-col gap-5">
        <Table
          head={["UserName", "Email", "Role", "Edit"]}
          smallArr={["Edit"]}
          setMode={setMode}
          showFilters={true}
          showAdd={true}
          pagenationData={paginationData}
        >
          {data.map((ele, idx) => (
            <TableRow key={idx} rowNum={idx}>
              <TableData>{ele.userName}</TableData>
              <TableData>{ele.email}</TableData>
              <TableData>{ele.role}</TableData>
              <TableEdit
                setEditItem={() => setEditItem(ele)}
                setMode={setMode}
              />
            </TableRow>
          ))}
        </Table>
      </Section>
      <FiltersPopup mode={mode} setMode={setMode} />
      <AddPopup mode={mode} setMode={setMode} setData={setData} />
      {mode === "Edit" && (
        <EditPopup
          mode={mode}
          setMode={setMode}
          editItem={editItem}
          setEditItem={setEditItem}
        />
      )}
    </>
  );
};

export default ManagerUsers;
