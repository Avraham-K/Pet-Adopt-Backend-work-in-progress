const fs = require("fs");
const path = require("path");

const pathToPetsDb = path.resolve(__dirname, "../database/petsDb.json");

async function getAllpetsModel() {
  try {
    const allPets = await fs.readFileSync(pathToPetsDb);
    return JSON.parse(allPets);
  } catch (err) {
    console.log(err);
  }
}

async function addPetModel(newPet) {
  try {
    const allPets = await getAllpetsModel();
    allPets.push(newPet);
    fs.writeFileSync(pathToPetsDb, JSON.stringify(allPets));
    return newPet;
  } catch (err) {
    console.log(err);
  }
}

function getUserByEmailModel(email) {
  try {
    const allUsers = getAllpetsModel();
    const user = allUsers.find((user) => user.email === email);
    return user
  } catch (err) {
    console.log(err);
  }
}

module.exports = { addPetModel,  };