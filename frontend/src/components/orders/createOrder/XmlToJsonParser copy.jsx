import React, { useState } from 'react';
import { parseStringPromise } from 'xml2js';
// import {xmlString} from "../temp/1955_JobXML.xml"



const XmlToJsonParser = () => {
  const [jsonData, setJsonData] = useState(null);

  const parseXml = async (xmlString) => {
    try {
      const result = await parseStringPromise(xmlString, { trim: true, explicitArray: false });
      const jobData = transformData(result.CreateJob);
      setJsonData(jobData);
      console.log("job data", jobData)
    } catch (err) {
      console.error("Error parsing XML:", err);
    }
  };

  const transformData = (data) => {
    return {
      number: parseInt(data.Job.OrderID, 10),
      nameOfOrder: data.Job.Name,
      owner: [5], // Example value; replace with your logic
      typeOfOrder: data.Job.JobDescription || "",
      circulation: parseInt(data.Job.Quantity, 10) || 0,
      binding: "",
      width: parseInt(data.Job.PageWidth, 10) || 0,
      height: parseInt(data.Job.PageHeigth, 10) || 0,
      created: new Date().toISOString(),
      due_date: data.Job.DueDate ? new Date(data.Job.DueDate).toISOString() : null,
      delivery_date: null,
      parts: [
        {
          part_name: "BLO",
          pages: data.Job.BlockPages || "1",
          paper: {
            name: "",
            type: "", // Example; modify based on logic
            density: 0,
            width: 0,
            height: 0,
            manufacturer: []
          },
          paper_id: "132",
          color: data.Job.BlockColors || "4+4",
          color_display: data.Job.BlockColors || "4+4",
          laminate: "",
          uflak: false,
          printing: [
            {
              printed_sheets: 23, // Example; replace with your logic
              circulation_sheets: 32, // Example
              parent_day: "вт, 26.11_day", // Example
              position: 2,
              order_part_id: 1212,
              sm1: true, // Example
              sm2: false, // Example
              rapida: false // Example
            }
          ]
        }
      ]
    };
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const xmlString = await file.text();
      await parseXml(xmlString);
    }
  };

  return (
    <div>
      <h1>XML to JSON Parser</h1>
      <input type="file" accept=".xml" onChange={handleFileChange} />
      <pre>{jsonData ? JSON.stringify(jsonData, null, 2) : "Upload an XML file to parse"}</pre>
    </div>
  );
};

export default XmlToJsonParser;
