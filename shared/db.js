const { MongoClient } = require('mongodb');
const url = "mongodb+srv://pv33485:12345@ficha5.vaghoam.mongodb.net/?appName=ficha5";

const dbName = "Ficha_2";
let db;
 
async function connectDB() {
  const client = new MongoClient(url);
  await client.connect();
  db = client.db(dbName);
  console.log('Conectado ao MongoDB');
}

function getDB() {
  return db;
}
module.exports = { connectDB, getDB };

 