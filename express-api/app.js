
const express = require("express");
const cors = require("cors");
const session = require("express-session");

const app = express();
const PORT = 3000;

const postApiRoutes = require("./routes/api/postApiRoute");
const authApiRoutes = require("./routes/api/authApiRoute");

app.use(cors({
    origin: true,
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: "lab-rn-session-secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        sameSite: "lax",
        secure: false
    }
}));

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Lab RN - React + Express REST API đang hoạt động"
    });
});

app.use("/api/posts", postApiRoutes);
app.use("/api/auth", authApiRoutes);

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Không tìm thấy đường dẫn",
        path: req.originalUrl
    });
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server đang chạy tại http://localhost:${PORT}`);
});
