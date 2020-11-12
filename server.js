const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

//importing mongoose models
const db = require("./models");

const app = express();

//express middlewares
app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

//mongo atlas db connection data/info
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/workout",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  }
);

//load api routes
require("./routes/api.js")(app)

//load html routes
require("./routes/view.js")(app)

//start server
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
