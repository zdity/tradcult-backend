import jwt from "jsonwebtoken";

export default function (condition = true) {
  return function (req, res, next) {
    try {
      const { _id } = jwt.verify(
        req.headers.authorization,
        process.env.JWT_SECRET,
        { algorithms: ["HS256"] }
      );

      if (condition) {
        req.user = { _id };
        return next();
      };

      return res.status(403).end();
    } catch {
      if (condition) {
        return res.status(401).end();
      };

      return next();
    };
  };
}; 
