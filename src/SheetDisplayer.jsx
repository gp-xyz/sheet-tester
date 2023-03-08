import React, { useState, useEffect } from 'react';
import getSheetData from './googleSheets';

const SheetDisplayer = ({ sheetId }) => {
  const [tables, setTables] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const sheets = await getSheetData(sheetId, null);
      const tablesData = sheets.map((sheet) => {
        const tableData = sheet.data[0].rowData.map((row) => {
          return row.values.map((cell) => {
            return cell.formattedValue;
          });
        });

        return {
          name: sheet.properties.title,
          data: tableData,
        };
      });

      setTables(tablesData);
    };

    fetchData();
  }, [sheetId]);

  return (
    <div>
      {tables.map((table) => (
        <div key={table.name}>
          <h2>{table.name}</h2>
          <table>
            <thead>
              <tr>
                {table.data[0].map((header, index) => (
                  <th key={index}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {table.data.slice(1).map((row, index) => (
                <tr key={index}>
                  {row.map((cell, index) => (
                    <td key={index}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default SheetDisplayer;
