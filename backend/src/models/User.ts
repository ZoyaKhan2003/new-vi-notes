import mongoose from "mongoose";

interface IUser {
  email: string;
  password?: string; 
}

const userSchema = new mongoose.Schema<IUser>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: false }, 
});

export default mongoose.model("User", userSchema);