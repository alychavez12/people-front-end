const express = require('express');
const router = express.Router();
const People = require('../models/People');

// router.get("/", (req, res) => {
//   People.find({}, (err, people) => {
//     if (!err) {
//       res.status(200).res.json(people)
//     } else {
//       res.status(400).json({ message: "something went wrong" });
//     }
//   })
// });


router.get('/', async (req, res) => {
  try {
      res.status(200).json(await People.find({ createdBy: req.user.uid }));
  } catch (error) {
      res.status(400).json({ message: 'Something went wrong'});
  };
});

// create route
router.post('/', async (req, res) => {
  try {
    req.body.createdBy = req.user.uid; // autho
    res.status(201).json(await People.create(req.body));
  } catch (error) {
    res.status(400).json({ message: "something went wrong" });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    res.status(200).json(await People.findByIdAndDelete(req.params.id));
  } catch (error) {
    res.status(400).json({ message: "something went wrong" });
  }
});

router.get('/:id', async (req, res) => {
  try {
    res.status(200).json(
      await People.findByIdAndUpdate(req.params.id, req.body, { new: true })
    );
  } catch (error) {
    res.status(400).json({ message: "something went wrong" });
  }
});

router.put('/:id', async (req, res) => {
  try {
    res.status(200).json(
      await People.findByIdAndUpdate(req.params.id, req.body, { new: true })
    );
  } catch (error) {
    res.status(400).json({ message: "something went wrong" });
  }
});



module.exports = router;
