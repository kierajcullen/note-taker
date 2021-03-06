const fs = require("fs");
module.exports = function (app) {
  app.get("/api/notes", (request, response) => {
    console.log("\n\nExecuting GET notes request");
    // Read json file
    let data = JSON.parse(fs.readFileSync("./Develop/db/db.json", "utf8"));
    console.log(
      "\nGET request - Returning notes data: " + JSON.stringify(data)
    );
    // Send read data to response of 'GET' request
    response.json(data);
  });

  // API POST Request
  app.post("/api/notes", (request, response) => {
    // Extracted new note from request body.
    const newNote = request.body;

    console.log("\n\nPOST request - New Note : " + JSON.stringify(newNote));

    // Read data from 'db.json' file
    let data = JSON.parse(fs.readFileSync("./Develop/db/db.json", "utf8"));
    console.log(data);
    // Pushed new note in notes file 'db.json'
    data.push(newNote);

    // Written notes data to 'db.json' file
    fs.writeFileSync("./Develop/db/db.json", JSON.stringify(data));

    console.log("\nSuccessfully added new note to 'db.json' file!");

    // Send response
    response.json(data);
  });

  // API DELETE request
  app.delete(`/api/notes/:id`, (request, response) => {
    // Fetched id to delete
    let noteId = request.params.id.toString();

    console.log(`\nDELETE note request for noteId: ${noteId}`);

    // Read data from 'db.json' file
    // safe to keep utf8
    let data = JSON.parse(fs.readFileSync("./Develop/db/db.json", "utf8"));
    console.log(data);
    // filter data to get notes except the one to delete
    const newData = data.filter((note) => note.id.toString() !== noteId);

    // Write new data to 'db.json' file
    fs.writeFileSync("./Develop/db/db.json", JSON.stringify(newData));

    console.log(`\nSuccessfully deleted note with id : ${noteId}`);

    // Send response
    response.json(newData);
  });
};
