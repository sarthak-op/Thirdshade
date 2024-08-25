import { useState } from "react";
import { TextField, Button, MenuItem, Stack } from "@mui/material";
import axios from "axios";

const LeadForm = () => {
  const [formData, setFormData] = useState({
    channelPartnerCode: "",
    leadName: "",
    contactNumber: "",
    emailID: "",
    leadSource: "",
    leadInterest: "",
    additionalNotes: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_SERVERURI}/api/leads`, formData);
      alert("Lead submitted successfully");
      setFormData({
        channelPartnerCode: "",
        leadName: "",
        contactNumber: "",
        emailID: "",
        leadSource: "",
        leadInterest: "",
        additionalNotes: "",
      });
    } catch (error) {
      console.error("Error submitting lead:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack direction="column" spacing={2}>
        <TextField
          label="Channel Partner Code"
          placeholder="A unique identifier for each channel partner."
          name="channelPartnerCode"
          value={formData.channelPartnerCode}
          onChange={handleChange}
          required
          fullWidth
        />
        <TextField
          label="Lead Name"
          placeholder="The full name of the potential lead."
          name="leadName"
          value={formData.leadName}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          label="Contact Number"
          name="contactNumber"
          placeholder="+91 XXXXXXXXXX"
          type="number"
          value={formData.contactNumber}
          onChange={handleChange}
          required
          fullWidth
        />
        <TextField
          label="Email ID"
          name="emailID"
          placeholder="The email address of the lead."
          type="email"
          value={formData.emailID}
          onChange={handleChange}
          required
          fullWidth
        />
        <TextField
          label="Lead Source"
          name="leadSource"
          value={formData.leadSource}
          onChange={handleChange}
          select
          fullWidth
        >
          <MenuItem value="Social Media">Social Media</MenuItem>
          <MenuItem value="Referral">Referral</MenuItem>
          <MenuItem value="Website">Website</MenuItem>
          <MenuItem value="Other">Other</MenuItem>
        </TextField>
        <TextField
          label="Lead Interest"
          name="leadInterest"
          placeholder="e.g., specific services or products"
          value={formData.leadInterest}
          onChange={handleChange}
          required
          fullWidth
        />
        <TextField
          label="Additional Notes"
          placeholder="For any additional information about the lead."
          name="additionalNotes"
          value={formData.additionalNotes}
          onChange={handleChange}
          fullWidth
          multiline
          rows={4}
        />
      </Stack>
      <br />
      <Button type="submit" variant="contained" color="primary">
        Submit Lead
      </Button>
    </form>
  );
};

export default LeadForm;
