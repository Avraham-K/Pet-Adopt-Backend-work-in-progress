const express = require("express");
const router = express.Router();
const petController = require("../controllers/petController");
const { validateBody } = require("../middleware/validateBody");
const { petSchema } = require("../schemas/allSchemas");

router.get("/", petController.getAllPets);

router.post("/", validateBody(petSchema), petController.addPet);

router.delete("/:noteId", petController.deletePet);

module.exports = router;
