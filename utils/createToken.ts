import jwt from "jsonwebtoken";

const createToken = (id: string): string => {
  return jwt.sign({ id }, `${process.env.JWT_SECRET}`, {
    expiresIn: "10d",
  });
};

export default createToken;
