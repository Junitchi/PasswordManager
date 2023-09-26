// // jsonReader.js

// const { remote } = require('electron');
// const fs = remote.require('fs'); // Use remote.require to access 'fs' in the main process

// // This function reads the JSON file using 'fs' in the main process
// export function readJsonFile() {
//   const jsonFilePath = "./passwords.json"; // Adjust the file path as needed

//   try {
//     const data = fs.readFileSync(jsonFilePath, 'utf8');
//     const jsonData = JSON.parse(data);

//     // Now you can work with the JSON data
//     return jsonData;
//   } catch (error) {
//     console.error("Error reading JSON:", error);
//     return null; // Handle errors as needed
//   }
// }
