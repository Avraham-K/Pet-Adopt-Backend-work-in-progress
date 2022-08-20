const { v4: uuidv4 } = require("uuid");
const { addPetModel, getAllPetsModel, deletePetModel } = require("../models/petModel");

async function getAllPets(req, res) {
  try {
    const allNotes = getAllPetsModel()
    res.send(allNotes);
  } catch (err) {
    res.status(500).send(err);
  }
}

async function addPet(req, res) {
  try {
    const newPet = req.query;
    newPet = {
      id: uuidv4(),
      date: Date.now(),
    };
    const pet = addPetModel(newPet);
    if (pet) {
      res.send(pet);
      return;
    }
  } catch (err) {
    res.status(500).send(err);
  }
}

async function deletePet(req, res) {
  try {
    const {noteId} = req.params
    console.log(noteId);
    const deletedNote =  deletePetModel(noteId)
    if(deletedNote) {
      res.send({ok: true, deletedNote: noteId, message: 'Note Deleted'});
      return
    }
    
  } catch (err) {
    console.log(err)
    res.status(500).send(err);
  }
}

module.exports = { getAllPets, addPet, deletePet };
