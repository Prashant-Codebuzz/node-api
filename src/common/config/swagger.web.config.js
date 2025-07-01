import express from 'express';
import { serve, setup } from "swagger-ui-express";
import path from "path";
import expressBasicAuth from "express-basic-auth";
import YAML from "yamljs";
import dotenv from 'dotenv';
import { fileURLToPath } from "url";
dotenv.config();

const router = express.Router();

// Use import.meta.url to get the current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log("Resolved __dirname:", __dirname);

// Resolve the correct path for the swagger.yml file for the web
const swaggerDocumentPath = path.normalize(path.join(__dirname, "../../../swagger-doc/web/swagger.yml"));
console.log("Swagger document path for web:", swaggerDocumentPath); // Debug log for path

const swaggerDocument = YAML.load(swaggerDocumentPath);

if (process.env.NODE_ENV !== "production") {
  router.use(
    "/",
    (req, res, next) => {
      swaggerDocument.info.title = process.env.APP_NAME;
      swaggerDocument.info.version = "1.0";
      swaggerDocument.servers = [
        {
          url: `${process.env.APP_URL}/web`,
          description: "API base url",
        },
        {
          url: `${process.env.APP_URL_fOR_OTHER}/web`,
          description: "API base url Development",
        },
      ];
      req.swaggerDoc = swaggerDocument;
      next();
    },
    serve,
    setup(swaggerDocument, {
      swaggerOptions: {
        persistAuthorization: true,
      },
    })
  );
}

export default router;
