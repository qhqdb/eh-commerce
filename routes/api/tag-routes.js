const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
    include: {
      all: true,
      nested: true
    }
  }).then(tagsFound => {
    return res.json(tagsFound);
  }).catch(err => {
    res.status(500).json({ message: "Server error retrieving data.", err });
  })
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findOne({
    where: {
      id: req.params.id
    },
    include: {
      all: true,
      nested: true
    }
  }).then(tagFound => {
    return res.json(tagFound);
  }).catch(err => {
    res.status(500).json({ message: "Server error retrieving data.", err });
  });
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create(req.body)
  .then(newTag => {
    return res.json(newTag);
  }).catch(err => {
    res.status(500).json({ message: "Server error retrieving data.", err });
  })
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update({
    tag_name: req.body.tag_name
  },
  {
    where: {
      id: req.params.id
    }
  }).then(tag => {
    if (!tag)
      return res.status(404).json({ message: "No such tag found."});
    return res.json(tag);
  }).catch(err => {
    res.status(500).json({ message: "Server error retrieving data.", err});
  });
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id
    }
  }).then(tag => {
    if (!tag)
      return res.status(404).json({ message: "No such tag found."});
    return res.json(tag);
  }).catch(err => {
    res.status(500).json({ message: "Server error retrieving data.", err });
  });
});

module.exports = router;
