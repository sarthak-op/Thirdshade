import { Stack } from "@mui/material";
import axios from "axios";

const DownloadButton = () => {
  const downloadData = async (format) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVERURI}/api/download?format=${format}`,
        {
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `data.${format}`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Download failed", error);
      // Add more detailed error logging here
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
      }
    }
  };

  return (
    <div>
      <Stack direction="row" spacing={1}>
        <button onClick={() => downloadData("csv")}>Download CSV</button>
        <button onClick={() => downloadData("excel")}>Download Excel</button>
      </Stack>
    </div>
  );
};

export default DownloadButton;
