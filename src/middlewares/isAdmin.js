import jwt from "jsonwebtoken";

import { User } from "#models";

export default async function (req, res, next) {
  const token = req.headers.authorization;

  try {
    const { _id } = jwt.verify(token, process.env.JWT_SECRET, {
      algorithms: ["HS256"]
    });
    const user = await User.findOne({ _id });

    if (user.role == "admin") {
      return next();
    };

    return res
      .status(403)
      .end();

  } catch {
    return res
      .status(401)
      .end();
  };
};
