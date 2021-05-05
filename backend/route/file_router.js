module.exports = function (app) {
  const file_uploader = require("../controller/file_controller");

  // Upload a file
  app.post("/upload", file_uploader.upload);

  // Retrieve list of files
  app.get("/files", file_uploader.getListFiles);

  // Retrieve a file
  app.get("/files/:name", file_uploader.download);
};
