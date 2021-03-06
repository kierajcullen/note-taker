// Dependencies
const path = require("path");

// Routing

module.exports = function (app) {
  // HTML GET Requests
  // Below code handles when users 'visit' a page.
  // In each of the below cases the user is shown an HTML page of content
  // app.get/notes, if there is a request.. this is our response
  app.get("/notes", function (request, response) {
    // .. in routes folder
    response.sendFile(path.join(__dirname, "../Develop/public/notes.html"));
  });

  app.get("/", function (request, response) {
    response.sendFile(path.join(__dirname, "../Develop/public/index.html"));
  });
};
