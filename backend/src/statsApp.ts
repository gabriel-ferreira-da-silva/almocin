import express, { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

const app = express();
app.use(express.json());

const jsonFilePath = path.join(__dirname, 'data.json');

// Function to read JSON file
const readJsonFile = (filePath: string): any => {
  const jsonData = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(jsonData);
};

// Function to write JSON file
const writeJsonFile = (filePath: string, data: any): void => {
  const jsonData = JSON.stringify(data, null, 2);
  fs.writeFileSync(filePath, jsonData, 'utf-8');
};

// Endpoint to get JSON data
app.get('/data', (req: Request, res: Response) => {
  const data = readJsonFile(jsonFilePath);
  res.json(data);
});

// Endpoint to update JSON data
app.put('/data', (req: Request, res: Response) => {
  const data = readJsonFile(jsonFilePath);
  const updates = req.body;

  // Update each element individually
  for (const key in updates) {
    if (data.hasOwnProperty(key)) {
      data[key] = updates[key];
    }
  }

  writeJsonFile(jsonFilePath, data);
  res.json(data);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
