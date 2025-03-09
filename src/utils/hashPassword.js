import { randomBytes, pbkdf2Sync } from "crypto";

export default function (password, salt = randomBytes(16).toString("hex")) {
  const hash = pbkdf2Sync(
    password,
    salt,
    1000,
    64,
    "sha256",
    (_, key) => key,
  ).toString("hex");

  return { salt, hash };
};
