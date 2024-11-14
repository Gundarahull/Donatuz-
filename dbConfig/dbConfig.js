require("dotenv").config();
const mongoose = require("mongoose");

const MONGO_URL = process.env.MONGO_URL;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  compressors: "zlib",
  zlibCompressionLevel: 6,
};

mongoose
  .connect(MONGO_URL, options)
  .then(() => {
    console.log("Sucessfully Conected to MongoDB");
  })
  .catch((err) => {
    console.log("Error While Connecting to MongoDb", err);
  });

const connectDB = mongoose.connection;

//Events
connectDB.on("connected", () => {
  console.log(`Mongoose connected to MongoDB at ${MONGO_URL}`);
});

connectDB.on("disconnected", () => {
  console.log("Mongoose disconnected");
});

connectDB.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

module.exports = connectDB;

//   const users = await User.find({ isActive: true }).lean();
