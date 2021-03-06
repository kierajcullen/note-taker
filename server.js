// dependencies, require express
// follow hot restaurant
const express = require("express");

// configuration, set initial port, create server
const app = express();
const PORT = process.env.PORT || 3000;

// express app handles data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("Develop/public"));

// point to the route files
require("./routes/apiRoute.js")(app);
require("./routes/htmlRoute.js")(app);

// start the server, effectively
app.listen(PORT, function () {
  console.log("App listening on PORT: " + PORT);
});
