const fs = require("fs");
const path = require("path");
const bcrypt = require('bcrypt');

const pathToUsersDb = path.resolve(__dirname, "../database/usersDb.json");

async function getAllUsersModel() {
  try {
    const allUsers = fs.readFileSync(pathToUsersDb);
    const jsonAllUser = await JSON.parse(allUsers);
    return jsonAllUser;
  } catch (err) {
    console.log(err);
  }
}

async function getUserByEmailModel(email) {
  try {
    const allUsers =  await getAllUsersModel();
    const user = allUsers.find((user) => user.email === email);
    return user
  } catch (err) {
    console.log(err);
  }
}

async function getUserByUserNameModel(userName) {
  try {
    const allUsers = await getAllUsersModel();
    const user = allUsers.find((user) => user.userName === userName);
    return user
  } catch (err) {
    console.log(err);
  }
}

async function addUserModel(newUser) {
  try {
    const allUsers = await getAllUsersModel();
    allUsers.push(newUser);
    fs.writeFileSync(pathToUsersDb, JSON.stringify(allUsers));
    return newUser;
  } catch (err) {
    console.log(err);
  }
}

async function loginModael(userName, password) {
  try {
    const user = await getUserByUserNameModel(userName);
    const validate = await decrypter(password, user.hashedPassword);
    return (validate? user : validate);
  } catch (err) {
    console.log(err);
  }
}

async function deleteUserByUserIdModel(id) {
  try {
    const allUsers = await getAllUsersModel();
    const filteredUsers = allUsers.filter((user) => user.id !== id);
    fs.writeFileSync(pathToUsersDb, JSON.stringify(filteredUsers));
    return true;
  } catch (err) {
    console.log(err);
  }
}

async function deleteUserByUserNameModel(userName) {
  try {
    const allUsers = await getAllUsersModel();
    const filteredUsers = allUsers.filter((user) => user.userName !== userName);
    fs.writeFileSync(pathToUsersDb, JSON.stringify(filteredUsers));
    return true;
  } catch (err) {
    console.log(err);
  }
}

async function updateUserModal(newUser) {
  try {
    const allUsers = await getAllUsersModel();
    let user = await JSON.parse(JSON.stringify(allUsers.filter((user) => user.userName === newUser.userName)));
    await deleteUserByUserIdModel(user[0].id);
    Object.keys(newUser).forEach(key => user[0][key] = newUser[key]);
    await addUserModel(user[0]);
    return (user[0]);
  } catch (err) {
    console.log(err);
  }
}

 async function encrypter(password){
  const saltRounds = 10;
  salt = await bcrypt.genSalt(saltRounds);
  hash = await bcrypt.hash(password, salt);
  return hash;
  }
  
   async function decrypter(password, passwordHash){
    const match = await bcrypt.compare(password, passwordHash);
    return match;
  }

module.exports = { encrypter, decrypter, getAllUsersModel, getUserByEmailModel, addUserModel, loginModael, getUserByUserNameModel, updateUserModal, deleteUserByUserIdModel, deleteUserByUserNameModel };