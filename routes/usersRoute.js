const express = require("express");
const router = express.Router();
const UsersController = require("../controllers/usersController");
const { passwordsMatch, doesUserEmailExist, doesUserNameExist, userNameExistLogin, checkCorrectPassword, updateCheckPasswordsMatch } = require("../middleware/usersMiddleware");

const { validateBody } = require("../middleware/validateBody");

const { signUpSchema } = require("../schemas/allSchemas");

router.post("/signup", validateBody(signUpSchema), passwordsMatch, doesUserEmailExist, doesUserNameExist, UsersController.signup);
router.post("/login", userNameExistLogin, UsersController.login);
router.put("/update", validateBody(signUpSchema), updateCheckPasswordsMatch, UsersController.update);
router.delete("/delete", userNameExistLogin, checkCorrectPassword, UsersController.deleteUser);

module.exports = router;