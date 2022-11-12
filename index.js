const { readFileSync, writeFileSync } = require("fs");
const csvjson = require("csvjson"); // Npm package to work with json and csv data
const axios = require("axios"); // Axios to fetch data from api

const api = " http://localhost:3000/People"; // The api
const basePath = "./users.csv"; // Path to csv

// Returning promise to get the data from api
const fetchData = () => {
  return new Promise((resolve, reject) => {
    const fetch_data = axios.get(api);

    if (fetch_data) { 
      resolve(fetch_data); // Promise resolved
      return;
    }

    reject("Request Failed, Try again"); // Promise rejected
  });
};

// Write CSV file
let writeCsv = () => {
  fetchData()
    .then((apiData) => {
      
      let csvData = csvjson.toCSV(apiData.data, {
        headers: "key",
      });

    writeFileSync(basePath, csvData); // Writing csv data in users.csv
    })
    .catch((message) => {
      console.log(message);
    });
};

writeCsv();

// Filter Algorithm ( Filtering FirstName in users-sorted.csv)
const filterData = () => {
  const fileData = readFileSync(basePath, { encoding: "utf-8" });

  const arrayString = fileData.split("\n");

  arrayString.forEach((element) => {
    let property = element.split(",");

    writeFileSync("./users-sorted.csv", property[1] + "\n", { flag: "a" });
  });
};

 // Find the user by entering id
const findUser = (id) => {

  const csvFileData = readFileSync(basePath,  { encoding: "utf-8" }); // Grab the data from CSV File
  const toJson = csvjson.toObject(csvFileData); // Convert the data to Json Object 

  const result = toJson.filter((user)=>{ // Filter out the required user based on their id
    return id.toString() === user.id;
  })
  return result;
  
}



