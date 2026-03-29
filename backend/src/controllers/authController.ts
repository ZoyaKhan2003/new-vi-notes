import User from "../models/User";
import { Request,Response } from "express";
import bcrypt from "bcryptjs";
import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const register = async(req:Request, res:Response) =>{
    const {email, password} = req.body;

    try{
        const existing = await User.findOne({email});

        if(existing) {
            return res.status(400).json({msg: "User already exists"});
        }

        const hashedPassword = await bcrypt.hash(password,10);

        const user = await User.create({
            email,
            password: hashedPassword,
        });

        const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: "1d" }
    );

    res.json({ msg: "User Registered", token });
    }
    catch(err){
        res.status(500).json({msg: "Internal Server error"})
    }
}

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ msg: "Missing fields" });
  }

  try {
    const user = await User.findOne({ email });

    
    if (!user || !user.password) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: "1d" }
    );

    res.json({ msg: "Login successful", token });
  } catch (err) {
    res.status(500).json({ msg: "Internal Server Error" });
  }
};


export const googleLogin = async (req: Request, res: Response) => {
  const { token } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID!,
    });

    const payload = ticket.getPayload();
    

   const email = payload?.email;

if (!email) {
  return res.status(400).json({ msg: "Email not found" });
}

let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        email,
        password: "google_auth",
      });
    }
    const jwtToken = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: "1d" }
    );

    res.json({ msg: "Google login success", token: jwtToken });

  } catch {
    res.status(400).json({ msg: "Invalid Google token" });
  }
};