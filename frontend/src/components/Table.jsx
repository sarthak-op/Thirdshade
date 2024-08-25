import { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import DeleteButton from "./deleteButton";

const LeadTable = () => {
  const [leads, setLeads] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVERURI}/table`
        );

        if (Array.isArray(response.data)) {
          setLeads(response.data);
        } else {
          setLeads([]);
          console.error("Unexpected data format:", response.data);
        }
      } catch (err) {
        setError("Failed to fetch leads.");
        console.error("Error fetching leads:", err);
      }
    };

    fetchLeads();
  }, []);
  const handleDelete = (deletedLeadId) => {
    setLeads(leads.filter((lead) => lead.id !== deletedLeadId));
  };
  return (
    <TableContainer component={Paper}>
      {error ? (
        <div>{error}</div>
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Channel Partner Code</TableCell>
              <TableCell>Lead Name</TableCell>
              <TableCell>Contact Number</TableCell>
              <TableCell>Email ID</TableCell>
              <TableCell>Lead Source</TableCell>
              <TableCell>Lead Interest</TableCell>
              <TableCell>Submitted At</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {leads.map((lead) => (
              <TableRow key={lead.id}>
                <TableCell>{lead.channelPartnerCode}</TableCell>
                <TableCell>{lead.leadName}</TableCell>
                <TableCell>{lead.contactNumber}</TableCell>
                <TableCell>{lead.emailID}</TableCell>
                <TableCell>{lead.leadSource}</TableCell>
                <TableCell>{lead.leadInterest}</TableCell>
                <TableCell>
                  {new Date(lead.createdAt).toLocaleString()}
                </TableCell>
                <TableCell>
                  <DeleteButton leadId={lead.id} onDelete={handleDelete} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </TableContainer>
  );
};

export default LeadTable;
