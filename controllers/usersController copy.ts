import User from "../models/User";
import bcryptjs from "bcryptjs";
import jwt, { Secret } from "jsonwebtoken";
import {Request, Response} from 'express'

// GET: get users list
// api/users/getUsers
const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.json({ message: "error retrieving users list" });
  }
};

// POST: create new user
//api/users/register
const registerUser = async (req: Request, res: Response): Promise<string | Secret | any > => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ error: [{ msg: "user already exists" }] });
    }

    user = new User({ ...req.body });

    //hashing the password:
    const salt = await bcryptjs.genSalt(10);
    user.password = await bcryptjs.hash(password, salt);

    await user.save();

    //webtoken:
    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET!,
      {
        expiresIn: 36000,
      },
      (err, token) => {
        if (err) throw err;
        res.send({ token });
        //el token va a ser el res
      }
    );
  } catch (error) {
    res.status(500).send(error);
  }
};

//GET: get an user auth
//api/users/login
const getLogin = async (req: Request, res: Response): Promise<string | Secret | any > => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    res.status(500).send(error);
  }
};

//POST: post an user auth, login
//api/users/login
const postLogin = async (req: Request, res: Response): Promise<string | Secret | any > => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: [{ msg: "Invalid credentials" }] });
    }

    const matched = await bcryptjs.compare(password, user.password);
    if (!matched) {
      return res.status(404).json({ error: [{ msg: "Invalid credentials" }] });
    }

    //webtoken decrypting:
    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET!,
      {
        expiresIn: 36000,
      },
      (err, token) => {
        if (err) throw err;
        res.send({ token });
      }
    );
  } catch (error) {
    res.status(500).send(error);
  }
};

export {
  getUsers,
  registerUser,
  getLogin,
  postLogin,
};
