import React, { useState } from 'react';
import { parseStringPromise } from 'xml2js';
// import {xmlString} from "../temp/1955_JobXML.xml"



const XmlToJsonParser = ({sendInitialValues}) => {
  
  const [jsonData, setJsonData] = useState(null);

  const parseXml = async (xmlString) => {
    try {
      const result = await parseStringPromise(xmlString, { trim: true, explicitArray: false });
      const jobData = transformData(result.CreateJob);
      setJsonData(jobData);
      console.log("job data", jobData)
      sendInitialValues(jobData)
      // console.log("HHHHHH", sendInitialValues)
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
      parts: [
        {
          part_name: data.Job.BlockPages ? "BLO": "",
          pages: data.Job.BlockPages || 1,
          color: data.Job.BlockColors || "",
          paper: {
            name: "",
            type: "",
            density: 0,
            width: 0,
            height: 0,            
          },
          printing: [
            {
              printed_sheets: 0,
              circulation_sheets: 0,
              parent_day: '',
              machine: '',
            }
          ]
        },
         {
          part_name: data.Job.CoverPages ?  "COV": "",
          pages: data.Job.CoverPages || 0,
          color: data.Job.CoverColors || "",
          paper: {
            name: "",
            type: "",
            density: 0,
            width: 0,
            height: 0,            
          },
          printing: [
            {
              printed_sheets: 0,
              circulation_sheets: 0,
              parent_day: '',
              machine: '',
            }
          ]
         },
         {
          part_name: data.Job.CoverPages ?  "VKL": "",
          pages: data.Job.VkleykaPages || 0,
          color: data.Job.VkleikaColors || "",
          paper: {
            name: "",
            type: "",
            density: 0,
            width: 0,
            height: 0,
          },
          printing: [
            {
              printed_sheets: 0,
              circulation_sheets: 0,
              parent_day: '',
              machine: '',
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
      {/* <h1>XML to JSON Parser</h1> */}
      <input type="file" accept=".xml" onChange={handleFileChange} />
      <pre>{jsonData ? JSON.stringify(jsonData, null, 2) : "Upload an XML file to parse"}</pre>
      {/* <pre>{jsonData ? JSON.stringify(jsonData, null, 2) : "Upload an XML file to parse"}</pre> */}
    </div>
  );
};

export default XmlToJsonParser;
