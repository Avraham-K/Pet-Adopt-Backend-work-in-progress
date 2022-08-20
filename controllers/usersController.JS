const { v4: uuidv4 } = require("uuid");
const {
  encrypter,
  getAllUsersModel,
  addUserModel,
  loginModael,
  updateUserModal,
  deleteUserByUserIdModel,
  deleteUserByUserNameModel,
} = require("../models/usersModel");

async function getAllUsers(req, res) {
  try {
    const allUsers = getAllUsersModel();
    res.send(allUsers);
  } catch (err) {
    res.status(500).send(err);
  }
}

async function signup(req, res) {
  try {
    const { userName, email, password, firstLast, phoneNumber, bio } = req.query;
    const hashedPassword = await encrypter(password);

    const newUser = {
      id: uuidv4(),
      userName: userName,
      email: email,
      firstLast: firstLast,
      phoneNumber: phoneNumber,
      hashedPassword: hashedPassword,
      bio: bio,
      signUpDate: Date.now(),
    };
    const user = await addUserModel(newUser);
    if (user) {
      const filteredUser = {
        userName: user.userName,
        email: user.email,
        firstLast: user.firstLast,
        phoneNumber: user.phoneNumber,
        bio: user.bio,
      };
      res.send(filteredUser);
      return;
    }
  } catch (err) {
    res.status(500).send(err);
  }
}

async function login(req, res) {
  try {
    const { userName, password } = req.query;
    const userOrPasswordError = await loginModael(userName, password);
    if (userOrPasswordError) {
      res.send(userOrPasswordError);
      return;
    }
    res.status(500).send("User name does not match the password");
  } catch (err) {
    res.status(500).send("User name does not match the password");
  }
}

async function update(req, res) {
  try {
    const { userName, email, firstLast, phoneNumber, bio, password } =
      req.query;

    let newUser = {
      userName,
      email,
      firstLast,
      phoneNumber,
      bio,
    };
    if (password) {
      newUser.hashedPassword = await encrypter(password);
    }
    const user = await updateUserModal(newUser);
    if (user) {
      const filteredUser = {
        userName: user.userName,
        email: user.email,
        firstLast: user.firstLast,
        phoneNumber: user.phoneNumber,
        bio: user.bio,
      };
      res.send(filteredUser);
      return;
    }
  } catch (err) {
    res.status(500).send(err);
  }
}

async function deleteUser(req, res) {
  try {
    const { userName } = req.query;
    const deletedUser = deleteUserByUserNameModel(userName);
    if (deletedUser) {
      res.send(`User has been deleted`);
      return;
    }
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
}

module.exports = { getAllUsers, signup, deleteUser, login, update };
