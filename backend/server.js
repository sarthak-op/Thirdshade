const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const sequelize = require("./database");
const Lead = require("./Lead");
const app = express();
const { Parser } = require("json2csv");
const ExcelJS = require("exceljs");
app.use(cors());
app.use(bodyParser.json());

// Sync Database
sequelize
  .sync()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => console.log("Error: " + err));

//table
app.get("/table", async (req, res) => {
  try {
    const leads = await Lead.findAll();
    res.json(leads);
  } catch (error) {
    console.error("Error fetching leads:", error);
    res.status(500).json({ error: "An error occurred while fetching leads" });
  }
});

//chart
app.get("/api/chart-data", async (req, res) => {
  try {
    const data = await Lead.findAll({
      attributes: [
        "channelPartnerCode",
        [sequelize.fn("COUNT", sequelize.col("channelPartnerCode")), "count"],
      ],
      group: ["channelPartnerCode"],
      order: [
        [sequelize.fn("COUNT", sequelize.col("channelPartnerCode")), "DESC"],
      ],
      limit: 10, // Limit to top 10 channel partner codes
    });

    res.json(data);
  } catch (error) {
    console.error("Error fetching chart data:", error);
    res.status(500).send("An error occurred while fetching chart data");
  }
});

//download
app.get("/api/download", async (req, res) => {
  const format = req.query.format || "csv";

  try {
    console.log("Attempting to fetch data...");
    const data = await Lead.findAll();
    console.log("Data fetched:", data.length, "records");

    if (data.length === 0) {
      console.log("No data found");
      return res.status(404).send("No data available");
    }

    const jsonData = data.map((item) => item.toJSON());

    if (format === "csv") {
      console.log("Generating CSV...");
      const fields = Object.keys(jsonData[0]);
      const parser = new Parser({ fields });
      const csv = parser.parse(jsonData);

      res.header("Content-Type", "text/csv");
      res.attachment("data.csv");
      return res.send(csv);
    } else if (format === "excel") {
      console.log("Generating Excel...");
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet("Data");

      worksheet.columns = Object.keys(jsonData[0]).map((key) => ({
        header: key,
        key: key,
      }));
      worksheet.addRows(jsonData);

      res.header(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );
      res.attachment("data.xlsx");
      return workbook.xlsx.write(res);
    } else {
      return res.status(400).send("Invalid format specified");
    }
  } catch (error) {
    console.error("Error in /api/download:", error);
    res.status(500).send("An error occurred while processing your request");
  }
});

//form post
app.post("/api/leads", async (req, res) => {
  try {
    const newLead = await Lead.create(req.body);
    res.status(201).json(newLead);
  } catch (error) {
    console.error("Error creating lead:", error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the lead" });
  }
});
