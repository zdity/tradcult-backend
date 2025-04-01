import jwt from "jsonwebtoken";

import { User } from "#models";

export default async function (req, res, next) {
  try {
    const { _id } = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET,
      { algorithms: ["HS256"] }
    );
    const user = await User.findOne({ _id });

    if (user.role != "admin") {
      return res.status(403).end();
    };

    return next();
  } catch {
    return res.status(401).end();
  };
};
