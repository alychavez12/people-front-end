const People = require("../models/People");

const getPeople = async (req, res) => {
  try {
    res.status(200).json(await People.find({createdBy: req.user.uid}));// to find the user documents (re.user.uid)
  } catch (error) {
    res.status(400).json({ message: "something went wrong" });
  }
}

const createPerson = async (req, res) => {
  try {
    req.body.createdBy = req.user.uid; // this is how we associete a logged in user to a new document
    res.status(201).json(await People.create(req.body));
  } catch (error) {
    res.status(400).json({ message: "something went wrong" });
  }
}

const deletePerson = async (req, res) => {
  try {
    res.status(200).json(await People.findByIdAndDelete(req.params.id));
  } catch (error) {
    res.status(400).json({ message: "something went wrong" });
  }
}

const showPerson = async (req, res) => {
  try {
    res.status(200).json(
      await People.findByIdAndUpdate(req.params.id, req.body, { new: true })
    );
  } catch (error) {
    res.status(400).json({ message: "something went wrong" });
  }
}

const updatePerson = async (req, res) => {
  try {
    res.status(200).json(
      await People.findByIdAndUpdate(req.params.id, req.body, { new: true })
    );
  } catch (error) {
    res.status(400).json({ message: "something went wrong" });
  }
}


module.exports = {
  getPeople,
  createPerson,
  deletePerson,
  showPerson,
  updatePerson
}
