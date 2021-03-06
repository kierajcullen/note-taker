// use nodemon in terminal for convenience
const fs = require("fs");
let data = require("../Develop/db/db.json");
console.log(data);
module.exports = function (app) {
  app.get("/api/notes", (request, response) => {
    console.log("\n\nExecuting GET notes request");
    // Read json file
    // let data = JSON.parse(fs.readFileSync("./Develop/db/db.json", "utf8"));
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
    // let data = JSON.parse(fs.readFileSync("./Develop/db/db.json", "utf8"));
    console.log(data);
    // Pushed new note in notes file 'db.json'
    // do not need to writefilesync with this function .push
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
    //   console.log(`\nDELETE note request for noteId: ${noteId}`);
    response.send(noteId);
    // Read data from 'db.json' file
    // safe to keep utf8
    let data = JSON.parse(fs.readFileSync("./Develop/db/db.json", "utf8"));
    console.log(data);
    // filter data to get notes except the one to delete
    // save newData back to data
    data = data.filter((note) => note.id.toString() !== noteId);

    // Write new data to json file
    fs.writeFileSync("./Develop/db/db.json", JSON.stringify(data));

    console.log(`\nSuccessfully deleted note with id : ${noteId}`);

    // Send response
    response.json(data);
  });
};
