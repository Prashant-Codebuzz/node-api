import express from "express";
import { serve, setup } from "swagger-ui-express";
import path from "path";
import { fileURLToPath } from "url";
import expressBasicAuth from "express-basic-auth";
import YAML from "yamljs";

import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

// Resolve the __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const swaggerDocument = YAML.load(path.join(__dirname, "../../../swagger-doc/admin/swagger.yml"));

if (process.env.NODE_ENV !== "production") {
  router.use(
    "/",
    (req, res, next) => {
      swaggerDocument.info.title = process.env.APP_NAME;
      swaggerDocument.info.version = "1.0";
      swaggerDocument.servers = [
        {
          url: `${process.env.APP_URL}/admin`,
          description: "API base url",
        },
        {
          url: `${process.env.APP_URL_fOR_OTHER}/admin`,
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
