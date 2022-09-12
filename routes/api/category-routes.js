const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    include: {
      all: true,
      nested: true
    }
  }).then(categoriesFound => {
    return res.json(categoriesFound);
  }).catch(err => {
    res.status(500).json({ message: "Server error retrieving data.", err });
  });
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne({
    where: {
      id: req.params.id
    },
    include: {
      all: true,
      nested: true
    }
  }).then(categoryFound => {
    return res.json(categoryFound);
  }).catch(err => {
    res.status(500).json({ message: "Server error retrieving data.", err });
  });
});

router.post('/', (req, res) => {
  // create a new category
  Category.create(req.body)
  .then(newCategory => {
    return res.json(newCategory);
  }).catch(err => {
    res.status(500).json({ message: "Server error retrieving data.", err });
  });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update({
    category_name: req.body.category_name
  },
  {
    where: {
      id: req.params.id
    }
  }).then(category => {
    if (!category)
      return res.status(404).json({ message: "No such category found."});
    return res.json(category);
  }).catch(err => {
    res.status(500).json({ message: "Server error retrieving data.", err });
  });
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id:req.params.id
    }
  }).then(category => {
    if (!category)
      return res.status(404).json({ message: "No such category found."});
    return res.json(category);
  }).catch(err => {
    res.status(500).json({ message: "Server error retrieving data.", err });
  });
});

module.exports = router;
