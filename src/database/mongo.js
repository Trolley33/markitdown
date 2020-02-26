const MongoClient = require("mongodb").MongoClient;
const uri =
  "mongodb+srv://trolley33:Chelsea69@markbook-nd8dk.azure.mongodb.net/notes?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

export default client;
