module.exports = app => {
    const songs = require("../controllers/song.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Song
    router.post("/", songs.create);
  
    // Retrieve all songs
    router.get("/", songs.findAll);
  
    // Retrieve all published songs
    router.get("/report", songs.findAllPublished);
  
    // Retrieve a single Song with id
    router.get("/:id", songs.findOne);
  
    // Update a Song with id
    router.put("/:id", songs.update);
  
    // Delete a Song with id
    router.delete("/:id", songs.delete);
  
    // Delete all songs
    router.delete("/", songs.deleteAll);
  
    app.use('/api/songs', router);
  };