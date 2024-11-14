require("dotenv").config();

const express = require("express");
const connectDB = require("./dbConfig/dbConfig");
const app = express();
const compression = require("compression"); // use to compress the response
const cors = require("cors");
const port = process.env.PORT || 3000;

app.use(
  cors({
    origin: process.env.CORS_ORIGIN, // only selected domains
    credentials: true, //for to send cookies in the requests
  })
);

app.use(compression());
app.use(express.json({ limit: "100MB" }));
app.use(express.urlencoded({ extended: true }));

//integrating the Routes
app.use("/auth", require("./routes/authentication.routes"));
app.use("/user", require("./routes/userManagment.routes"));
app.use("/files",require('./routes/fileManagemnt.routes'))

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
