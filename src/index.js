const express = require("express");
const app = express();

const personRoute = require("./route/person");

app.use("/Persons", personRoute);
app.use(express.static("public"));

const PORT = process.env.PORT || 3500;

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
