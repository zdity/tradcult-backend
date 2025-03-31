import jwt from "jsonwebtoken";

import { User } from "#models";

export default async function (req, res) {
  const emailRegex = /^[a-zA-Z0-9\.\-]+\@[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,}$/;
  const phoneRegex = /^[0-9]{10}$/
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\W\_]).{8,}$/;

  const { id, password } = req.body;
  let email, phone, user;

  if (!id || !password) {
    return res
      .status(400)
      .end();
  };

  if (emailRegex.test(id)) {
    email = id.toLowerCase();

  } else if (phoneRegex.test(id)) {
    phone = id;

  } else {
    return res
      .status(400)
      .end();
  };

  if (!passwordRegex.test(password)) {
    return res
      .status(400)
      .end();
  };

  try {
    user = await User.findOne({ $or: [{ email }, { phone }] });

    if (!user) {
      user = await User.create({
        email,
        phone,
        password
      });

    } else if (!user.verifyPassword(password)) {
      return res
        .status(400)
        .end();
    };

  } catch {
    return res
      .status(500)
      .end();
  };

  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
    algorithm: "HS256",
    expiresIn: "1d"
  });

  return res
    .status(200)
    .json(token);
};
