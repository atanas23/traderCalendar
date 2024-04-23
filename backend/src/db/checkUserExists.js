import mongoose from "mongoose";

//test the check if a user exists in DB
// mongoose.connect("mongodb://127.0.0.1:27017");

// const userSchema = new mongoose.Schema({
//   name: String,
//   email: String,
//   password: String,
// });

// const User = mongoose.model("User", userSchema);

// const testUser = new User({
//   name: "atanas23",
//   email: "atanas23@gmail.com",
//   password: "AbDc24ghrwohfqbnfq",
// });
// await testUser.save();

// const testUser2 = new User({
//   name: "george15",
//   email: "george15@gmail.com",
//   password: "OptkqwenbiUanfos",
// });

// await testUser2.save();
// const users = await User.exists({ email: "atanas23@gmail.com" });
// console.log(users);

const checkUserExists = async (model, email) =>
  await model.exists({ email: email });

// main().catch((err) => console.log(err));

// async function main() {
//   await mongoose.connect("mongodb://127.0.0.1:27017");
// }

export default checkUserExists;
