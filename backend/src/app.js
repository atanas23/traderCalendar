import express from "express";
import passport from "passport";
import findOrCreate from "mongoose-findorcreate";
import cookieParser from "cookie-parser";
import gs from "passport-google-oauth20";
import bodyParser from "body-parser";
import de from "dotenv/config";
import connectToDB from "./db/dbUtils.js";
import setUpAuthRoutes from "./routes/auth.js";

// const jwt = require("jsonwebtoken");
// const cors = require("cors");
// const queryString = require("query-string");
const app = express();
connectToDB();

app.use(cookieParser(process.env.PASSPORT_LONG_SECRET));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/auth", setUpAuthRoutes(express.Router()));

// app.use(passport.initialize());
// app.use(passport.session());

const PORT = process.env.PORT || 8080;

app.listen(PORT, console.log(`Server started on port ${PORT}`));

/*
const GoogleStrategy = gs.Strategy;
// -------GOOGLE STRATEGY--------
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/secrets",
    },
    function (accessToken, refreshToken, profile, cb) {
      User.findOrCreate(
        {
          id: profile.id,
        },
        function (err, user) {
          return cb(err, user);
        }
      );
    }
  )
);

const userSchema = new mongoose.Schema({
  email: String,
  username: String,
  password: String,
});

userSchema.plugin(findOrCreate);
const User = new mongoose.model("User", userSchema);

//check if user is in the DB
// console.log(await checkUserExists(User, "atanas23@gmail.com"));

app.post("/post", (req, res) => {
  console.log("Connected to React");
  res.redirect("/");
});

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile"] })
);
*/
