import pool from "../config/pgConfig.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { format } from "date-fns";

const tokenCreator = (data) => {
  return jwt.sign(data, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_TIME,
  });
};

const getCurrentDate = () => format(new Date(), "yyyy-MM-dd hh:mm:ss");

export const signup = async (req, res) => {
  const { displayName, email, password, confirmPassword } = req.body;
  if (!displayName || !email || !password)
    return res
      .status(400)
      .json({ message: "Display Name, email and password required!" });

  if (password !== confirmPassword)
    return res.status(400).json({ message: "Password not match!" });

  try {
    // CHECK USER TO DUPLICATE
    const checkDuplicate = (
      await pool.query("SELECT * FROM users WHERE email=$1", [email])
    ).rows;

    if (checkDuplicate.length)
      return res.status(409).json({ message: "This email is already in use" });

    // HASH PASSWORD
    const hashedPwd = await bcrypt.hash(password, 10);

    // CREATING NEW USER
    const newUser = (
      await pool.query(
        "INSERT INTO users(displayName, email, password, last_login ,created_at) VALUES($1, $2, $3, $4, $5) RETURNING id, displayname, status",
        [displayName, email, hashedPwd, getCurrentDate(), getCurrentDate()]
      )
    ).rows[0];

    // SEND TOKEN
    res.json({ token: tokenCreator(newUser), user: newUser.displayname });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const signin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res
      .status(400)
      .json({ message: "Each space email and password required!" });

  try {
    const foundUser = (
      await pool.query("SELECT * from users WHERE email=$1", [email])
    ).rows?.[0];

    // CHECK USER EXISTS
    if (!foundUser)
      return res
        .status(404)
        .json({ message: "User not found with this email!" });

    // CHECK PASSWORD
    const matchPwd = await bcrypt.compare(password, foundUser.password);
    if (!matchPwd) return res.status(400).json({ message: "Invalid password" });

    // CHECK IS USER BLOCKED
    if (!foundUser.status)
      return res.status(403).json({ message: "Your account was blocked!" });

    // UPDATE LAST LOGIN TIME
    pool.query("UPDATE users SET last_login=$1 WHERE id=$2", [
      getCurrentDate(),
      foundUser.id,
    ]);

    // SEND TOKEN
    res.json({
      token: tokenCreator({
        id: foundUser.id,
        displayname: foundUser.displayname,
        status: foundUser.status,
      }),
      user: foundUser.displayname,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
