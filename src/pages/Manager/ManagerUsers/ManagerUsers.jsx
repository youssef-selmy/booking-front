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
import useTable from "../../../../hooks/useTable";

const ManagerUsers = () => {
  const {
    data,
    setData,
    mode,
    setMode,
    editItem,
    setEditItem,
    paginationData,
    setFilters,
    next,
    prev,
    loading,
    globalErrors
  } = useTable("users");

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
          next={next}
          prev={prev}
          loading={loading}
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
      {mode === "Filters" && (
        <FiltersPopup mode={mode} setMode={setMode} setFilters={setFilters} />
      )}
      {mode === "Add" && (
        <AddPopup
          mode={mode}
          setMode={setMode}
          setData={setData}
          dataLength={data.length}
        />
      )}
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
