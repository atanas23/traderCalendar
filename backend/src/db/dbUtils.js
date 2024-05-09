import mongoose from "mongoose";
import findOrCreate from "mongoose-findorcreate";

const connectToDB = () => {
  mongoose.connect("mongodb://127.0.0.1:27017/traderCalendar");
  mongoose.set("strictQuery", true);

  const db = mongoose.connection;
  //error handling
  db.on("error", console.error.bind(console, "connection error:"));
  db.once("open", () => console.log("Connected to MongoDB"));

  initializeUserSchema();
};

const initializeUserSchema = () => {
  const userSchema = new mongoose.Schema({
    email: String,
    username: String,
    password: String,
  });

  // const User = new mongoose.model("User", userSchema);

  userSchema.plugin(findOrCreate);
  mongoose.model("User", userSchema);
};

const getUser = async (email) => {
  const User = mongoose.model("User");
  return await User.findOne({ email: email });
};

const saveUser = async (user) => {
  const User = mongoose.model("User");
  return User.create(user);
};

// const getTrades = async (model) => await model.find({});

export default connectToDB;
export { getUser, saveUser };
