import User from "../../../models/User";
import dbConnect from "../../../src/lib/dbConnect";

async function handler(req, res) {
  const { method } = req;

  dbConnect();

  // create new user
  if (method === "GET") {
    try {
      const { email } = req.query || {};
      const user = await User.findOne({ email });
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
