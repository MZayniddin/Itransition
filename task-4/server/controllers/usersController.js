import pool from "../config/pgConfig.js";

export const getUsers = async (req, res) => {
  try {
    const users = (
      await pool.query(
        "SELECT id, displayname, email, last_login, created_at, status FROM users"
      )
    ).rows;

    res.json({ users: users.sort((a, b) => a.id - b.id) });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const blockUser = async (req, res) => {
  const { userId } = req.params;
  try {
    // CHECKING USER EXISTS WITH THIS ID
    const foundUser = (
      await pool.query("SELECT * FROM users WHERE id=$1", [userId])
    ).rows[0];

    if (!foundUser)
      return res
        .status(404)
        .json({ message: `USER NOT FOUND WITH ID ${userId}` });

    // UPDATING STATUS
    await pool.query("UPDATE users SET status=False WHERE id=$1", [userId]);
    res.status(200).json({ message: "Successfully updated!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const unBlockUser = async (req, res) => {
  const { userId } = req.params;
  try {
    // CHECKING USER EXISTS WITH THIS ID
    const foundUser = (
      await pool.query("SELECT * FROM users WHERE id=$1", [userId])
    ).rows[0];

    if (!foundUser)
      return res
        .status(404)
        .json({ message: `USER NOT FOUND WITH ID ${userId}` });

    // UPDATING STATUS
    await pool.query("UPDATE users SET status=True WHERE id=$1", [userId]);

    res.status(200).json({ message: "Successfully updated!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  const { userId } = req.params;
  try {
    // CHECKING USER EXISTS WITH THIS ID
    const foundUser = (
      await pool.query("SELECT * FROM users WHERE id=$1", [userId])
    ).rows[0];

    if (!foundUser)
      return res
        .status(404)
        .json({ message: `USER NOT FOUND WITH ID ${userId}` });

    // DELETING USER
    await pool.query("DELETE FROM users WHERE id=$1", [userId]);

    res.status(200).json({ message: "Successfully deleted!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
