const express = require('express');

const Projects = require('./projectModel');

const router = express.Router();

router.get('/', (req, res) => {
  Projects.get()
  .then(projects => {
    res.status(200).json(projects);
  })
  .catch(error => {
    res.status(500).json({
      error: `Unable to fetch projects ${error.message}`
    })
  })
});

router.post('/', (req, res) => {
  Projects.add(req.body)
  .then(project => {
    res.status(201).json(project)
  })
  .catch(error => {
    res.status(500).json({
      error: `Unable to add project ${error.message}`
    })
  })
});

router.delete("/:id", (req, res) => {
  const { id } = req.params
  Projects.remove(id)
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