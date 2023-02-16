import bcrypt from "bcrypt";
import User from "../../../models/User";
import dbConnect from "../../../src/lib/dbConnect";

async function handler(req, res) {
  const { method } = req;

  dbConnect();

  // create new user
  if (method === "POST") {
    try {
      const { UserName: username, email, password } = req.body || {};
      console.log("data", req.body);

      // check validation
      if (!req.body) {
        return res.status(400).json({
          error: "Invalid Data!!",
        });
      }

      // check user exists
      const user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({
          error: {
            email: "User already exists",
          },
        });
      }

      // password hashed
      const saltRounds = 10;
      bcrypt.genSalt(saltRounds, function (err, salt) {
        bcrypt.hash(password, salt, async (err, hash) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ error: "server Error" });
          }

          if (hash) {
            // generate free trial end date
            let currentDate = new Date(); // create a new Date object with the current date
            currentDate.setDate(currentDate.getDate() + 3); // add 3 days to the current date
            let timestamp = Math.floor(currentDate.getTime() / 1000); // convert the resulting date to a Unix timestamp

            const trialEnd = timestamp;

            // create new user
            const newUser = new User({
              username,
              email,
              password: hash,
              trialEnd,
            });

            // save user in db
            await newUser.save();

            // send response
            res.status(201).json(newUser);
          }
        });
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        error: "Server error occurred",
      });
    }
  }
}

export default handler;

export const config = {
  api: {
    responseLimit: false,
  },
};
