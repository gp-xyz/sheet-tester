import { google } from 'googleapis';


const auth = new google.auth.GoogleAuth({
  keyFile: 'path/to/keyfile.json',
  scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
});

const sheets = google.sheets({ version: 'v4', auth });

const getSheetData = async (sheetId, range) => {
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: sheetId,
    range,
  });

  return response.data.values;
};

export default getSheetData;
