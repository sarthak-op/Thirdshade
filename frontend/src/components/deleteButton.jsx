import PropTypes from "prop-types";
import axios from "axios";

const DeleteButton = ({ leadId, onDelete }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`${import.meta.env.VITE_SERVERURI}/delete/${leadId}`);
      onDelete(leadId); // Call this function to update the UI after successful deletion
    } catch (error) {
      console.error("Error deleting lead:", error);
      alert("An error occurred while deleting the lead");
    }
  };

  return <button onClick={handleDelete}>Delete</button>;
};

DeleteButton.propTypes = {
  leadId: PropTypes.number.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default DeleteButton;
