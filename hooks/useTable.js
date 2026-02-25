import { useEffect, useState } from "react";
import api from "../api/axios";
import useApi from "./useApi";

const useTable = (path) => {
  const [data, setData] = useState([]);
  const [paginationData, setPaginationData] = useState(null);
  const [mode, setMode] = useState(null);
  const [editItem, setEditItem] = useState(null);
  const [filters, setFilters] = useState({});
  const [page, setPage] = useState(1);
  const { request, loading, globalErrors } = useApi((payload) =>
    api.get(
      `${path}?page=${page}${new URLSearchParams(filters).toString()}`,
    ),
  );

  useEffect(() => {
    const handleGet = async () => {
      const { data } = await request();
      setData(data.data);
      setPaginationData(data.paginationResult);
    };
    handleGet();
  }, [editItem, filters, page]);

  async function next() {
    if (paginationData.currentPage + 1 <= paginationData.numberOfPages)
      setPage(paginationData.currentPage + 1);
  }
  async function prev() {
    if (paginationData.currentPage - 1 >= 1)
      setPage(paginationData.currentPage - 1);
  }

  return {
    data,
    setData,
    paginationData,
    setPaginationData,
    mode,
    setMode,
    editItem,
    setEditItem,
    filters,
    setFilters,
    next,
    prev,
    loading,
    globalErrors,
  };
};

export default useTable;
