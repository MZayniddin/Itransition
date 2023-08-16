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
  const { users } = req.body;

  let updatedUsersId = [];

  for (const id of users) {
    try {
      const result = (
        await pool.query(
          "UPDATE users SET status=False WHERE id=$1 RETURNING id",
          [id]
        )
      ).rows[0];
      updatedUsersId.push(result.id);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  res.json({ updatedUsersId });
};

export const unBlockUser = async (req, res) => {
  const { users } = req.body;

  let updatedUsersId = [];

  for (const id of users) {
    try {
      const result = (
        await pool.query(
          "UPDATE users SET status=True WHERE id=$1 RETURNING id",
          [id]
        )
      ).rows[0];
      updatedUsersId.push(result.id);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  res.json({ updatedUsersId });
};

export const deleteUser = async (req, res) => {
  const { users } = req.body;

  let updatedUsersId = [];

  for (const id of users) {
    try {
      const result = (
        await pool.query("DELETE FROM users WHERE id=$1 RETURNING id", [id])
      ).rows[0];
      updatedUsersId.push(result.id);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  res.json({ updatedUsersId });
};
