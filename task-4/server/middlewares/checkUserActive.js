import pool from "../config/pgConfig.js";

export const checkUserIsActive = async (req, res, next) => {
  const foundUser = (
    await pool.query("SELECT * FROM users WHERE id=$1", [req.user])
  ).rows[0];

  if (!foundUser)
    return res.status(400).json({ message: "Your account was deleted!" });

  if (foundUser?.status) next();
  else return res.status(403).json({ message: "Your account was blocked!" });
};
