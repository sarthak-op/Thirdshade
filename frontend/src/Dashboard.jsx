import { Button } from "@mui/material";
import LeadForm from "./components/form";

const Dashboard = () => {
  return (
    <div className="container">
      <a href="/table">
        <Button color="secondary">Table</Button>
      </a>{" "}
      <h1>Fill form to submit Leads.</h1>
      <LeadForm />
      <br />
    </div>
  );
};

export default Dashboard;
