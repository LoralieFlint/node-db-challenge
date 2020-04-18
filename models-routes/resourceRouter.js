const express = require('express');
const Resources = require('./resourceModel');
const router = express.Router();

router.get('/', (req, res) => {
  Resources.get()
  .then(resource => {
    res.status(200).json(resource);
  })
  .catch(error => {
    res.status(500).json({
      error: `Unable to fetch projects ${error.message}`
    })
  })
});

router.post('/', (req, res) => {
  Resources.add(req.body)
  .then(resource => {
    res.status(201).json(resource)
  })
  .catch(error => {
    res.status(500).json({
      error: `Unable to add project ${error.message}`
    })
  })
});

router.delete("/:id", (req, res) => {
  const { id } = req.params
  Resources.remove(id)
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