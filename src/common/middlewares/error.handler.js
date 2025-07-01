import { HTTP_INTERNAL_SERVER, HTTP_UNPROCESSABLE } from "../../../constants.js";
import GeneralError from "../exceptions/general-error.js";

import dotenv from 'dotenv';
dotenv.config();

export default (error, req, res, next) => {
  if (error instanceof GeneralError) {
    return res.status(error.status).json({ message: error.message });
  }

  if (error && error.error && error.error.isJoi) {
    return res.status(HTTP_UNPROCESSABLE).json({
      status: false,
      message: error.error.details[0].message,
    });
  }

  if (process.env.NODE_ENV !== "production") {
    return res.status(HTTP_INTERNAL_SERVER).json({
      message: error.message,
      stack: error.stack,
    });
  }

  return res.status(HTTP_INTERNAL_SERVER).json({
    message: "Internal Server Error",
  });
};

