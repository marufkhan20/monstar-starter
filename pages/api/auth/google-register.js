import User from "../../../models/User";
import dbConnect from "../../../src/lib/dbConnect";

async function handler(req, res) {
  const { method } = req;

  dbConnect();

  // create new user
  if (method === "POST") {
    try {
      const { email, name, image } = req.body || {};

      const user = await User.findOne({ email });

      if (!user) {
        // generate free trial end date
        let currentDate = new Date(); // create a new Date object with the current date
        currentDate.setDate(currentDate.getDate() + 3); // add 3 days to the current date
        let timestamp = Math.floor(currentDate.getTime() / 1000); // convert the resulting date to a Unix timestamp

        const trialEnd = timestamp;

        const newUser = await new User({
          email,
          username: name,
          image,
          type: "google",
          trialEnd,
        });

        await newUser.save();

        return res.status(200).json(newUser);
      }

      res.status(200).json(user);
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
