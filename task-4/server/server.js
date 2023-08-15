import express from "express";
import { config } from "dotenv";
import cors from "cors";
import { verifyJWT } from "./middlewares/verifyJWT.js";

config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

// ROUTES
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";

app.use("/user", authRoute);

app.use(verifyJWT);
app.use("/users", usersRoute);

app.listen(PORT, () => console.log("SERVER IS RUNNING ON PORT " + PORT));
