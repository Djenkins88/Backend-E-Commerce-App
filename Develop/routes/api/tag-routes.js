const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint
router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
      }
    ]
  })
    .then(TagData => res.json(TagData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findOne({
    where: { id: req.params.id },
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
      }
    ]
  })
    .then(TagData => {
      if (!TagData) {
        res.status(404).json({ message: 'No tag found with this id'});
        return;
      }
      res.json(TagData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


router.post('/', (req, res) => {
  // create a new tag
  try {
    const tagData = await Tag.create({tag_name: req.body.tag_name});
    res.status(200).json(tagData);
  } catch (err) {
    res.status(400).json(err);
  }
});
 
router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body, {
    where: {
        id: req.params.id
    }
  })
    .then(TagData => {
        if (!TagData[0]) {
            res.status(404).json({ message: 'No tag found with this id'});
            return;
        }
        res.json(TagData);
  })
    .catch(err => {
        console.log(err); 
        res.status(500).json(err);
  });
});

router.delete('/:id', async (req, res) => {
  try {
    const tagData = await Tag.destroy({
      where: { id: req.params.id }
    });
    if (!tagData) {
      res.status(404).json({ message: 'No trip with this id!' });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
