const db = require("../models");
const Song = db.songs;

// Create and Save a new Song
exports.create = (req, res) => {
    // Validate request
    if (!req.body.title||!req.body.artist||!req.body.genere) {
      res.status(400).send({ message: req.body });
      return;
    }
    // Create a Song
    const song = new Song({
      title: req.body.title,
      artist: req.body.artist,
      album: req.body.album,
      genere: req.body.genere
    });
  
    // Save Song in the database
    song
      .save(song)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Song."
        });
      });
  };

// Retrieve all Song from the database.
exports.findAll = (req, res) => {
    Song.find()
      .then(data => { res.send(data);}).catch(err => {res.status(500).send({
          message: err.message || "Some error occurred while retrieving Songs."
        });
      });
  };

// Find a single Song with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    Song.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found Song with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving Song with id=" + id });
      });
  };
// Update a Song by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!"
      });
    }
  
    const id = req.params.id;
    Song.findByIdAndUpdate(id, req.body)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update Song with id=${id}. Maybe Song was not found!`
          });
        } else res.send({ message: "Song was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Song with id=" + id
        });
      });
  };

// Delete a Song with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    Song.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Song with id=${id}. Maybe Song was not found!`
          });
        } else {
          res.send({
            message: "Song was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Song with id=" + id
        });
      });
  };

// Delete all Songs from the database.
exports.deleteAll = (req, res) => {
    Song.deleteMany({})
      .then(data => {
        res.send({
          message: `${data.deletedCount} Song were deleted successfully!`
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all Song."
        });
      });
  };

// Find all Statistic of Songs
exports.findAllStatistic =  (req, res) => {
  Promise.all([
    Song.find(),
    Song.find().distinct('artist'),
    Song.find().distinct('album'),
    Song.find().distinct('genere'),
    Song.aggregate([
      {
        $group: {
          _id: '$genere',
          totaldocs : { $sum : 1 }
        },
      }
    ]),
    Song.aggregate([
      {
        $group: {
          _id: '$title',
          Artists : { $sum : 1 },
          _id: '$album',
          album : { $sum : 1 }
        }
      }
    ]),
    Song.aggregate([
      {
        $group: {
          _id: '$album',
          Album : { $sum : 1 }
        }} ])
  ]).then( ([ Allsong, DistnctByartist, DistnctByalbum, DistnctBygenres,CountByGEnere,query3, SongsInEachAlbum]) => {
    const Qury1={
      Allsong:Allsong.length,
      DistnctByartist:DistnctByartist.length,
      DistnctByalbum:DistnctByalbum.length,
      DistnctBygenres:DistnctBygenres.length,
      CountByGEnere:CountByGEnere,
      query3:query3,
      SongsInEachAlbum:SongsInEachAlbum
    }

    res.send(Qury1);
  }).catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Song."
        });
      });
  };

  exports.FilterByGenere = (req, res) => {
    Song.find()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Songs."
      });
    });



  }