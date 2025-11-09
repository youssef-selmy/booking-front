import { useState } from "react";
import Table from "../../components/Table/Table";

const AdminDashboard = () => {
  const [data, setData] = useState([
    { id: "123", name: "Hilton", location: "Alex", state: "Pinding" },
    { id: "456", name: "H&N", location: "Cairo", state: "Pinding" },
    { id: "789", name: "Vinec", location: "Alex", state: "Pinding" },
    { id: "112", name: "Carq", location: "Alex", state: "Pinding" },
    { id: "223", name: "Finex", location: "Alex", state: "Pinding" },
  ]);
  return (
    <main className="p-5">
      <Table
        head={["Name", "Location", "State"]}
        smallArr={[4]}
        dataKeys={["name", "location", "state"]}
        testData={data}
        view={{ name: "Details", key: "id" }}
      />
    </main>
  );
};

export default AdminDashboard;
