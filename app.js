const express = require("express");
const userRoutes = require("./src/routes/user.routes");
const newsRoutes = require("./src/routes/news.routes");
const env = require("dotenv");

env.config();
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRoutes);
app.use("/news", newsRoutes);

app.listen(port, (err) => {
  if (err) {
    return console.log("Something bad happened", err);
  }
  console.log(`Server is listening on ${port}`);
});

module.exports = app;
