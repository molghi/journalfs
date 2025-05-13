const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const cookieParser = require("cookie-parser");
const fs = require("fs");
const path = require("path");
const notesRouter = require("./routes/notes");
const exporter = require("./controllers/exportController");
const importer = require("./controllers/importController");

// Init Express
const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: "10kb" })); // security layer: constrain incoming JSON payloads to 10 kb, offering some protection against large-body attacks
app.use(express.urlencoded({ extended: false }));
app.use(helmet()); // security layer: set up HTTP security headers
app.set("trust proxy", 1); // trust first proxy (during local dev)
app.use(
    rateLimit({
        windowMs: 15 * 60 * 1000, // within 15 minutes...  (after this period the request count will be reset)
        max: 100, // ...each IP can send up to 100 requests (if more than 100, the client will be blocked temporarily)
        message: "Too many requests from this IP, please try again later.",
        standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers -- Allows the client to know how many requests they have left in the current window
        legacyHeaders: false, // Disable the `X-RateLimit-*` headers --> Modernize the headers by using RateLimit-* instead of the older X-RateLimit-* ones
    })
); // security layer: apply rate limiting to all requests
// app.use(cookieParser());

// Connect to Mongo
const conn = process.env.MONGO_CONN_STRING.replace("<db_username>", process.env.MONGO_USER).replace(
    "<db_password>",
    process.env.MONGO_PASSWORD
);
mongoose
    .connect(conn)
    .then(() => console.log(`✅ db connected`))
    .catch(() => console.log(`🔴 db not connected`));

// Start server
const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server is running... (${port})`));

// App Routes
app.use("/notes", notesRouter);
app.post("/export", exporter);
app.post("/import", importer);
