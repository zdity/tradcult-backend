import jwt from "jsonwebtoken";

export default function (condition) {
  return function (req, res, next) {
    const token = req.headers.authorization;

    try {
      const { _id } = jwt.verify(token, process.env.JWT_SECRET, {
        algorithms: ["HS256"]
      });

      if (condition) {
        req.user = { _id };
        return next();
      };

      return res
        .status(403)
        .end();

    } catch {
      if (condition) {
        return res
          .status(401)
          .end();
      };

      return next();
    };
  };
}; 
