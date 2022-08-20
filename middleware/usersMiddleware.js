const { getUserByEmailModel, getUserByUserNameModel, decrypter } = require("../models/usersModel");

function passwordsMatch(req, res, next) {
  if (req.query.password === req.query.repassword) {
    next();
    return;
  }
  res.status(400).send("Passwords do not match");
}

async function doesUserEmailExist(req, res, next) {
  const user = await getUserByEmailModel(req.query.email);  
  if (!user) {
    next();
    return;
  }
  res.status(400).send("User email already exists");
}

async function doesUserNameExist(req, res, next) {
  const user = await getUserByUserNameModel(req.query.userName);
  if (!user) {
    next();
    return;
  }
  res.status(400).send("User Name already exists");
}

async function userNameExistLogin(req, res, next) {
  const user = await getUserByUserNameModel(req.query.userName);
  if (user) {
    next();
    return;
  }
  res.status(400).send("User name does not match the password");
}

async function checkCorrectPassword(req, res, next) {
  const user = await getUserByUserNameModel(req.query.userName);
  const validate = await decrypter(req.query.password, user.hashedPassword)

  if (validate) {
    next();
    return;
  }
  res.status(400).send("Incorrect password");
}

async function updateCheckPasswordsMatch(req, res, next) {
   if ((!req.query.password && !req.query.repassword ) || (req.query.password === req.query.repassword)) {
    next();
    return;
  }
  res.status(400).send("Passwords do not match");
}

module.exports = { passwordsMatch, doesUserEmailExist, doesUserNameExist, userNameExistLogin, checkCorrectPassword, updateCheckPasswordsMatch };
