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
    try {
      user = await User.create({
        email,
        password
      });

    } catch {
      return res
        .status(400)
        .end();
    };
  };

  return res
    .status(200)
    .json(user);
};
