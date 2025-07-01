import express from "express";
import path from "path";
import { createServer as httpCreateServer } from "http";
import { createServer as httpsCreateServer } from "https";
import bodyParser from "body-parser";
import fileUpload from "express-fileupload";
import fs from "fs";
import passport from "passport";
import session from "express-session";
import routeNotFoundHandler from "./common/middlewares/not-found.handler.js";
import errorHandler from "./common/middlewares/error.handler.js";
import cors from "cors";
import dotenv from "dotenv";
import adminRoute from "../src/router/admin.API.js";
import webRoute from "../src/router/web.API.js";
import adminConfig from "../src/common/config/swagger.admin.config.js";
import webConfig from "../src/common/config/swagger.web.config.js";

// Load environment variables
dotenv.config();

// Create app instance
const app = express();

// Resolve __dirname equivalent for ES modules
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// App settings and middleware
app.set("views", path.join(__dirname, "../../src", "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "../public")));
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(fileUpload());
app.use(
  cors({
    origin: "*", // Allow all origins
  })
);
app.use(
  session({ secret: "hjs89d", resave: false, saveUninitialized: true })
);

// Route configurations
app.use("/admin", adminRoute);
app.use("/web", webRoute);
app.use("/web/api/documentation", webConfig);
app.use("/admin/api/documentation", adminConfig);
  
// Error handling
app.use("*", routeNotFoundHandler);
app.use(errorHandler);

// Server setup
let server;
if (process.env.IS_SSL_ENABLE === "true") {
  const options = {
    key: fs.readFileSync(
      path.resolve(`${process.env.SSL_CERT_BASE_PATH}/privkey.pem`)
    ),
    cert: fs.readFileSync(
      path.resolve(`${process.env.SSL_CERT_BASE_PATH}/fullchain.pem`)
    ),
  };
  server = httpsCreateServer(options, app);
} else {
  server = httpCreateServer(app);
}

// Start server
server.listen(process.env.PORT, () => {
  console.log(`Listening on (HTTP/HTTPS) ${process.env.APP_URL_fOR_OTHER,`/`,process.env.PORT}`);
});

export default app;
