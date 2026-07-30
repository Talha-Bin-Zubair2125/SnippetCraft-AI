const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const connectDB = require("./db");
// Routes
const authRoutes = require("./routes/AuthRoutes");
const editorRoutes = require("./routes/EditorRoutes");
const dotenv = require("dotenv");
dotenv.config();
const app = express();

const PORT = process.env.PORT;
const COOKIE_SECRET = process.env.COOKIE_SECRET;

// Debugging: Log the values of PORT and COOKIE_SECRET
console.log("PORT:", PORT);
console.log("COOKIE_SECRET:", COOKIE_SECRET);

app.use(express.json());
app.use(cookieParser(COOKIE_SECRET));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use("/api/auth", authRoutes);
app.use("/api/editor", editorRoutes);

// Default Route
app.get("/", (req, res) => {
  res.send("Server is Running!");
});

// Connect to MongoDB
connectDB();

// Create Server
app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
