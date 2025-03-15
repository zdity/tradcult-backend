import jwt from "jsonwebtoken";

import { User } from "#models";

export default async function(req, res) {
  let { email, password } = req.body;
  email = email?.toLowerCase();

  const emailRegex = /^[^\s]+\@[a-zA-Z0-9\.\-\_]+\.[a-zA-Z]{2,}$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\W\_]).{8,}$/;

  if (!email || !password) {
    return res
      .status(400)
      .end();
  };

  if (!emailRegex.test(email) || !passwordRegex.test(password)) {
    return res
      .status(400)
      .end();
  };

  let user = await User.findOne({ email });

  if (user) {
    if (!user.verifyPassword(password)) {
      return res
        .status(400)
        .end();
    };

  } else {
    user = await User.create({
      email,
      password
    });
  };

  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
    algorithm: "HS256",
    expiresIn: "1d"
  });

  return res
    .status(200)
    .json(token);
};
