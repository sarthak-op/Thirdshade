import { Button } from "@mui/material";
import LeadChart from "./components/Chart";
import DownloadButton from "./components/DownloadButton";
import LeadTable from "./components/Table";

const Table = () => {
  return (
    <div>
      <a href="/">
        <Button color="secondary">Form</Button>
      </a>
      <br />
      <br />
      <DownloadButton />
      <br />
      <LeadChart />
      <br />
      <LeadTable />
      <br />
    </div>
  );
};

export default Table;
