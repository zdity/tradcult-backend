import jwt from "jsonwebtoken";

import { User } from "#models";

import { hashPassword } from "#utils";

export default async function(req, res) {
  let { email, password } = req.body;
  email = email.toLowerCase();

  if (!email || !password) {
    return res
      .status(400)
      .end();
  };

  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w]{2,}$/;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

  if (!emailRegex.test(email) || !passwordRegex.test(password)) {
    return res
      .status(400)
      .end();
  };

  let user = await User.findOne({ email });

  if (user) {
    const [savedSalt, savedHash] = user.password.split(".");
    const { hash: attemptHash } = hashPassword(password, savedSalt);

    if (attemptHash != savedHash) {
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
