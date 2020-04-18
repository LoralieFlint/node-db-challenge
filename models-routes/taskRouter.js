const express = require("express");
const Tasks = require("./taskModel");
const router = express.Router();

router.get("/", (req, res) => {
  Tasks.get()
    .then(task => {
      res.status(200).json(task);
    })
    .catch(error => {
      res.status(500).json({
        error: `Unable to fetch projects ${error.message}`
      });
    });
});


router.post("/", (req, res) => {
  Tasks.add(req.body)
    .then(task => {
      res.status(201).json(task);
    })
    .catch(error => {
      res.status(500).json({
        error: `Unable to add project ${error.message}`
      });
    });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params
  Tasks.remove(id)
  .then(deleted => {
  if (deleted) {
    res.json({ removed: deleted });
  } else {
    res.status(404).json({ message: 'Could not find scheme with given id' })
  }
})
.catch(err => {
  res.status(500).json({ message: 'Failed to delete scheme' })
});
})

module.exports = router;
