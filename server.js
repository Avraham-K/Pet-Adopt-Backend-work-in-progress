const express = require("express");
const app = express();
require("dotenv").config();
app.use(express.json());

const PORT = process.env.PORT || 8080;
const usersRoute = require("./routes/usersRoute");
const petRoute = require("./routes/petRoute");

const cors = require("cors");
app.use(cors());

app.use("/users", usersRoute);
app.use("/pet", petRoute);

app.get("*", (req, res) => {
    res.status(404).send("Page Not Fount");
  });
  
app.listen(PORT, () => { 
      console.log(`Listening on http://localhost:${PORT}`);
});